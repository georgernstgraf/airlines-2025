import { assert, assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";

const BASE_URL = "http://127.0.0.1:3000";

async function fetchJson(path: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
        },
    });

    let data: unknown = null;
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
        try {
            data = await response.json();
        } catch (error) {
            const raw = await response.text();
            try {
                data = JSON.parse(raw);
            } catch {
                data = raw;
            }
        }
    } else {
        data = await response.text();
    }
    return { response, data };
}

async function main() {
    console.log("🧪 Starting endpoint integration checks...");

    // Health check
    {
        const { response, data } = await fetchJson("/");
        assertEquals(response.status, 200);
        if (!data || typeof data !== "object") {
            throw new Error(`Health check / returned unexpected body: ${JSON.stringify(data)}`);
        }
        console.log("✅ / health check OK");
    }

    // Read-only endpoints from endpoints.rest
    const getEndpoints = ["/passengers", "/planes", "/airports", "/flights", "/flights?include=relations"];
    for (const path of getEndpoints) {
        const { response } = await fetchJson(path);
        assertEquals(response.status, 200, `GET ${path} should return 200`);
        console.log(`✅ GET ${path} -> 200`);
    }

    // Create resources
    const passengerData = {
        firstName: "Test",
        lastName: "Passenger",
        email: `t-${crypto.randomUUID()}@example.com`,
    };
    const { response: pRes, data: pData } = await fetchJson("/passengers", {
        method: "POST",
        body: JSON.stringify(passengerData),
    });
    assertEquals(pRes.status, 201);
    assert(pData && (pData as any).id);
    const passengerId = (pData as any).id;
    console.log(`✅ POST /passengers -> 201 (id=${passengerId})`);

    const planeData = { model: `TestJet-${crypto.randomUUID().slice(0, 6)}`, capacity: 120 };
    const { response: planeRes, data: planeRespData } = await fetchJson("/planes", {
        method: "POST",
        body: JSON.stringify(planeData),
    });
    assertEquals(planeRes.status, 201);
    assert((planeRespData as any).id);
    const planeId = (planeRespData as any).id;
    console.log(`✅ POST /planes -> 201 (id=${planeId})`);

    function randomIataCode() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
    }

    let airportId: string | null = null;
    let aResStatus = 0;
    let aData: unknown = null;

    for (let attempt = 1; attempt <= 5; attempt++) {
        const airportData = {
            name: `Test Airport ${crypto.randomUUID().slice(0, 5)}`,
            iataCode: randomIataCode(), // 3 letters
            city: "Test City",
        };

        const result = await fetchJson("/airports", { method: "POST", body: JSON.stringify(airportData) });
        aResStatus = result.response.status;
        aData = result.data;

        if (aResStatus === 201) {
            airportId = (aData as any).id;
            console.log(`✅ POST /airports -> 201 (id=${airportId}, iataCode=${airportData.iataCode})`);
            break;
        }

        console.warn(`⚠️ POST /airports attempt ${attempt} failed ${aResStatus} with body: ${JSON.stringify(aData)}`);
    }

    if (aResStatus !== 201 || !airportId) {
        throw new Error(`Failed to create airport; last status=${aResStatus}, body=${JSON.stringify(aData)}`);
    }

    // For flight creation we need at least 2 airports and a plane.
    const allAirportsResp = await fetchJson("/airports");
    assertEquals(allAirportsResp.response.status, 200);
    const airports = allAirportsResp.data as Array<{ id: string }>;

    while (airports.length < 2) {
        const airportPayload = {
            name: `Test Airport ${crypto.randomUUID().slice(0, 5)}`,
            iataCode: randomIataCode(),
            city: "Test City",
        };

        const createAirportResp = await fetchJson("/airports", {
            method: "POST",
            body: JSON.stringify(airportPayload),
        });
        assertEquals(createAirportResp.response.status, 201, `Failed to create extra airport: ${JSON.stringify(createAirportResp.data)}`);
        airports.push(createAirportResp.data as { id: string });
    }

    const allPlanesResp = await fetchJson("/planes");
    assertEquals(allPlanesResp.response.status, 200);
    const planes = allPlanesResp.data as Array<{ id: string }>;
    assert(planes.length >= 1, "Need at least 1 plane");

    const originId = airports[0].id;
    const destinationId = airports[1].id;
    const flightPayload = {
        flightNumber: `TS${Math.floor(Math.random() * 900 + 100)}`,
        departureTime: new Date(Date.now() + 3600 * 1000).toISOString(),
        arrivalTime: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
        originId,
        destinationId,
        planeId: planes[0].id,
    };
    const { response: fRes, data: fData } = await fetchJson("/flights", { method: "POST", body: JSON.stringify(flightPayload) });
    assertEquals(fRes.status, 201);
    assert((fData as any).id);
    const flightId = (fData as any).id;
    console.log(`✅ POST /flights -> 201 (id=${flightId})`);

    // Flight details
    const flightDetailResp = await fetchJson(`/flights/${flightId}`);
    assertEquals(flightDetailResp.response.status, 200);
    assert((flightDetailResp.data as any).id === flightId);
    console.log(`✅ GET /flights/${flightId} -> 200`);

    // Book passenger into flight
    const { response: bookRes, data: bookData } = await fetchJson(`/flights/${flightId}/passengers`, {
        method: "POST",
        body: JSON.stringify({ passengerIds: [passengerId] }),
    });
    assertEquals(bookRes.status, 200);
    assert((bookData as any).id === flightId);
    console.log(`✅ POST /flights/${flightId}/passengers -> 200`);

    // Verify relation includes passenger
    const flightWithRelations = await fetchJson(`/flights?include=relations`);
    assertEquals(flightWithRelations.response.status, 200);
    console.log("✅ GET /flights?include=relations -> 200");

    console.log("\n🎉 All endpoint tests are successful!");
}

try {
    await main();
} catch (err) {
    console.error("\n❌ Endpoint tests failed:", err);
    Deno.exit(1);
}
