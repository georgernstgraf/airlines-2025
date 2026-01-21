<template>
  <div class="book-flight">
    <h1>Flug Buchen</h1>

    <div v-if="!flightData" class="no-selection">
      <p>Bitte wählen Sie zuerst einen Flug aus!</p>
      <router-link to="/search" class="btn-back">← Zurück zur Suche</router-link>
    </div>

    <div v-else class="booking-container">
      <!-- Flug-Zusammenfassung -->
      <div class="flight-summary">
        <h2>Flug-Zusammenfassung</h2>
        <div class="summary-info">
          <p><strong>Route:</strong> {{ flightData.flight.origin.city }} → {{ flightData.flight.destination.city }}</p>
          <p><strong>Datum:</strong> {{ flightData.date }}</p>
          <p><strong>Uhrzeit:</strong> {{ formatTime(flightData.flight.departureTime) }}</p>
          <p><strong>Flugzeug:</strong> {{ flightData.flight.plane.model }}</p>
          <p><strong>Anzahl Passagiere:</strong> {{ flightData.passengers }}</p>
          <p class="total-price"><strong>Geschätzter Preis:</strong> €{{ flightData.totalPrice }}</p>
        </div>
      </div>

      <!-- Passagier-Daten -->
      <div class="passengers-section">
        <h2>Passagier-Informationen</h2>
        
        <div v-for="(passenger, index) in passengers" :key="index" class="passenger-form">
          <h3>Passagier {{ index + 1 }}</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label :for="'firstName-' + index">Vorname:</label>
              <input 
                :id="'firstName-' + index"
                v-model="passenger.firstName"
                type="text"
                placeholder="Vorname"
              />
            </div>

            <div class="form-group">
              <label :for="'lastName-' + index">Nachname:</label>
              <input 
                :id="'lastName-' + index"
                v-model="passenger.lastName"
                type="text"
                placeholder="Nachname"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label :for="'email-' + index">Email:</label>
              <input 
                :id="'email-' + index"
                v-model="passenger.email"
                type="email"
                placeholder="Email-Adresse"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bestätigung -->
      <div class="terms-section">
        <label>
          <input v-model="acceptTerms" type="checkbox" />
          Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinie
        </label>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <router-link to="/search" class="btn-cancel">← Zurück zur Suche</router-link>
        <button @click="bookFlight" class="btn-book" :disabled="!acceptTerms">
          Jetzt Buchen
        </button>
      </div>

      <!-- Erfolgreiche Buchung -->
      <div v-if="bookingConfirmed" class="booking-confirmation">
        <h2>Buchung Erfolgreich!</h2>
        <div class="confirmation-content">
          <p>Ihre Buchung wurde erfolgreich abgeschlossen.</p>
          <p><strong>Buchungsnummer:</strong> {{ bookingNumber }}</p>
          <p>Eine Bestätigungsmail wurde an Ihren Email-Account gesendet.</p>
          <router-link to="/" class="btn-home">Zur Startseite</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const flightData = ref(null)
const acceptTerms = ref(false)
const bookingConfirmed = ref(false)
const bookingNumber = ref('')

// Passagier-Daten
const passengers = ref([])

// Beim Laden der Seite
onMounted(() => {
  const storedData = sessionStorage.getItem('selectedFlight')
  if (storedData) {
    flightData.value = JSON.parse(storedData)
    // Initialisiere Passagier-Formulare
    passengers.value = Array.from({ length: flightData.value.passengers }, () => ({
      firstName: '',
      lastName: '',
      email: ''
    }))
  }
})

// Formatiere Zeit
const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Buchung validieren
const validateBooking = () => {
  // Validiere Passagier-Daten
  for (let passenger of passengers.value) {
    if (!passenger.firstName || !passenger.lastName || !passenger.email) {
      alert('Bitte füllen Sie alle Passagier-Informationen aus!')
      return false
    }
  }

  // Validiere Email-Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  for (let passenger of passengers.value) {
    if (!emailRegex.test(passenger.email)) {
      alert('Bitte geben Sie eine gültige Email-Adresse ein!')
      return false
    }
  }

  return true
}

// Flug buchen
const bookFlight = async () => {
  if (!validateBooking()) {
    return
  }

  if (!acceptTerms.value) {
    alert('Bitte akzeptieren Sie die Nutzungsbedingungen!')
    return
  }

  // Generiere Buchungsnummer
  bookingNumber.value = 'BOOK-' + Math.random().toString(36).substr(2, 9).toUpperCase()

  try {
    // Buche Passagiere für den Flug
    const passengerResponse = await fetch(`/api/flights/${flightData.value.flight.id}/passengers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passengerIds: passengers.value.map((_, i) => i.toString())
      })
    })

    if (passengerResponse.ok) {
      // Speichere Buchungsdaten
      const bookingData = {
        bookingNumber: bookingNumber.value,
        flight: flightData.value.flight,
        date: flightData.value.date,
        passengers: passengers.value,
        totalPrice: flightData.value.totalPrice,
        bookingDate: new Date().toISOString()
      }

      sessionStorage.setItem('bookingConfirmation', JSON.stringify(bookingData))
      bookingConfirmed.value = true

      // Lösche die Flugauswahl nach erfolgreicher Buchung
      setTimeout(() => {
        sessionStorage.removeItem('selectedFlight')
      }, 3000)
    }
  } catch (error) {
    console.error('Booking error:', error)
    alert('Es gab einen Fehler bei der Buchung. Bitte versuchen Sie es später erneut.')
  }
}
</script>

<style scoped>
</style>
