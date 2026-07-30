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
    "div");

    particle.classList.add(
    "particle");

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

/* LOAD REPORT DATA */
let financeData = {

    allowance:3500,
    food:900,
    transport:500,
    other:400,
    savings:1700
};

const savedData =
JSON.parse(
localStorage.getItem(
"financeReports"));

if(savedData){

    financeData = savedData;
}

/* UPDATE DASHBOARD */
document.getElementById(
"allowanceAmount").innerText =
"R" + financeData.allowance;

document.getElementById(
"expenseAmount").innerText =
"R" +
(
financeData.food +
financeData.transport +
financeData.other
);

document.getElementById(
"savingsAmount").innerText =
"R" + financeData.savings;

/* LOGOUT */
document.getElementById(
"logoutBtn")
.addEventListener(
"click",()=>{

    alert(
    "Logged out successfully.");
});