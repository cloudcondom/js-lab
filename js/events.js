import { elements, addFormErrors, editFormErrors, renderEvents, openEditModal, closeEditModal } from './dom.js';
import { validateEvent, showErrors, clearErrors } from './validation.js';
import { saveEvents } from './data.js';

let events = [];

export function initEvents(initialEvents) {
  events = initialEvents;
  bindEvents();
  updateView();
}

function bindEvents() {
  elements.eventForm.addEventListener('submit', handleAddEvent);
  elements.editForm.addEventListener('submit', handleEditEvent);
  elements.eventsList.addEventListener('click', handleListClick);
  elements.searchInput.addEventListener('input', updateView);
  elements.filterCategory.addEventListener('change', updateView);
  elements.sortSelect.addEventListener('change', updateView);
  elements.closeModal.addEventListener('click', closeEditModal);
  elements.modalOverlay.addEventListener('click', (event) => {
    if (event.target === elements.modalOverlay) closeEditModal();
  });
}

function handleAddEvent(event) {
  event.preventDefault();

  const newEvent = {
    id: crypto.randomUUID(),
    title: elements.titleInput.value,
    date: elements.dateInput.value,
    time: elements.timeInput.value,
    category: elements.categoryInput.value,
    description: elements.descriptionInput.value.trim()
  };

  const validation = validateEvent(newEvent);

  if (!validation.isValid) {
    showErrors(validation.errors, addFormErrors);
    return;
  }

  clearErrors(addFormErrors);
  events.push({ ...newEvent, title: newEvent.title.trim() });
  saveEvents(events);
  elements.eventForm.reset();
  updateView();
}

function handleEditEvent(event) {
  event.preventDefault();

  const updatedEvent = {
    id: elements.editId.value,
    title: elements.editTitle.value,
    date: elements.editDate.value,
    time: elements.editTime.value,
    category: elements.editCategory.value,
    description: elements.editDescription.value.trim()
  };

  const validation = validateEvent(updatedEvent);

  if (!validation.isValid) {
    showErrors(validation.errors, editFormErrors);
    return;
  }

  clearErrors(editFormErrors);
  events = events.map((eventItem) =>
    eventItem.id === updatedEvent.id
      ? { ...updatedEvent, title: updatedEvent.title.trim() }
      : eventItem
  );

  saveEvents(events);
  closeEditModal();
  updateView();
}

function handleListClick(event) {
  const button = event.target.closest('button');
  const card = event.target.closest('.event-card');

  if (!button || !card) return;

  const eventId = card.dataset.id;
  const action = button.dataset.action;

  if (action === 'delete') {
    deleteEvent(eventId);
  }

  if (action === 'edit') {
    const selectedEvent = events.find((eventItem) => eventItem.id === eventId);
    if (selectedEvent) openEditModal(selectedEvent);
  }
}

function deleteEvent(id) {
  const isConfirmed = confirm('Удалить это событие?');
  if (!isConfirmed) return;

  events = events.filter((eventItem) => eventItem.id !== id);
  saveEvents(events);
  updateView();
}

function updateView() {
  const searchValue = elements.searchInput.value.toLowerCase().trim();
  const selectedCategory = elements.filterCategory.value;
  const sortValue = elements.sortSelect.value;

  let visibleEvents = events.filter((eventItem) => {
    const matchesSearch = eventItem.title.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === 'all' || eventItem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  visibleEvents = sortEvents(visibleEvents, sortValue);
  renderEvents(visibleEvents);
}

function sortEvents(eventsToSort, sortValue) {
  return [...eventsToSort].sort((first, second) => {
    if (sortValue === 'dateAsc') {
      return new Date(`${first.date}T${first.time}`) - new Date(`${second.date}T${second.time}`);
    }

    if (sortValue === 'dateDesc') {
      return new Date(`${second.date}T${second.time}`) - new Date(`${first.date}T${first.time}`);
    }

    if (sortValue === 'titleAsc') {
      return first.title.localeCompare(second.title, 'ru');
    }

    return 0;
  });
}
