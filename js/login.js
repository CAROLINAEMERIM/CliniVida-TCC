function validarCampos(email, password) {
  if (!email || !password) {
    alert("Preencha todos os campos");
    return false;
  }
  if (localStorage.getItem('usuarioCadastrado') !== email) {
    alert("Usuário não cadastrado!");
    return false;
  }
  return true;
}

function login(email, password) {
  localStorage.setItem('usuarioLogado', email);
  location.href = "indexcadastrado.html";
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLogin');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (validarCampos(email, password)) {
        login(email, password);
      }
    });
  }
});