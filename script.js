document.addEventListener('DOMContentLoaded', loadData);

function updateTable() {
    const rows = document.querySelectorAll('#scoreTable tbody tr');
    const teams = [];

    rows.forEach(row => {
        const teamName = row.cells[0].innerText;
        const goals = parseInt(row.cells[1].querySelector('input').value) || 0;
        const points = parseInt(row.cells[2].querySelector('input').value) || 0;

        teams.push({ name: teamName, goals, points });
    });

    // Sort teams by points and goals
    teams.sort((a, b) => {
        if (b.points === a.points) {
            return b.goals - a.goals; // Sort by goals if points are equal
        }
        return b.points - a.points; // Sort by points
    });

    // Update the table
    const tbody = document.querySelector('#scoreTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td><input type="number" value="${team.goals}" onchange="updateTable()"></td>
            <td><input type="number" value="${team.points}" onchange="updateTable()"></td>
        `;
        tbody.appendChild(row);
    });
}

function saveData() {
    const rows = document.querySelectorAll('#scoreTable tbody tr');
    const teams = [];

    rows.forEach(row => {
        const teamName = row.cells[0].innerText;
        const goals = parseInt(row.cells[1].querySelector('input').value) || 0;
        const points = parseInt(row.cells[2].querySelector('input').value) || 0;

        teams.push({ name: teamName, goals, points });
    });

    localStorage.setItem('teams', JSON.stringify(teams));
    alert('داده‌ها با موفقیت ذخیره شد!'); // پیام تأیید
}

function loadData() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const tbody = document.querySelector('#scoreTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td><input type="number" value="${team.goals}" onchange="updateTable()"></td>
            <td><input type="number" value="${team.points}" onchange="updateTable()"></td>
        `;
        tbody.appendChild(row);
    });

    updateTable(); // Update the table to sort teams
}
