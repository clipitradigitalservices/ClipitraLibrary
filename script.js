/* ============================================
   CLIPITRA LANDING PAGE – JAVASCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById("navbar");
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateElements = document.querySelectorAll("[data-animate]");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, parseInt(delay));
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => animationObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counterElements = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counterElements.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  // ===== PRICING TOGGLE =====
  const pricingToggle = document.getElementById("pricingToggle");
  const monthlyLabel = document.getElementById("monthlyLabel");
  const yearlyLabel = document.getElementById("yearlyLabel");
  const monthlyPrices = document.querySelectorAll(".monthly-price");
  const yearlyPrices = document.querySelectorAll(".yearly-price");

  if (pricingToggle) {
    pricingToggle.addEventListener("change", () => {
      const isYearly = pricingToggle.checked;

      monthlyLabel.classList.toggle("active", !isYearly);
      yearlyLabel.classList.toggle("active", isYearly);

      monthlyPrices.forEach((el) => {
        el.style.display = isYearly ? "none" : "inline";
      });
      yearlyPrices.forEach((el) => {
        el.style.display = isYearly ? "inline" : "none";
      });
    });
  }

  // ===== SMOOTH ANCHOR SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML =
          '<i class="fas fa-check-circle"></i> <span>Message Sent!</span>';
        btn.style.background = "linear-gradient(135deg, #10b981, #059669)";

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll("section[id]");

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = "var(--primary-400)";
        } else {
          link.style.color = "";
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });

  // ===== PARALLAX FOR FLOATING CARDS =====
  const floatingCards = document.querySelectorAll(".floating-card");

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatingCards.forEach((card, i) => {
      const speed = (i + 1) * 5;
      card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ===== REPORT BAR ANIMATION =====
  const reportBars = document.querySelectorAll(".rc-fill");

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 },
  );

  reportBars.forEach((bar) => barObserver.observe(bar));

  // ===== SEAT GRID ANIMATION =====
  const seats = document.querySelectorAll(".seat-grid-visual .seat");
  const seatObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          seats.forEach((seat, i) => {
            seat.style.opacity = "0";
            seat.style.transform = "scale(0)";
            setTimeout(() => {
              seat.style.transition = "all 0.3s ease";
              seat.style.opacity = "1";
              seat.style.transform = "scale(1)";
            }, i * 50);
          });
          seatObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  const seatGrid = document.querySelector(".seat-grid-visual");
  if (seatGrid) seatObserver.observe(seatGrid);
});
