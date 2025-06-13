<script setup>
import { ref, onMounted } from 'vue'
import { useFormStorage } from '../../../composables/useFormStorage.js'
import { useFormValidation } from '../../../composables/useFormValidation.js'
import ParentForm from '../ParentForm/ParentForm.vue'
import ChildrenForm from '../ChildrenForm/ChildrenForm.vue'

defineOptions({ name: 'FormPage' })
const { parent, children, save } = useFormStorage()
const { isPersonValid, arePeopleValid } = useFormValidation()
const showErrors = ref(false)
const isSaved = ref(false)
let saveMessageTimeout = null
let lastSavedChildren = ''
let lastSavedParent = ''

function markChildrenTouched() {
  children.value.forEach(c => {
    c.touched = true
  })
}

function showSavedMessage() {
  const validChildren = children.value.filter(c => isPersonValid(c))
  const serializedChildren = JSON.stringify(validChildren)
  const serializedParent = JSON.stringify(parent.value)

  if (serializedChildren === lastSavedChildren && serializedParent === lastSavedParent) return

  save()
  lastSavedChildren = serializedChildren
  lastSavedParent = serializedParent

  isSaved.value = true
  clearTimeout(saveMessageTimeout)
  saveMessageTimeout = setTimeout(() => {
    isSaved.value = false
  }, 1500)
}

function onSaveClick() {
  showErrors.value = true
  isSaved.value = false

  markChildrenTouched()
  if (!isPersonValid(parent.value) || !arePeopleValid(children.value)) {
    return
  }
  showSavedMessage()
}

onMounted(() => {
  lastSavedChildren = JSON.stringify(children.value.filter(c => isPersonValid(c)))
  lastSavedParent = JSON.stringify(parent.value)
})
</script>

<template>
		<div class="form-layout">
				<ParentForm
								v-model:name="parent.name"
								v-model:age="parent.age"
								:invalid="showErrors"
				/>
				<ChildrenForm
								v-model:children="children"
								:invalid="showErrors"
								@children:changed="showSavedMessage"
				/>

				<span v-if="isSaved" class="active-valid">Данные успешно сохранены</span>

				<button
								@click="onSaveClick"
								type="button"
								class="form-layout__save-data"
				>Сохранить
				</button>
		</div>
</template>

<style lang="scss">
@use "FormLayout.module";
</style>