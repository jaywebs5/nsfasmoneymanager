const totalBudget =
document.getElementById(
"totalBudget");

const totalPlanned =
document.getElementById(
"totalPlanned");

const remainingBalance =
document.getElementById(
"remainingBalance");

const budgetList =
document.getElementById(
"budgetList");

const addBudgetBtn =
document.getElementById(
"addBudgetBtn");

const budgetAmount =
document.getElementById(
"budgetAmount");

const categoryName =
document.getElementById(
"categoryName");

const categoryAmount =
document.getElementById(
"categoryAmount");

const goalInput =
document.getElementById(
"goalInput");

const saveGoalBtn =
document.getElementById(
"saveGoalBtn");

const progressBar =
document.getElementById(
"progressBar");

const goalText =
document.getElementById(
"goalText");

/* STORAGE */
let budgetItems =
JSON.parse(
localStorage.getItem(
"budgetItems")) || [];

let budget =
Number(
localStorage.getItem(
"monthlyBudget")) || 0;

let goal =
Number(
localStorage.getItem(
"savingsGoal")) || 0;

/* UPDATE UI */
function updateUI() {

    budgetList.innerHTML = "";

    let planned = 0;

    budgetItems.forEach((item,index)=>{

        planned += item.amount;

        const li =
        document.createElement("li");

        li.classList.add(
        "budget-item");

        li.innerHTML = `

        <div>

            <strong>
            ${item.name}
            </strong>

            <br>

            R${item.amount}

        </div>

        <button class="delete-btn"
        onclick="deleteBudget(${index})">

        Delete

        </button>
        `;

        budgetList.appendChild(li);
    });

    totalBudget.innerText =
    `R${budget.toFixed(2)}`;

    totalPlanned.innerText =
    `R${planned.toFixed(2)}`;

    remainingBalance.innerText =
    `R${(budget - planned)
    .toFixed(2)}`;

    updateGoal(planned);

    localStorage.setItem(
    "budgetItems",
    JSON.stringify(
    budgetItems));

    localStorage.setItem(
    "monthlyBudget",
    budget);
}

/* ADD */
addBudgetBtn.addEventListener(
"click", ()=>{

    if(
        budgetAmount.value === "" ||
        categoryName.value.trim() === "" ||
        categoryAmount.value === ""
    ) {

        alert(
        "Please fill all fields");

        return;
    }

    budget =
    Number(
    budgetAmount.value);

    const item = {

        name:
        categoryName.value,

        amount:
        Number(
        categoryAmount.value)
    };

    budgetItems.push(item);

    updateUI();

    categoryName.value = "";
    categoryAmount.value = "";
});

/* DELETE */
function deleteBudget(index) {

    budgetItems.splice(index,1);

    updateUI();
}

/* GOAL */
saveGoalBtn.addEventListener(
"click", ()=>{

    goal =
    Number(goalInput.value);

    localStorage.setItem(
    "savingsGoal",
    goal);

    updateGoal();
});

function updateGoal(planned = 0) {

    if(goal <= 0) {

        goalText.innerText =
        "No savings goal set.";

        progressBar.style.width =
        "0%";

        return;
    }

    const saved =
    budget - planned;

    const percentage =
    Math.min(
    (saved / goal) * 100,
    100);

    progressBar.style.width =
    percentage + "%";

    goalText.innerText = `

    Savings Goal:
    R${goal}

    | Current Savings:
    R${saved.toFixed(2)}

    | ${percentage.toFixed(0)}%
    Completed
    `;
}

/* START */
updateUI();