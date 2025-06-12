<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(() => {
  const raw = localStorage.getItem('formData')
  if (raw) data.value = JSON.parse(raw)
})
</script>

<template>
		<div>
				<div v-if="data">
						<h3>Персональные данные</h3>
						<p><strong>{{ data.parent.name }}</strong>, {{ data.parent.age }} лет</p>

						<h4>Дети</h4>
						<div v-for="child in data.children" :key="child.id" style="margin-bottom: 1rem; background: #f2f2f2; padding: 0.5rem;">
								<strong>{{ child.name }}</strong>, {{ child.age }} лет
						</div>
				</div>
		</div>
</template>