(function() {
  // Theme toggle
  var toggle = document.getElementById('theme-toggle');
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  var sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  toggle.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
  toggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.innerHTML = next === 'dark' ? moonIcon : sunIcon;
  });

  // Word-cycle hover effect
  var cycleEl = document.querySelector('.hover-word-cycle');
  if (cycleEl) {
    var words = [
      { text: 'Ship', width: '4.3ch' },
      { text: 'Build', width: '5.2ch' },
      { text: 'Fix', width: '3.2ch' },
      { text: 'Explore', width: '7.0ch' }
    ];
    var cycleSpan = document.createElement('span');
    cycleSpan.className = 'cycle-text';
    cycleEl.appendChild(cycleSpan);

    var wordIndex = 0;
    var timer = null;

    function showWord(i) {
      cycleSpan.classList.add('fade-out');
      setTimeout(function() {
        cycleSpan.textContent = words[i].text;
        cycleEl.style.width = words[i].width;
        cycleSpan.classList.remove('fade-out');
      }, 150);
    }

    cycleEl.addEventListener('mouseenter', function() {
      wordIndex = 0;
      cycleEl.classList.add('cycling');
      cycleEl.style.width = words[0].width;
      cycleSpan.textContent = words[0].text;
      cycleSpan.classList.remove('fade-out');
      timer = setInterval(function() {
        wordIndex = (wordIndex + 1) % words.length;
        showWord(wordIndex);
      }, 1500);
    });

    cycleEl.addEventListener('mouseleave', function() {
      clearInterval(timer);
      timer = null;
      cycleEl.classList.remove('cycling');
      cycleEl.style.width = '';
      cycleSpan.textContent = '';
    });
  }

  // Fullpage scroll system
  if (!document.body.classList.contains('fullpage')) return;

  var wrapper = document.getElementById('sections-wrapper');
  var sections = document.querySelectorAll('.section');
  var navButtons = document.querySelectorAll('.nav-button');
  var currentIndex = 0;
  var isAnimating = false;
  var animationDuration = 850;

  function updateActiveStates(index) {
    sections.forEach(function(s, i) {
      if (i === index) {
        s.classList.add('section-active');
      } else {
        s.classList.remove('section-active');
      }
    });
    navButtons.forEach(function(btn, i) {
      if (i === index) {
        btn.classList.add('nav-active');
      } else {
        btn.classList.remove('nav-active');
      }
    });
  }

  function goToSection(index) {
    if (index < 0 || index >= sections.length || index === currentIndex) return;
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    wrapper.style.transform = 'translate3d(0, -' + (index * 100) + 'vh, 0)';
    updateActiveStates(index);
    setTimeout(function() { isAnimating = false; }, animationDuration);
  }

  // Handle initial hash or default to first section
  var initialIndex = 0;
  var hash = window.location.hash;
  if (hash) {
    var target = document.querySelector(hash);
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] === target) { initialIndex = i; break; }
    }
  }
  // Set initial position without animation
  wrapper.style.transition = 'none';
  wrapper.style.transform = 'translateY(-' + (initialIndex * 100) + 'vh)';
  currentIndex = initialIndex;
  updateActiveStates(initialIndex);
  // Force reflow, then enable transition
  wrapper.offsetHeight;
  wrapper.style.transition = '';

  // Wheel event
  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (isAnimating) return;

    var section = sections[currentIndex];
    var scrollable = section.scrollHeight > section.clientHeight + 5;

    if (scrollable) {
      var atTop = section.scrollTop <= 1;
      var atBottom = Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight - 1;

      if (e.deltaY > 0 && !atBottom) {
        section.scrollTop = Math.min(section.scrollTop + Math.abs(e.deltaY), section.scrollHeight - section.clientHeight);
        return;
      }
      if (e.deltaY < 0 && !atTop) {
        section.scrollTop = Math.max(section.scrollTop + e.deltaY, 0);
        return;
      }
    }

    if (Math.abs(e.deltaY) < 30) return;

    if (e.deltaY > 0) {
      goToSection(currentIndex + 1);
    } else {
      goToSection(currentIndex - 1);
    }
  }, { passive: false });

  // Touch support
  var touchStartY = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (isAnimating) return;
    var diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      goToSection(currentIndex + 1);
    } else {
      goToSection(currentIndex - 1);
    }
  }, { passive: true });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (isAnimating) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goToSection(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToSection(currentIndex - 1);
    }
  });

  // Nav link clicks
  navButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] === target) { goToSection(i); break; }
      }
    });
  });
})();
