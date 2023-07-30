const renderTurmas = (turmas) => {
    const dataHeaderFirst = document.getElementById('dataHeaderFirst');
    const dataHeaderSecond = document.getElementById('dataHeaderSecond');
    const dataHeaderThird = document.getElementById('dataHeaderThird');
    const dataHeaderFourth = document.getElementById('dataHeaderFourth');
    const dataHeaderFifth = document.getElementById('dataHeaderFifth');
    const dataHeaderSixth = document.getElementById('dataHeaderSixth');
    const dataHeaderSeventh = document.getElementById('dataHeaderSeventh');
    const dataHeaderEighth = document.getElementById('dataHeaderEighth');
  
    dataHeaderFirst.innerHTML = '';
    dataHeaderSecond.innerHTML = '';
    dataHeaderThird.innerHTML = '';
    dataHeaderFourth.innerHTML = '';
    dataHeaderFifth.innerHTML = '';
    dataHeaderSixth.innerHTML = '';
    dataHeaderSeventh.innerHTML = '';
    dataHeaderEighth.innerHTML = '';
  
    turmas.forEach((turma, index) => {
      const btnList = index % 2 === 0 ? 'colorChangeOdd' : 'colorChangeEven';
  
      dataHeaderFirst.innerHTML += `
        <p class="dataList ${btnList}">${turma.turma}</p>
      `;
      dataHeaderSecond.innerHTML += `
        <p class="dataList ${btnList}">${turma.mentor}</p>
      `;
      dataHeaderThird.innerHTML += `
        <p class="dataList ${btnList}">${turma.mentoria}</p>
      `;
      dataHeaderFourth.innerHTML += `
        <p class="dataList ${btnList}">${turma.dataInicio}</p>
      `;
      dataHeaderFifth.innerHTML += `
        <p class="dataList ${btnList}">${turma.diaSemana}</p>
      `;
      dataHeaderSixth.innerHTML += `
        <p class="dataList ${btnList}">${turma.horaInicio} - ${turma.horaFim}h</p>
      `;
      dataHeaderSeventh.innerHTML += `
        <p class="dataList ${btnList}">${turma.encontros}</p>
      `;
      dataHeaderEighth.innerHTML += `
        <div class="dataList headerContent ${btnList}">
          <button onclick="editarTurma(${turma.id})" class="btnIcons btnEdit"><i class="fa-solid fa-pencil"></i></button>
          <button onclick="excluirTurma(${turma.id})" class="btnIcons btnTrash"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
    });
  };
  
  let turmasData = [];
  
  const getTurmas = async () => {
    try {
      const response = await fetch("https://apimentorclass.onrender.com/turmas");
      if (!response.ok) {
        throw new Error('Erro ao buscar as turmas.');
      }
      const turmas = await response.json();
      turmasData = [...turmas];
      renderTurmas(turmasData); 
    } catch (error) {
      console.error("Erro ao buscar as turmas:", error);
    }
  };
  
  const searchInput = document.getElementById('searchInput');
  
  const filterTurmas = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTurmas = turmasData.filter(turma =>
      turma.turma.toLowerCase().includes(searchTerm) ||
      turma.mentor.toLowerCase().includes(searchTerm) ||
      turma.mentoria.toLowerCase().includes(searchTerm)
    );
    renderTurmas(filteredTurmas);
  };
  
  searchInput.addEventListener('input', filterTurmas);
  


  const newMentorBtn = document.getElementById('newMentorBtn');
  newMentorBtn.addEventListener('click', () => {
    window.location = "turmaCadastro.html";
  });
  


  const editarTurma = (id) => {
    window.location = `turmaEditavel.html?id=${id}`;
  };
  



  
  const excluirTurma = async (id) => {
    try {
      await fetch(`https://apimentorclass.onrender.com/turmas/${id}`, {
        method: 'DELETE'
      });
  
      turmasData = turmasData.filter(turma => turma.id !== id);
  
      renderTurmas(turmasData);
    } catch (error) {
      console.error('Erro ao excluir turma:', error);
    }
  };
  
  getTurmas();
  