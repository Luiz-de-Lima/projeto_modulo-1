const btnLogin = document.querySelector(".btnLogin")

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (email === "" || senha === "") {
        alert("Campos vazios, por favor preencha");
    } else {
        window.location.href = "pages/mentores/mentores.html";
    }
});