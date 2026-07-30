const balance =
document.getElementById("balance");

const income =
document.getElementById("income");

const expense =
document.getElementById("expense");

const transactionList =
document.getElementById("transactionList");

const addBtn =
document.getElementById("addBtn");

const text =
document.getElementById("text");

const amount =
document.getElementById("amount");

const type =
document.getElementById("type");
/* =========================
   OPEN PROFILE
========================= */

function openProfile(){

    document.getElementById(
    "profileModal")
    .style.display =
    "flex";

    loadStudentInfo();
}

/* =========================
   CLOSE PROFILE
========================= */

function closeProfile(){

    document.getElementById(
    "profileModal")
    .style.display =
    "none";
}

/* =========================
   LOAD STUDENT INFO
========================= */

function loadStudentInfo(){

    const financeData =
    loadData();

    /* ALLOWANCE */

    document.getElementById(
    "studentAllowance")
    .innerText =
    "R" +
    (
        financeData.allowance || 0
    );

    /* SAVINGS */

    document.getElementById(
    "studentSavings")
    .innerText =
    "R" +
    (
        financeData.savings || 0
    );
}
/* STORAGE */
let transactions =
JSON.parse(localStorage.getItem(
"transactions")) || [];

/* UPDATE UI */
function updateUI() {

    transactionList.innerHTML = "";

    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction,index)=>{

        const li =
        document.createElement("li");

        li.classList.add(
        "transaction");

        li.classList.add(
        transaction.type);

        li.innerHTML = `

        <div>

            <strong>
            ${transaction.text}
            </strong>

            <br>

            R${transaction.amount}

        </div>

        <button class="delete-btn"
        onclick="deleteTransaction(${index})">

        Delete

        </button>
        `;

        transactionList.appendChild(li);

        if(transaction.type === "income") {

            incomeTotal +=
            transaction.amount;

        }

        else {

            expenseTotal +=
            transaction.amount;
        }
    });

    income.innerText =
    `R${incomeTotal.toFixed(2)}`;

    expense.innerText =
    `R${expenseTotal.toFixed(2)}`;

    balance.innerText =
    `R${(incomeTotal -
    expenseTotal).toFixed(2)}`;

    localStorage.setItem(
    "transactions",
    JSON.stringify(transactions));
}

/* ADD */
addBtn.addEventListener("click", ()=>{

    if(
        text.value.trim() === "" ||
        amount.value === ""
    ) {

        alert(
        "Please fill all fields");

        return;
    }

    const transaction = {

        text: text.value,

        amount:
        Number(amount.value),

        type: type.value
    };

    transactions.push(transaction);

    updateUI();

    text.value = "";
    amount.value = "";
});

/* DELETE */
function deleteTransaction(index) {

    transactions.splice(index,1);

    updateUI();
}

/* START */
updateUI();