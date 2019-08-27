"use strict";
$(document).ready(function() {
    var innerDistance = $('.portfolio-case__logo').position().top / 2;
    var body = new ScrollMagic.Controller();

    new ScrollMagic.Scene()
    .triggerElement(".portfolio-case__header--min-top")
    .triggerHook("onLeave")
    .setClassToggle('.portfolio-case__header--min', 'is-visible')
    .on('start', function() {
      $('.portfolio-case__header--min h1, .portfolio-case__header--min svg').slideToggle(150);
    })
	.addTo(body); 
});

