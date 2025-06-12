<script setup>
</script>


<template>
		<header class="header">
				<div class="header__logo">
						<img src="../../../assets/images/logo.png" width="93" height="29" alt="Logo">
				</div>
				<nav class="header__nav">
						<router-link
										to="/"
										class="header__nav-link">Форма
						</router-link>
						<router-link
										to="/preview"
										class="header__nav-link">Превью
						</router-link>
				</nav>
		</header>
</template>

<style lang="scss">
@use "Header.module";
</style>
