const results = document.querySelectorAll('.result');
const saveButton = document.getElementById('save');
const message = document.getElementById('message');
const teamRows = document.querySelectorAll('#points-table tbody tr');

// بارگیری داده‌ها از LocalStorage
const savedData = JSON.parse(localStorage.getItem('matchData')) || {};

// پر کردن نتایج ذخیره شده
results.forEach(input => {
    const team1 = input.dataset.team1;
    const team2 = input.dataset.team2;
    const key = `${team1}-${team2}`;
    if (savedData[key]) {
        input.value = savedData[key];
        calculateResults(input);
    }
});

// محاسبه نتایج
results.forEach(input => {
    input.addEventListener('change', () => {
        calculateResults(input);
    });
});

function calculateResults(input) {
    const row = input.parentElement.parentElement;
    const winsCell = row.querySelector('.wins');
    const lossesCell = row.querySelector('.losses');
    const goalsScoredTeam1Cell = row.querySelector('.goals-scored-team1');
    const goalsScoredTeam2Cell = row.querySelector('.goals-scored-team2');
    const goalsConcededTeam1Cell = row.querySelector('.goals-conceded-team1');
    const goalsConcededTeam2Cell = row.querySelector('.goals-conceded-team2');
    const result = input.value.split('-');
    const team1Goals = parseInt(result[0]) || 0;
    const team2Goals = parseInt(result[1]) || 0;
    const team1Name = input.dataset.team1;
    const team2Name = input.dataset.team2;

    if (team1Goals > team2Goals) {
        winsCell.textContent = 1;
