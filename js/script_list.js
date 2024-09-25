document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');
    const searchInput = document.getElementById('search');
    const pagOptions = document.getElementById('pag-options');
    const pagIndex = document.getElementById('pag-index');

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let filteredStudents = students;
    let itemsPerPage = parseInt(pagOptions.value);
    let currentPage = 1;

    function displayStudents() {
        tbody.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const studentsToDisplay = filteredStudents.slice(start, end);

        if (studentsToDisplay.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 3;
            cell.textContent = "No se encontraron estudiantes.";
            row.appendChild(cell);
            tbody.appendChild(row);
        } else {
            studentsToDisplay.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.surname}</td>
                    <td>${student.legajo}</td>
                `;
                tbody.appendChild(row);
            });
        }
        
        pagIndex.value = currentPage;
    }

    function updatePagination() {
        const totalStudents = filteredStudents.length;
        const totalPages = Math.ceil(totalStudents / itemsPerPage);

        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        displayStudents();
    }

    pagOptions.addEventListener('change', (event) => {
        itemsPerPage = parseInt(event.target.value);
        currentPage = 1; 
        updatePagination();
    });

    document.getElementById('pag-btn-next').addEventListener('click', () => {
        currentPage++;
        updatePagination();
    });

    document.getElementById('pag-btn-prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    document.getElementById('pag-btn-last').addEventListener('click', () => {
        currentPage = Math.ceil(filteredStudents.length / itemsPerPage);
        updatePagination();
    });

    document.getElementById('pag-btn-first').addEventListener('click', () => {
        currentPage = 1;
        updatePagination();
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredStudents = students.filter(student => 
            student.surname.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; 
        updatePagination();
    });

    displayStudents();
});
