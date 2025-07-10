document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formCadastro');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const data = document.getElementById('data').value.trim();
      const genero = form.querySelector('input[name="genero"]:checked');

      if (!nome || !email || !senha || !telefone || !data || !genero) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      localStorage.setItem('usuarioCadastrado', email);
      alert('Cadastro realizado com sucesso!');
      window.location.href = "indexcadastrado.html";
    });
  }
});