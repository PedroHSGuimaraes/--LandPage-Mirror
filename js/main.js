/**
 * Mirror Studio AI - Scripts Principais
 * Este arquivo contém todos os scripts JavaScript para a landing page
 */

document.addEventListener("DOMContentLoaded", function () {
  // Inicializa todas as funcionalidades
  initScrollEvents();
  initMobileMenu();
  initCountersAnimation();
  initCursorEffects();
  initFAQToggle();
  initDemoForm();
  initSmoothScrolling();
  initToastContainer(); // Inicializa o container para os toasts
  checkFormSubmission(); // Verifica se o formulário foi enviado
  initChatInterface(); // Inicializa a interface de chat do smartphone
});

/**
 * Inicializa eventos baseados em scroll
 */
function initScrollEvents() {
  const progressBar = document.getElementById("progressBar");

  window.addEventListener("scroll", function () {
    // Atualiza barra de progresso
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    // Header fixo
    const stickyHeader = document.querySelector(".sticky-header");
    if (stickyHeader) {
      if (window.scrollY > 200) {
        stickyHeader.classList.add("visible");
      } else {
        stickyHeader.classList.remove("visible");
      }
    }
  });
}

/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
  const mobileMenuTrigger = document.getElementById("mobileMenuTrigger");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  // Função para fechar o menu
  const closeMenu = function () {
    if (mobileMenu && overlay) {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("active");
      // Permitir scroll da página ao fechar o menu
      document.body.classList.remove("no-scroll");
    }
  };

  if (mobileMenuTrigger && mobileMenu && overlay) {
    mobileMenuTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      mobileMenu.classList.add("open");
      overlay.classList.add("active");
      // Impedir scroll da página quando o menu estiver aberto
      document.body.classList.add("no-scroll");
    });
  }

  if (closeMenuButton && mobileMenu && overlay) {
    closeMenuButton.addEventListener("click", function (e) {
      e.preventDefault();
      closeMenu();
    });
  }

  if (overlay && mobileMenu) {
    overlay.addEventListener("click", function () {
      closeMenu();
    });
  }

  // Fechar o menu ao clicar em links internos
  if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
  }

  // Fechar o menu ao pressionar a tecla ESC
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      mobileMenu &&
      mobileMenu.classList.contains("open")
    ) {
      closeMenu();
    }
  });
}

/**
 * Inicializa animação dos contadores
 */
function initCountersAnimation() {
  const counters = document.querySelectorAll(".counter");
  // Ajustando speed para um valor menor para melhorar a animação
  const speed = 50;

  const animateCounter = function () {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const count = parseInt(counter.innerText);

      // Calculando um incremento mínimo para garantir que todos os contadores funcionem
      // Para valores pequenos, usar incremento fixo de 1
      let increment = Math.max(1, Math.trunc(target / speed));

      // Para números menores que 100, usar incremento menor
      if (target < 100) {
        increment = 1;
      }

      if (count < target) {
        counter.innerText = Math.min(count + increment, target);
        setTimeout(animateCounter, 20);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Inicia a animação quando os elementos estiverem visíveis
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reiniciar o contador para 0 antes de iniciar a animação
          const counter = entry.target;
          counter.innerText = "0";
          setTimeout(() => {
            animateCounter();
          }, 100);
          observer.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.1, // Iniciar animação quando pelo menos 10% do elemento estiver visível
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/**
 * Inicializa efeitos de cursor personalizados
 */
function initCursorEffects() {
  const cursorGlow = document.getElementById("cursorGlow");
  const cursorDot = document.getElementById("cursorDot");

  if (cursorGlow && cursorDot) {
    document.addEventListener("mousemove", function (e) {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";

      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });

    // Efeito de hover para links e botões
    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursorGlow.style.width = "50px";
        cursorGlow.style.height = "50px";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
      });

      element.addEventListener("mouseleave", function () {
        cursorGlow.style.width = "30px";
        cursorGlow.style.height = "30px";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });
  }
}

/**
 * Inicializa o toggle das seções FAQ
 */
function initFAQToggle() {
  window.toggleFAQ = function (element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector("i");

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      icon.classList.add("rotate-180");
    } else {
      content.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  };
}

/**
 * Inicializa o widget de chat
 */
function initChatWidget() {
  window.toggleChat = function () {
    const iframe = document.getElementById("n8n-chat-iframe");
    if (iframe) {
      if (iframe.style.display === "none" || iframe.style.display === "") {
        iframe.style.display = "block";
        iframe.src = "https://example.com/chat"; // Substituir com URL real do chat
      } else {
        iframe.style.display = "none";
      }
    }
  };
}

/**
 * Cria o container para os toasts
 */
function initToastContainer() {
  // Verifica se já existe um container de toast
  if (!document.getElementById("toast-container")) {
    // Cria o container de toast
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-4";
    document.body.appendChild(toastContainer);

    // Adiciona estilos para o toast no head
    const style = document.createElement("style");
    style.textContent = `
      .toast {
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        display: flex;
        align-items: center;
        transform: translateX(20px);
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      .toast.success {
        background-color: #10B981;
        border-left: 5px solid #059669;
      }
      .toast.error {
        background-color: #EF4444;
        border-left: 5px solid #B91C1C;
      }
      .toast.info {
        background-color: #3B82F6;
        border-left: 5px solid #1D4ED8;
      }
      .toast.active {
        transform: translateX(0);
        opacity: 1;
      }
      .toast-icon {
        margin-right: 0.75rem;
        font-size: 1.25rem;
      }
      .toast-content {
        flex: 1;
      }
      .toast-close {
        cursor: pointer;
        margin-left: 0.75rem;
        font-size: 1.25rem;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .toast-close:hover {
        opacity: 1;
      }
      @media (max-width: 640px) {
        #toast-container {
          width: calc(100% - 2rem);
          right: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Exibe um toast na tela
 */
function showToast(message, type = "success", duration = 5000, title = "") {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer) return;

  // Criar o elemento toast
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  // Definir ícones com base no tipo
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle"></i>';
      if (!title) title = "Sucesso!";
      break;
    case "error":
      icon = '<i class="fas fa-exclamation-circle"></i>';
      if (!title) title = "Erro!";
      break;
    case "info":
      icon = '<i class="fas fa-info-circle"></i>';
      if (!title) title = "Informação";
      break;
    case "warning":
      icon = '<i class="fas fa-exclamation-triangle"></i>';
      if (!title) title = "Atenção!";
      break;
  }

  // Estrutura do toast
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div>${message}</div>
    </div>
    <button class="toast-close">&times;</button>
    <div class="toast-progress"></div>
  `;

  // Adicionar ao container
  toastContainer.appendChild(toast);

  // Animate-in
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Configurar evento de fechamento
  const closeButton = toast.querySelector(".toast-close");
  closeButton.addEventListener("click", () => {
    closeToast(toast);
  });

  // Auto-hide after duration
  if (duration > 0) {
    setTimeout(() => {
      closeToast(toast);
    }, duration);
  }

  return toast;
}

/**
 * Fecha um toast
 */
function closeToast(toast) {
  toast.classList.remove("show");
  setTimeout(() => {
    toast.remove();
  }, 300);
}

/**
 * Verifica se o formulário foi enviado com sucesso (após redirecionamento)
 */
function checkFormSubmission() {
  // Verifica se existe o parâmetro 'enviado' na URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("enviado") === "true") {
    // Exibe a mensagem de sucesso
    const formSuccess = document.getElementById("form-success");
    const demoForm = document.getElementById("demo-form");

    if (formSuccess && demoForm) {
      // Oculta o formulário e mostra a mensagem de sucesso
      demoForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");

      // Rolagem suave até a mensagem de sucesso
      formSuccess.scrollIntoView({ behavior: "smooth" });

      // Exibe um toast de sucesso
      if (typeof showToast === "function") {
        showToast("Formulário enviado com sucesso!", "success", 5000);
      }

      // Remove o parâmetro da URL para evitar mostrar a mensagem ao recarregar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

/**
 * Inicializa o formulário de demonstração
 */
function initDemoForm() {
  const demoForm = document.getElementById("demo-form");

  if (demoForm) {
    // Adiciona animação ao botão de envio
    const submitButton = demoForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.addEventListener("mouseenter", function () {
        this.classList.add("pulse-animation");
      });
      submitButton.addEventListener("mouseleave", function () {
        this.classList.remove("pulse-animation");
      });
    }

    // Adiciona validação personalizada antes do envio
    demoForm.addEventListener("submit", function (e) {
      // Verifica se pelo menos uma opção de interesse foi selecionada
      const checkboxes = this.querySelectorAll('input[type="checkbox"]');
      let atLeastOneChecked = false;

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          atLeastOneChecked = true;
        }
      });

      if (!atLeastOneChecked && checkboxes.length > 0) {
        e.preventDefault();
        if (typeof showToast === "function") {
          showToast(
            "Por favor, selecione pelo menos uma opção de interesse.",
            "error"
          );
        } else {
          alert("Por favor, selecione pelo menos uma opção de interesse.");
        }
        return false;
      }

      // Se passar na validação, exibe indicador de carregamento no botão
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
      submitButton.disabled = true;
    });
  }
}

/**
 * Inicializa o rolamento suave para links âncora
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Inicializa a interface de chat do smartphone
 */
function initChatInterface() {
  const messageInput = document.querySelector(".chat-input-field");
  const sendButton = document.querySelector(".chat-send-button");

  if (!messageInput || !sendButton) return;

  // Enviar mensagem ao pressionar Enter
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  });

  // Enviar mensagem ao clicar no botão de envio
  sendButton.addEventListener("click", sendChatMessage);

  function sendChatMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const chatMessages = document.querySelector(".chat-messages");

    // Criar e adicionar a mensagem do usuário
    const message = document.createElement("div");
    message.className = "message message-outgoing animate-message-pop";
    message.innerHTML = `
      ${text}
      <div class="message-time">${getCurrentTime()}</div>
    `;
    chatMessages.appendChild(message);

    // Limpar o input
    messageInput.value = "";

    // Rolar para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Mostrar "digitando..." após enviar a mensagem
    setTimeout(() => {
      showTypingIndicator();
    }, 500);

    // Simular resposta automática após um tempo
    setTimeout(() => {
      removeTypingIndicator();
      showAutoResponse();
    }, 3000);
  }

  function showTypingIndicator() {
    const chatMessages = document.querySelector(".chat-messages");
    const typingElement = document.createElement("div");
    typingElement.className =
      "message message-incoming animate-message-pop typing-indicator";
    typingElement.innerHTML = `
      <div class="message-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  function showAutoResponse() {
    const chatMessages = document.querySelector(".chat-messages");
    const responses = [
      "Claro! Posso ajudar com isso. Nossos consultores entrarão em contato para apresentar a solução ideal para sua empresa.",
      "Temos várias opções para atender empresas de todos os tamanhos. Podemos preparar um orçamento personalizado para você.",
      "Excelente escolha! Nossa automação de e-commerce já ajudou centenas de empresas a aumentar suas vendas.",
      "Os preços variam de acordo com as funcionalidades escolhidas. Vamos agendar uma demonstração gratuita para sua empresa?",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const message = document.createElement("div");
    message.className = "message message-incoming animate-message-pop";
    message.innerHTML = `
      ${randomResponse}
      <div class="message-time">${getCurrentTime()}</div>
    `;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Mostrar toast para enfatizar a interação
    showToast("Você recebeu uma nova mensagem!", "info", 3000, "Chat Ativo");
  }

  function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  }
}
