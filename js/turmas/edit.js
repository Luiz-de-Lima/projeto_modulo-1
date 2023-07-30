const formulario = document.getElementById('formulario');
let turmasId = null;

const buscarMentoria = async (id) => {
  const response = await fetch(`https://apimentorclass.onrender.com/mentorias/${id}`);
  const mentoria = await response.json();
  return mentoria;
};

const buscarMentorias = async () => {
  const response = await fetch(`https://apimentorclass.onrender.com/mentorias/`);
  const mentorias = await response.json();
  return mentorias;
};

const carregarMentoriaSelect = async () => {
  const mentoriaSelect = document.getElementById('mentoria');
  const opcaoVazia = new Option('Selecione uma mentoria...', '');
  mentoriaSelect.options.add(opcaoVazia);

  try {
    const mentorias = await buscarMentorias();
    mentorias.forEach((mentoria) => {
      const opcao = new Option(mentoria.mentoria, mentoria.id);
      mentoriaSelect.options.add(opcao);
    });
  } catch (error) {
    console.error("ERRO AO CARREGAR A LISTA DE MENTORIAS:", error);
  }
};
carregarMentoriaSelect();

const buscarMentor = async (id) => {
  const resposta = await fetch(`https://apimentorclass.onrender.com/mentores/${id}`);
  const mentor = await resposta.json();
  return mentor;
};

const buscarMentores = async () => {
  const resposta = await fetch(`https://apimentorclass.onrender.com/mentores`);
  const mentores = await resposta.json();
  return mentores;
};

const carregarMentorSelect = async () => {
  const mentorSelect = document.getElementById('mentor');
  const opcaoVazia = new Option('Selecione um mentor...', '');
  mentorSelect.options.add(opcaoVazia);

  try {
    const mentores = await buscarMentores();
    mentores.forEach((mentor) => {
      const opcao = new Option(mentor.nome, mentor.id);
      mentorSelect.options.add(opcao);
    });
  } catch (error) {
    console.error("ERRO AO CARREGAR A LISTA DE MENTORES:", error);
  }
};
carregarMentorSelect();

const buscarSemana = async (id) => {
  const response = await fetch(`https://apimentorclass.onrender.com/semanas/${id}`);
  const semana = await response.json();
  return semana;
};

const buscarSemanas = async () => {
  const response = await fetch('https://apimentorclass.onrender.com/semanas');
  const semanas = await response.json();
  return semanas;
};

const carregarSelectDiasSemana = async () => {
  const semanaSelect = document.getElementById('diaSemana');
  const opcaoVazia = new Option('Selecione um dia da semana...', '');
  semanaSelect.options.add(opcaoVazia);

  try {
    const semanas = await buscarSemanas();
    semanas.forEach((semana) => {
      const opcao = new Option(semana.semana, semana.id);
      semanaSelect.options.add(opcao);
    });
  } catch (error) {
    console.error("ERRO AO CARREGAR A LISTA DE SEMANAS:", error);
  }
};
carregarSelectDiasSemana();

const extrairInformacoesFormulario = () => {
  const turma = formulario.elements['turma'].value;
  const mentor = formulario.elements['mentor'].value;
  const mentoria = formulario.elements['mentoria'].value;
  const dataInicio = formulario.elements['dataInicio'].value;
  const diaSemana = formulario.elements['diaSemana'].value;
  const horaInicio = formulario.elements['horaInicio'].value;
  const horaFim = formulario.elements['horaFim'].value;
  const encontros = formulario.elements['meet'].value; // Corrigir o nome do campo
  const link = formulario.elements['linkAula'].value; // Corrigir o nome do campo

  return {
    turma,
    mentor,
    mentoria,
    dataInicio,
    diaSemana,
    horaInicio,
    horaFim,
    encontros,
    link,
  };
};

const editarTurma = async (turmas) => {
  try {
    await fetch(`https://apimentorclass.onrender.com/turmas/${turmasId}`, {
      method: 'PUT',
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(turmas)
    });
    window.location = "turmasIndex.html";
  } catch (error) {
    console.error("ERRO AO EDITAR TURMA:", error);
  }
};

// Função para pegar o ID da turma a ser editada
const urlParams = new URLSearchParams(window.location.search);
const idTurma = urlParams.get('id');
if (idTurma) {
  turmasId = idTurma;
}

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    turma,
    mentor,
    mentoria,
    dataInicio,
    diaSemana,
    horaInicio,
    horaFim,
    encontros,
    link
  } = extrairInformacoesFormulario();

  if (!turma || !mentor || !mentoria || !dataInicio || !diaSemana || !horaInicio || !horaFim || !encontros || !link) {
    alert("Por favor, preencha todos os campos antes de criar/editar a turma.");
    return;
  }

  const mentorObjeto = await buscarMentor(mentor);
  const mentoriaObjeto = await buscarMentoria(mentoria);
  const diaSemanaObjeto = await buscarSemana(diaSemana);

  if (!mentorObjeto || !mentoriaObjeto || !diaSemanaObjeto) {
    console.error("DADOS INVÁLIDOS.");
    return;
  }

  const turmas = {
    turma,
    mentor: mentorObjeto.nome,
    mentoria: mentoriaObjeto.mentoria,
    dataInicio,
    diaSemana: diaSemanaObjeto.semana,
    horaInicio: horaInicio ? horaInicio : null,
    horaFim: horaFim ? horaFim : null,
    encontros,
    link
  };

  editarTurma(turmas);
});
