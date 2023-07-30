const novoMentor = async (mentores) => {
  try {
    await fetch('https://apimentorclass.onrender.com/mentores', {
      method: 'POST',
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(mentores)
    });
    window.location = "mentor.html";
  } catch (error) {
    console.error("Erro ao criar novo mentor:", error);
  }
};


//-----OBTÉM INFORMAÇÕES DOS FORM GARANTINDO QUE ELAS SEJAM SALVAS E CONVERTIDAS PARA SEREM GUARDADAS----------//
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = formulario.elements['nomeMentor'].value;
  const email = formulario.elements['emailMentor'].value;

  if (!validaCamposPreenchidos(nome, email)) {
    alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  const mentores = {
    nome: nome,
    email: email,
  };

  novoMentor(mentores);
});

// só prossegue caso o form esteja totalmente preenchido
const validaCamposPreenchidos = (nome, email) => {
  return nome.trim() !== '' && email.trim() !== '';
};



