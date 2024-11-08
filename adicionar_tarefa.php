<?php
include 'db.php';

$nome = $_POST['nome'];
$custo = $_POST['custo'];
$data_limite = $_POST['data_limite'];
$ordem = $_POST['ordem'];

$sql = "INSERT INTO Tarefas (nome, custo, data_limite, ordem) VALUES ('$nome', '$custo', '$data_limite', '$ordem')";

if ($conn->query($sql) === TRUE) {
    echo "Tarefa adicionada com sucesso";
} else {
    echo "Erro ao adicionar tarefa: " . $conn->error;
}

$conn->close();
?>