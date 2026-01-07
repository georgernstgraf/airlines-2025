<template>
  <div id="app">
    <!-- Navigationsleiste -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">✈️ Airlines</router-link>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/search" class="nav-link" active-class="active">Flüge Suchen</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/book" class="nav-link" active-class="active">Flüge Buchen</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hauptinhaltsbereich -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
