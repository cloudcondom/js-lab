/**
 * @module index
 * @description 
 */

import {
  addTransaction,
  removeTransaction,
  calculateTotal,
  transactions,
} from "./transactions.js";

import {
  renderTransaction,
  removeTransactionRow,
  updateTotal,
  showDetails,
  hideDetails,
  showError,
  clearErrors,
} from "./ui.js";

//Инициализация: начальные данные

const initialData = [
  { amount: 50000, category: "Зарплата", description: "Зарплата за апрель 2026 года" },
  { amount: -1200, category: "Еда", description: "Продукты в супермаркете Линелла" },
  { amount: -3500, category: "Транспорт", description: "Проездной на месяц" },
];

initialData.forEach(({ amount, category, description }) => {
  const t = addTransaction(amount, category, description);
  renderTransaction(t);
});

updateTotal(calculateTotal());

//Обработчик формы

const form = document.getElementById("transaction-form");

/**
 * 
 * @returns {boolean}
 */
function validateForm() {
  clearErrors();
  let valid = true;

  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  if (!amount || isNaN(Number(amount)) || Number(amount) === 0) {
    showError("amount", "Введите ненулевую числовую сумму");
    valid = false;
  }
  if (!category) {
    showError("category", "Выберите категорию");
    valid = false;
  }
  if (!description) {
    showError("description", "Введите описание");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  const transaction = addTransaction(amount, category, description);
  renderTransaction(transaction);
  updateTotal(calculateTotal());
  hideDetails();
  form.reset();
  clearErrors();
});

// ─── Делегирование событий на таблице

const table = document.getElementById("transactions-table");

/**
 * @param {MouseEvent} e - Событие клика.
 */
table.addEventListener("click", (e) => {
  // Удаление транзакции
  const deleteBtn = e.target.closest(".btn-delete");
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    removeTransaction(id);
    removeTransactionRow(id);
    updateTotal(calculateTotal());
    hideDetails();
    return;
  }

  const row = e.target.closest("tr[data-id]");
  if (row) {
    const id = row.dataset.id;
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) showDetails(transaction);
  }
});
