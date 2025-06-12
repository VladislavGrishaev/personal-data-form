<script setup>
import { ref } from 'vue'
import { useFormStorage } from '../../../composables/useFormStorage.js'
import ParentForm from '../ParentForm/ParentForm.vue'
import ChildrenForm from '../ChildrenForm/ChildrenForm.vue'

defineOptions({ name: 'FormPage' })
const { parent, children, save } = useFormStorage()
const showErrors = ref(false)
const isSaved = ref(false)
let saveMessageTimeout = null


function markChildrenTouched() {
  children.value.forEach(c => {
    c.touched = true
  })
}


function onSaveClick() {
  showErrors.value = true
  isSaved.value = false

  markChildrenTouched()

  const isParentValid =
    parent.value.name.trim() !== '' &&
    typeof parent.value.age === 'number' &&
    parent.value.age >= 0 &&
    parent.value.age <= 100

  const areChildrenValid = children.value.every(c =>
    c.name.trim() !== '' &&
    typeof c.age === 'number' &&
    c.age >= 0 &&
    c.age <= 100
  )

  if (!isParentValid || !areChildrenValid) {
    return
  }

  save() // сохраняем в localStorage только здесь

  isSaved.value = true

  clearTimeout(saveMessageTimeout)
  saveMessageTimeout = setTimeout(() => {
    isSaved.value = false
  }, 1500)
}


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