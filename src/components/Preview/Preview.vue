<script setup>
import {ref, onMounted} from 'vue'

const data = ref(null)

onMounted(() => {
  const raw = localStorage.getItem('formData')
  if (raw) data.value = JSON.parse(raw)
})
</script>

<template>
		<div v-if="data" class="preview-info">

				<div class="preview-info__info-user">
						<h2 class="preview-info__title">Персональные данные</h2>
						<p class="preview-info__text">
								{{ data.parent.name }},
								<span>{{ data.parent.age }}</span>
								лет
						</p>
				</div>

				<div class="preview-info__info-childs">
						<h2 class="preview-info__title">Дети</h2>
						<ul
										v-if="data.children.length > 0"
										class="preview-info__list">
								<li v-for="child in data.children"
								    :key="child.id">
										<span class="preview-info__item">{{ child.name }}, <span>{{ child.age }}</span> лет</span>
								</li>
						</ul>
						<p v-else class="preview-info__text">Ничего не добавлено</p>
				</div>

		</div>
</template>

<style lang="scss">
@use "Preview.module";
</style>