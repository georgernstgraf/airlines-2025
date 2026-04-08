import * as passengerService from "./passenger.ts";
import * as flightService from "./flight.ts";
import { faker } from "@faker-js/faker";

export async function createBooking(data: {
    flightId: string;
    passengers: Array<{
        firstName: string;
        lastName: string;
        email: string;
    }>;
}) {
    // Validate flight exists
    const flight = await flightService.findById(data.flightId);
    if (!flight) {
        throw new Error("Flight not found");
    }

    // Validate we have passenger data
    if (!data.passengers || data.passengers.length === 0) {
        throw new Error("At least one passenger is required");
    }

    // Create all passengers
    const createdPassengers = await passengerService.createManyPassengers(data.passengers);

    // Attach passengers to flight with capacity check
    const passengerIds = createdPassengers.map((p) => p.id);
    await flightService.bookPassengersToFlight(data.flightId, passengerIds);

    // Generate booking confirmation
    const bookingNumber = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    return {
        bookingNumber,
        flightId: data.flightId,
        passengers: createdPassengers,
        bookingDate: new Date().toISOString(),
    };
}
