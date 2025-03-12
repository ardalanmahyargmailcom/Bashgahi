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
    const goalsScoredCell = row.querySelector('.goals-scored');
    const goalsConcededCell = row.querySelector('.goals-conceded');
    const pointsCell = row.querySelector('.points');
    const result = input.value.split('-');
    const team1Goals = parseInt(result[0]);
    const team2Goals = parseInt(result[1]);
    const team1Name = input.dataset.team1;
    const team2Name = input.dataset.team2;

    if (team1Goals > team2Goals) {
        winsCell.textContent = 1;
        lossesCell.textContent = 0;
        pointsCell.textContent = 3;
    } else if (team1Goals < team2Goals) {
        winsCell.textContent = 0;
        lossesCell.textContent = 1;
        pointsCell.textContent = 0;
    } else {
        winsCell.textContent = 0;
        lossesCell.textContent = 0;
        pointsCell.textContent = 1;
    }

    goalsScoredCell.textContent = team1Goals;
    goalsConcededCell.textContent = team2Goals;

    // بروزرسانی داده‌های ذخیره شده
    const key = `${team1Name}-${team2Name}`;
    savedData[key] = input.value;
}

// ذخیره داده‌ها در LocalStorage
saveButton.addEventListener('click', () => {
    localStorage.setItem('matchData', JSON.stringify(savedData));
    message.style.display = 'block';
});
