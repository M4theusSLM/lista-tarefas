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
    $sql = "SELECT nome, custo, data_limite FROM Tarefas WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id); // "i" indica um inteiro para o ID
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Atualiza os campos apenas se novos valores forem fornecidos
        $nome = $nome !== '' ? $nome : $row['nome'];

        // Verifica se o custo é um número válido antes de atualizar
        if (is_numeric($custo) && $custo >= 0) {
            $custo = $custo;
        } else {
            $custo = $row['custo']; // Mantém o valor existente se o novo custo não for válido
        }

        $data_limite = $data_limite !== '' ? $data_limite : $row['data_limite'];

        // Constrói a consulta de atualização
        $sql = "UPDATE Tarefas SET nome=?, custo=?, data_limite=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $nome, $custo, $data_limite, $id); // "ssi" (string, string, string, integer)

        // Executa a consulta e verifica o sucesso
        if ($stmt->execute()) {
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

// Fecha a conexão
$conn->close();
?>