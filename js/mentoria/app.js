// ---------------------MENTORIA INDEX----------------------------//

const renderMentor = (mentorias) => {
  const dataHeaderFirst = document.getElementById('dataHeaderFirst');
  const dataHeaderSecond = document.getElementById('dataHeaderSecond');
  const dataHeaderThird = document.getElementById('dataHeaderThird');
  const dataHeaderFourth = document.getElementById('dataHeaderFourth');

  dataHeaderFirst.innerHTML = '';
  dataHeaderSecond.innerHTML = '';
  dataHeaderThird.innerHTML = '';
  dataHeaderFourth.innerHTML = '';

  let contador = 1;
  mentorias.forEach((mentoria, index) => {
    const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';

    dataHeaderFirst.innerHTML += `
      <p class="dataList ${btnList}">${mentoria.mentoria}</p>
    `;
    dataHeaderSecond.innerHTML += `
      <p class="dataList ${btnList}">${mentoria.mentor}</p>
    `;

    if (mentoria.checkbox === true) {
      dataHeaderThird.innerHTML += `<p class="dataList ${btnList}"><span class="chekedOn">Ativo</span></p>`;
    } else if (mentoria.checkbox === false) {
      dataHeaderThird.innerHTML += `<p class="dataList ${btnList}"><span class="chekedOff">Inativo</span></p>`;
    }

    dataHeaderFourth.innerHTML += `
      <div class="dataList headerContent ${btnList}">
        <button onclick="editarMentor(${mentoria.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
        <button onclick="excluirMentor(${mentoria.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });
};



// Array que conterá os dados dos mentores
let mentorsData = [];

// ----------------- FUNÇÃO PARA BUSCAR A LISTA DE MENTORES -----------------
const getMentorias = async () => {
  try {
    const response = await fetch("https://apimentorclass.onrender.com/mentorias");
    if (!response.ok) {
      throw new Error('Erro ao buscar mentores.');
    }
    const data = await response.json();
    mentorsData = data; // Define a variável mentorsData com os dados da API diretamente
    renderMentor(mentorsData);
  } catch (error) {
    console.error("Erro ao buscar mentores:", error);
  }
};
//---------chamada da função e renderização------------//
getMentorias();

// ----------------- FUNÇÃO PARA FILTRAR A LISTA DE MENTORES COM BASE NA BARRA PESQUISA -----------------

const searchInput = document.getElementById('searchInput');

const filterMentores = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMentores = mentorsData.filter(mentor =>
    mentor.mentoria.toLowerCase().includes(searchTerm) ||
    mentor.mentor.toLowerCase().includes(searchTerm)
  );
  renderMentor(filteredMentores);
};

// EVENTO DE DIGITAÇÃO NO CAMPO DE PESQUISA
searchInput.addEventListener('input', filterMentores);




//-------------------NEW MENTOR---------------------//
const newMentorBtn = document.getElementById('newMentorBtn');
  newMentorBtn.addEventListener('click', () => {
    window.location = "mentoriaCadastro.html";
  });


// --------------EDITA MENTOR-------------------
const editarMentor = (id) => {
    window.location = `mentoriaEditavel.html?id=${id}`
// console.log('Editar Mentor:', idMentor);
};



// --------------DELETA MENTOR--------------------------//
const excluirMentor = async (id) => {
  try {
    await fetch(`https://apimentorclass.onrender.com/mentorias/${id}`, {
      method: 'DELETE'
    });

    // Remove o mentor do array mentorsData local
    mentorsData = mentorsData.filter(mentoria => mentoria.id !== id);

    // Atualiza a lista de mentores na página
    renderMentor(mentorsData);
  } catch (error) {
    console.error('Erro ao excluir mentor:', error);
  }
};


//buscar e renderizar os dados dos mentores
getMentorias();
