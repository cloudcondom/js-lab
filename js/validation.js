export function validateEvent({ title, date, time, category }) {
  const errors = {};

  if (!title.trim()) {
    errors.title = 'Введите название события.';
  } else if (title.trim().length < 3) {
    errors.title = 'Название должно содержать минимум 3 символа.';
  }

  if (!date) {
    errors.date = 'Выберите дату.';
  }

  if (!time) {
    errors.time = 'Выберите время.';
  }

  if (!category) {
    errors.category = 'Выберите категорию.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function clearErrors(errorElements) {
  Object.values(errorElements).forEach((element) => {
    element.textContent = '';
  });
}

export function showErrors(errors, errorElements) {
  clearErrors(errorElements);

  Object.entries(errors).forEach(([field, message]) => {
    if (errorElements[field]) {
      errorElements[field].textContent = message;
    }
  });
}
