const STORAGE_KEY = 'schedulePlannerEvents';

const defaultEvents = [
  {
    id: crypto.randomUUID(),
    title: 'Лекция по JavaScript',
    date: '2026-05-22',
    time: '10:00',
    category: 'Учёба',
    description: 'Повторить DOM, события и модули.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Командная встреча',
    date: '2026-05-24',
    time: '14:30',
    category: 'Работа',
    description: 'Обсуждение задач на неделю.'
  }
];

export function loadEvents() {
  const savedEvents = localStorage.getItem(STORAGE_KEY);

  if (!savedEvents) {
    saveEvents(defaultEvents);
    return defaultEvents;
  }

  try {
    return JSON.parse(savedEvents);
  } catch {
    saveEvents(defaultEvents);
    return defaultEvents;
  }
}

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
