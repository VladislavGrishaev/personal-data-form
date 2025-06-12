<script setup>
defineOptions({ name: 'FormPage' })
import { useRouter } from 'vue-router'
import { useFormStorage } from '../../../composables/useFormStorage.js'
import ParentForm from '../ParentForm/ParentForm.vue'
import ChildrenForm from '../ChildrenForm/ChildrenForm.vue'

const router = useRouter()
const { parent, children, save } = useFormStorage()

function goToPreview() {
  const isParentValid = parent.value.name.trim() !== '' && parent.value.age >= 0 && parent.value.age <= 100
  const areChildrenValid = children.value.every(c => c.name.trim() !== '' && typeof c.age === 'number' && c.age >= 0 && c.age <= 100)

  if (!isParentValid || !areChildrenValid) {
    alert('Проверьте правильность ввода данных: возраст от 0 до 100, имя не должно быть пустым')
    return
  }

  save()
  router.push('/preview')
}
</script>

<template>
		<div class="form-layout">
				<ParentForm
								v-model:name="parent.name"
								v-model:age="parent.age" />
				<ChildrenForm
								v-model:children="children" />

				<button
								@click="goToPreview"
								type="button"
								class="form-layout__save-data"
				>Сохранить
				</button>
		</div>
</template>

<style lang="scss">
@use "FormLayout.module";
</style>