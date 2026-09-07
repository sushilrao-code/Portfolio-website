var portfolioItems = [
    { id: 1, title: 'E-Commerce Platform', category: 'web', image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop', tags: ['React', 'Node.js', 'Stripe'] },
    { id: 2, title: 'Fitness Tracking App', category: 'app', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop', tags: ['React Native', 'Firebase'] },
    { id: 3, title: 'Brand Identity Design', category: 'brand', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', tags: ['Figma', 'Branding'] },
    { id: 4, title: 'Dashboard UI Design', category: 'ui', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', tags: ['Figma', 'Design System'] },
    { id: 5, title: 'SaaS Landing Page', category: 'web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', tags: ['Next.js', 'Tailwind'] },
    { id: 6, title: 'Food Delivery App', category: 'app', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop', tags: ['Flutter', 'Node.js'] },
    { id: 7, title: 'Coffee Shop Branding', category: 'brand', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop', tags: ['Identity', 'Packaging'] },
    { id: 8, title: 'Mobile Banking UI', category: 'ui', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop', tags: ['Figma', 'Prototyping'] },
    { id: 9, title: 'Real Estate Platform', category: 'web', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', tags: ['React', 'Mapbox'] },
  ];

  function renderPortfolio(filter) {
    var filtered = filter === 'all' ? portfolioItems : portfolioItems.filter(function(p) { return p.category === filter; });
    var html = '';
    filtered.forEach(function(p) {
      html += '<div class="portfolio-card" data-category="' + p.category + '">' +
        '<img class="portfolio-img" src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
        '<div class="portfolio-overlay">' +
          '<div class="portfolio-category">' + p.category.toUpperCase() + '</div>' +
          '<div class="portfolio-title">' + p.title + '</div>' +
          '<div class="portfolio-tags">' + p.tags.map(function(t) { return '<span class="portfolio-tag">' + t + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>';
    });
    document.getElementById('portfolioGrid').innerHTML = html;
  }

  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderPortfolio(cat);
  }

  // Cursor Glow
  document.addEventListener('mousemove', function(e) {
    var glow = document.getElementById('cursorGlow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // Nav Scroll
  window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Scroll Reveal
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

  // Count Up
  var counted = false;
  var statsObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-item .num').forEach(function(el) {
          var target = parseInt(el.getAttribute('data-count'));
          var duration = 2000;
          var start = performance.now();
          function step(now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + '+';
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.5 });
  statsObs.observe(document.querySelector('.hero-stats'));

  // Typing Effect
  var words = ['inspire', 'delight', 'engage', 'convert', 'grow'];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  function typeEffect() {
    var current = words[wordIndex];
    var el = document.getElementById('heroTyping');
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
      setTimeout(function() { isDeleting = true; typeEffect(); }, 2000);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
  typeEffect();

  // Form Submit
  function submitForm(e) {
    e.preventDefault();
    showToast('Message sent! I\'ll get back to you soon! 🚀');
    e.target.reset();
  }

  function showToast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 3000);
  }

  function toggleMobileMenu() {
    var links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(10,10,26,.98)';
    links.style.padding = '20px';
    links.style.borderRadius = '0 0 16px 16px';
  }

  // Init
  renderPortfolio('all');