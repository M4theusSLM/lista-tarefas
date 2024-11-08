<?php
include 'db.php';

// Recebe os dados da tarefa
$id = $_POST['id'] ?? '';
$nome = $_POST['nome'] ?? '';
$custo = $_POST['custo'] ?? '';
$data_limite = $_POST['data_limite'] ?? '';

// Verifica se o ID foi fornecido
if ($id != '') {
    // Busca os dados atuais da tarefa
    $sql = "SELECT nome, custo, data_limite FROM Tarefas WHERE id=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Atualiza os campos apenas se novos valores forem fornecidos
        $nome = $nome !== '' ? $nome : $row['nome'];
        $custo = $custo !== '' ? $custo : $row['custo'];
        $data_limite = $data_limite !== '' ? $data_limite : $row['data_limite'];

        // Atualiza a tarefa no banco de dados
        $sql = "UPDATE Tarefas SET nome='$nome', custo='$custo', data_limite='$data_limite' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo "Tarefa atualizada com sucesso";
        } else {
            echo "Erro ao atualizar tarefa: " . $conn->error;
        }
    } else {
        echo "Tarefa não encontrada!";
    }
} else {
    echo "ID inválido!";
}

$conn->close();
?>