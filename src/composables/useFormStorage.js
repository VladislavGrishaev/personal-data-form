import { ref } from 'vue'

const STORAGE_KEY = 'formData'

export function useFormStorage() {
  const parent = ref({ name: '', age: null })
  const children = ref([])

  const load = () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      parent.value = data.parent || { name: '', age: null }
      children.value = data.children || []
    }
  }

  const save = () => {
    const validChildren = children.value.filter(c =>
      c.name.trim() !== '' && typeof c.age === 'number' && c.age >= 0 && c.age <= 100
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ parent: parent.value, children: validChildren }))
  }



  load()

  return { parent, children, save }
}