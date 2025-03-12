const results = document.querySelectorAll('.result');
const saveButton = document.getElementById('save');
const message = document.getElementById('message');

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
    const pointsTeam1Cell = row.querySelector('.points-team1');
    const pointsTeam2Cell = row.querySelector('.points-team2');
    const result = input.value.split('-');
    const team1Goals = parseInt(result[0]) || 0; // مقدار پیش فرض 0 در صورت عدم وجود عدد
    const team2Goals = parseInt(result[1]) || 0; // مقدار پیش فرض 0 در صورت عدم وجود عدد
    const team1Name = input.dataset.team1;
    const team2Name = input.dataset.team2;

    if (team1Goals > team2Goals) {
        winsCell.textContent = 1;
        lossesCell.textContent = 0;
        pointsTeam1Cell.textContent = 3;
        pointsTeam2Cell.textContent = 0;
    } else if (team1Goals < team2Goals) {
        winsCell.textContent = 0;
        lossesCell.textContent = 1;
        pointsTeam1Cell.textContent = 0;
        pointsTeam2Cell.textContent = 3;
    } else {
        winsCell.textContent = 0;
        lossesCell.textContent = 0;
        pointsTeam1Cell.textContent = 1;
        pointsTeam2Cell.textContent = 1;
    }

    goalsScoredTeam1Cell.textContent = team1Goals;
    goalsScoredTeam2Cell.textContent = team2Goals;
    goalsConcededTeam1Cell.textContent = team2Goals;
    goalsConcededTeam2Cell.textContent = team1Goals;

    // بروزرسانی داده‌های ذخیره شده
    const key = `${team1Name}-${team2Name}`;
    savedData[key] = input.value;
}

// ذخیره داده‌ها در LocalStorage
saveButton.addEventListener('click', () => {
    localStorage.setItem('matchData
