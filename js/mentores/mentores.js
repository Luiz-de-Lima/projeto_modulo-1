const renderMentor = (mentores) => {
  const dataHeaderFirst = document.getElementById('dataHeaderFirst');
  const dataHeaderSecond = document.getElementById('dataHeaderSecond');
  const dataHeaderThird = document.getElementById('dataHeaderThird');

  dataHeaderFirst.innerHTML = '';
  dataHeaderSecond.innerHTML = '';
  dataHeaderThird.innerHTML = '';

  mentores.forEach((mentor, index) => {
    const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';

    dataHeaderFirst.innerHTML += `
      <p class="dataList ${btnList}">${mentor.nome}</p>
    `;
    dataHeaderSecond.innerHTML += `
      <p class="dataList ${btnList}">${mentor.email}</p>
    `;
    dataHeaderThird.innerHTML += `
      <div class="dataList headerContent ${btnList}">
        <button onclick="editMentor(${mentor.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
        <button onclick="excluirMentor(${mentor.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });
};



// ----------------- FUNÇÃO PARA BUSCAR A LISTA DE MENTORES -----------------//


let mentorsData = [];

const getMentores = async () => {
  try {
    const response = await fetch("https://apimentorclass.onrender.com/mentores");
    if (!response.ok) {
      throw new Error('Erro ao buscar mentores.');
    }
    const mentores = await response.json();
    mentorsData.push(...mentores);
    renderMentor(mentores);
  } catch (error) {
    console.error("Erro ao buscar mentores:", error);
  }
};



//função que filtra a lista de menores de acordo com o que está no input

const searchInput = document.getElementById('searchInput');

const filterMentores = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMentores = mentorsData.filter(mentor =>
    mentor.nome.toLowerCase().includes(searchTerm) ||
    mentor.email.toLowerCase().includes(searchTerm)
  );
  renderMentor(filteredMentores);
};


searchInput.addEventListener('input', filterMentores);


//novo mentor
const newMentorBtn = document.getElementById('newMentorBtn');
newMentorBtn.addEventListener('click', () => {
  window.location = "mentorCadastro.html";
});

//edita mentor
const editMentor = (id) => {
  window.location = `mentorEditavel.html?id=${id}`


};


// --------------DELETA MENTOR--------------------------//
const excluirMentor = async (id) => {
  try {
    await fetch(`https://apimentorclass.onrender.com/mentores/${id}`, {
      method: 'DELETE'
    });

    //---------------------REMOVE O MENTOR DO ARRAY mentorsData local-----------//
    mentorsData = mentorsData.filter(mentor => mentor.id !== id);

    //Atualiza lista de mentores na página
    renderMentor(mentorsData);
  } catch (error) {
    console.error('Erro ao excluir mentor:', error);
  }
};

//----------BUSCAR E RENDERIZA OS DADOS DOS MENTORES-----------//
getMentores();