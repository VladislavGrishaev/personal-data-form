import { useFormValidation } from './useFormValidation.js'

export function useChildrenStorage(getChildren, emit) {
  const { validatePerson } = useFormValidation()

  function updateLocalStorage(updatedChildren) {
    const raw = localStorage.getItem('formData')
    if (!raw) return
    const parsed = JSON.parse(raw)
    parsed.children = updatedChildren
    localStorage.setItem('formData', JSON.stringify(parsed))
  }

  function addChild() {
    const newChildren = [
      ...getChildren(),
      {
        id: Date.now() + Math.random(),
        name: '',
        age: null,
        touched: false
      }
    ]
    emit('update:children', newChildren)
  }

  function removeChild(id) {
    const updated = getChildren().filter(c => c.id !== id)
    emit('update:children', updated)

    const validForStorage = updated.filter(child => {
      const { validName, validAge } = validatePerson(child)
      return validName && validAge
    })
    updateLocalStorage(validForStorage)
  }

  return {
    addChild,
    removeChild
  }
}
