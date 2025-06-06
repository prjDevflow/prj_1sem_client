document.querySelectorAll('.btn-editar-curso').forEach(botao => {
    botao.addEventListener('click', async () => {
      const idCurso = botao.getAttribute('data-idcurso');
      const secaoTurmas = document.querySelector('.turmas');
  
      try {
        const response = await fetch('http://localhost:3333/secretary/busca-turno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ curso: idCurso })
          });
  
        if (!response.ok) throw new Error('Erro na resposta da API');
  
        const turnos = await response.json();
 console.log(response)
        // // Remover botão de turno anterior, se existir
        // const turnoAnterior = secaoTurmas.querySelector('.periodo');
        // if (turnoAnterior) turnoAnterior.remove();
  
        // // Se houver turnos, criar e exibir os botões
        // if (turnos.length > 0) {
        //   const divPeriodos = document.createElement('div');
        //   divPeriodos.classList.add('periodo');
  
        //   const sectionBtns = document.createElement('section');
        //   turnos.forEach(t => {
        //     const btn = document.createElement('button');
        //     btn.classList.add('outline');
        //     btn.textContent = t.turno;
        //     sectionBtns.appendChild(btn);
        //   });
  
        //   divPeriodos.appendChild(sectionBtns);
        //   secaoTurmas.prepend(divPeriodos); // Insere no início da seção de turmas
        // } else {
        //   alert('Nenhum turno disponível para este curso.');
        // }
  
      } catch (err) {
        console.error('Erro ao buscar turnos:', err);
        // alert('Não foi possível carregar os turnos.');
      }
    });
  });
  
  