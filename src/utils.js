/**
 * @module utils
 * @description
 */

/**
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**

 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${d}.${m}.${y} ${h}:${min}`;
}

/**
 * @param {string} text
 * @param {number} [n=4]
 * @returns {string}
 */
export function truncateWords(text, n = 4) {
  const words = text.trim().split(/\s+/);
  if (words.length <= n) return text;
  return words.slice(0, n).join(" ") + "…";
}
