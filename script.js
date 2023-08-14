document.addEventListener("DOMContentLoaded", function () {
  const expenseTable = document.getElementById("expenseTable");
  const expenseForm = document.getElementById("addExpenseBtn");
  const totalAmount = document.getElementById("totalAmount");
  const expenseName = document.getElementById("expenseName");
  const expenseAmount = document.getElementById("expenseAmount");
  const expenseDate = document.getElementById("expenseDate");
  const expenseCategory = document.getElementById("expenseCategory");

  // Load saved expenses from Local Storage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function updateExpenseTable() {
    // Clear existing table rows
    while (expenseTable.rows.length > 1) {
      expenseTable.deleteRow(1);
    }

    let total = 0;

    expenses.forEach((expense, index) => {
      const row = expenseTable.insertRow();
      const nameCell = row.insertCell(0);
      const amountCell = row.insertCell(1);
      const dateCell = row.insertCell(2);
      const categoryCell = row.insertCell(3);
      const editCell = row.insertCell(4);
      const deleteCell = row.insertCell(5);

      nameCell.textContent = expense.name;
      amountCell.textContent = expense.amount;
      dateCell.textContent = expense.date;
      categoryCell.textContent = expense.category;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editExpense(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteExpense(index));

      editCell.appendChild(editBtn);
      deleteCell.appendChild(deleteBtn);

      total += parseFloat(expense.amount);
    });

    totalAmount.textContent = `Total Amount: ${total.toFixed(2)}`;
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function addExpense() {
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    const date = expenseDate.value;
    const category = expenseCategory.value;

    if (name && !isNaN(amount) && date && category) {
      expenses.push({ name, amount, date, category });
      saveExpenses();
      updateExpenseTable();
      expenseName.value = "";
      expenseAmount.value = "";
      expenseDate.value = "";
      expenseCategory.value = "Food"; // Set default category
    }
  }

  function editExpense(index) {
    const expense = expenses[index];
    expenseName.value = expense.name;
    expenseAmount.value = expense.amount;
    expenseDate.value = expense.date;
    expenseCategory.value = expense.category;

    // Remove the edited expense from the list
    expenses.splice(index, 1);

    // Update the table and Local Storage
    saveExpenses();
    updateExpenseTable();
  }

  function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    updateExpenseTable();
  }

  expenseForm.addEventListener("click", addExpense);

  // Initial table population
  updateExpenseTable();

  // Search
  const searchExpense = document.getElementById("searchExpense");
  const searchBtn = document.getElementById("searchBtn");

  function filterExpensesByName(name) {
    return expenses.filter((expense) =>
      expense.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  function updateFilteredTable(filteredExpenses) {
    while (expenseTable.rows.length > 1) {
      expenseTable.deleteRow(1);
    }

    let total = 0;

    filteredExpenses.forEach((expense, index) => {
      const row = expenseTable.insertRow();
      const nameCell = row.insertCell(0);
      const amountCell = row.insertCell(1);
      const dateCell = row.insertCell(2);
      const categoryCell = row.insertCell(3);
      const editCell = row.insertCell(4);
      const deleteCell = row.insertCell(5);

      nameCell.textContent = expense.name;
      amountCell.textContent = expense.amount;
      dateCell.textContent = expense.date;
      categoryCell.textContent = expense.category;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editExpense(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteExpense(index));

      editCell.appendChild(editBtn);
      deleteCell.appendChild(deleteBtn);
      total += parseFloat(expense.amount);
    });

    totalAmount.textContent = `Total Amount: ${total.toFixed(2)}`;
  }

  searchBtn.addEventListener("click", () => {
    const searchText = searchExpense.value;
    if (searchText.trim() === "") {
      updateExpenseTable();
    } else {
      const filteredExpenses = filterExpensesByName(searchText);
      updateFilteredTable(filteredExpenses);
    }
  });
});
