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

  if (mobileMenuTrigger && mobileMenu && overlay) {
    mobileMenuTrigger.addEventListener("click", function () {
      mobileMenu.classList.add("open");
      overlay.classList.add("active");
    });
  }

  if (closeMenuButton && mobileMenu && overlay) {
    closeMenuButton.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  if (overlay && mobileMenu) {
    overlay.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("active");
    });
  }
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
 * Exibe um toast personalizado
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo do toast (success, error, info)
 * @param {number} duration - Duração em ms (padrão: 3000ms)
 */
function showToast(message, type = "success", duration = 3000) {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer) {
    console.error("Container de toast não encontrado");
    return;
  }

  // Cria o elemento toast
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Define o ícone com base no tipo
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle toast-icon"></i>';
      break;
    case "error":
      icon = '<i class="fas fa-exclamation-circle toast-icon"></i>';
      break;
    case "info":
      icon = '<i class="fas fa-info-circle toast-icon"></i>';
      break;
    default:
      icon = '<i class="fas fa-bell toast-icon"></i>';
      break;
  }

  // Estrutura do toast
  toast.innerHTML = `
    ${icon}
    <div class="toast-content">${message}</div>
    <span class="toast-close">&times;</span>
  `;

  // Adiciona ao container
  toastContainer.appendChild(toast);

  // Ativa a animação imediatamente
  // Usar requestAnimationFrame para garantir que a transição funcione corretamente
  requestAnimationFrame(() => toast.classList.add("active"));

  // Configura o fechamento automático
  const closeTimeout = setTimeout(() => {
    closeToast(toast);
  }, duration);

  // Adiciona evento de clique para fechar
  const closeBtn = toast.querySelector(".toast-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      clearTimeout(closeTimeout);
      closeToast(toast);
    });
  }
}

/**
 * Fecha um toast com animação
 * @param {HTMLElement} toast - Elemento do toast a ser fechado
 */
function closeToast(toast) {
  // Remove a classe active para iniciar a animação de saída
  toast.classList.remove("active");

  // Remove o elemento após a animação terminar
  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300); // Tempo correspondente à duração da transição CSS
}

/**
 * Inicializa o formulário de demonstração
 */
function initDemoForm() {
  const demoForm = document.getElementById("demo-form");

  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Verifica se todos os campos obrigatórios estão preenchidos
      const name = this.querySelector("#name").value.trim();
      const email = this.querySelector("#email").value.trim();

      if (!name || !email) {
        showToast("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
      }

      // Exibe toast de sucesso
      showToast(
        "Obrigado! Entraremos em contato em breve para agendar sua consultoria.",
        "success",
        5000
      );

      // Reseta o formulário
      this.reset();
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
