<?php
include 'db.php';

$id = $_POST['id'] ?? '';
$nova_ordem = $_POST['nova_ordem'] ?? '';

if ($id !== '' && $nova_ordem !== '') {
    // Atualiza a ordem da tarefa
    $sql = "UPDATE Tarefas SET ordem=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $nova_ordem, $id); // "ii" indica dois inteiros

} else {
    echo json_encode(['success' => false, 'error' => 'ID ou nova ordem inválidos']);
}

$conn->close();
?>