<?php
// Incluir a conexão com o banco de dados
include 'db.php';

// Consulta para obter todas as tarefas ordenadas pela "ordem"
$sql = "SELECT * FROM Tarefas ORDER BY ordem";
$result = $conn->query($sql);

// Verificar se há tarefas
$tarefas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tarefas[] = $row;
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="shortcut icon" href="img/Favicon.png" type="image/x-icon">
    <title>Lista de Tarefas</title>
</head>
<body>
    <div class="Título">
        <h1>LISTA DE TAREFAS</h1>
    </div>

    <table>
        <tr>
            <th>ID</th>
            <th>Nome da Tarefa</th>
            <th>Custo</th>
            <th>Data Limite</th>
        </tr>

        <?php foreach ($tarefas as $tarefa): ?>
        <tr>
            <td><?php echo $tarefa['id']; ?></td>
            <td><?php echo $tarefa['nome']; ?></td>
            <td>R$<?php echo number_format($tarefa['custo'], 2, ',', '.'); ?></td>
            <td><?php echo $tarefa['data_limite']; ?>
                <button class="move-up">↑</button> 
                <button class="move-down">↓</button>
                <i class="fas fa-edit edit-icon"></i>
                <i class="fas fa-trash delete-icon"></i>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>

    <div id="confirmPopup" class="popup-overlay">
    <div class="popup-content">
        <p id="popupMessage">Deseja realmente excluir esta tarefa?</p>
        <button id="confirmNo" class="popup-button">Cancelar</button>
        <button id="confirmYes" class="popup-button">Excluir</button>
    </div>
</div>

<div id="editPopup" class="popup-overlay">
    <div class="popup-content">
        <h2>Editar Tarefa</h2>
        <label for="editTaskName">Nome da Tarefa:</label>
        <input type="text" id="editTaskName" placeholder="Nome da tarefa" />
        
        <label for="editTaskCost">Custo:</label>
        <input type="text" id="editTaskCost" placeholder="Custo" />
        
        <label for="editTaskDeadline">Data Limite:</label>
        <input type="date" id="editTaskDeadline" />
        
        <button id="confirmEdit" class="popup-button">Salvar</button>
        <button id="cancelEdit" class="popup-button">Cancelar</button>
    </div>
</div>

<div id="addPopup" class="popup-overlay">
    <div class="popup-content">
        <h2>Adicionar Tarefa</h2>
        <label for="addTaskName">Nome da Tarefa:</label>
        <input type="text" id="addTaskName" placeholder="Nome da tarefa" />
        
        <label for="addTaskCost">Custo:</label>
        <input type="text" id="addTaskCost" placeholder="Custo" />
        
        <label for="addTaskDeadline">Data Limite:</label>
        <input type="date" id="addTaskDeadline" />
        
        <button id="confirmAdd" class="popup-button">Adicionar</button>
        <button id="cancelAdd" class="popup-button">Cancelar</button>
    </div>
</div>

<div class="botão-incluir">
<button class="incluir">
    Adicionar Tarefa +
</button>


    <script src="js/lista.js"></script>
</body>
</html>