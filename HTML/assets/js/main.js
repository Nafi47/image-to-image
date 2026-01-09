/* ============================================================
    [Master Scripts]

    Theme Name:     Pixgix
    Theme URL:      
    Description:    PixgiX- Ai image Generator HTML Template 
    Version:        1.0.0

============================================================== */
/*
========================================
*********** TABLE OF CONTENTS **********
 
  1. Navbar Shrink JS
  2. Navbar Links Active JS
  3. Banner Two Trigger JS
  4. Card Grid JS
  5. Progress JS
  6. Odometer Counter Up JS
  7. Scroll Back to Top JS
  8. Testimonials Slider JS
  9. Testimonials Slider Two JS
  10. Blog Slider JS
  11. We Do Slide JS
  12. Company Slide JS
  13. Text Slide JS
  14. Follow Slide JS
  15. Scroll Reveal JS
  16. Video Popup JS
  17. Gallery Popup JS
  18. Portfolio Grid JS
  19. Background Image JS
  20. Preloader JS
 
========================================*/

'use strict';
(function ($) {
  gsap.registerPlugin(ScrollTrigger);

  /* ========================================
   Navbar shrink Js
  ======================================== */
  $(window).on('scroll', function () {
    var wScroll = $(this).scrollTop();
    if (wScroll > 1) {
      $('.navbar-main').addClass('navbar-shrink');
    } else {
      $('.navbar-main').removeClass('navbar-shrink');
    };
  });

  /* ========================================
     Navbar Links Active  Js
  ======================================== */
  if ($('.navbar-nav').length > 0) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item');

    const removeActiveClass = () => {
      navLinks.forEach((link) => link.classList.remove('active'));
    };

    const setActiveLink = () => {
      const currentPath = window.location.pathname;
      removeActiveClass();

      navLinks.forEach((link) => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.endsWith(linkPath)) {
          link.classList.add('active');

          const parentDropdown = link.closest('.dropdown-menu')?.previousElementSibling;
          if (parentDropdown) {
            parentDropdown.classList.add('active');
          }
        }
      });
    };
    setActiveLink();
  }

  /* ========================================
   Banner two trigger Js
  ======================================== */
  if ($('.banner-two-section').length > 0) {
    const bannerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner-two-section",
        start: "98% 90%",
        end: "100% 50%",
        scrub: true,
      }
    })

    bannerTimeline.to(".banner-img-one", {
      top: "95%",
      left: "31%",
      scale: 0.5,
      rotate: 0,
    }, 'imgs')

    bannerTimeline.to(".banner-img-two", {
      top: "95%",
      right: "31%",
      scale: 0.5,
      rotate: 0,
    }, 'imgs')
  }

  /* ========================================
      Card grid Js
  ======================================== */
  if ($('#container').length > 0) {
    $('#container').imagesLoaded(function () {
      const $grid = $('.card-grid');
      if ($grid.length > 0) {
        $grid.isotope({
          itemSelector: '.card-grid-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.card-grid-item',
          },
          filter: '.il'
        });
      }

      const $portfolioNav = $('.portfolio-nav');
      if ($portfolioNav.length > 0) {
        const indicator = $('<div class="nav-indicator"></div>');
        $portfolioNav.append(indicator);

        function updateIndicator(el) {
          if (indicator.length > 0 && el) {
            indicator.css({
              width: `${el.offsetWidth}px`,
              left: `${el.offsetLeft}px`,
              transition: 'all 0.6s ease'
            });
          }
        }

        $('.portfolio-nav').on('mouseenter', 'button', function () {
          $('.portfolio-nav button').removeClass('active');
          $(this).addClass('active');
          const filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
          updateIndicator(this);
        });

        const activeLink = $portfolioNav.find('button.active');
        if (activeLink.length > 0) updateIndicator(activeLink[0]);
      }
    });
  }


  /* ========================================
    Progress Js
  ======================================== */
  if ($('.skill-progress').length > 0) {
    function animateNumbers(element) {
      const target = +element.getAttribute('data-target');
      const duration = 1500; // 1.5 second
      const step = target / (duration / 20);

      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        element.textContent = Math.round(current) + "%";
      }, 20);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            const percentageText = entry.target.querySelector('.percentage');

            const targetWidth = percentageText.getAttribute('data-target') + '%';
            progressBar.style.width = targetWidth;
            progressBar.setAttribute('aria-valuenow', targetWidth);

            animateNumbers(percentageText);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.skill-progress').forEach((item) => observer.observe(item));
  }

  /* ========================================
    Odometer Counter Up Js
  ======================================== */
  // data-odometer-final
  if ($('.odometer').length > 0) {
    $(window).on('scroll', function () {
      $('.odometer').each(function () {
        if ($(this).isInViewport()) {
          if (!$(this).data('odometer-started')) {
            $(this).data('odometer-started', true);
            this.innerHTML = $(this).data('odometer-final');
          }
        }
      });
    });
  }
  // isInViewport helper function
  $.fn.isInViewport = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  /* ========================================
     Scroll back to top  Js
   ======================================== */
  if ($('.progress-wrap').length > 0) {
    const progressPath = document.querySelector('.progress-wrap path');
    const pathLength = progressPath.getTotalLength();

    // Set up the initial stroke styles
    progressPath.style.transition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();

    // Set transition for stroke-dashoffset
    progressPath.style.transition = 'stroke-dashoffset 10ms linear';

    const updateProgress = () => {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      const progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();
    $(window).on('scroll', updateProgress);

    const offset = 50;
    const duration = 550;

    $(window).on('scroll', () => {
      $('.progress-wrap').toggleClass('active-progress', $(window).scrollTop() > offset);
    });

    $('.progress-wrap').on('click', (event) => {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, duration);
    });
  }

  /* ========================================
    Testimonials slider Js
  ======================================== */
  if ($('.testimonials-slider').length > 0) {
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
      slidesPerView: 2,
      spaceBetween: 24,
      speed: 700,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
      },
    });
  }

  /* ========================================
    Testimonials slider two Js
  ======================================== */
  if ($('.testimonials-slider-two').length > 0) {
    const testimonialsTwoSwiper = new Swiper('.testimonials-slider-two', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      autoplay: false,
      pagination: false,
      navigation: {
        nextEl: ".swiper--next",
        prevEl: ".swiper--prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
  }

  /* ========================================
    blog slider Js
  ======================================== */
  if ($('.blog-slider').length > 0) {
    const blogSwiper = new Swiper('.blog-slider', {
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 700,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
  }

  /* ========================================
    we do slide Js
  ======================================== */
  if ($('.we-do-slide').length > 0) {
    const blogSwiper = new Swiper('.we-do-slide', {
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 700,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ========================================
    Company slide Js
  ======================================== */
  if ($('.company-slide').length > 0) {
    const partnersSwiper = new Swiper('.company-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      allowTouchMove: false,
      spaceBetween: 24,
      speed: 4000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }

  /* ========================================
    Text slide Js
  ======================================== */
  if ($('.text-slide').length > 0) {
    const textSwiper = new Swiper('.text-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: false,
      spaceBetween: 0,
      speed: 6500,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }

  /* ========================================
    Follow slide Js
  ======================================== */
  if ($('.follow-slide').length > 0) {
    const followSwiper = new Swiper('.follow-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      allowTouchMove: false,
      spaceBetween: 0,
      speed: 6500,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }

  /* ========================================
    Portfolio slide Js
  ======================================== */
  if ($('.portfolio-slide').length > 0) {
    const portfolioSwiper = new Swiper('.portfolio-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      allowTouchMove: false,
      spaceBetween: 0,
      speed: 10000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }
  if ($('.portfolio-two-slide').length > 0) {
    const portfolioTwoSwiper = new Swiper('.portfolio-two-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      allowTouchMove: false,
      spaceBetween: 0,
      speed: 10000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },  
    });
  }
  if ($('.banner-four-slide').length > 0) {
    const bannerFourSwiper = new Swiper('.banner-four-slide', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      allowTouchMove: false,
      spaceBetween: 0,
      speed: 10000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,  
      }, 
    });
  }

  /* ========================================
    Best Selling Js
  ======================================== */
  if ($('.best-selling-slide').length > 0) {
    const bestSellingSwiper = new Swiper('.best-selling-slide', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: false,
      navigation: {
        nextEl: ".swiper--next",
        prevEl: ".swiper--prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  }

  /* ========================================
    Feature Js
  ======================================== */
  if ($('.feature-four-slide').length > 0) {
    const bestSellingSwiper = new Swiper('.feature-four-slide', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      }, 
      pagination: false,
      navigation: {
        nextEl: ".swiper--next",
        prevEl: ".swiper--prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1200: { slidesPerView: 4 },
      },
    });
  }

  /* ========================================
    Scroll Reveal Js
  ======================================== */
  const scrollReveal = ScrollReveal({
    origin: 'top', distance: '60px', duration: 1300, delay: 100, mobile: false,
  })
  scrollReveal.reveal('.top-reveal, .category-content__item', {
    delay: 60, distance: '60px', origin: 'top', interval: 100
  })
  scrollReveal.reveal('.left-reveal, .services-item ', {
    delay: 60, origin: 'left', interval: 100
  })
  scrollReveal.reveal('.right-reveal ', {
    delay: 60, origin: 'right', interval: 100
  })
  scrollReveal.reveal('.bottom-reveal', {
    delay: 60, origin: 'bottom', interval: 100
  })
  scrollReveal.reveal('.scaleUp ', {
    scale: 0.85
  })

  /* ========================================
     Video Popup Js
  ======================================== */
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  /* ========================================
    Gallery Popup Js
  ======================================== */
  $('.card-grid, .view-modal').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr('title');
      }
    }
  });

  /* ========================================
      Portfolio grid Js
  ======================================== */
  if ($('#container').length > 0) {
    $('#container').imagesLoaded(function () {
      const $grid = $('.card-grid, .card-grid_content');
      if ($grid.length > 0) {
        $grid.isotope({
          itemSelector: '.card-grid-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.card-grid-item',
          }
        });
      }

      const $portfolioNav = $('.portfolio-nav');
      if ($portfolioNav.length > 0) {
        const indicator = $('<div class="nav-indicator"></div>');
        $portfolioNav.append(indicator);

        function updateIndicator(el) {
          if (indicator.length > 0 && el) {
            indicator.css({
              width: `${el.offsetWidth}px`,
              left: `${el.offsetLeft}px`,
              transition: 'all 0.6s ease'
            });
          }
        }

        $('.portfolio-nav').on('mouseenter', 'button', function () {
          $('.portfolio-nav button').removeClass('active');
          $(this).addClass('active');
          const filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
          updateIndicator(this);
        });

        const activeLink = $portfolioNav.find('button.active');
        if (activeLink.length > 0) updateIndicator(activeLink[0]);
      }
    });
  }

  /* ========================================
      Background image Js
  ======================================== */
  $('.bg-img').css('background-image', function () {
    var bg = 'url(' + $(this).data('background-image') + ')';
    return bg;
  });


  /* ========================================
      Preloader Js
  ======================================== */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.transition = 'height 0.5s, opacity 1s';
    preloader.style.opacity = '0';
    preloader.style.height = '0';
    preloader.style.borderBottomLeftRadius = '100%';
    preloader.style.borderBottomRightRadius = '100%';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  /* ========================================
      Preloader Js
  ======================================== */
  if ($('.product-image').length > 0) {
    const slidesCount = $('.product-image').length;

    const detailsMain = new Swiper(".details-main", {
      loop: slidesCount >= 8,  
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const detailsList = new Swiper(".details-list", {
      loop: slidesCount >= 3,   
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: detailsMain,
      },
    });
  }


  /* ========================================
    filter btn Js
  ======================================== */
  if ($('.filter-content').length > 0) {
    const filterContent = document.querySelector('.filter-content');
    const filterBtn = document.querySelector('.filter-btn');

    if (!filterContent || !filterBtn) return;

    const mainContent = document.querySelector('.main-content');
    const contentBoxes = document.querySelectorAll('.content-box');

    filterBtn.addEventListener('click', function () {
      const isFilterHidden = filterContent.classList.contains('d-none');

      // Toggle filter visibility using Bootstrap classes
      filterContent.classList.toggle('d-none', !isFilterHidden);

      // Update main content grid classes
      const mainCols = isFilterHidden ? ['col-xl-9', 'col-lg-8'] : ['col-xl-12', 'col-lg-12'];
      mainContent.classList.remove(...mainContent.classList);
      mainContent.classList.add(...mainCols);

      // Update content box columns
      const boxCols = isFilterHidden ? ['col-xl-4', 'col-lg-4'] : ['col-xl-3', 'col-lg-3'];
      contentBoxes.forEach(box => {
        box.classList.remove('col-xl-4', 'col-lg-4', 'col-xl-3', 'col-lg-3');
        box.classList.add(...boxCols);
      });
    });
  }

  /* ========================================
      Range pricing Js
  ======================================== */
  if (document.querySelector('.range_container')) {
    function initRangeSlider() {
      const fromSlider = document.querySelector('.fromSlider');
      const toSlider = document.querySelector('.toSlider');
      const fromInput = document.querySelector('.fromInput');
      const toInput = document.querySelector('.toInput');
      const min = parseInt(fromSlider.min, 10);
      const max = parseInt(toSlider.max, 10);

      function updateSliderFill() {
        const fromVal = parseInt(fromSlider.value, 10);
        const toVal = parseInt(toSlider.value, 10);
        const fromPos = ((fromVal - min) / (max - min)) * 100;
        const toPos = ((toVal - min) / (max - min)) * 100;

        toSlider.style.background = `linear-gradient(
          to right, #141b13 0%, #141b13 ${fromPos}%, #ffffff ${fromPos}%, #ffffff ${toPos}%, #141b13 ${toPos}%, #141b13 100%)`;
      }

      function syncValues() {
        let fromVal = parseInt(fromSlider.value, 10);
        let toVal = parseInt(toSlider.value, 10);

        if (fromVal > toVal) {
          fromVal = toVal;
          fromSlider.value = fromVal;
        }
        if (toVal < fromVal) {
          toVal = fromVal;
          toSlider.value = toVal;
        }

        fromInput.textContent = fromVal;
        toInput.textContent = toVal;
        updateSliderFill();
      }

      function addListeners() {
        const sync = () => syncValues();
        fromSlider.addEventListener('input', sync);
        toSlider.addEventListener('input', sync);
      }

      syncValues();
      addListeners();
    }

    initRangeSlider();
  }


  /* ========================================
      Quantity Controls Js
  ======================================== */
  if ($('.cart-table-item').length > 0) {
    function calculateTotals() {
      let subtotal = 0;

      document.querySelectorAll(".cart-table-item").forEach((item) => {
        let quantityElement = item.querySelector(".quantity-number");
        let itemPrice = parseFloat(item.querySelector(".item-price").textContent);
        let totalPriceElement = item.querySelector(".total-price");

        let quantity = parseInt(quantityElement.textContent, 10);
        let totalPrice = itemPrice * quantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        subtotal += totalPrice;
      });

      document.querySelector(".cart-summary p:nth-child(1) span").textContent = `$${subtotal.toFixed(2)}`;

      let tax = subtotal * 0.10;
      document.querySelector(".cart-summary p:nth-child(3) span").textContent = `$${tax.toFixed(2)}`;

      let finalTotal = subtotal + tax;
      document.querySelector(".cart-summary p:nth-child(5) span").textContent = `$${finalTotal.toFixed(2)}`;
    }

    document.querySelectorAll(".cart-table-item").forEach((item) => {
      let incrementBtn = item.querySelector(".quantity-increment");
      let decrementBtn = item.querySelector(".quantity-decrement");
      let quantityElement = item.querySelector(".quantity-number");
      let removeBtn = item.querySelector(".remove-item");

      incrementBtn.addEventListener("click", () => {
        quantityElement.textContent = parseInt(quantityElement.textContent, 10) + 1;
        calculateTotals();
      });

      decrementBtn.addEventListener("click", () => {
        if (parseInt(quantityElement.textContent, 10) > 1) {
          quantityElement.textContent = parseInt(quantityElement.textContent, 10) - 1;
          calculateTotals();
        }
      });

      removeBtn.addEventListener("click", () => {
        item.remove();
        calculateTotals();
      });
    });

    calculateTotals();
  }


})(jQuery);

// Buton etkileşimleri
document.addEventListener('DOMContentLoaded', function() {
    
    // Upload Image butonu
    const uploadBtn = document.querySelector('.btn-upload');
    const uploadInput = createPersistentUploadInput();

    uploadBtn.addEventListener('click', function() {
        uploadInput.value = '';
        uploadInput.click();
    });

    uploadInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = async function(event) {
            const base64Image = event.target.result;
            const secondCard = document.querySelector('.card-2');
            secondCard.innerHTML = `<img src="${base64Image}" style="width: 100%; height: 100%; object-fit: cover;">`;
            await sendImageToAPI(base64Image);
        };
        reader.readAsDataURL(file);
    });

    // Kart hover animasyonları
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Sayfa yüklenme animasyonu
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');
    
    setTimeout(() => {
        leftSection.style.opacity = '1';
        leftSection.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        rightSection.style.opacity = '1';
        rightSection.style.transform = 'translateX(0)';
    }, 300);
});

function createPersistentUploadInput() {
    // Keep a hidden input in the DOM so file change events fire consistently across browsers.
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    return input;
}
let buton01 = true;
let buton02 = false;
let buton03 = false;

 document.getElementById("buton01").addEventListener("click", function () {
buton01=true;
buton02=false;
buton03=false;
});
 document.getElementById("buton02").addEventListener("click", function () {
buton01=false;
buton02=true;
buton03=false;
});
 document.getElementById("buton03").addEventListener("click", function () {
buton01=false;
buton02=false;
buton03=true;
  });
// API'ye görsel gönderme fonksiyonu
async function sendImageToAPI(base64Image) {
    const secondCard = document.querySelector('.card-2');
    if (!secondCard) {
        console.error('Görsel alanı bulunamadı.');
        return;
    }

    let loadingOverlay = null;

    try {
        loadingOverlay = showLoadingOverlay(secondCard);
        toggleUploadButtonState(true);
        
let payload;
if(buton01){   payload = { 
            init_image: [
              "https://www.medya90.com/resimler/2024-4/1/104223519896903.webp",
                base64Image
                
            ],
            prompt:"Generate a hyper-realistic studio portrait based on the specific reference image of Recep Tayyip Erdoğan wearing a dark navy suit, white shirt, and red tie, standing with a slight smile. The background features a large Turkish flag on the left and the gold Presidential Seal on the wall to the right. Seamlessly integrate the person from the second input image standing next to him. The added person should adopt a formal, respectful standing pose facing the camera. Ensure the lighting, shadows, perspective, and color grading of the added person perfectly match the soft studio lighting of the original scene to create a flawless, unified photograph.",
            model_id: "seedream-4.5-i2i",
            "aspect-ratio": "1:1",
            key: "HtOpTiM6BxG5U7YrZjRRqnLbPNh8bHD9mfBGqhxo4cVwi8tMn0OG5TosUTeJ"
        };

}else if(buton02){    payload = { 
            init_image: [
                "https://scontent.fist7-2.fna.fbcdn.net/v/t39.30808-6/440808857_976478053842122_8193287103538955964_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=GQNGCWZ2gt8Q7kNvwEBXZBM&_nc_oc=AdlDdDeUltMno_Lwqh_HYSEfxxglcFPiV8PnKTqOCx6YhuT7Tex9-fRZzJuWrXs-LN0&_nc_zt=23&_nc_ht=scontent.fist7-2.fna&_nc_gid=gL7y0PLV1CgN1ftMWsyAWA&oh=00_AfoxmIffFsa49kmZdxK27x5KUwgxfOaQ8HmhVd5UftYtdg&oe=69615858",
                 base64Image
            ],
prompt:"Generate a hyper-realistic outdoor photograph based on the specific reference image of Selçuk Bayraktar walking on the deck of the aircraft carrier, wearing a black suit and red tie. The background features the Bayraktar Kızılelma unmanned fighter aircraft and the large superstructure of the TCG Anadolu ship under a bright sky. Seamlessly integrate the person from the second input image walking or standing beside him. The added person should adopt a similar confident, formal pose. Ensure the lighting, sharp shadows, perspective, and color grading of the added person perfectly match the bright, sunny daylight of the original scene to create a flawless, unified photograph.",
            model_id: "seedream-4.5-i2i",
            "aspect-ratio": "1:1",
            key: "HtOpTiM6BxG5U7YrZjRRqnLbPNh8bHD9mfBGqhxo4cVwi8tMn0OG5TosUTeJ"
        };}
else if(buton03){   payload = { 
            init_image: [
                base64Image,
                "https://turkic.world/media/2022/09/16/ilham_aliyev_main_photo_200320_3.jpg"
            ],
prompt:"Generate a hyper-realistic formal studio photograph based on the specific reference image of Ilham Aliyev wearing a black suit, white shirt, and patterned burgundy tie, standing in a formal pose. The background features a large Azerbaijani flag on the left and an ornate white wall with gold trim. Seamlessly integrate the person from the second input image standing beside him. The added person should adopt a similar formal, respectful pose facing the camera. Ensure the lighting, soft shadows, perspective, and color grading of the added person perfectly match the indoor studio lighting of the original scene to create a flawless, unified photograph.",
            model_id: "seedream-4.5-i2i",
            "aspect-ratio": "1:1",
            key: "HtOpTiM6BxG5U7YrZjRRqnLbPNh8bHD9mfBGqhxo4cVwi8tMn0OG5TosUTeJ"
        };}else {
            throw new Error('Lütfen önce bir stil butonu seçin.');
        }

  
        // API endpoint'inizi buraya yazın
        const response = await fetch('https://modelslab.com/api/v7/images/image-to-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        console.log('Full result object:', JSON.stringify(result, null, 2));
        
        // Önce proxy_links kullan, yoksa output kullan
        let imageUrl = null;
        
        if (result.proxy_links && result.proxy_links.length > 0) {
            imageUrl = result.proxy_links[0];
        } else if (result.output && Array.isArray(result.output)) {
            imageUrl = result.output[0];
        } else if (result.output) {
            imageUrl = result.output;
        } else if (result.image_url) {
            imageUrl = result.image_url;
        }
        
        console.log('Image URL:', imageUrl);
        
        if (imageUrl) {
         const proxiedImageUrl = "/.netlify/functions/proxy-image?url=" + encodeURIComponent(imageUrl);

await renderGeneratedImage(proxiedImageUrl, secondCard);
showImagePopup(proxiedImageUrl);
        } else {
            console.error('Tam API yanıtı:', result);
            throw new Error('API yanıtında görsel bulunamadı. Konsolu kontrol edin.');
        }
        
    } catch (error) {
        console.error('API Error:', error);
        alert('Görsel işlenirken bir hata oluştu: ' + error.message + '\n\nKonsolu (F12) kontrol edin.');
        // Yükleme mesajını kaldır
        if (secondCard) {
            secondCard.innerHTML = '<div class="placeholder">Hata oluştu</div>';
        }
    } finally {
      completeLoaderProgress();
        hideLoadingOverlay(secondCard, loadingOverlay);
        toggleUploadButtonState(false);
    }
}

const loaderMessages = [
    'AI sahneyi hazırlıyor',
    'Az kaldı',
    'Neredeyse hazır',
    'Bitmek üzere'
];
let loaderIntervalId = null;
let loaderProgressIntervalId = null;
let loaderProgressElement = null;
let loaderPercentElement = null;
let loaderCurrentProgress = 0;

function showLoadingOverlay(target) {
    if (target) {
        target.classList.add('is-loading');
    }

    const overlay = document.createElement('div');
    overlay.className = 'full-screen-loader';
    overlay.innerHTML = `
        <div class="loader-panel">
            <span class="loader-title">Görsel hazırlanıyor</span>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
          <span class="loader-percent">0%</span>
            <span class="loader-hint">${loaderMessages[0]}</span>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add('loading-active');
    requestAnimationFrame(() => overlay.classList.add('visible'));
    const hintElement = overlay.querySelector('.loader-hint');
      const progressElement = overlay.querySelector('.loader-progress');
      const percentElement = overlay.querySelector('.loader-percent');
      startLoaderMessaging(hintElement);
      startLoaderProgress(progressElement, percentElement);
    return overlay;
}

function hideLoadingOverlay(target, overlay) {
    const cleanup = () => {
        stopLoaderMessaging();
        stopLoaderProgress();
        loaderProgressElement = null;
        loaderPercentElement = null;
        loaderCurrentProgress = 0;
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
        if (target) {
            target.classList.remove('is-loading');
        }
        document.body.classList.remove('loading-active');
    };

    if (!overlay) {
        cleanup();
        return;
    }

    overlay.classList.add('hide');
    overlay.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 600);
}

function startLoaderMessaging(targetElement) {
    if (!targetElement) {
        return;
    }

    stopLoaderMessaging();
    let messageIndex = 0;
    targetElement.textContent = loaderMessages[messageIndex];
    loaderIntervalId = setInterval(() => {
        if (messageIndex < loaderMessages.length - 1) {
            messageIndex += 1;
        }
        targetElement.textContent = loaderMessages[messageIndex];
    }, 2800);
}

function stopLoaderMessaging() {
    if (loaderIntervalId) {
        clearInterval(loaderIntervalId);
        loaderIntervalId = null;
    }
}

function startLoaderProgress(progressElement, percentElement) {
  stopLoaderProgress();
  if (!progressElement || !percentElement) {
    return;
  }
  loaderProgressElement = progressElement;
  loaderPercentElement = percentElement;
  loaderCurrentProgress = 0;
  updateLoaderProgress(loaderCurrentProgress);

  loaderProgressIntervalId = setInterval(() => {
    const increment = Math.random() * 7 + 4; // 4-11 arası ilerleme
    loaderCurrentProgress = Math.min(loaderCurrentProgress + increment, 92);
    updateLoaderProgress(loaderCurrentProgress);
    if (loaderCurrentProgress >= 92) {
      stopLoaderProgress();
    }
  }, 900);
}

function updateLoaderProgress(value) {
  if (loaderProgressElement) {
    loaderProgressElement.style.width = `${value}%`;
  }
  if (loaderPercentElement) {
    loaderPercentElement.textContent = `${Math.round(value)}%`;
  }
}

function completeLoaderProgress() {
  if (!loaderProgressElement) {
    return;
  }
  updateLoaderProgress(100);
  stopLoaderProgress();
}

function stopLoaderProgress() {
  if (loaderProgressIntervalId) {
    clearInterval(loaderProgressIntervalId);
    loaderProgressIntervalId = null;
  }
}
function toggleUploadButtonState(isDisabled) {
    const uploadBtn = document.querySelector('.btn-upload');
    if (!uploadBtn) {
        return;
    }
    uploadBtn.disabled = isDisabled;
    uploadBtn.classList.toggle('is-disabled', Boolean(isDisabled));
}

function renderGeneratedImage(imageUrl, container) {
    return new Promise((resolve, reject) => {
        if (!container) {
            reject(new Error('Görsel alanı bulunamadı.'));
            return;
        }

        const generatedImg = new Image();
        generatedImg.src = imageUrl;
        generatedImg.alt = 'Generated result';
        generatedImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; display: block;';
        generatedImg.onload = () => {
            container.innerHTML = '';
            container.appendChild(generatedImg);
            resolve();
        };
        generatedImg.onerror = () => {
            reject(new Error('Görsel yüklenemedi.'));
        };
    });
}

// Popup ile görseli göster
function showImagePopup(imageUrl) {
    // Modal oluştur
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Modal içeriği
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: #1a2520;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    
    // Görsel
    const img = document.createElement('img');
    img.style.cssText = `
        border-radius: 10px;
        display: block;
        width: auto;
        height: auto;
        max-width: 90vw;
        max-height: 70vh;
    `;
    img.onload = () => {
        const viewportW = window.innerWidth * 0.9;
        const viewportH = window.innerHeight * 0.85;
        const scale = Math.min(
            viewportW / img.naturalWidth,
            viewportH / img.naturalHeight,
            1
        );
        const displayW = Math.floor(img.naturalWidth * scale);
        const displayH = Math.floor(img.naturalHeight * scale);
        img.style.width = `${displayW}px`;
        img.style.height = `${displayH}px`;
        const adjustedWidth = Math.min(displayW + 40, viewportW);
        modalContent.style.width = `${adjustedWidth}px`;
    };
    img.src = imageUrl;
    
    // Buton container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
        display: flex;
        gap: 15px;
        margin-top: 20px;
        justify-content: center;
    `;
    
    // İndirme butonu
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'İndir';
    downloadBtn.style.cssText = `
        background: #c4ff00;
        color: #0a0f0d;
        border: none;
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    downloadBtn.onmouseover = () => downloadBtn.style.background = '#d4ff20';
    downloadBtn.onmouseout = () => downloadBtn.style.background = '#c4ff00';
    downloadBtn.onclick = () => downloadImage(imageUrl);
    
    // Kapat butonu
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Kapat';
    closeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    closeBtn.onclick = () => modal.remove();
    
    // X butonu (sağ üst)
    const xBtn = document.createElement('button');
    xBtn.innerHTML = '×';
    xBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        font-size: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    xBtn.onmouseover = () => xBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    xBtn.onmouseout = () => xBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    xBtn.onclick = () => modal.remove();
    
    // Elemanları birleştir
    btnContainer.appendChild(downloadBtn);
    btnContainer.appendChild(closeBtn);
    modalContent.appendChild(xBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(btnContainer);
    modal.appendChild(modalContent);
    
    // Modal'ı sayfaya ekle
    document.body.appendChild(modal);
    
    // Backdrop'a tıklanınca kapat
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    // ESC tuşu ile kapat
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}


// Görseli indir
async function downloadImage(imageUrl) {
    try {
        // CORS sorunlarını aşmak için fetch ile blob olarak indir
        const response = await fetch(imageUrl, {
            mode: 'cors',
            cache: 'no-cache'
        });
        
        if (!response.ok) {
            throw new Error('İndirme başarısız');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `ai-generated-image-${Date.now()}.png`;
        
        // DOM'a ekle, tıkla ve kaldır
        document.body.appendChild(a);
        a.click();
        
        // Temizlik
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
        
        // Kullanıcıya geri bildirim
        alert('Görsel başarıyla indirildi!');
        
    } catch (error) {
        console.error('İndirme hatası:', error);
        
        // Fallback 1: Doğrudan link ile dene
        try {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = `ai-generated-image-${Date.now()}.png`;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (fallbackError) {
            // Fallback 2: Yeni sekmede aç
            window.open(imageUrl, '_blank');
            alert('Otomatik indirme başarısız oldu. Görsele sağ tıklayıp "Resmi farklı kaydet" seçeneğini kullanabilirsiniz.');
        }
    }
}

// Başlangıç animasyonları için CSS
document.querySelector('.left-section').style.cssText = `
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
`;

document.querySelector('.right-section').style.cssText = `
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease;
`;

