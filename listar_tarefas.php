<?php
include 'db.php';

$sql = "SELECT * FROM Tarefas ORDER BY ordem";
$result = $conn->query($sql);

$tarefas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tarefas[] = $row;
    }
}

echo json_encode($tarefas);
$conn->close();
?>