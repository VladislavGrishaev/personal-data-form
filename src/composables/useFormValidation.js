import { computed } from "vue";

export function useFormValidation() {
  function validatePerson({ name, age }) {
    const validName = typeof name === 'string' && name.trim() !== '';
    const validAge = typeof age === 'number' && age >= 0 && age <= 100;
    return {
      validName,
      validAge,
      isValid: validName && validAge
    };
  }

  function isPersonValid(person) {
    return validatePerson(person).isValid;
  }

  function arePeopleValid(peopleArray) {
    return Array.isArray(peopleArray) && peopleArray.every(isPersonValid);
  }

  function usePersonErrors(nameRef, ageRef, invalidRef) {
    return {
      nameError: computed(() => {
        if (!invalidRef.value) return false;
        return !validatePerson({ name: nameRef.value, age: ageRef.value }).validName;
      }),
      ageError: computed(() => {
        if (!invalidRef.value) return false;
        return !validatePerson({ name: nameRef.value, age: ageRef.value }).validAge;
      })
    };
  }

  return {
    validatePerson,
    isPersonValid,
    arePeopleValid,
    usePersonErrors
  };
}
