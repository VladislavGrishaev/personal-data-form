<script setup>
import { toRef } from 'vue'
import { useFormValidation } from "../../../composables/useFormValidation.js"


const name = defineModel('name')
const age = defineModel('age')

const props = defineProps({
  invalid: {
    type: Boolean,
    default: false
  }
})

const { usePersonErrors } = useFormValidation()
const { nameError, ageError } = usePersonErrors(
  toRef({ name }, 'name'),
  toRef({ age }, 'age'),
  toRef(props, 'invalid')
)
</script>

<template>
		<div class="user-info">
				<h2 class="user-info__title">Персональные данные</h2>

				<div class="user-info__form">
						<label class="user-info__label label-form">
								<span class="user-info__title-field title-field">Имя</span>
								<input
												v-model="name"
												type="text"
												:class="{ 'active-error': nameError }"
												class="user-info__input input-form"
												name="name"
								/>
						</label>

						<label class="user-info__label label-form">
								<span class="user-info__title-field title-field">Возраст</span>
								<input
												v-model.number="age"
												type="number"
												:class="{ 'active-error': ageError }"
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
