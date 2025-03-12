const results = document.querySelectorAll('.result');
const saveButton = document.getElementById('save');

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
    const cells = row.querySelectorAll('td');
    const result = input.value.split('-');
    const team1Goals = parseInt(result[0]);
    const team2Goals = parseInt(result[1]);
    const team1Name = input.dataset.team1;
    const team2Name = input.dataset.team2;

    if (team1Goals > team2Goals) {
        cells[3].textContent = 1; // برد
        cells[4].textContent = 0; // باخت
        cells[7].textContent = 3; // امتیاز
    } else if (team1Goals < team2Goals) {
        cells[3].textContent = 0;
        cells[4].textContent = 1;
        cells[7].textContent = 0;
    } else {
        cells[3].textContent = 0;
        cells[4].textContent = 0;
        cells[7].textContent = 1;
    }

    cells[5].textContent = team1Goals; // گل زده
    cells[6].textContent = team2Goals; // گل خورده

    // بروزرسانی داده‌های ذخیره شده
    const key = `${team1Name}-${team2Name}`;
    savedData[key] = input.value;
}

// ذخیره داده‌ها در LocalStorage
saveButton.addEventListener('click', () => {
    localStorage.setItem('matchData', JSON.stringify(savedData));
});
