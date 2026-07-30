/* PRELOADER */
window.addEventListener(
"load",()=>{

    const preloader =
    document.getElementById(
    "preloader");

    preloader.style.opacity =
    "0";

    preloader.style.visibility =
    "hidden";
});

/* PARTICLES */
const particles =
document.getElementById(
"particles");

for(let i=0;i<40;i++){

    const particle =
    document.createElement(
    "span");

    const size =
    Math.random()*8+4;

    particle.style.width =
    size+"px";

    particle.style.height =
    size+"px";

    particle.style.left =
    Math.random()*100+"%";

    particle.style.top =
    Math.random()*100+"%";

    particle.style.animationDuration =
    (Math.random()*10+10)+"s";

    particles.appendChild(
    particle);
}

/* DEFAULT DATA */
let financeData = {

    allowance:3500,
    food:900,
    transport:500,
    other:400,
    savings:1700
};

/* LOAD STORAGE */
const savedData =
JSON.parse(
localStorage.getItem(
"financeReports"));

if(savedData){

    financeData = savedData;
}

/* STATS */
function updateStats(){

    document.getElementById(
    "allowanceStat").innerText =
    "R" + financeData.allowance;

    document.getElementById(
    "expenseStat").innerText =
    "R" +
    (
        financeData.food +
        financeData.transport +
        financeData.other
    );

    document.getElementById(
    "savingsStat").innerText =
    "R" + financeData.savings;
}

/* BAR CHART */
const barChart =
new Chart(
document.getElementById(
"barChart"),{

    type:"bar",

    data:{

        labels:[
            "Allowance",
            "Food",
            "Transport",
            "Other",
            "Savings"
        ],

        datasets:[{

            label:"Financial Overview",

            data:[
                financeData.allowance,
                financeData.food,
                financeData.transport,
                financeData.other,
                financeData.savings
            ],

            backgroundColor:[
                "#10b981",
                "#34d399",
                "#6ee7b7",
                "#065f46",
                "#84cc16"
            ],

            borderRadius:10
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{
                display:false
            }
        }
    }
});

/* PIE CHART */
const pieChart =
new Chart(
document.getElementById(
"pieChart"),{

    type:"doughnut",

    data:{

        labels:[
            "Food",
            "Transport",
            "Other",
            "Savings"
        ],

        datasets:[{

            data:[
                financeData.food,
                financeData.transport,
                financeData.other,
                financeData.savings
            ],

            backgroundColor:[
                "#10b981",
                "#34d399",
                "#6ee7b7",
                "#84cc16"
            ],

            borderWidth:0
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        cutout:"65%"
    }
});

/* LINE CHART */
const lineChart =
new Chart(
document.getElementById(
"lineChart"),{

    type:"line",

    data:{

        labels:[
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4"
        ],

        datasets:[{

            label:"Savings Growth",

            data:[
                financeData.savings-600,
                financeData.savings-300,
                financeData.savings-150,
                financeData.savings
            ],

            borderColor:"#10b981",

            backgroundColor:
            "rgba(16,185,129,0.2)",

            fill:true,

            tension:0.4
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false
    }
});

/* UPDATE CHARTS */
function refreshCharts(){

    barChart.data.datasets[0].data = [

        financeData.allowance,
        financeData.food,
        financeData.transport,
        financeData.other,
        financeData.savings
    ];

    pieChart.data.datasets[0].data = [

        financeData.food,
        financeData.transport,
        financeData.other,
        financeData.savings
    ];

    lineChart.data.datasets[0].data = [

        financeData.savings-600,
        financeData.savings-300,
        financeData.savings-150,
        financeData.savings
    ];

    barChart.update();
    pieChart.update();
    lineChart.update();

    updateStats();
}

/* UPDATE BUTTON */
document.getElementById(
"updateBtn")
.addEventListener(
"click",()=>{

    financeData.allowance =
    Number(
    document.getElementById(
    "allowanceInput").value);

    financeData.food =
    Number(
    document.getElementById(
    "foodInput").value);

    financeData.transport =
    Number(
    document.getElementById(
    "transportInput").value);

    financeData.other =
    Number(
    document.getElementById(
    "otherInput").value);

    financeData.savings =
    Number(
    document.getElementById(
    "savingsInput").value);

    localStorage.setItem(
    "financeReports",
    JSON.stringify(
    financeData));

    refreshCharts();
});

/* SUMMARY */
document.getElementById(
"summaryBtn")
.addEventListener(
"click",()=>{

    const expenses =
    financeData.food +
    financeData.transport +
    financeData.other;

    const remaining =
    financeData.allowance -
    expenses;

    let message = "";

    if(remaining > 1500){

        message =
        "Excellent financial control. Your NSFAS allowance is being managed professionally with strong savings growth.";

    }

    else if(remaining > 700){

        message =
        "Your finances are stable. Consider improving savings for future emergencies and academic expenses.";

    }

    else{

        message =
        "Warning: Your expenses are becoming too high compared to your monthly allowance.";
    }

    document.getElementById(
    "summaryText").innerHTML = `

    Total Allowance:
    R${financeData.allowance}

    <br><br>

    Total Expenses:
    R${expenses}

    <br><br>

    Savings:
    R${financeData.savings}

    <br><br>

    ${message}
    `;
});

/* PRINT */
document.getElementById(
"printBtn")
.addEventListener(
"click",()=>{

    window.print();
});

/* START */
updateStats();
refreshCharts();