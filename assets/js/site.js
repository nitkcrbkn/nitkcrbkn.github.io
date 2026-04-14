document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------------------------------------------
     THEME TOGGLE
     --------------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");
  var menuToggleLabel = document.querySelector("[data-menu-toggle-label]");
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var themeToggleLabel = document.querySelector("[data-theme-toggle-label]");
  var root = document.documentElement;
  var darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      /* ignore storage failures and keep the in-memory theme */
    }
  }

  function applyMenuToggleState(isOpen) {
    if (!toggle) {
      return;
    }

    var nextLabel = isOpen ? "メニューを閉じる" : "メニューを開く";

    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", nextLabel);

    if (menuToggleLabel) {
      menuToggleLabel.textContent = nextLabel;
    }
  }

  function applyTheme(theme, persist) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    var nextLabel = nextTheme === "dark" ? "ライトモード" : "ダークモード";

    root.dataset.theme = nextTheme;

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", nextLabel);
      themeToggle.setAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
    }

    if (themeToggleLabel) {
      themeToggleLabel.textContent = nextLabel;
    }

    if (persist) {
      setStoredTheme(nextTheme);
    }
  }

  if (themeToggle) {
    applyTheme(root.dataset.theme, false);

    themeToggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });

    darkModeMedia.addEventListener("change", function (event) {
      if (getStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? "dark" : "light", false);
    });
  }

  /* ---------------------------------------------------------------
     MOBILE NAV TOGGLE
     --------------------------------------------------------------- */
  if (toggle && nav) {
    applyMenuToggleState(document.body.classList.contains("nav-open"));

    toggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      applyMenuToggleState(isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        applyMenuToggleState(false);
      });
    });
  }

  /* ---------------------------------------------------------------
     HEADER SHRINK ON SCROLL
     --------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var shrinkEnterThreshold = 76;
    var shrinkExitThreshold = 28;
    var isHeaderCompact = false;
    var ticking = false;

    function updateHeader() {
      var scrollY = window.scrollY;

      if (!isHeaderCompact && scrollY > shrinkEnterThreshold) {
        header.classList.add("is-scrolled");
        isHeaderCompact = true;
      } else if (isHeaderCompact && scrollY < shrinkExitThreshold) {
        header.classList.remove("is-scrolled");
        isHeaderCompact = false;
      }

      ticking = false;
    }

    updateHeader();

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------
     SCROLL REVEAL (Intersection Observer)
     --------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
    if (revealElements.length > 0 && "IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      });

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  } else {
    /* if reduced motion, show everything immediately */
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------------
     BACK TO TOP BUTTON
     --------------------------------------------------------------- */
  var backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    var topTicking = false;
    var showTopThreshold = 400;

    function updateBackToTop() {
      if (window.scrollY > showTopThreshold) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
      topTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!topTicking) {
        requestAnimationFrame(updateBackToTop);
        topTicking = true;
      }
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------------
     CARD TILT EFFECT (desktop only)
     --------------------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    var tiltCards = document.querySelectorAll(".feature-card, .value-card, .robot-card");

    tiltCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -3;
        var rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-3px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------
     BUTTON RIPPLE EFFECT
     --------------------------------------------------------------- */
  document.querySelectorAll(".button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);

      ripple.addEventListener("animationend", function () {
        ripple.remove();
      });
    });
  });
});
