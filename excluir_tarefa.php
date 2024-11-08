<?php
include 'db.php';

$id = $_POST['id'] ?? '';  // Verifique se o ID está sendo passado

if ($id != '') {
    $sql = "DELETE FROM Tarefas WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Tarefa excluída com sucesso";
    } else {
        echo "Erro ao excluir tarefa: " . $conn->error;
    }
} else {
    echo "ID não recebido!";
}

$conn->close();
?>
