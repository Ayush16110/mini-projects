document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    renderExpense();
    updateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            };

            expenses.push(newExpense);
            saveExpensestoLocal();
            renderExpense();
            updateTotal();

            // clear input

            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    function renderExpense() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const expenseLi = document.createElement("li");
            expenseLi.innerHTML = `
            ${expense.name} - $${expense.amount} 
            <button data-id = "${expense.id}">Delete</button>
            `;

            expenseList.appendChild(expenseLi);
        });
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((exp) => exp.id !== expenseId);
        }
        renderExpense();
        saveExpensestoLocal();
        updateTotal();
    });

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpensestoLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmountDisplay.innerText = `${calculateTotal().toFixed(2)}`;
    }
});
