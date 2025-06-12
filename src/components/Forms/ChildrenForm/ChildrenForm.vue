<script setup>
import {nextTick, ref, watch} from 'vue'

const props = defineProps({
  children: Array
})

const emit = defineEmits(['update:children'])
const inputRefs = ref([])

function setInputRef(el, index) {
  if (el) inputRefs.value[index] = el
}

function addChild() {
  const newChildren = [...props.children, {id: Date.now() + Math.random(), name: '', age: null}]
  emit('update:children', newChildren)
  nextTick(() => {
    const lastInput = inputRefs.value[newChildren.length - 1]
    lastInput?.focus()
  })
}

function removeChild(id) {
  const updated = props.children.filter(child => child.id !== id)
  emit('update:children', updated)
}
</script>

<template>
		<div class="childs-info">

				<div class="childs-info__form">
						<div class="childs-info__head">
							<h3 class="childs-info__title">Дети (макс. 5)</h3>
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
														:ref="el => setInputRef(el, index)"
														type="text"
														:class="{ 'active-error': child.name.trim() === '' }"
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
														type="number"
														:class="{ 'active-error': child.age < 0 || child.age > 100 }"
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