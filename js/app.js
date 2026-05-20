import { loadEvents } from './data.js';
import { initEvents } from './events.js';

const events = loadEvents();
initEvents(events);
