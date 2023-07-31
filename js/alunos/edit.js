document.addEventListener('DOMContentLoaded', () => {

  // OBTENDO O ID DO ALUNO DA URL
  const formulario = document.getElementById('formulario');
  let alunosId = null;

  const getIdUrl = () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    alunosId = params.get('id');
  };

  // BUSCANDO OS DADOS DO ALUNO
  const buscaAlunos = async () => {
    const response = await fetch(`https://apimentorclass.onrender.com/alunos/${alunosId}`);
    const aluno = await response.json();
    return aluno;
  };

  // ATUALIZANDO OS DADOS DO ALUNO
  const alteraItem = async (aluno) => {
    await fetch(`https://apimentorclass.onrender.com/alunos/${alunosId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aluno)
    });

    window.location = 'alunos.html';
  };

  // CARREGANDO OS DADOS NO FORMULÁRIO
  const carregarDadosFormulario = async (aluno) => {
    document.getElementById('nameChange').value = aluno.aluno;
    document.getElementById('emailChange').value = aluno.email;
  };

  // CARREGANDO OS DADOS DO ALUNO
  const carregarDados = async () => {
    getIdUrl();
    const aluno = await buscaAlunos();
    carregarDadosFormulario(aluno);
  };

  // EVENTO DE ENVIO DO FORMULÁRIO
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    //É O ALUNO QUE VAI TER QUE PASSAR PRO APP, BESTA!!!!
    const aluno = formulario.elements['nameChange'].value;
    const email = formulario.elements['emailChange'].value;

    if (aluno.trim() === '' || email.trim() === '') {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    const alunos = {
      aluno,
      email
    };

    await alteraItem(alunos);
  });

  // CHAMANDO A FUNÇÃO PARA CARREGAR OS DADOS
  carregarDados();
});
