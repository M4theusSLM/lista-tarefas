document.addEventListener("DOMContentLoaded", function() {
    const addPopup = document.getElementById('addPopup');
    const addTaskName = document.getElementById('addTaskName');
    const addTaskCost = document.getElementById('addTaskCost');
    const addTaskDeadline = document.getElementById('addTaskDeadline');
    const confirmAdd = document.getElementById('confirmAdd');
    const cancelAdd = document.getElementById('cancelAdd');
    
    const confirmNo = document.getElementById('confirmNo');
    const confirmYes = document.getElementById('confirmYes');
    const confirmPopup = document.getElementById('confirmPopup');
    let tarefaIdParaExcluir = null;

    // Função para excluir a tarefa
    function excluirTarefa() {
        const formData = new FormData();
        formData.append('id', tarefaIdParaExcluir);

        fetch('excluir_tarefa.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(message => {
            console.log(message);  // Mensagem de sucesso ou erro
            confirmPopup.style.display = "none"; // Esconde o pop-up de confirmação
            location.reload();  // Recarrega a página para atualizar a lista de tarefas
        })
        .catch(error => console.error('Erro ao excluir tarefa:', error));
    }

    // Detectar clique no ícone de excluir e mostrar o pop-up de confirmação
    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // Pega o ID da tarefa a partir da linha da tabela
            tarefaIdParaExcluir = this.closest('tr').querySelector('td').innerText;
            
            // Exibe o pop-up de confirmação
            confirmPopup.style.display = "flex";
        });
    });

    // Função para cancelar a exclusão
    confirmNo.addEventListener('click', function() {
        confirmPopup.style.display = "none"; // Esconde o pop-up de confirmação
    });

    // Função para confirmar a exclusão
    confirmYes.addEventListener('click', function() {
        excluirTarefa(); // Chama a função para excluir a tarefa
    });

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
        fetch('listar_tarefas.php')
            .then(response => response.json())
            .then(tarefas => {
                let maxOrdem = 0;
                tarefas.forEach(tarefa => {
                    if (tarefa.ordem > maxOrdem) {
                        maxOrdem = tarefa.ordem;
                    }
                });

                const ordem = maxOrdem + 1;

                const formData = new FormData();
                formData.append('nome', addTaskName.value);
                formData.append('custo', addTaskCost.value);
                formData.append('data_limite', addTaskDeadline.value);
                formData.append('ordem', ordem);

                fetch('adicionar_tarefa.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(message => {
                    console.log(message);
                    addPopup.style.display = "none";
                    location.reload();  // Recarregar a página para mostrar a nova tarefa
                })
                .catch(error => console.error('Erro ao adicionar tarefa:', error));
            })
            .catch(error => console.error('Erro ao buscar tarefas:', error));
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const editPopup = document.getElementById('editPopup');
    const editTaskName = document.getElementById('editTaskName');
    const editTaskCost = document.getElementById('editTaskCost');
    const editTaskDeadline = document.getElementById('editTaskDeadline');
    const confirmEdit = document.getElementById('confirmEdit');
    const cancelEdit = document.getElementById('cancelEdit');

    let tarefaIdParaEditar = null;  // Variável para armazenar o ID da tarefa que será editada

    // Quando o botão de editar for clicado
    document.querySelectorAll('.edit-icon').forEach((editIcon) => {
        editIcon.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            const tarefaId = tr.querySelector('td').innerText;  // Captura o ID da tarefa
            const tarefaNome = tr.children[1].innerText;  // Nome da tarefa
            const tarefaCusto = tr.children[2].innerText;  // Custo
            const tarefaDataLimite = tr.children[3].innerText;  // Data Limite

            // Preenche o pop-up de edição com os dados da tarefa
            editTaskName.value = tarefaNome;
            editTaskCost.value = tarefaCusto;
            editTaskDeadline.value = tarefaDataLimite;

            // Armazena o ID da tarefa a ser editada
            tarefaIdParaEditar = tarefaId;

            // Exibe o pop-up de edição
            editPopup.style.display = "flex";
        });
    });

    // Quando clicar em "Cancelar" no pop-up de edição
    cancelEdit.addEventListener('click', () => {
        editPopup.style.display = "none";
    });

    // Quando clicar em "Salvar" no pop-up de edição
    confirmEdit.addEventListener('click', () => {
        const nome = editTaskName.value;
        const custo = editTaskCost.value;
        const dataLimite = editTaskDeadline.value;

        // Verifique se os campos não estão vazios
        if (!nome || !custo || !dataLimite) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        const formData = new FormData();
        formData.append('id', tarefaIdParaEditar);
        formData.append('nome', nome);
        formData.append('custo', custo);
        formData.append('data_limite', dataLimite);

        // Envia os dados para o PHP
        fetch('editar_tarefa.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(message => {
            console.log(message); // Mensagem de sucesso ou erro
            editPopup.style.display = "none";
            location.reload();  // Recarrega a página para atualizar a lista
        })
        .catch(error => console.error('Erro ao editar tarefa:', error));
    });
});