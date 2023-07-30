const buscarMentoria = async (id) => {
    const response = await fetch(`https://apimentorclass.onrender.com/mentorias/${id}`)
    const mentoria = response.json()
    return mentoria
}
const buscarMentorias = async () =>{
    const response = await fetch(`https://apimentorclass.onrender.com/mentorias/`)
    const mentorias = response.json()
    return mentorias
}

//-------CARREGA AS OPÇÕES DO SELECT COM AS MENTORIAS DA API------//
const carregarMentoriaSelect = async () => {
    const mentoriaSelect = document.getElementById('mentoria');
    const opcaoVazia = new Option('Selecione uma mentoria...');
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
carregarMentoriaSelect()

//------------------------BUSCAMENTOR------------------------------//
const buscarMentor = async (id)=> {
    const resposta = await fetch(`https://apimentorclass.onrender.com/mentores/${id}`)
    const mentor = await resposta.json()
    return mentor
}

const buscarMentores = async ()=> {
    const resposta = await fetch(`https://apimentorclass.onrender.com/mentores`)
    const mentores = await resposta.json()
    return mentores
}

//------CARREGA AS OPÇÕES DO SELECT COM OS MENTORES DA API------//
const carregarMentorSelect = async () => {
    const mentorSelect = document.getElementById('mentor');
    const opcaoVazia = new Option('Selecione um mentor...');
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
carregarMentorSelect()




//-----------------------BUSCASEMANA---------------------------
const buscarSemana = async (id) => {
    const response = await fetch(`https://apimentorclass.onrender.com/semanas/${id}`)
    const semanas = await response.json()
    return semanas

}
const buscarSemanas = async () => {
    const response = await fetch('https://apimentorclass.onrender.com/semanas')
    const buscarSemanas = await response.json()
    return buscarSemanas
}

// -------CARREGA AS OPÇÕES DO SELECT COM AS SEMANAS DA API-------//
const carregarSelectDiasSemana = async () => {
    const semanaSelect = document.getElementById('diaSemana');
    const opcaoVazia = new Option('Selecione um dia da semana...');
    semanaSelect.options.add(opcaoVazia);

    try {
        const semanas = await buscarSemanas();
        semanas.forEach((semanas) => {
            const opcao = new Option(semanas.semana, semanas.id);
            semanaSelect.options.add(opcao);
        });
    } catch (error) {
        console.error("ERRO AO CARREGAR A LISTA DE SEMANAS:", error);
    }
};
carregarSelectDiasSemana();


// Função para extrair informações do formulário
const extrairInformacoesFormulario = () => {
    const turma = formulario.elements['turma'].value;
    const mentor = formulario.elements['mentor'].value;
    const mentoria = formulario.elements['mentoria'].value;
    const dataInicio = formulario.elements['dataInicio'].value;
    const diaSemana = formulario.elements['diaSemana'].value;
    const horaInicio = formulario.elements['horaInicio'].value;
    const horaFim = formulario.elements['horaFim'].value;
    const encontros = formulario.elements['encontros'].value;
    const link = formulario.elements['link'].value;

    return {
        turma,
        mentor,
        mentoria,
        dataInicio,
        diaSemana,
        horaInicio,
        horaFim,
        encontros,
        link
    };
};

// Função para criar uma nova turma
const novaTurma = async (turmas) => {
    try {
        await fetch('https://apimentorclass.onrender.com/turmas', {
            method: 'POST',
            headers: {
                "ACCEPT": 'application/json, text/plain, */*',
                "CONTENT-TYPE": 'application/json'
            },
            body: JSON.stringify(turmas)
        });
        window.location = "turmasIndex.html";
    } catch (error) {
        console.error("ERRO AO CRIAR NOVA TURMA:", error);
    }
};

// Adiciona evento ao formulário para criar nova turma
// Adiciona evento ao formulário para criar nova turma
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

    // Verifica se algum campo está vazio
    if (!turma || !mentor || !mentoria || !dataInicio || !diaSemana || !horaInicio || !horaFim || !encontros || !link) {
        alert("Por favor, preencha todos os campos antes de criar a nova turma.");
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
        horaInicio: horaInicio ? horaInicio : null, // Verificação usando operador ternário
        horaFim: horaFim ? horaFim : null, // Verificação usando operador ternário
        encontros,
        link
    };

    novaTurma(turmas);
});