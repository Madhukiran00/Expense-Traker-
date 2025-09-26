const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses on page load
renderExpenses();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;
  const date = document.getElementById("expense-date").value;

  if (!name || !amount || !category || !date) return;

  const expense = { id: Date.now(), name, amount, category, date };
  expenses.push(expense);

  saveAndRender();
  form.reset();
});

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach(expense => {
    total += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.name} - ₹${expense.amount} 
      <small>(${expense.category}, ${expense.date})</small></span>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}
