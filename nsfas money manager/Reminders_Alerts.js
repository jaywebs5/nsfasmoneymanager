/* =========================
   PROFILE MODAL
========================= */

function openProfile(){

    document.getElementById(
    "profileModal")
    .style.display =
    "flex";
}

function closeProfile(){

    document.getElementById(
    "profileModal")
    .style.display =
    "none";
}

/* =========================
   ELEMENTS
========================= */

const addBtn =
document.getElementById(
"addBtn");

const reminderText =
document.getElementById(
"reminderText");

const reminderDate =
document.getElementById(
"reminderDate");

const reminderType =
document.getElementById(
"reminderType");

const upcomingList =
document.getElementById(
"upcomingList");

const monthYear =
document.getElementById(
"monthYear");

const calendarDays =
document.getElementById(
"calendarDays");

/* =========================
   STORAGE
========================= */

let reminders =

JSON.parse(
localStorage.getItem(
"reminders"))
|| [];

/* SAVE */

function saveReminders(){

    localStorage.setItem(
    "reminders",
    JSON.stringify(
    reminders));
}

/* =========================
   CALENDAR
========================= */

let currentDate =
new Date();

function renderCalendar(){

    calendarDays.innerHTML = "";

    const year =
    currentDate.getFullYear();

    const month =
    currentDate.getMonth();

    const today =
    new Date();

    const firstDay =
    new Date(year,month,1)
    .getDay();

    const lastDate =
    new Date(year,month+1,0)
    .getDate();

    const monthNames = [

        "January","February",
        "March","April",
        "May","June",
        "July","August",
        "September","October",
        "November","December"
    ];

    monthYear.innerText =

    `${monthNames[month]} ${year}`;

    /* EMPTY SPACES */

    for(let i=0;i<firstDay;i++){

        const empty =
        document.createElement("div");

        calendarDays.appendChild(
        empty);
    }

    /* DAYS */

    for(let day=1;day<=lastDate;day++){

        const dayDiv =
        document.createElement("div");

        dayDiv.classList.add("day");

        const fullDate =

        `${year}-${
        String(month+1)
        .padStart(2,"0")
        }-${
        String(day)
        .padStart(2,"0")
        }`;

        /* TODAY */

        if(

            day === today.getDate()
            &&
            month === today.getMonth()
            &&
            year === today.getFullYear()

        ){

            dayDiv.classList.add(
            "today");
        }

        /* REMINDER */

        const reminderData =

        reminders.find(
        reminder =>

        reminder.date === fullDate
        );

        let symbol = "";

        if(reminderData){

            if(reminderData.type === "warning"){

                symbol = "⚠";
            }

            else if(reminderData.type === "important"){

                symbol = "🔴";
            }

            else if(reminderData.type === "info"){

                symbol = "🔵";
            }

            else if(reminderData.type === "success"){

                symbol = "✅";
            }

            dayDiv.classList.add(
            reminderData.type);
        }

        dayDiv.innerHTML = `

        <span class="day-number">

            ${day}

        </span>

        ${
            symbol
            ?
            `<div class="calendar-symbol">

            ${symbol}

            </div>`
            :
            ""
        }
        `;

        calendarDays.appendChild(
        dayDiv);
    }
}

/* =========================
   MONTH BUTTONS
========================= */

document.getElementById(
"prevBtn")
.addEventListener(
"click",()=>{

    currentDate.setMonth(
    currentDate.getMonth()-1);

    renderCalendar();
});

document.getElementById(
"nextBtn")
.addEventListener(
"click",()=>{

    currentDate.setMonth(
    currentDate.getMonth()+1);

    renderCalendar();
});

/* =========================
   ADD REMINDER
========================= */

addBtn.addEventListener(
"click",()=>{

    if(

        reminderText.value === ""
        ||
        reminderDate.value === ""

    ){

        alert(
        "Please complete all fields.");

        return;
    }

    reminders.push({

        text:
        reminderText.value,

        date:
        reminderDate.value,

        type:
        reminderType.value
    });

    saveReminders();

    renderReminders();

    renderCalendar();

    reminderText.value = "";

    reminderDate.value = "";
});

/* =========================
   RENDER REMINDERS
========================= */

function renderReminders(){

    upcomingList.innerHTML = "";

    reminders.forEach((reminder)=>{

        let icon = "";

        if(reminder.type === "warning"){

            icon = "⚠";
        }

        else if(reminder.type === "important"){

            icon = "🔴";
        }

        else if(reminder.type === "info"){

            icon = "🔵";
        }

        else if(reminder.type === "success"){

            icon = "✅";
        }

        const li =
        document.createElement("li");

        li.classList.add(
        "reminder-card");

        li.classList.add(
        reminder.type);

        li.innerHTML = `

        <div class="reminder-icon">

            ${icon}

        </div>

        <div>

            <strong>

                ${reminder.text}

            </strong>

            <br>

            ${reminder.date}

        </div>
        `;

        upcomingList.appendChild(li);
    });
}

/* =========================
   START
========================= */

renderCalendar();

renderReminders();