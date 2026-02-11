<template>
  <div class="home">
    <div class="hero-section">
      <h1>Willkommen bei Airlines</h1>
      <p>Buchen Sie Ihre nächste Reise einfach und schnell</p>
      <div class="hero-buttons">
        <router-link to="/search" class="btn-primary">Flüge Suchen</router-link>
      </div>
    </div>

    <div class="how-it-works">
      <h2>So funktioniert es</h2>
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Suchen</h3>
          <p>Geben Sie Ihren Abflugort, Zielort und Datum ein</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Vergleichen</h3>
          <p>Vergleichen Sie verfügbare Flüge und Preise</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Buchen</h3>
          <p>Wählen Sie einen Flug und geben Sie Ihre Daten ein</p>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <h2>Bereit für Ihre nächste Reise?</h2>
      <p>Suchen Sie jetzt nach den besten Flugtickets</p>
      <router-link to="/search" class="btn-large">Jetzt Flug buchen</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
