/*
	panr - v0.0.1 by Robert Bue (@robert_bue)
	*/
(function ($, window, document, undefined) {
  // Create the defaults once

  var pluginName = "panr",
    defaults = {
      sensitivity: 22,
      moveTarget: "parent parent",
      scale: false,
      scaleOnHover: false,
      scaleTo: 1.1,
      scaleDuration: 0.28,
      panY: true,
      panX: true,
      panDuration: 0.7,
      resetPanOnMouseLeave: true,
      onEnter: function () {},
      onLeave: function () {},
    };
  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    //console.log(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      // call them like so: this.yourOtherFunction(this.element, this.settings).
      //console.log(this.settings);
      var settings = this.settings,
        target = $(this.element),
        w = target.width(),
        targetWidth = target.width() - settings.sensitivity,
        cx = (w - targetWidth) / targetWidth,
        x,
        y,
        panVars,
        xPanVars,
        yPanVars,
        mouseleaveVars;
      //console.log(cx);
      if (settings.scale || (!settings.scaleOnHover && settings.scale)) {
        TweenMax.set(target, { scale: settings.scaleTo });
      }
      // If no target provided we'll use the hovered element
      if (!settings.moveTarget) {
        settings.moveTarget = $(this.element);
      }
      if (settings.moveTarget == "parent") {
        settings.moveTarget = $(this.element).parent();
      }
      if (settings.moveTarget == "parent parent") {
        settings.moveTarget = $(this.element).parent().parent();
      }
      if (settings.moveTarget == "parent parent parent") {
        settings.moveTarget = $(this.element).parent().parent().parent();
      }

      settings.moveTarget.on("mousemove", function (e) {
        x = e.pageX - target.offset().left - target.width() / 2; // mouse x coordinate relative to the container
        y = e.pageY - target.offset().top - target.height() / 2; // mouse x coordinate relative to the container
        if (settings.panX) {
          xPanVars = { x: -cx * x };
        }
        if (settings.panY) {
          yPanVars = { y: -cx * y };
        }
        panVars = $.extend({}, xPanVars, yPanVars);

        // Pan element
        TweenMax.to(target, settings.panDuration, panVars);
      });
      // On mouseover
      settings.moveTarget.on("mouseenter", function (e) {
        // Scale up element
        TweenMax.to(target, settings.scaleDuration, {
          scale: settings.scaleTo,
        });
        settings.onEnter(target);
      });
      if (!settings.scale || (!settings.scaleOnHover && !settings.scale)) {
        mouseleaveVars = { scale: 1.005, x: 0, y: 0 };
      } else {
        if (settings.resetPanOnMouseLeave) {
          mouseleaveVars = { x: 0, y: 0 };
        }
      }
      settings.moveTarget.on("mouseleave", function (e) {
        // Reset element
        TweenMax.to(target, 0.35, mouseleaveVars);
        settings.onLeave(target);
      });
    },
  };
  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
