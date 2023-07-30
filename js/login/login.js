const btnLogin = document.querySelector(".btnLogin")

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos do formulário.");
    } else {
        window.location.href = "pages/mentor/mentor.html";
    }
});