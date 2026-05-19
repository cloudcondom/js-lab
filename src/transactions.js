/**
 * @module transactions
 * @description 
 */

import { generateId, formatDate } from "./utils.js";

/**
 * @typedef {Object} Transaction
 * @property {string} id 
 * @property {string} date
 * @property {number} amount
 * @property {string} category
 * @property {string} description
 */

/** @type {Transaction[]} */
export let transactions = [];

/**
 * @param {number} amount
 * @param {string} category
 * @param {string} description
 * @returns {Transaction}
 */
export function addTransaction(amount, category, description) {
  const transaction = {
    id: generateId(),
    date: formatDate(new Date()),
    amount: Number(amount),
    category,
    description,
  };
  transactions.push(transaction);
  return transaction;
}

/**
 * @param {string} id
 * @returns {void}
 */
export function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
}

/**
 * @returns {number}
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
