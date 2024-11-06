document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll('table tr:not(:first-child)'); 

    rows.forEach(row => {
        const costCell = row.cells[2].innerText; 
        const costValue = parseFloat(costCell.replace('R$', '').replace('.', '').replace(',', '.')); 
        
        if (!isNaN(costValue) && costValue >= 1000) {
            row.classList.add('high-cost'); 
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const confirmPopup = document.getElementById('confirmPopup');
    const popupMessage = document.getElementById('popupMessage');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    let taskName;

    document.querySelectorAll('.delete-icon').forEach(deleteIcon => {
        deleteIcon.addEventListener('click', () => {
            taskName = deleteIcon.closest('tr').cells[1].innerText;
            popupMessage.innerText = `Deseja realmente excluir a tarefa "${taskName}"?`;
            confirmPopup.style.display = "flex";
        });
    });

    confirmYes.addEventListener('click', () => {
        popupMessage.innerText = `A tarefa "${taskName}" foi excluída com sucesso!`;
        confirmYes.style.display = "none";
        confirmNo.style.display = "none";

        setTimeout(() => {
            confirmPopup.style.display = "none";
            confirmYes.style.display = "inline";
            confirmNo.style.display = "inline";
        }, 1500);
    });

    confirmNo.addEventListener('click', () => {
        confirmPopup.style.display = "none";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const editPopup = document.getElementById('editPopup');
    const editTaskName = document.getElementById('editTaskName');
    const editTaskCost = document.getElementById('editTaskCost');
    const editTaskDeadline = document.getElementById('editTaskDeadline');
    const confirmEdit = document.getElementById('confirmEdit');
    const cancelEdit = document.getElementById('cancelEdit');
    let currentEditRow;

    document.querySelectorAll('.edit-icon').forEach(editIcon => {
        editIcon.addEventListener('click', () => {
            currentEditRow = editIcon.closest('tr');
            editTaskName.value = currentEditRow.cells[1].innerText;
            editTaskCost.value = currentEditRow.cells[2].innerText.replace('R$', '').trim();
            editTaskDeadline.value = currentEditRow.cells[3].childNodes[0].nodeValue.trim();
            editPopup.style.display = "flex";
        });
    });

    cancelEdit.addEventListener('click', () => {
        editPopup.style.display = "none";
    });

    confirmEdit.addEventListener('click', () => {
        currentEditRow.cells[1].innerText = editTaskName.value;
        currentEditRow.cells[2].innerText = `R$${parseFloat(editTaskCost.value).toFixed(2).replace('.', ',')}`;
        currentEditRow.cells[3].childNodes[0].nodeValue = editTaskDeadline.value + " "; 

        editPopup.style.display = "none";
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const addPopup = document.getElementById('addPopup');
    const addTaskName = document.getElementById('addTaskName');
    const addTaskCost = document.getElementById('addTaskCost');
    const addTaskDeadline = document.getElementById('addTaskDeadline');
    const confirmAdd = document.getElementById('confirmAdd');
    const cancelAdd = document.getElementById('cancelAdd');

    document.querySelector('.incluir').addEventListener('click', () => {
        addTaskName.value = '';
        addTaskCost.value = '';
        addTaskDeadline.value = '';
        addPopup.style.display = "flex";
    });

    cancelAdd.addEventListener('click', () => {
        addPopup.style.display = "none";
    });

    confirmAdd.addEventListener('click', () => {
        const table = document.querySelector('table');
        const newRow = table.insertRow(-1); 

        const newIdCell = newRow.insertCell(0);
        const newNameCell = newRow.insertCell(1);
        const newCostCell = newRow.insertCell(2);
        const newDeadlineCell = newRow.insertCell(3);

        newIdCell.innerText = table.rows.length - 1;
        newNameCell.innerText = addTaskName.value;
        newCostCell.innerText = `R$${parseFloat(addTaskCost.value).toFixed(2).replace('.', ',')}`;
        newDeadlineCell.innerHTML = `${addTaskDeadline.value} 
            <i class="fas fa-edit edit-icon"></i>
            <i class="fas fa-trash delete-icon"></i>`;

        addPopup.style.display = "none"; 

        attachIconEvents(); 
    });
});

const attachIconEvents = () => { 
    document.querySelectorAll('.edit-icon').forEach(editIcon => { 
        editIcon.addEventListener('click', () => { 
            const currentEditRow = editIcon.closest('tr'); 
            const editTaskName = document.getElementById('editTaskName'); 
            const editTaskCost = document.getElementById('editTaskCost'); 
            const editTaskDeadline = document.getElementById('editTaskDeadline'); 
            const editPopup = document.getElementById('editPopup'); 
            editTaskName.value = currentEditRow.cells[1].innerText; 
            editTaskCost.value = currentEditRow.cells[2].innerText.replace('R$', '').trim(); 
            editTaskDeadline.value = currentEditRow.cells[3].childNodes[0].nodeValue.trim(); 
            editPopup.style.display = "flex"; 
        }); 
    }); 
    document.querySelectorAll('.delete-icon').forEach(deleteIcon => { 
        deleteIcon.addEventListener('click', () => { 
            const currentDeleteRow = deleteIcon.closest('tr'); 
            const id = currentDeleteRow.cells[0].innerText; 
            if (confirm('Tem certeza que deseja excluir essa tarefa?')) { 
                fetch(`/tarefas/${id}`, { 
                    method: 'DELETE' 
                }) 
                .then(response => response.text()) 
                .then(message => { 
                    alert(message); 
                    currentDeleteRow.remove(); // Remove a linha da interface 
                    }); 
                } 
            }); 
        });
    };