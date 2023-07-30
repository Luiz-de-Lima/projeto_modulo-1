document.addEventListener('DOMContentLoaded', () => {

  // -- pegando o id do mentor
  const formulario = document.getElementById('formulario');
  let mentoresId = null;

  const getIdUrl = () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    mentoresId = params.get('id');
  };

  // buscar os dados do mentor
  const searchMentor = async () => {
    const response = await fetch(`https://apimentorclass.onrender.com/mentores/${mentoresId}`);
    const mentor = await response.json();
    return mentor;
  };

  //ATUALIZANDO OS DADOS DO MENTOR
  const alteraItem = async (mentor) => {
    await fetch(`https://apimentorclass.onrender.com/mentores/${mentoresId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mentor)
    });

    window.location = 'mentor.html';
  };

  // carregando os dados do form
  const loadFormData = async (mentor) => {
    document.getElementById('nameChange').value = mentor.nome;
    document.getElementById('emailChange').value = mentor.email;
  };


  const loadData = async () => {
    getIdUrl();
    const mentor = await searchMentor();
    loadFormData(mentor);
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

  // ----------------- carregando os dados-----------------
  loadData();
});
