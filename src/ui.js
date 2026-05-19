/**
 * @module ui
 * @description
 */

import { truncateWords } from "./utils.js";

/**
 
 * @param {import('./transactions.js').Transaction} transaction
 * @returns {void}
 */
export function renderTransaction(transaction) {
  const tbody = document.querySelector("#transactions-table tbody");
  const tr = document.createElement("tr");

  tr.dataset.id = transaction.id;
  tr.classList.add(transaction.amount >= 0 ? "income" : "expense");

  tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${truncateWords(transaction.description)}</td>
    <td><button class="btn-delete" data-id="${transaction.id}">✕</button></td>
  `;

  tbody.appendChild(tr);
}

/**
 
 * @param {string} id 
 * @returns {void}
 */
export function removeTransactionRow(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
}

/**
 * 
 * @param {number} total
 * @returns {void}
 */
export function updateTotal(total) {
  const el = document.getElementById("total");
  el.textContent = `${total >= 0 ? "+" : ""}${total.toFixed(2)} MDL`;
  el.className = total >= 0 ? "total-positive" : "total-negative";
}

/**
 * @param {import('./transactions.js').Transaction} transaction
 * @returns {void}
 */
export function showDetails(transaction) {
  const block = document.getElementById("details");
  block.innerHTML = `
    <strong>Детали транзакции</strong><br>
    <span>ID:</span> ${transaction.id}<br>
    <span>Дата:</span> ${transaction.date}<br>
    <span>Категория:</span> ${transaction.category}<br>
    <span>Сумма:</span> ${transaction.amount >= 0 ? "+" : ""}${transaction.amount} MDL<br>
    <span>Описание:</span> ${transaction.description}
  `;
  block.classList.add("visible");
}

/**
 * @returns {void}
 */
export function hideDetails() {
  const block = document.getElementById("details");
  block.classList.remove("visible");
  block.innerHTML = "";
}

/**
 * @param {string} fieldId
 * @param {string} message
 * @returns {void}
 */
export function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  let err = field.parentElement.querySelector(".error-msg");
  if (!err) {
    err = document.createElement("span");
    err.className = "error-msg";
    field.parentElement.appendChild(err);
  }
  err.textContent = message;
  field.classList.add("invalid");
}

/**
 */
export function clearErrors() {
  document.querySelectorAll(".error-msg").forEach((e) => e.remove());
  document.querySelectorAll(".invalid").forEach((e) =>
    e.classList.remove("invalid")
  );
}
