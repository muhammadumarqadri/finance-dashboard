// script.js

// ======================
// DATA STRUCTURE & STATE
// ======================

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];
let currency = localStorage.getItem('currency') || '₹';
let darkMode = localStorage.getItem('darkMode') === 'true';

// DOM Elements
const transactionForm = document.getElementById('transaction-form');
const transactionsTableBody = document.querySelector('#transactions-table tbody');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');
const currencySelect = document.getElementById('currency');
const themeToggle = document.getElementById('theme-toggle');
const addBudgetBtn = document.getElementById('add-budget-btn');
const budgetsContainer = document.getElementById('budgets-container');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalsContainer = document.getElementById('goals-container');
const exportJsonBtn = document.getElementById('export-json');
const exportCsvBtn = document.getElementById('export-csv');
const exportPdfBtn = document.getElementById('export-pdf');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Set currency
  currencySelect.value = currency;
  
  // Set theme
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Set default date to today
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  
  // Render initial data
  renderTransactions();
  updateSummary();
  renderBudgets();
  renderGoals();
  initCharts();
  
  // Event Listeners
  transactionForm.addEventListener('submit', handleAddTransaction);
  currencySelect.addEventListener('change', handleCurrencyChange);
  themeToggle.addEventListener('click', toggleTheme);
  addBudgetBtn.addEventListener('click', showAddBudgetForm);
  addGoalBtn.addEventListener('click', showAddGoalForm);
  exportJsonBtn.addEventListener('click', exportToJson);
  exportCsvBtn.addEventListener('click', exportToCsv);
  exportPdfBtn.addEventListener('click', exportToPdf);
});

// ======================
// TRANSACTION FUNCTIONS
// ======================

function handleAddTransaction(e) {
  e.preventDefault();
  
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  const paymentMethod = document.getElementById('payment-method').value;
  
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
    category,
    date,
    paymentMethod
  };
  
  transactions.push(transaction);
  saveTransactions();
  renderTransactions();
  updateSummary();
  renderBudgets(); // Update budgets when new transaction is added
  renderGoals(); // Update goals when new transaction is added (if needed)
  initCharts();
  
  // Reset form
  transactionForm.reset();
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

function renderTransactions() {
  transactionsTableBody.innerHTML = '';
  
  // Sort by date (newest first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>${currency}${transaction.amount.toFixed(2)}</td>
      <td class="${transaction.type}">${transaction.type}</td>
      <td>${transaction.paymentMethod}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </td>
    `;
    
    transactionsTableBody.appendChild(row);
  });
}

function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) return;
  
  document.getElementById('description').value = transaction.description;
  document.getElementById('amount').value = transaction.amount;
  document.getElementById('type').value = transaction.type;
  document.getElementById('category').value = transaction.category;
  document.getElementById('date').value = transaction.date;
  document.getElementById('payment-method').value = transaction.paymentMethod;
  
  // Remove the transaction to be edited
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  renderTransactions();
  updateSummary();
  renderBudgets();
  renderGoals();
  initCharts();
}

function deleteTransaction(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    renderTransactions();
    updateSummary();
    renderBudgets();
    renderGoals();
    initCharts();
  }
}

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ======================
// SUMMARY FUNCTIONS
// ======================

function updateSummary() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  totalIncomeEl.textContent = `${currency}${totalIncome.toFixed(2)}`;
  totalExpensesEl.textContent = `${currency}${totalExpenses.toFixed(2)}`;
  balanceEl.textContent = `${currency}${balance.toFixed(2)}`;
}

// ======================
// CURRENCY & THEME
// ======================

function handleCurrencyChange(e) {
  currency = e.target.value;
  localStorage.setItem('currency', currency);
  updateSummary();
  renderTransactions();
  renderBudgets();
  renderGoals();
}

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// ======================
// BUDGET FUNCTIONS
// ======================

function showAddBudgetForm() {
  const category = prompt('Enter budget category:');
  if (!category) return;
  
  const limit = parseFloat(prompt('Enter budget limit:'));
  if (isNaN(limit) || limit <= 0) {
    alert('Please enter a valid budget limit');
    return;
  }
  
  // Check if budget already exists for this category
  const existingBudget = budgets.find(b => b.category === category);
  if (existingBudget) {
    alert('Budget already exists for this category!');
    return;
  }
  
  const budget = {
    id: Date.now(),
    category,
    limit,
    spent: 0
  };
  
  budgets.push(budget);
  saveBudgets();
  renderBudgets();
}

function editBudget(id) {
  const budget = budgets.find(b => b.id === id);
  if (!budget) return;
  
  const newCategory = prompt('Edit category:', budget.category);
  if (!newCategory) return;
  
  const newLimit = parseFloat(prompt('Edit limit:', budget.limit));
  if (isNaN(newLimit) || newLimit <= 0) {
    alert('Please enter a valid budget limit');
    return;
  }
  
  // If category changed, check if new category already has a budget
  if (newCategory !== budget.category) {
    const existingBudget = budgets.find(b => b.category === newCategory && b.id !== id);
    if (existingBudget) {
      alert('Budget already exists for this category!');
      return;
    }
  }
  
  budget.category = newCategory;
  budget.limit = newLimit;
  
  saveBudgets();
  renderBudgets();
}

function renderBudgets() {
  budgetsContainer.innerHTML = '';
  
  budgets.forEach(budget => {
    // Calculate spent amount for this budget category
    budget.spent = transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const percentage = budget.limit > 0 ? Math.min(100, (budget.spent / budget.limit) * 100) : 0;
    
    // Determine progress bar color based on percentage
    let progressBarColor = '#4CAF50'; // Green
    if (percentage > 80) progressBarColor = '#FF9800'; // Orange
    if (percentage > 100) progressBarColor = '#F44336'; // Red
    
    const budgetEl = document.createElement('div');
    budgetEl.className = 'budget-item';
    budgetEl.innerHTML = `
      <div>
        <h3>${budget.category}</h3>
        <p>${currency}${budget.spent.toFixed(2)} spent of ${currency}${budget.limit.toFixed(2)} budget</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%; background-color: ${progressBarColor}"></div>
        </div>
      </div>
      <div>
        <button class="action-btn edit-btn" onclick="editBudget(${budget.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteBudget(${budget.id})">Delete</button>
      </div>
    `;
    
    budgetsContainer.appendChild(budgetEl);
  });
}

function deleteBudget(id) {
  if (confirm('Are you sure you want to delete this budget?')) {
    budgets = budgets.filter(b => b.id !== id);
    saveBudgets();
    renderBudgets();
  }
}

function saveBudgets() {
  localStorage.setItem('budgets', JSON.stringify(budgets));
}

// ======================
// GOAL FUNCTIONS
// ======================

function showAddGoalForm() {
  const name = prompt('Enter goal name:');
  if (!name) return;
  
  const target = parseFloat(prompt('Enter target amount:'));
  if (isNaN(target) || target <= 0) {
    alert('Please enter a valid target amount');
    return;
  }
  
  const saved = parseFloat(prompt('Enter amount already saved (optional):')) || 0;
  if (isNaN(saved) || saved < 0) {
    alert('Please enter a valid saved amount');
    return;
  }
  
  const goal = {
    id: Date.now(),
    name,
    target,
    saved
  };
  
  goals.push(goal);
  saveGoals();
  renderGoals();
}

function editGoal(id) {
  const goal = goals.find(g => g.id === id);
  if (!goal) return;
  
  const newName = prompt('Edit goal name:', goal.name);
  if (!newName) return;
  
  const newTarget = parseFloat(prompt('Edit target amount:', goal.target));
  if (isNaN(newTarget) || newTarget <= 0) {
    alert('Please enter a valid target amount');
    return;
  }
  
  const newSaved = parseFloat(prompt('Edit amount saved:', goal.saved));
  if (isNaN(newSaved) || newSaved < 0) {
    alert('Please enter a valid saved amount');
    return;
  }
  
  goal.name = newName;
  goal.target = newTarget;
  goal.saved = newSaved;
  
  saveGoals();
  renderGoals();
}

function addToGoal(id) {
  const goal = goals.find(g => g.id === id);
  if (!goal) return;
  
  const amount = parseFloat(prompt('Enter amount to add to this goal:'));
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  
  goal.saved += amount;
  saveGoals();
  renderGoals();
}

function renderGoals() {
  goalsContainer.innerHTML = '';
  
  goals.forEach(goal => {
    const percentage = goal.target > 0 ? Math.min(100, (goal.saved / goal.target) * 100) : 0;
    
    const goalEl = document.createElement('div');
    goalEl.className = 'goal-item';
    goalEl.innerHTML = `
      <div>
        <h3>${goal.name}</h3>
        <p>${currency}${goal.saved.toFixed(2)} saved of ${currency}${goal.target.toFixed(2)} goal</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%; background-color: var(--warning-color)"></div>
        </div>
      </div>
      <div>
        <button class="action-btn edit-btn" onclick="addToGoal(${goal.id})">Add Savings</button>
        <button class="action-btn edit-btn" onclick="editGoal(${goal.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteGoal(${goal.id})">Delete</button>
      </div>
    `;
    
    goalsContainer.appendChild(goalEl);
  });
}

function deleteGoal(id) {
  if (confirm('Are you sure you want to delete this goal?')) {
    goals = goals.filter(g => g.id !== id);
    saveGoals();
    renderGoals();
  }
}

function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

// ======================
// CHART FUNCTIONS
// ======================

let expensePieChart, incomeExpenseBarChart, spendingTrendLineChart;

function initCharts() {
  // Destroy existing charts if they exist
  if (expensePieChart) expensePieChart.destroy();
  if (incomeExpenseBarChart) incomeExpenseBarChart.destroy();
  if (spendingTrendLineChart) spendingTrendLineChart.destroy();
  
  // Expense Pie Chart
  const expenseData = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expenseData[t.category] = (expenseData[t.category] || 0) + t.amount;
    });
    
  const expenseLabels = Object.keys(expenseData);
  const expenseValues = Object.values(expenseData);
  
  if (expenseLabels.length > 0) {
    const expenseCtx = document.getElementById('expense-pie-chart').getContext('2d');
    expensePieChart = new Chart(expenseCtx, {
      type: 'pie',
      data: {
        labels: expenseLabels,
        datasets: [{
           expenseValues,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Expense Distribution by Category'
          }
        }
      }
    });
  }
  
  // Income vs Expense Bar Chart
  const monthlyData = {};
  transactions.forEach(t => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });
  
  const months = Object.keys(monthlyData).sort();
  const incomeData = months.map(m => monthlyData[m].income);
  const expenseDataBar = months.map(m => monthlyData[m].expense);
  
  if (months.length > 0) {
    const barCtx = document.getElementById('income-expense-bar-chart').getContext('2d');
    incomeExpenseBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: '#4CAF50'
          },
          {
            label: 'Expense',
            data: expenseDataBar,
            backgroundColor: '#F44336'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Income vs Expenses'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Spending Trend Line Chart
  const dailyData = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const day = t.date;
      dailyData[day] = (dailyData[day] || 0) + t.amount;
    });
    
  const days = Object.keys(dailyData).sort();
  const dailySpending = days.map(d => dailyData[d]);
  
  if (days.length > 0) {
    const lineCtx = document.getElementById('spending-trend-line-chart').getContext('2d');
    spendingTrendLineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Daily Spending',
           dailySpending,
          borderColor: '#3e95cd',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Spending Trend Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// ======================
// EXPORT FUNCTIONS
// ======================

function exportToJson() {
  const dataStr = JSON.stringify({ transactions, budgets, goals }, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'finance-data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function exportToCsv() {
  let csvContent = "text/csv;charset=utf-8,";
  
  // Headers
  csvContent += "ID,Description,Amount,Type,Category,Date,Payment Method\n";
  
  // Data
  transactions.forEach(t => {
    csvContent += `${t.id},"${t.description}",${t.amount},${t.type},"${t.category}",${t.date},"${t.paymentMethod}"\n`;
  });
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

function exportToPdf() {
  // Create a new jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Personal Finance Report', 105, 20, null, null, 'center');
  
  // Add summary information
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  doc.setFontSize(12);
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Total Income: ${currency}${totalIncome.toFixed(2)}`, 20, 50);
  doc.text(`Total Expenses: ${currency}${totalExpenses.toFixed(2)}`, 20, 60);
  doc.text(`Balance: ${currency}${balance.toFixed(2)}`, 20, 70);
  
  // Add budgets section
  doc.setFontSize(16);
  doc.text('Budgets', 20, 90);
  doc.setFontSize(12);
  
  let yPos = 100;
  budgets.forEach(budget => {
    budget.spent = transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
      
    doc.text(`${budget.category}: ${currency}${budget.spent.toFixed(2)} / ${currency}${budget.limit.toFixed(2)}`, 20, yPos);
    yPos += 10;
  });
  
  // Add goals section
  doc.setFontSize(16);
  doc.text('Goals', 20, yPos + 10);
  doc.setFontSize(12);
  
  yPos += 20;
  goals.forEach(goal => {
    doc.text(`${goal.name}: ${currency}${goal.saved.toFixed(2)} / ${currency}${goal.target.toFixed(2)}`, 20, yPos);
    yPos += 10;
  });
  
  // Add recent transactions section
  doc.setFontSize(16);
  doc.text('Recent Transactions', 20, yPos + 10);
  doc.setFontSize(12);
  
  yPos += 20;
  doc.text('Date | Description | Category | Amount | Type', 20, yPos);
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  // Add transactions (limit to first 10 for PDF)
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  recentTransactions.forEach(transaction => {
    if (yPos > 280) { // Start new page if needed
      doc.addPage();
      yPos = 20;
    }
    doc.text(`${transaction.date} | ${transaction.description} | ${transaction.category} | ${currency}${transaction.amount.toFixed(2)} | ${transaction.type}`, 20, yPos);
    yPos += 10;
  });
  
  // Save the PDF
  doc.save('finance-report.pdf');
}

// Make functions globally available for inline event handlers
window.editTransaction = editTransaction;
window.deleteTransaction = deleteTransaction;
window.editBudget = editBudget;
window.deleteBudget = deleteBudget;
window.editGoal = editGoal;
window.deleteGoal = deleteGoal;
window.addToGoal = addToGoal;