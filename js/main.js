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
  const speed = 200;

  const animateCounter = function () {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const count = parseInt(counter.innerText);
      const increment = Math.trunc(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(animateCounter, 1);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Inicia a animação quando os elementos estiverem visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  });

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
 * Inicializa o formulário de demonstração
 */
function initDemoForm() {
  const demoForm = document.getElementById("demo-form");

  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Obrigado! Entraremos em contato em breve para agendar sua demonstração."
      );
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
