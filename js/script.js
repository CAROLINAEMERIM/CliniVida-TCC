// 1. Scroll suave para âncoras do menu principal
document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 2. Destacar item do menu conforme a seção visível
window.addEventListener('scroll', () => {
  const secoes = ['#sobre', '#profissionais', '#planos', '#contato'];
  let scrollPos = window.scrollY || window.pageYOffset;
  secoes.forEach(id => {
    const secao = document.querySelector(id);
    const link = document.querySelector(`.menu a[href="${id}"]`);
    if (secao && link) {
      const offsetTop = secao.offsetTop - 130;
      const offsetBottom = offsetTop + secao.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        link.classList.add('ativo');
      } else {
        link.classList.remove('ativo');
      }
    }
  });
});

// 3. Mensagem de confirmação ao enviar o formulário de contato
const botaoEnviar = document.querySelector('.enviar-botao');
if (botaoEnviar) {
  botaoEnviar.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! Em breve entraremos em contato.');
    const campos = document.querySelectorAll('.campo-tabela');
    campos.forEach(campo => campo.value = '');
  });
}

// 4. Scroll suave para links do rodapé que usam #
document.querySelectorAll('.rodape-mapa a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});