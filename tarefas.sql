SELECT * FROM Tarefas;

CREATE DATABASE IF NOT EXISTS tarefas;
USE tarefas;

CREATE TABLE Tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    nome VARCHAR(100) NOT NULL,        
    custo DECIMAL(10, 2) NOT NULL,      
    data_limite DATE NOT NULL,          
    ordem INT UNIQUE NOT NULL           
);