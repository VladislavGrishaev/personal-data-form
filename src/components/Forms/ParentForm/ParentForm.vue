<script setup>
defineProps({
  name: String,
  age: Number,
  invalid: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:name', 'update:age'])
</script>

<template>
		<div class="user-info">
				<h2 class="user-info__title">Персональные данные</h2>

				<div class="user-info__form">
						<label class="user-info__label label-form">
						<span class="user-info__title-field title-field">
								Имя
						</span>
								<input
												@input="$emit('update:name', $event.target.value)"
												:value="name"
												type="text"
												:class="{ 'active-error': invalid && name.trim() === '' }"
												class="user-info__input input-form"
												name="name"
								/>
						</label>
						<label class="user-info__label label-form">
						<span class="user-info__title-field title-field">
								Возраст
						</span>
								<input
												@input="$emit('update:age', Number($event.target.value))"
												:value="age"
												type="number"
												:class="{ 'active-error': invalid && (name.trim() === '' || typeof age !== 'number' || age < 0 || age > 100) }"
												class="user-info__input input-form"
												name="age"
								/>
						</label>
				</div>
		</div>
</template>

<style lang="scss">
@use "ParentForm.module";
</style>