<template>
  <div class="flight-search">
    <h1>Flüge Suchen</h1>

    <div class="search-form">
      <div class="form-group">
        <label for="departure">Abflugort (Stadt):</label>
        <input
          v-model="searchParams.departure"
          id="departure"
          type="text"
          placeholder="z.B. Wien"
          list="departure-suggestions"
        />
        <datalist id="departure-suggestions">
          <option v-for="airport in departureAirports" :key="airport.id" :value="airport.city">
            {{ airport.city }} ({{ airport.iataCode }})
          </option>
        </datalist>
      </div>

      <div class="form-group">
        <label for="arrival">Zielort (Stadt):</label>
        <input
          v-model="searchParams.arrival"
          id="arrival"
          type="text"
          placeholder="z.B. Berlin"
          list="arrival-suggestions"
        />
        <datalist id="arrival-suggestions">
          <option v-for="airport in arrivalAirports" :key="airport.id" :value="airport.city">
            {{ airport.city }} ({{ airport.iataCode }})
          </option>
        </datalist>
      </div>

      <div class="form-group">
        <label for="date">Abflugdatum:</label>
        <input
          v-model="searchParams.date"
          id="date"
          type="date"
        />
      </div>

      <div class="form-group">
        <label for="passengers">Anzahl Passagiere:</label>
        <input
          v-model.number="searchParams.passengers"
          id="passengers"
          type="number"
          min="1"
          max="9"
        />
      </div>

      <button @click="searchFlights" class="btn-search" :disabled="loading">
        {{ loading ? 'Lädt...' : 'Suchen' }}
      </button>

      <button @click="showAllFlights" class="btn-all-flights" :disabled="loading">
        {{ loading ? 'Lädt...' : 'Alle Flüge anzeigen' }}
      </button>
    </div>

    <div v-if="searched" class="results">
      <h2>Suchergebnisse ({{ filteredFlights.length }} Flüge gefunden)</h2>

      <div v-if="filteredFlights.length === 0" class="no-results">
        <p>Keine Flüge gefunden. Bitte versuchen Sie es mit anderen Suchkriterien.</p>
      </div>

      <div v-else class="flights-list">
        <div v-for="flight in filteredFlights.slice(0, 50)" :key="flight.id" class="flight-card">
          <div class="flight-info">
            <div class="route">
              <span class="airport">{{ flight.origin.city }}</span>
              <span class="arrow">→</span>
              <span class="airport">{{ flight.destination.city }}</span>
            </div>
            <div class="flight-details">
              <span class="time">{{ formatTime(flight.departureTime) }}</span>
              <span class="separator">|</span>
              <span class="duration">{{ calculateDuration(flight) }}</span>
              <span class="separator">|</span>
              <span class="airline">{{ flight.plane.model }}</span>
            </div>
            <div class="seats-info">
              <span class="available-seats">{{ flight.plane.capacity }} Plätze</span>
            </div>
            <div class="price">
              <span class="price-value">€{{ calculatePrice(flight) }}</span>
              <button @click="selectFlight(flight)" class="btn-select">Auswählen</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAll" class="results">
      <div class="all-flights-header">
        <h2>Alle verfügbaren Flüge ({{ allFlights.length }})</h2>
        <button @click="showAll = false" class="btn-close">Schließen</button>
      </div>

      <div class="search-in-list">
        <input
          v-model="allFlightsSearch"
          type="text"
          placeholder="In der Liste suchen... (Stadt, Flugzeug, etc.)"
          class="search-input"
        />
      </div>

      <div v-if="filteredAllFlights.length === 0" class="no-results">
        <p>Keine Flüge gefunden.</p>
      </div>

      <div v-else class="flights-list">
        <div v-for="flight in filteredAllFlights" :key="flight.id" class="flight-card">
          <div class="flight-info">
            <div class="route">
              <span class="airport">{{ flight.origin.city }}</span>
              <span class="arrow">→</span>
              <span class="airport">{{ flight.destination.city }}</span>
            </div>
            <div class="flight-details">
              <span class="time">{{ formatTime(flight.departureTime) }}</span>
              <span class="separator">|</span>
              <span class="duration">{{ calculateDuration(flight) }}</span>
              <span class="separator">|</span>
              <span class="airline">{{ flight.plane.model }}</span>
            </div>
            <div class="seats-info">
              <span class="available-seats">{{ flight.plane.capacity }} Plätze</span>
            </div>
            <div class="price">
              <span class="price-value">€{{ calculatePrice(flight) }}</span>
              <button @click="selectFlight(flight)" class="btn-select">Auswählen</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedFlight" class="selected-flight">
      <h2>Ausgewählter Flug</h2>
      <div class="selection-info">
        <p><strong>Route:</strong> {{ selectedFlight.origin.city }} → {{ selectedFlight.destination.city }}</p>
        <p><strong>Datum:</strong> {{ searchParams.date }}</p>
        <p><strong>Uhrzeit:</strong> {{ formatTime(selectedFlight.departureTime) }}</p>
        <p><strong>Flugzeug:</strong> {{ selectedFlight.plane.model }}</p>
        <p><strong>Anzahl Passagiere:</strong> {{ searchParams.passengers }}</p>
        <p><strong>Preis pro Person:</strong> €{{ calculatePrice(selectedFlight) }}</p>
        <p><strong>Gesamtpreis:</strong> €{{ calculatePrice(selectedFlight) * searchParams.passengers }}</p>
        <router-link
          to="/book"
          class="btn-book"
          @click="saveFlightSelection"
        >
          Zur Buchung →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchParams = ref({
  departure: '',
  arrival: '',
  date: '',
  passengers: 1
})

const searched = ref(false)
const selectedFlight = ref(null)
const loading = ref(false)
const allFlights = ref([])
const allAirports = ref([])
const showAll = ref(false)
const allFlightsSearch = ref('')

const departureAirports = computed(() =>
  allAirports.value.filter(a =>
    a.city.toLowerCase().includes(searchParams.value.departure.toLowerCase())
  )
)

const arrivalAirports = computed(() =>
  allAirports.value.filter(a =>
    a.city.toLowerCase().includes(searchParams.value.arrival.toLowerCase())
  )
)

const filteredFlights = computed(() => {
  if (!searched.value) return []

  return allFlights.value.filter(flight => {
    const departureMatch = flight.origin.city.toLowerCase() === searchParams.value.departure.toLowerCase()
    const arrivalMatch = flight.destination.city.toLowerCase() === searchParams.value.arrival.toLowerCase()
    const flightDate = new Date(flight.departureTime).toDateString()
    const searchDate = new Date(searchParams.value.date).toDateString()
    const dateMatch = flightDate === searchDate
    return departureMatch && arrivalMatch && dateMatch
  }).slice(0, 50)
})

const filteredAllFlights = computed(() => {
  const term = allFlightsSearch.value.toLowerCase()
  if (!term) return allFlights.value
  return allFlights.value.filter(flight =>
    flight.origin.city.toLowerCase().includes(term) ||
    flight.origin.iataCode.toLowerCase().includes(term) ||
    flight.destination.city.toLowerCase().includes(term) ||
    flight.destination.iataCode.toLowerCase().includes(term) ||
    flight.plane.model.toLowerCase().includes(term)
  )
})

onMounted(async () => {
  loading.value = true
  try {
    const [flightsRes, airportsRes] = await Promise.all([
      fetch(`/api/flights?include=relations`),
      fetch(`/api/airports`)
    ])

    if (flightsRes.ok && airportsRes.ok) {
      allFlights.value = await flightsRes.json()
      allAirports.value = await airportsRes.json()
    } else {
      console.error('API Error:', flightsRes.status, airportsRes.status)
    }
  } catch (error) {
    console.error('Failed to load flights:', error)
  } finally {
    loading.value = false
  }
})

const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('de-DE', {
  hour: '2-digit',
  minute: '2-digit'
})

const calculateDuration = (flight) => {
  const departure = new Date(flight.departureTime)
  const arrival = new Date(flight.arrivalTime)
  const diff = arrival - departure
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}

const calculatePrice = (flight) => Math.floor(Math.random() * 200) + 50

const searchFlights = () => {
  if (!searchParams.value.departure || !searchParams.value.arrival || !searchParams.value.date) {
    alert('Bitte füllen Sie alle Felder aus!')
    return
  }
  searched.value = true
  showAll.value = false
  selectedFlight.value = null
}

const showAllFlights = () => {
  showAll.value = true
  allFlightsSearch.value = ''
  searched.value = false
  selectedFlight.value = null
}

const selectFlight = (flight) => {
  selectedFlight.value = flight
}

const saveFlightSelection = () => {
  if (selectedFlight.value) {
    sessionStorage.setItem('selectedFlight', JSON.stringify({
      flight: selectedFlight.value,
      date: searchParams.value.date,
      passengers: searchParams.value.passengers,
      totalPrice: calculatePrice(selectedFlight.value) * searchParams.value.passengers
    }))
  }
}
</script>

<style scoped>
</style>
