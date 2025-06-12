export function useInputLimiter(modelRef, { maxLength = 3 } = {}) {
  function onInput(e) {
    let raw = e.target.value.replace(/\D/g, '')

    if (raw.length > maxLength) raw = raw.slice(0, maxLength)

    modelRef.value = raw === '' ? null : Number(raw)
    e.target.value = raw
  }
  return { onInput }
}
