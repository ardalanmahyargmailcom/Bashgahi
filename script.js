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
        lossesCell.textContent = 0;
        updateTeamPoints(team1Name, 3, team1Goals, team2Goals);
        updateTeamPoints(team2Name, 0, team2Goals, team1Goals);
    } else if (team1Goals < team2Goals) {
        winsCell.textContent = 0;
        lossesCell.textContent = 1;
        updateTeamPoints(team1Name, 0, team1Goals, team2Goals);
        updateTeamPoints(team2Name, 3, team2Goals, team1Goals);
    } else {
        winsCell.textContent = 0;
        lossesCell.textContent = 0;
        updateTeamPoints(team1Name, 1, team1Goals, team2Goals);
        updateTeamPoints(team2Name, 1, team2Goals, team1Goals);
    }

    goalsScoredTeam1Cell.textContent = team1Goals;
    goalsScoredTeam2Cell.textContent = team2Goals;
    goalsConcededTeam1Cell.textContent = team2Goals;
    goalsConcededTeam2Cell.textContent = team1Goals;

    // بروزرسانی داده‌های ذخیره شده
    const key = `${team1Name}-${team2Name}`;
    savedData[key] = input.value;
}

function updateTeamPoints(teamName, points, goalsScored, goalsConceded) {
    const teamRow = document.querySelector(`#points-table tbody tr[data-team="${teamName}"]`);
    if (teamRow) {
        const teamWinsCell = teamRow.querySelector('.team-wins');
        const teamLossesCell = teamRow.querySelector('.team-losses');
        const teamGoalsScoredCell = teamRow.querySelector('.team-goals-scored');
        const teamGoalsConcededCell = teamRow.querySelector('.team-goals-conceded');
        const teamPointsCell = teamRow.querySelector('.team-points');

        let wins = parseInt(teamWinsCell.textContent) || 0;
        let losses = parseInt(teamLossesCell.textContent) || 0;
        let goalsScoredTotal = parseInt(teamGoalsScoredCell.textContent) || 0;
        let goalsConcededTotal = parseInt(teamGoalsConcededCell.textContent) || 0;
        let pointsTotal = parseInt(teamPointsCell.textContent) || 0;

        if (points === 3) {
            wins++;
        } else if (points === 0) {
            losses++;
        }

        goalsScoredTotal += goalsScored;
        goalsConcededTotal += goalsConceded;
        pointsTotal += points;

        teamWinsCell.textContent = wins;
        teamLossesCell.textContent = losses;
        teamGoalsScoredCell.textContent = goalsScoredTotal;
        teamGoalsConcededCell.textContent = goalsConcededTotal;
        teamPointsCell.textContent = pointsTotal;
    }
}

// ذخیره داده‌ها در LocalStorage
saveButton.addEventListener('click', () => {
    localStorage.setItem('matchData', JSON.stringify(savedData));
    message.style.display = 'block';
});

