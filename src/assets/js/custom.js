"use strict";
$(document).ready(function() {
  var controller = new ScrollMagic.Controller();

  // Navigation 
  var innerDistance = $('.portfolio-case__logo').position().top / 2;

  new ScrollMagic.Scene()
    .triggerElement(".portfolio-case__header--min-top")
    .triggerHook("onLeave")
    .setClassToggle('.portfolio-case__header--min', 'is-visible')
    .on('start', function() {
      $('.portfolio-case__header--min h1, .portfolio-case__header--min svg').slideToggle(150);
    })
  .addTo(controller); 

  // Portfolio videos play on enter
  $('.portfolio-video').each(function() {
    var videoScene = new ScrollMagic.Scene()
      .triggerElement(this)
      .triggerHook('onEnter')
      .on('enter', function(e) {
        e.target.triggerElement().play();
      })
      .addTo(controller);
  });
});