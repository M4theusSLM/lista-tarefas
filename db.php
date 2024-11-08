<?php
$servername = "localhost";
$username = "root";  // Usuário do MySQL (geralmente é 'root' em ambientes locais)
$password = "";  // Senha do MySQL (geralmente é vazia em XAMPP)
$dbname = "tarefas";  // Nome do banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>