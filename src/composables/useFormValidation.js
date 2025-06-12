import {computed} from "vue";

export function useFormValidation() {
  function isPersonValid(person) {
    return (
      typeof person.name === 'string' &&
      person.name.trim() !== '' &&
      typeof person.age === 'number' &&
      person.age >= 0 &&
      person.age <= 100
    )
  }

  function arePeopleValid(peopleArray) {
    return Array.isArray(peopleArray) && peopleArray.every(isPersonValid)
  }

  function usePersonErrors(nameRef, ageRef, invalidRef) {
    const nameError = computed(() => invalidRef.value && nameRef.value.trim() === '')
    const ageError = computed(() =>
      invalidRef.value &&
      (
        nameRef.value.trim() === '' ||
        typeof ageRef.value !== 'number' ||
        ageRef.value < 0 ||
        ageRef.value > 100
      )
    )
    return { nameError, ageError }
  }

  return {
    isPersonValid,
    arePeopleValid,
    usePersonErrors
  }
}
