jQuery(document).ready(function ($) {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) {
    $(document.body).addClass("ios");
  }
  // functions ignore body scroll for ios modal
  function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }
  function lockBodyScroll(container) {
    var preventTouchMove;
    container.ontouchstart = function (e) {
      preventTouchMove =
        e.target === container ||
        (!isScrollable(container) && e.target.tagName !== "INPUT");
    };
    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  }

  //input date
  if ($(".input-date").length) {
    var pkcont = "body";
    if ($(".picker-container").length) {
      pkcont = ".picker-container";
    }
    $(".input-date").datepicker({
      todayHighlight: true,
      startDate: "0d",
      container: pkcont,
    });
  }

  //Show/Hide scroll-top on Scroll
  // hide #back-top first
  $("#scroll-top").hide();
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $("#scroll-top").fadeIn();
      } else {
        $("#scroll-top").fadeOut();
      }
    });
    // scroll body to 0px on click
    $("#scroll-top").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        1000
      );
    });
  });
  $(".navbar-toggle").on("click", function (e) {
    const $this = $(this);
    $this.toggleClass("open");
    if (!$this.hasClass("open")) {
      $this.addClass("closing");
      setTimeout(() => {
        $this.removeClass("closing");
      }, 500);
    }

    $("body").toggleClass("menuin");
  });
  $(".nav-overlay").on("click", this, function (e) {
    $(".navbar-toggle").trigger("click");
  });
  $(".dropdown").on("click", ".dropdown-toggle", function (e) {
    var $this = $(this);
    var parent = $this.parent(".dropdown");
    var submenu = parent.find(".sub-menu-wrap");
    parent.toggleClass("open").siblings().removeClass("open");
    e.stopPropagation();

    submenu.click(function (e) {
      e.stopPropagation();
    });
  });
  $("body,html").on("click", function () {
    if ($(".dropdown").hasClass("open")) {
      $(".dropdown").removeClass("open");
    }
  });
  //    $.magnificPopup.open({
  //                 items: {
  //                    src: '#addfilePop', // can be a HTML string, jQuery object, or CSS selector
  //                  },
  //                mainClass: 'file-popup',
  //                prependTo: '.files-wrap',
  //                callbacks: {
  //                    open: function() {
  //                        var $popC = this.content;
  //
  //                    },
  //                    close: function() {
  //                        var $popC = this.content;
  //                    }
  //                }
  //            });

  //orther js
  if (window.innerWidth > 1100) {
    $(".animation-banner-text").each(function () {
      $(this)
        .find("span")
        .each(function () {
          var characters = $(this).text().split("");
          $this = $(this);
          $this.empty();
          $.each(characters, function (i, el) {
            $this.append(!!el.trim() ? `<span class="char">${el}</span>` : el);
          });
        });
    });
    $("#moving-panr").panr({
      sensitivity: 50,
      scale: false,
      scaleOnHover: false,
      scaleTo: 1,
      scaleDuration: 0,
      panY: true,
      panX: true,
      moveTarget: "",
      panDuration: 1.25,
      resetPanOnMouseLeave: false,
      onEnter: function () {},
      onLeave: function () {},
    });
    $("#moving-panr .vector-logo").panr({
      sensitivity: 70,
      scale: false,
      scaleOnHover: false,
      scaleTo: 1,
      scaleDuration: 0,
      panY: true,
      panX: true,
      moveTarget: "parent",
      panDuration: 1.25,
      resetPanOnMouseLeave: false,
      onEnter: function () {},
      onLeave: function () {},
    });
  }
});
