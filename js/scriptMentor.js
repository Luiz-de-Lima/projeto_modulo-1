const btnteste = document.querySelector('.met')
const menuItems = document.querySelectorAll("menu-item")



function carregarPagina(url) {
  // Realiza a requisição AJAX para obter o conteúdo da página
  fetch(url)
    .then(response => response.text()) // Transforma a resposta em texto
    .then(data => {
      // Insere o conteúdo da página no elemento com ID "conteudo"
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => {
      console.error('Erro ao carregar a página:', error);
    });
}



const loadContent = (e) => {
  e.preventDefault()
  console.log(e.target.getAttribute('href'))
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = ''
  const href = e.target.getAttribute('href')
  console.log(href)
  console.log('opa')
}
menuItems.forEach(item => {
  item.addEventListener('click', loadContent);
});
btnteste.addEventListener('click', loadContent)