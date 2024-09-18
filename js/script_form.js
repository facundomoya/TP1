document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const name = nameInput.value.trim();
        const surname = surnameInput.value.trim();
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const existingLegajos = students.map(student => student.legajo);

        const legajo = generateUniqueLegajo(existingLegajos);
        students.push({ name, surname, legajo });

        localStorage.setItem('students', JSON.stringify(students));
        nameInput.value = '';
        surnameInput.value = '';

        function generateUniqueLegajo(existingLegajos) {
            let legajo;
            do {
                legajo = Math.floor(10000 + Math.random() * 90000);
            } while (existingLegajos.includes(legajo));
            return legajo;
        }

        Swal.fire({
            title: "Alumno añadido con éxito",
            text: "Presiona el boton para seguir",
            icon: "success"
          });
    });
});
