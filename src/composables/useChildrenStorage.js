export function useChildrenStorage(getChildren, emit) {
  function addChild() {
    const newChildren = [...getChildren(), { id: Date.now() + Math.random(), name: '', age: null, touched: false }]
    emit('update:children', newChildren)
  }

  function removeChild(id) {
    const updated = getChildren().filter(c => c.id !== id)
    emit('update:children', updated)
  }
  return {
    addChild,
    removeChild
  }
}
