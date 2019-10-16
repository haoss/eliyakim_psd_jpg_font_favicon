'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled: true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    mainClass: 'mfp-bg-popup',
    callbacks: {
      open: function(e){
        inputFocus();
      }
    }
  });

  aboutCarousel();
  clientsCarousel();
  inputFocus();
  mainSlider();
  aboutGallery();
  certificateGallery();
  faq();
  menuMobile();

  $('.content ol li').each(function(){
    $(this).prepend('<span class="span">' + ($(this).index() + 1) + '</span>');
  });

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function aboutCarousel() {
  var swiper = new Swiper('.about__carousel .swiper-container', {
    pagination: {
      el: '.about__carousel .swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      },
      formatFractionTotal: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      }
    },
    navigation: {
      nextEl: '.about__carousel .swiper-button-next',
      prevEl: '.about__carousel .swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
    loop: true
  });
}

function clientsCarousel(){
  var swiper = new Swiper('.clients__carousel .swiper-container', {
    slidesPerView: 6,
    spaceBetween: 30,
    breakpoints: {
      1199: {
        slidesPerView: 5
      },
      991: {
        slidesPerView: 4
      },
      767: {
        slidesPerView: 3
      },
      600: {
        slidesPerView: 2
      }
    },
    autoplay: {
      delay: 3500,
    },
    loop: true
  });
}

function inputFocus(){
  $('.input-focus').each(function(){
    var _this = $(this);

    if (_this.val().length > 0) {
      _this.parent().addClass('is-focus');
    }

    _this.focus(function() {
      _this.parent().addClass('is-focus');
    }).blur(function() {
      if (!_this.val().length > 0) {
        _this.parent().removeClass('is-focus');
      }
    });
  })
}

function mainSlider(){
  var swiper = new Swiper('.main-carousel .swiper-container', {
    pagination: {
      el: '.main-carousel .swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      },
      formatFractionTotal: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      }
    },
    navigation: {
      nextEl: '.main-carousel .swiper-button-next',
      prevEl: '.main-carousel .swiper-button-prev',
    },
    effect: 'fade',
    autoplay: {
      delay: 4000,
    },
    loop: true,
    disableOnInteraction: false
  });
}

function aboutGallery(){
  var swiper = new Swiper('.photos .swiper-container', {
    spaceBetween: 0,
    navigation: {
      nextEl: '.photos .swiper-button-next',
      prevEl: '.photos .swiper-button-prev',
    },
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      479: {
        slidesPerView: 1
      }
    }
  });
}

function certificateGallery(){
  var swiper = new Swiper('.certificate__gallery .swiper-container', {
    spaceBetween: 30,
    slidesPerView: 2,
    slidesPerGroup: 2,
    navigation: {
      nextEl: '.certificate__gallery .swiper-button-next',
      prevEl: '.certificate__gallery .swiper-button-prev',
    },
    loop: true,
    pagination: {
      el: '.certificate__gallery .swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      },
      formatFractionTotal: function(number) {
        if (number > 0 && number < 10) {
          return '0' + number
        } else {
          return number
        }
      }
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      }
    }
  });
}

function faq(){
  var faqBlock = $('.faq__block'),
      faqBlockAnswer = $('.faq__block-answer'),
      faqBlockTitle = $('.faq__block-title');

  $(faqBlock).each(function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.find('.faq__block-answer').show();
    }
  });

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    var _this = $(this);

    faqBlock.removeClass('is-active');
    $('.faq__block-answer').stop().slideUp();

    _this.parents(faqBlock).addClass('is-active');
    _this.next(faqBlockAnswer).stop().slideDown();

  });
}

function menuMobile(){
  var block = $('.header__nav-mobile');
  var btn = block.find('.header__nav-btn');
  var popup = block.find('.header__nav-popup');

  btn.on('click', function(e){
    e.stopPropagation();

    if (block.hasClass('is-active')) {
      block.removeClass('is-active')
    } else {
      block.addClass('is-active')
    }
  });

  popup.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    block.removeClass('is-active')
  });
}
