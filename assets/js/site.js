(function () {
  'use strict';
  var root = document.documentElement;
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeColor = document.querySelector('meta[name="theme-color"]');
  var darkMode = window.matchMedia('(prefers-color-scheme: dark)');
  var mobile = window.matchMedia('(max-width: 900px)');

  function storedTheme() {
    try { return localStorage.getItem('theme'); } catch (error) { return null; }
  }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    if (themeColor) themeColor.content = theme === 'dark' ? '#152230' : '#ffffff';
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      try { localStorage.setItem('theme', theme); } catch (error) { /* The selected theme still works without storage. */ }
    });
  }
  darkMode.addEventListener('change', function (event) {
    var saved = storedTheme();
    if (saved !== 'dark' && saved !== 'light') applyTheme(event.matches ? 'dark' : 'light');
  });
  function setMenu(open, restoreFocus) {
    document.body.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (restoreFocus) toggle.focus();
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true', false); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && document.body.classList.contains('nav-open')) setMenu(false, true);
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target) && document.body.classList.contains('nav-open')) setMenu(false, false);
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && mobile.matches) setMenu(false, false);
    });
    mobile.addEventListener('change', function (event) {
      var focusInNav = nav.contains(document.activeElement);
      setMenu(false, event.matches && focusInNav);
      if (!event.matches && document.activeElement === toggle) nav.querySelector('a').focus();
    });
  }
  var archive = document.querySelector('[data-post-archive]');
  if (archive) {
    var filters = archive.querySelector('[data-post-filters]');
    var posts = Array.from(archive.querySelectorAll('[data-post-category]'));
    var count = archive.querySelector('[data-result-count]');
    var empty = archive.querySelector('[data-empty-results]');
    if (filters && count && empty) {
      filters.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-category]');
        if (!button) return;
        var category = button.dataset.category;
        var shown = 0;
        posts.forEach(function (post) {
          post.hidden = category !== 'all' && post.dataset.postCategory !== category;
          if (!post.hidden) shown += 1;
        });
        filters.querySelectorAll('button').forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === button));
        });
        count.textContent = (category === 'all' ? 'すべての記事' : category) + '：' + shown + '件';
        empty.hidden = shown > 0;
      });
      filters.hidden = false;
    }
  }
  var hero = document.querySelector('[data-hero-slideshow]');
  if (hero) {
    var slides = Array.from(hero.querySelectorAll('[data-hero-slide]'));
    var captions = Array.from(hero.querySelectorAll('[data-hero-caption]'));
    var controls = hero.querySelector('[data-hero-controls]');
    var choices = Array.from(hero.querySelectorAll('[data-hero-select]'));
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var playing = !reducedMotion.matches;
    var current = 0;
    var timer;
    function showSlide(index) {
      if (!slides[index].complete || !slides[index].naturalWidth) return;
      current = index;
      slides.forEach(function (slide, i) { slide.hidden = i !== current; });
      captions.forEach(function (caption, i) { caption.hidden = i !== current; });
      choices.forEach(function (choice, i) { choice.setAttribute('aria-pressed', String(i === current)); });
    }
    function scheduleSlides() {
      window.clearInterval(timer);
      if (playing && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
        timer = window.setInterval(function () { showSlide((current + 1) % slides.length); }, 6000);
      }
    }
    if (slides.length > 1) {
      controls.hidden = false;
      choices.forEach(function (choice, i) {
        choice.addEventListener('click', function () { showSlide(i); scheduleSlides(); });
      });
      hero.addEventListener('mouseenter', scheduleSlides);
      hero.addEventListener('mouseleave', scheduleSlides);
      hero.addEventListener('focusin', scheduleSlides);
      hero.addEventListener('focusout', function () { window.setTimeout(scheduleSlides, 0); });
      document.addEventListener('visibilitychange', scheduleSlides);
      reducedMotion.addEventListener('change', function () { if (reducedMotion.matches) playing = false; scheduleSlides(); });
      scheduleSlides();
    }
  }
  root.classList.add('js');
}());
