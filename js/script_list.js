document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('#search-button');

    function displayStudents(students) {   
        tbody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${student.legajo}</td>
            `;
            tbody.appendChild(row);
        });
    }
    const students = JSON.parse(localStorage.getItem('students')) || [];
    displayStudents(students);
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredStudents = students.filter(student => 
            student.surname.toLowerCase().includes(searchTerm)
        );
        displayStudents(filteredStudents);
    });
});
