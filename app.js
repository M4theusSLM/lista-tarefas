const carregarTarefas = () => {
  fetch('/tarefas')
      .then(response => response.json())
      .then(tarefas => {
          const tarefasDiv = document.getElementById('tarefas');
          tarefasDiv.innerHTML = ''; // Certifique-se de que a lista está limpa antes de adicionar novas tarefas
          tarefas.forEach(tarefa => {
              const tarefaDiv = document.createElement('div');
              tarefaDiv.innerHTML = `
                  <p>ID: ${tarefa.id}</p>
                  <p>Nome: ${tarefa.nome}</p>
                  <p>Custo: R$${tarefa.custo.toFixed(2).replace('.', ',')}</p>
                  <p>Data Limite: ${tarefa.data_limite}</p>
                  <button class="edit-icon" onclick="editarTarefa(${tarefa.id})">Editar</button>
                  <button class="delete-icon" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
              `;
              if (tarefa.custo >= 1000) {
                  tarefaDiv.style.backgroundColor = 'yellow';
              }
              tarefasDiv.appendChild(tarefaDiv);
          });

          // Chamar a função para anexar eventos aos ícones
          attachIconEvents();
      });
};

// Adicionando chamadas iniciais para carregar tarefas e anexar eventos aos ícones
window.onload = () => {
  carregarTarefas();
  attachIconEvents();
};

  
  const adicionarTarefa = () => {
    const nome = prompt('Nome da Tarefa:');
    const custo = prompt('Custo:');
    const data_limite = prompt('Data Limite:');
  
    fetch('/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, custo, data_limite })
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        carregarTarefas();
      });
  };
  
  const excluirTarefa = id => {
    if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
        fetch(`/tarefas/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            carregarTarefas();
        });
    }
};

  const editarTarefa = id => {
    const nome = prompt('Nome da Tarefa:');
    const custo = prompt('Custo:');
    const data_limite = prompt('Data Limite:');
  
    fetch(`/tarefas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, custo, data_limite })
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        carregarTarefas();
      });
  };
  
  const testarConexao = () => {
    fetch('/teste-conexao')
      .then(response => response.text())
      .then(data => {
        console.log(data); // Mostra a resposta no console
        alert(data); // Exibe a resposta em um alerta
      })
      .catch(error => console.error('Erro:', error));
  };
  
  window.onload = testarConexao;
  
  document.getElementById('addTarefaBtn').onclick = adicionarTarefa;
  window.onload = carregarTarefas;

  window.onload = () => {
    carregarTarefas();
    attachIconEvents();
  };

  window.onload = () => {
    carregarTarefas();

    new Sortable(document.querySelector('table tbody'), {
        animation: 150,
        onEnd: (evt) => {
            const rows = Array.from(document.querySelectorAll('table tr:not(:first-child)'));
            rows.forEach((row, index) => {
                const id = row.cells[0].innerText;
                fetch(`/tarefas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ordem: index + 1 }) // Atualizar a ordem no backend
                })
                .then(response => response.text())
                .then(message => console.log(message));
            });
        }
    });
};

  