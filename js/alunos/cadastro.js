//---------------SOLICITAÇÃO POST NA API, SE NÃO ROLAR VAI TER MSG XoXo------------//
const novoAluno = async (alunos) => {
  try {
    await fetch('https://apimentorclass.onrender.com/alunos', {
      method: 'POST',
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(alunos)
    });
    window.location = "alunos.html";
  } catch (error) {
    console.error("Erro ao criar novo aluno:", error);
  }
};


//-----OBTÉM INFORMAÇÕES DOS FORM GARANTINDO QUE ELAS SEJAM SALVAS E CONVERTIDAS PARA SEREM GUARDADAS----------//
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = formulario.elements['nomeAluno'].value;
  const email = formulario.elements['emailAluno'].value;

  if (!validarCamposPreenchidos(nome, email)) {
    alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  const alunos = {
    aluno: nome,
    email: email,
  };

  novoAluno(alunos);
});


//------CASO O FORM DO CÓDIGO ANTERIOR ESTEJA NÃO ESTEJA TOTAL PREENCHIDO ELE NÃO DEIXA IR ADIANTE--------// 
//-------------GARANTE QUE NÃO HAVERÁ ARRAYS VAZIAS!------------//
const validarCamposPreenchidos = (nome, email) => {
  return nome.trim() !== '' && email.trim() !== '';
};



