<script setup>
import Header from './Header/Header.vue'
import Footer from './Footer/Footer.vue'
</script>

<template>
		<Header />
		<main class="container">
				<slot />
		</main>
		<Footer />
</template>