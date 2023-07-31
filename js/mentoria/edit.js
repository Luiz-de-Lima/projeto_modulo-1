const formulario = document.getElementById('formulario');
let mentoriasId = null;

const buscarMentor = async (id) => {
    try {
        const resposta = await fetch(`https://apimentorclass.onrender.com/mentores/${id}`);
        const mentor = await resposta.json();
        return mentor;
    } catch (error) {
        console.error("ERRO AO BUSCAR MENTOR:", error);
        return null;
    }
};

const buscarMentores = async () => {
    try {
        const resposta = await fetch(`https://apimentorclass.onrender.com/mentores`);
        const mentores = await resposta.json();
        return mentores;
    } catch (error) {
        console.error("ERRO AO BUSCAR MENTORES:", error);
        return [];
    }
};

const carregarSelect = async () => {
    const mentorSelect = document.getElementById('nomeMentor');

    // Limpar o select antes de carregar as opções
    mentorSelect.innerHTML = '';

    try {
        const mentores = await buscarMentores();

        // Adicionar a opção 'Selecione um mentor...' desabilitada
        const opcaoVazia = new Option('Selecione um mentor...', '');
        opcaoVazia.disabled = true;
        mentorSelect.options.add(opcaoVazia);

        mentores.forEach((mentor) => {
            const opcao = new Option(mentor.nome, mentor.id);
            mentorSelect.options.add(opcao);
        });
    } catch (error) {
        console.error("ERRO AO CARREGAR A LISTA DE MENTORES:", error);
    }
};

const getIdUrl = () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    mentoriasId = params.get('id');
};

const buscartitulomentorias = async () => {
    const resposta = await fetch(`https://apimentorclass.onrender.com/mentorias/${mentoriasId}`);
    const mentorias = await resposta.json();
    return mentorias;
};

const editarMetoria = async (mentorias) => {
    try {
        await fetch(`https://apimentorclass.onrender.com/mentorias/${mentoriasId}`, {
            method: 'PUT',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(mentorias)
        });
        window.location = "./mentoria.html";
    } catch (error) {
        console.error("ERRO AO EDITAR MENTORIA:", error);
        // Adicionar mensagem de erro ao usuário (opcional)
    }
};

const carregarDadosFormulario = async (mentorias) => {
    if (mentorias) {
        document.getElementById('nomeMentoria').value = mentorias.mentoria;
        document.getElementById('nomeMentor').value = mentorias.mentor;
        document.getElementById('statusToggle').checked = mentorias.checkbox;

        const content_chk = document.getElementById('statusTxt');
        if (mentorias.checkbox === true) {
            content_chk.innerText = "Ativo";
        } else {
            content_chk.innerText = "Inativo";
        }
    }
};

const toggleStatus = () => {
    const checkbox = document.getElementById('statusToggle').checked;
    const inativo = document.getElementById('statusTxt');
    if (checkbox === true) {
        inativo.innerText = "Ativo";
    } else {
        inativo.innerText = "Inativo";
    }
};

const carregarDados = async () => {
    getIdUrl();
    const titulomentorias = await buscartitulomentorias();
    await carregarSelect();
    carregarDadosFormulario(titulomentorias);
};

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const mentoria = formulario.elements['nomeMentoria'].value;
    const mentor = formulario.elements['nomeMentor'].value;
    const checkbox = formulario.elements['statusToggle'].checked;

    // Verifica se um mentor foi selecionado antes de continuar
    if (!mentor || mentor === '') {
        alert("Por favor, selecione um mentor antes de editar a mentoria.");
        return;
    }

    const mentorObjeto = await buscarMentor(mentor);
    const titulomentorias = {
        mentoria,
        mentor: mentorObjeto.nome,
        checkbox
    };

    editarMetoria(titulomentorias);
});

carregarDados();
