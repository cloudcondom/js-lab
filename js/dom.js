export const elements = {
  eventForm: document.querySelector('#eventForm'),
  titleInput: document.querySelector('#titleInput'),
  dateInput: document.querySelector('#dateInput'),
  timeInput: document.querySelector('#timeInput'),
  categoryInput: document.querySelector('#categoryInput'),
  descriptionInput: document.querySelector('#descriptionInput'),

  searchInput: document.querySelector('#searchInput'),
  filterCategory: document.querySelector('#filterCategory'),
  sortSelect: document.querySelector('#sortSelect'),

  eventsList: document.querySelector('#eventsList'),
  emptyMessage: document.querySelector('#emptyMessage'),
  eventCounter: document.querySelector('#eventCounter'),

  modalOverlay: document.querySelector('#modalOverlay'),
  closeModal: document.querySelector('#closeModal'),
  editForm: document.querySelector('#editForm'),
  editId: document.querySelector('#editId'),
  editTitle: document.querySelector('#editTitle'),
  editDate: document.querySelector('#editDate'),
  editTime: document.querySelector('#editTime'),
  editCategory: document.querySelector('#editCategory'),
  editDescription: document.querySelector('#editDescription'),
};

export const addFormErrors = {
  title: document.querySelector('#titleError'),
  date: document.querySelector('#dateError'),
  time: document.querySelector('#timeError'),
  category: document.querySelector('#categoryError'),
};

export const editFormErrors = {
  title: document.querySelector('#editTitleError'),
  date: document.querySelector('#editDateError'),
  time: document.querySelector('#editTimeError'),
  category: document.querySelector('#editCategoryError'),
};

export function renderEvents(events) {
  elements.eventsList.innerHTML = '';
  elements.eventCounter.textContent = getCounterText(events.length);
  elements.emptyMessage.classList.toggle('hidden', events.length > 0);

  events.forEach((event) => {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.dataset.id = event.id;

    const title = document.createElement('h3');
    title.textContent = event.title;

    const category = document.createElement('span');
    category.className = 'category';
    category.textContent = event.category;

    const meta = document.createElement('p');
    meta.className = 'event-meta';
    meta.textContent = `${formatDate(event.date)} в ${event.time}`;

    const description = document.createElement('p');
    description.textContent = event.description || 'Описание не добавлено.';

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const editButton = document.createElement('button');
    editButton.className = 'secondary-btn';
    editButton.type = 'button';
    editButton.textContent = 'Редактировать';
    editButton.dataset.action = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'danger-btn';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Удалить';
    deleteButton.dataset.action = 'delete';

    actions.append(editButton, deleteButton);
    card.append(title, category, meta, description, actions);
    elements.eventsList.append(card);
  });
}

export function openEditModal(event) {
  elements.editId.value = event.id;
  elements.editTitle.value = event.title;
  elements.editDate.value = event.date;
  elements.editTime.value = event.time;
  elements.editCategory.value = event.category;
  elements.editDescription.value = event.description;
  elements.modalOverlay.classList.remove('hidden');
}

export function closeEditModal() {
  elements.modalOverlay.classList.add('hidden');
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}

function getCounterText(count) {
  if (count === 1) return '1 событие';
  if (count >= 2 && count <= 4) return `${count} события`;
  return `${count} событий`;
}
