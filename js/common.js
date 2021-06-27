/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function controlClassOnCondition(element, className, condition) {
  if (condition) {
    $(element).addClass(className);
    //$('.has-navbar-fixed-top').css('padding-top', '3.75rem');
  } else {
    $(element).removeClass(className);
    //$('.has-navbar-fixed-top').css('padding-top', '6.75rem');
  }
}

$(document).ready(function () {

  // tabs
  $('.top-menu .tabs .tabs-a').each(function() {
    if (location.href.split("/")[4]) {
      //if (location.href.split("/")[4].indexOf($(this).text().toLowerCase()) > -1) {
        if (location.href.split("/")[4] == ($(this).text().toLowerCase().replace(" ", ""))) {
        $(this).addClass('is-active')
      }
    }
  });

  $('.top-menu .sub-menu li').each(function() {
    if (location.href.split("/")[5]) {
      //console.log(location.href.split("/")[5], $(this).text().toLowerCase())
      //if (location.href.split("/")[5].indexOf($(this).text().toLowerCase()) > -1) {
      if (location.href.split("/")[5] == ($(this).text().toLowerCase().replace(" ", ""))) {
        $(this).addClass('is-active')
      }
    }
  });

  $('.top-menu .tabs .tabs-li').on('click', function() {
    $('.top-menu .tabs .tabs-a').removeClass('hover');
    if (!$(this).find('.tabs-a').next('.sub-menu').hasClass('active')) {
      $('.top-menu .tabs .sub-menu').removeClass('active');
      $(this).find('.tabs-a').next('.sub-menu').addClass('active');
      $(this).find('.tabs-a').addClass('hover');
    } else {
      $(this).find('.tabs-a').next('.sub-menu').removeClass('active');
    }
  });

  // navbar flip
  navbar = $('.navbar');
  sidebarContainer = $('.sidebar-container');
  sidebarInner = $('.sidebar-inner');
  tocMain = $('.toc-main');

  function updateView() {
    //controlClassOnCondition(navbar, 'is-flipped', window.pageYOffset > 0);
    controlClassOnCondition(navbar, 'is-flipped', window.pageYOffset > 0);
    controlClassOnCondition(sidebarContainer, 'is-flipped', window.pageYOffset > 50);
    controlClassOnCondition(sidebarInner, 'is-flipped', window.pageYOffset > 50);
    controlClassOnCondition(tocMain, 'is-flipped', window.pageYOffset > 50);
  }

  updateView();

  window.addEventListener('resize', updateView);
  window.addEventListener('scroll', updateView);

  document.onunload = function () {
    window.removeEventListener('resize', updateView);
    window.removeEventListener('scroll', updateView);
  };

  /*
  // btn-top
  $('.btn-top').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 400);
  })

  var iScrollPos = 0;
  var iScrollPosFlag = 0;
  $(window).scroll(function () {
    var windowScrollTop = $(window).scrollTop();

    if (windowScrollTop > 150) {
      $('.btn-top').addClass('show');
    } else {
      $('.btn-top').removeClass('show');
    }


    if (document.body.clientHeight < document.body.scrollHeight - windowScrollTop) {
      var isFixedTopHeight = $('.is-fixed-top').height();
      var isSmallHeight = $('.is-small').height();
      if (windowScrollTop> isSmallHeight + isFixedTopHeight) {
        if (windowScrollTop < iScrollPos) {
          iScrollPosFlag = 1;
          $('.top-menu').addClass('fixed').attr('style', 'visibility:visible');
          $('.sidebar-container .sidebar-main').removeClass('is-affixed')
          $('.toc-main').removeClass('is-affixed')
        } else if (windowScrollTop === iScrollPos) {
          if (iScrollPosFlag === 0) {
            $('.top-menu').attr('style', 'visibility:hidden');
          } else {
            $('.top-menu').addClass('fixed').attr('style', 'visibility:visible');
          }
        } else {
          iScrollPosFlag = 0;
          //$('.top-menu').attr('style', 'visibility:hidden');
          $('.top-menu').attr('style', 'display: none;');
          $('.sidebar-container .sidebar-main').addClass('is-affixed')
          $('.toc-main').addClass('is-affixed')
        }
      } else {
        if (windowScrollTop < isSmallHeight + isFixedTopHeight - $('.top-menu').height()) {
          $('.top-menu').removeClass('fixed').attr('style', 'visibility:visible')
          $('.sidebar-container .sidebar-main').removeClass('is-affixed')
          $('.toc-main').removeClass('is-affixed')
        }
      }
      iScrollPos = windowScrollTop;
    }
  });
  */

  //Cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var cookieValue = getCookie('webosCookie');

  if (cookieValue !== '0') {
    // if cookie does not exist, display popup
    $('.cookies-popup').css('display', 'block');
  } else {
    $('.cookies-popup').css('display', 'none');
  }

  $(".cookies-popup a").on('click', function () {
    document.cookie = "webosCookie=0;path=/";
    $('.cookies-popup').css('display', 'none')
  });

});