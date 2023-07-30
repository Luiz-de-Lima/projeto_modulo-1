const renderAlunos = (alunos) => {
  const dataHeaderFirst = document.getElementById('dataHeaderFirst');
  const dataHeaderSecond = document.getElementById('dataHeaderSecond');
  const dataHeaderThird = document.getElementById('dataHeaderThird');

  dataHeaderFirst.innerHTML = '';
  dataHeaderSecond.innerHTML = '';
  dataHeaderThird.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';

    dataHeaderFirst.innerHTML += `
      <p class="dataList ${btnList}">${aluno.aluno}</p>
    `;
    dataHeaderSecond.innerHTML += `
      <p class="dataList ${btnList}">${aluno.email}</p>
    `;
    dataHeaderThird.innerHTML += `
      <div class="dataList headerContent ${btnList}">
        <button onclick="editarAluno(${aluno.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
        <button onclick="excluirAluno(${aluno.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });
};

let alunosData = [];

const getAlunos = async () => {
  try {
    const response = await fetch("https://apimentorclass.onrender.com/alunos");
    if (!response.ok) {
      throw new Error('Erro ao buscar alunos.');
    }
    const data = await response.json();
    alunosData = data;
    renderAlunos(alunosData);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  }
};

const searchInput = document.getElementById('searchInput');

const filterAlunos = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredAlunos = alunosData.filter(aluno =>
    aluno.aluno.toLowerCase().includes(searchTerm) ||
    aluno.email.toLowerCase().includes(searchTerm)
  );
  renderAlunos(filteredAlunos);
};

searchInput.addEventListener('input', filterAlunos);

const newStudentBtn = document.getElementById('newStudentBtn');
newStudentBtn.addEventListener('click', () => {
  window.location = "alunoCadastro.html";
});

const editarAluno = (id) => {
  window.location = `alunoEditavel.html?id=${id}`;
};

const excluirAluno = async (id) => {
  try {
    await fetch(`https://apimentorclass.onrender.com/alunos/${id}`, {
      method: 'DELETE'
    });
    alunosData = alunosData.filter(aluno => aluno.id !== id);
    renderAlunos(alunosData);
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
  }
};

getAlunos();
