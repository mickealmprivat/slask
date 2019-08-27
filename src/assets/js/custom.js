"use strict";
$(document).ready(function() {
    var innerDistance = $('.portfolio-case__logo').position().top / 2;
    var body = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
		offset: -innerDistance
    })
    .triggerElement(".portfolio-case__logo")
    .triggerHook("onLeave")
    .setClassToggle('.portfolio-case__header--min', 'is-visible')
	.addTo(body); 
});

