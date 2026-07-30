/* ===================================
   NSFAS MONEY MANAGER STORAGE SYSTEM
=================================== */

const STORAGE_KEY =
"nsfasMoneyManager";

/* LOAD DATA */
function loadData(){

    const data =
    localStorage.getItem(
    STORAGE_KEY);

    return data
    ? JSON.parse(data)
    : {

        allowance:3500,

        food:900,

        transport:500,

        other:400,

        savings:1700,

        expenses:[]
    };
}

/* SAVE DATA */
function saveData(data){

    localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data));
}

/* UPDATE SINGLE VALUE */
function updateData(key,value){

    const data =
    loadData();

    data[key] = value;

    saveData(data);
}

/* RESET ALL DATA */
function resetData(){

    localStorage.removeItem(
    STORAGE_KEY);
}