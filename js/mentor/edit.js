document.addEventListener('DOMContentLoaded', () => {

  // ----------------- OBTENDO O ID DO MENTOR DA URL -----------------
  const formulario = document.getElementById('formulario');
  let mentoresId = null;

  const getIdUrl = () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    mentoresId = params.get('id');
  };

  // ----------------- BUSCANDO OS DADOS DO MENTOR -----------------
  const buscaMentor = async () => {
    const response = await fetch(`https://apimentorclass.onrender.com/mentores/${mentoresId}`);
    const mentor = await response.json();
    return mentor;
  };

  // ----------------- ATUALIZANDO OS DADOS DO MENTOR -----------------
  const alteraItem = async (mentor) => {
    await fetch(`https://apimentorclass.onrender.com/mentores/${mentoresId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mentor)
    });

    window.location = 'mentorIndex.html';
  };

  // ----------------- CARREGANDO OS DADOS NO FORMULÁRIO -----------------
  const carregarDadosFormulario = async (mentor) => {
    document.getElementById('nameChange').value = mentor.nome;
    document.getElementById('emailChange').value = mentor.email;
  };

  // ----------------- CARREGANDO OS DADOS DO MENTOR -----------------
  const carregarDados = async () => {
    getIdUrl();
    const mentor = await buscaMentor();
    carregarDadosFormulario(mentor);
  };

  // ----------------- EVENTO DE ENVIO DO FORMULÁRIO -----------------
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = formulario.elements['nameChange'].value;
    const email = formulario.elements['emailChange'].value;

    if (nome.trim() === '' || email.trim() === '') {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    const mentor = {
      nome,
      email
    };

    await alteraItem(mentor);
  });

  // ----------------- CHAMANDO A FUNÇÃO PARA CARREGAR OS DADOS -----------------
  carregarDados();
});
