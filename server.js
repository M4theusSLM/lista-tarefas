const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lista_tarefas'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/teste-conexao', (req, res) => {
  connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao conectar com o banco de dados');
      }
      res.send(`Banco de dados conectado! Resultado da consulta: ${results[0].resultado}`);
    });
  });

app.get('/tarefas', (req, res) => {
  connection.query('SELECT * FROM Tarefas ORDER BY ordem', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tarefas', (req, res) => {
  const { nome, custo, data_limite } = req.body;
  connection.query('INSERT INTO Tarefas (nome, custo, data_limite, ordem) VALUES (?, ?, ?, (SELECT IFNULL(MAX(ordem), 0) + 1 FROM Tarefas))', [nome, custo, data_limite], (err, results) => {
    if (err) throw err;
    res.send('Tarefa adicionada com sucesso!');
  });
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Tarefas WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) {
          res.status(500).send('Erro ao excluir a tarefa');
          throw err;
      }
      res.send('Tarefa excluída com sucesso!');
  });
});


app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, custo, data_limite } = req.body;
  connection.query('UPDATE Tarefas SET nome = ?, custo = ?, data_limite = ? WHERE id = ?', [nome, custo, data_limite, id], (err, results) => {
    if (err) throw err;
    res.send('Tarefa atualizada com sucesso!');
  });
});

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
