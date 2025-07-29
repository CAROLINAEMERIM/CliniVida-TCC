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
    e.preventDefault(); // Evita o envio padrão do formulário
    alert('Mensagem enviada! Em breve entraremos em contato.');
    // Limpa os campos do formulário após o envio simulado
    const campos = document.querySelectorAll('.campo-tabela');
    campos.forEach(campo => campo.value = '');
  });
}

// 4. Modais (genéricos)
function abrirModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = 'flex'; // Mostra o modal (flex para centralizar)
  }
}

function fecharModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = 'none'; // Esconde o modal
  }
}

// 5. Modais de login e cadastro com animação
function abrirModalAnimado(idModal, triggerId) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add('ativo'); // Adiciona a classe 'ativo' para mostrar e animar
  }
}

const btnLogin = document.getElementById('abrir-login');
if (btnLogin) {
  btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    abrirModalAnimado('modal-login', 'abrir-login');
  });
}

const btnCadastro = document.getElementById('abrir-cadastro');
if (btnCadastro) {
  btnCadastro.addEventListener('click', function(e) {
    e.preventDefault();
    abrirModalAnimado('modal-cadastro', 'abrir-cadastro');
  });
}

// Lógica para fechar modais ao clicar fora do conteúdo
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal-plano.ativo');
  modals.forEach(modal => {
    if (event.target === modal) {
      fecharModal(modal.id);
    }
  });
});

// Links dentro do modal de login para alternar para o cadastro
const linkCadastro = document.getElementById('abrir-cadastro-link');
if (linkCadastro) {
  linkCadastro.addEventListener('click', function(e) {
    e.preventDefault();
    fecharModal('modal-login');
    setTimeout(() => abrirModalAnimado('modal-cadastro', 'abrir-cadastro'), 350);
  });
}

// LOGIN
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    // Busca os dados salvos no cadastro
    const emailCadastrado = localStorage.getItem('paciente_email');
    const senhaCadastrada = localStorage.getItem('paciente_senha');

    if (email === emailCadastrado && senha === senhaCadastrada) {
      window.location.href = 'paciente.html';
    } else {
      alert('E-mail ou senha incorretos!');
    }
  });
}

// CADASTRO
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data').value;
    const generoElement = document.querySelector('input[name="genero"]:checked');
    const genero = generoElement ? generoElement.value : '';

    // Salva nome, email, senha, telefone, data de nascimento e gênero no localStorage
    localStorage.setItem('paciente_nome', nome);
    localStorage.setItem('paciente_email', email);
    localStorage.setItem('paciente_senha', senha);
    localStorage.setItem('paciente_telefone', telefone);
    localStorage.setItem('paciente_dataNascimento', dataNascimento);
    localStorage.setItem('paciente_genero', genero);


    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    fecharModal('modal-cadastro'); // Fecha o modal de cadastro
    abrirModalAnimado('modal-login'); // Abre o modal de login para o usuário logar
  });
}

// Lógica para seleção de planos (na página plano.html)
document.addEventListener('DOMContentLoaded', function() {
  const botoesAssinar = document.querySelectorAll('.btn-assinar');
  botoesAssinar.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const planoId = this.getAttribute('data-plano-id');
      const modalId = this.getAttribute('data-modal-id');

      // Remove destaque de todos os planos
      document.querySelectorAll('.plano-card-paciente').forEach(card => {
        card.classList.remove('plano-atual-destaque');
      });

      // Adiciona destaque ao novo plano
      const novoPlanoCard = document.getElementById(planoId);
      if (novoPlanoCard) {
        novoPlanoCard.classList.add('plano-atual-destaque');

        // Atualiza a seção de plano atual
        const planoNome = novoPlanoCard.querySelector('h2').textContent; // Pega o nome do plano
        const planoDesc = novoPlanoCard.querySelector('.descricao-plano').innerHTML; // Pega a descrição HTML
        const planoValor = novoPlanoCard.querySelector('.valor-plano').textContent; // Pega o valor

        document.getElementById('current-plan-name').textContent = planoNome;
        document.getElementById('current-plan-details').innerHTML = planoDesc;
        document.getElementById('current-plan-value').textContent = planoValor + "/mês";
        document.getElementById('current-plan-section').style.display = 'block'; // Mostra a seção de plano atual
      }

      fecharModal(modalId); // Fecha o modal após "assinar"
      alert('Plano assinado com sucesso! (Simulação)');
    });
  });
});

// Lógica para abrir modais de detalhes de planos
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.botao-saiba-mais1, .botao-saiba-mais2, .botao-saiba-mais3, .botao-saiba-mais4, .botao-saiba-mais5, .botao-saiba-mais6, .botao-saiba-mais7, .botao-saiba-mais8').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      if (modalId) {
        abrirModalAnimado(modalId);
      }
    });
  });
});

// Lógica do calendário de agendamentos
document.addEventListener('DOMContentLoaded', function() {
  const calendarDays = document.getElementById('calendar-days');
  const monthYearDisplay = document.getElementById('month-year');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function renderCalendar(year, month) {
    calendarDays.innerHTML = ''; // Limpa os dias anteriores
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDays = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    monthYearDisplay.textContent = new Date(year, month).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

    // Preencher dias vazios no início do mês
    for (let i = 0; i < startDay; i++) {
      const emptyDiv = document.createElement('div');
      calendarDays.appendChild(emptyDiv);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= numDays; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('dia-calendario');
      dayDiv.textContent = day;
      // Adicionar lógica para dias indisponíveis (exemplo)
      if (day % 7 === 0 || day % 13 === 0) { // Exemplo: dias 7, 13, 14, 20, 21, 26, 27 são indisponíveis
        dayDiv.classList.add('unavailable');
      } else {
        dayDiv.addEventListener('click', function() {
          // Remove a classe 'selected' de todos os outros dias
          document.querySelectorAll('.dia-calendario.selected').forEach(d => d.classList.remove('selected'));
          this.classList.add('selected'); // Adiciona 'selected' ao dia clicado
        });
      }
      calendarDays.appendChild(dayDiv);
    }
  }

  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

  renderCalendar(currentYear, currentMonth); // Renderiza o calendário inicial

  // Lógica para selecionar horários (exemplo)
  document.querySelectorAll('.horario-btn').forEach(button => {
    button.addEventListener('click', function() {
      if (!this.classList.contains('unavailable')) {
        document.querySelectorAll('.horario-btn.active').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});


// Lógica de pesquisa de histórico (exemplo na página historico.html)
document.addEventListener('DOMContentLoaded', function() {
  const btnPesquisarHistorico = document.querySelector('.btn-pesquisar-historico');
  if (btnPesquisarHistorico) {
    btnPesquisarHistorico.addEventListener('click', function() {
      const inicio = document.getElementById('periodoInicial').value;
      const fim = document.getElementById('periodoFinal').value;
      alert(`Pesquisando histórico de ${inicio || 'início'} a ${fim || 'fim'}. (Simulação)`);
      // Aqui você faria uma chamada AJAX para buscar os dados e preencher a tabela dinamicamente
    });
  }
});

// Lógica de FAQ (na página ajuda.html)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      faqItem.classList.toggle('active');

      const faqAnswer = faqItem.querySelector('.faq-answer');
      if (faqItem.classList.contains('active')) {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      } else {
        faqAnswer.style.maxHeight = '0';
      }
    });
  });

  // Lógica de pesquisa de FAQ (simples, apenas filtra no front-end)
  const faqSearch = document.getElementById('faqSearch');
  if (faqSearch) {
    faqSearch.addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll('.faq-item').forEach(item => {
        const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});


// Função de sair (copiada para todas as páginas de paciente)
const sairBtn = document.getElementById('sair');
if (sairBtn) {
  sairBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Limpa os dados do localStorage ao sair
    localStorage.removeItem('paciente_nome');
    localStorage.removeItem('paciente_email');
    localStorage.removeItem('paciente_senha');
    localStorage.removeItem('paciente_telefone');
    localStorage.removeItem('paciente_dataNascimento');
    localStorage.removeItem('paciente_genero');
    // Redireciona para a página inicial
    window.location.href = "index.html"; // Assumindo que index.html está no mesmo nível ou raiz
  });
}

// Lógica da página Meu Perfil
document.addEventListener('DOMContentLoaded', function() {
  // Preencher campos do perfil com dados do localStorage (se existirem)
  const loginField = document.getElementById('login');
  const nomeField = document.getElementById('nome');
  const telefoneField = document.getElementById('telefone');
  const dataNascimentoField = document.getElementById('dataNascimento');
  const generoMasculinoRadio = document.getElementById('masculino');
  const generoFemininoRadio = document.getElementById('feminino');

  if (loginField) {
    loginField.value = localStorage.getItem('paciente_email') || '';
  }
  if (nomeField) {
    nomeField.value = localStorage.getItem('paciente_nome') || '';
  }
  if (telefoneField) {
    telefoneField.value = localStorage.getItem('paciente_telefone') || '';
  }
  if (dataNascimentoField) {
    dataNascimentoField.value = localStorage.getItem('paciente_dataNascimento') || '';
  }
  if (generoMasculinoRadio && localStorage.getItem('paciente_genero') === 'Masculino') {
    generoMasculinoRadio.checked = true;
  }
  if (generoFemininoRadio && localStorage.getItem('paciente_genero') === 'Feminino') {
    generoFemininoRadio.checked = true;
  }


  // Botão de "fechar" no canto superior direito
  document.querySelector('.fechar-pagina').addEventListener('click', function(e) {
    e.preventDefault();
    window.history.back(); // Volta para a página anterior (paciente.html)
  });

  // Exemplo de como você lidaria com o botão "Alterar senha"
  document.querySelector('.btn-alterar-senha').addEventListener('click', function() {
    alert('Funcionalidade de Alterar Senha será implementada.');
    // Redirecionar para uma página de alteração de senha ou abrir um modal
    // window.location.href = 'alterar_senha.html';
  });

  // Exemplo de como você lidaria com o salvamento do formulário de perfil
  document.querySelector('.form-perfil').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dados do perfil salvos com sucesso!');
    // Atualizar dados no localStorage (simulação)
    localStorage.setItem('paciente_nome', document.getElementById('nome').value);
    localStorage.setItem('paciente_telefone', document.getElementById('telefone').value);
    localStorage.setItem('paciente_dataNascimento', document.getElementById('dataNascimento').value);
    const generoElementAtual = document.querySelector('input[name="genero"]:checked');
    localStorage.setItem('paciente_genero', generoElementAtual ? generoElementAtual.value : '');


    // Aqui você enviaria os dados do formulário para o backend
    // const formData = new FormData(e.target);
    // fetch('/api/salvar-perfil', { method: 'POST', body: formData })
    //     .then(response => response.json())
    //     .then(data => console.log(data));
  });
});