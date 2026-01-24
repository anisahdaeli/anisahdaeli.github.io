/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  const certificateLightbox = GLightbox({
    selector: '.certificate-lightbox'
  });

  // Inisialisasi Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000
    },
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * ================================
   * Portfolio JSON Loader
   * ================================
   */
  document.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
  });

  async function loadPortfolio() {
    try {
      const response = await fetch("assets/data/portfolio.json");
      const portfolios = await response.json();

      const container = document.getElementById("portfolioContainer");
      if (!container) return;

      let html = "";

      portfolios.forEach(item => {
        const filterClass = getFilterClass(item.type);
        const badge = getBadge(item.type);
        const coverImage = item.images[0];

        html += `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${filterClass}">
            <img src="${coverImage}" class="img-fluid" alt="${item.title}">

            <div class="portfolio-info">
              <h4>${item.title}</h4>
              <p>${item.category} · ${item.date}</p>

              <a href="${coverImage}"
                title="${item.title}"
                data-gallery="portfolio-gallery-${item.type}"
                class="glightbox preview-link">
                <i class="bi bi-zoom-in"></i>
              </a>

              <a href="portfolio-details.html?id=${item.id}"
                title="More Details"
                class="details-link">
                <i class="bi bi-link-45deg"></i>
              </a>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;

      // ⬇️ PENTING: tunggu gambar selesai load
      imagesLoaded(container, function () {
        initIsotope();
        initGLightbox();
      });

    } catch (error) {
      console.error("Failed to load portfolio:", error);
    }
  }

  /**
   * ================================
   * Helpers
   * ================================
   */
  function getFilterClass(type) {
    switch (type) {
      case "ml":
        return "filter-ml";
      case "dashboard":
        return "filter-dashboard";
      case "web":
        return "filter-web";
      case "design":
        return "filter-design";
      default:
        return "";
    }
  }

  function getBadge(type) {
    switch (type) {
      case "ml":
        return "ML";
      case "dashboard":
        return "Dashboard";
      case "web":
        return "Web";
      case "design":
        return "Design";
      default:
        return "";
    }
  }

  /**
   * ================================
   * Re-initialize Isotope
   * ================================
   */
  function initIsotope() {
    let portfolioContainer = document.querySelector('.isotope-container');
    if (!portfolioContainer) return;

    let iso = new Isotope(portfolioContainer, {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry'
    });

    let filters = document.querySelectorAll('.portfolio-filters li');

    filters.forEach(filter => {
      filter.addEventListener('click', function () {
        filters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        iso.arrange({
          filter: this.getAttribute('data-filter')
        });
      });
    });
  }

  /**
   * ================================
   * Portfolio Details Loader
   * ================================
   */
  document.addEventListener("DOMContentLoaded", () => {
    const detailsSection = document.getElementById("portfolio-details");
    if (detailsSection) {
      loadPortfolioDetails();
    }
  });

  async function loadPortfolioDetails() {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (!id) return;

      const response = await fetch("assets/data/portfolio.json");
      const data = await response.json();

      // 🔥 FIX PENTING: cari item di ARRAY
      const portfolio = data.find(item => item.id === id);

      if (!portfolio) {
        console.error("Portfolio not found:", id);
        return;
      }

      // ===== TITLE & DESCRIPTION =====
      document.getElementById("portfolioTitle").textContent = portfolio.title;
      document.getElementById("portfolioDescription").textContent = portfolio.description;

      // ===== GALLERY =====
      const gallery = document.getElementById("portfolioGallery");
      gallery.innerHTML = "";

      portfolio.images.forEach(img => {
        gallery.innerHTML += `
          <div class="swiper-slide">
            <img src="${img}" class="img-fluid" alt="${portfolio.title}">
          </div>
        `;
      });

      // ===== META INFO =====
      const meta = document.getElementById("portfolioMeta");
      meta.innerHTML = `
        <li><strong>Category</strong> ${portfolio.category}</li>
        <li><strong>Project Date</strong> ${portfolio.date}</li>
        <li><strong>Tools</strong> ${portfolio.tools.join(", ")}</li>
        <li>
          <strong>GitHub</strong>
          <a href="${portfolio.github}" class="btn btn-sm btn-dark mt-2" target="_blank" rel="noopener noreferrer"> <i class="bi bi-github me-1"></i> GitHub </a>
        </li>
      `;

      // ===== REINIT SWIPER =====
      initSwiper();

    } catch (error) {
      console.error("Failed to load portfolio details:", error);
    }
  }

  /**
   * ================================
   * Re-initialize GLightbox
   * ================================
   */
  function initGLightbox() {
    GLightbox({
      selector: '.glightbox'
    });
  }

})();