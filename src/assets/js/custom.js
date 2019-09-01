"use strict";
$(document).ready(function() {
  // Navigation 
  var innerDistance = $('.portfolio-case__logo').position().top / 2;
  var controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene()
    .triggerElement(".portfolio-case__header--min-top")
    .triggerHook("onLeave")
    .setClassToggle('.portfolio-case__header--min', 'is-visible')
    .on('start', function() {
      $('.portfolio-case__header--min h1, .portfolio-case__header--min svg').slideToggle(150);
    })
  .addTo(controller); 
  
  
  // Video
  $('video').each(function(t) {
    t = $(this);
    console.log(t[0]);

    new ScrollMagic.Scene()
    .triggerElement($('video'))
    .triggerHook("onEnter")
    .setClassToggle('video-is-loaded')
    .on("enter", function(elem) {
      console.log(elem);
      // $(self.children).each(function() {
      //   var src = self.attr('data-src');
      //   console.log(self);
      // })
    })
    .addTo(controller)
  })
});

