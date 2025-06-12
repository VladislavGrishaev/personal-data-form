<script setup>
import { ref } from 'vue'
import { useChildrenStorage } from "../../../composables/useChildrenStorage.js"
import { useFormValidation } from "../../../composables/useFormValidation.js"

const props = defineProps({
  children: Array,
  invalid: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:children'])
const inputRefs = ref([])

function setInputRef(el, index) {
  if (el) inputRefs.value[index] = el
}

const { addChild, removeChild } = useChildrenStorage(() => props.children, emit)
const { validatePerson } = useFormValidation()

</script>


<template>
		<div class="childs-info">

				<div class="childs-info__form">
						<div class="childs-info__head">
							<h2 class="childs-info__title">Дети (макс. 5)</h2>
								<button
												v-if="children.length < 5"
												@click="addChild"
												class="childs-info__add-child"
												type="button"
								>
									Добавить ребенка
								</button>
						</div>
						<div
										v-for="(child, index) in children" :key="child.id"
										class="childs-info__child-wrap"
						>
								<label class="childs-info__label label-form">
										<span class="childs-info__title-field title-field">
											Имя
										</span>
										<input
														v-model="child.name"
														@input="child.touched = true"
														:ref="el => setInputRef(el, index)"
														type="text"
														:class="{ 'active-error': invalid && child.touched && !validatePerson(child).validName }"
														class="childs-info__input input-form"
														name="name"
										/>
								</label>

								<label class="childs-info__label label-form">
										<span class="childs-info__title-field title-field">
											Возраст
										</span>
										<input
														v-model.number="child.age"
														@input="child.touched = true"
														type="number"
														:class="{ 'active-error': invalid && child.touched && !validatePerson(child).validAge }"
														class="childs-info__input input-form"
														name="age"
										/>
								</label>

								<button
												@click="removeChild(child.id)"
												type="button"
												class="childs-info__remove-child"
								>Удалить
								</button>
						</div>


				</div>
		</div>
</template>

<style lang="scss">
@use "ChildrenForm.module";
</style>