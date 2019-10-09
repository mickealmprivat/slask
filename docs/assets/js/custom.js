"use strict";

var controller = new ScrollMagic.Controller(); // Navigation

var headerTween = new TweenLite.from('.portfolio-case__header--min__content', .150, {
  autoAlpha: 0,
  y: -40
});
var header = new ScrollMagic.Scene({
  offset: -20,
  triggerElement: '.portfolio-case__header--min',
  triggerHook: 'onLeave'
}).setTween(headerTween).addTo(controller); // Portfolio videos play on enter

function playVideos() {
  var videoElements = document.getElementsByClassName('portfolio-video');

  for (var i = 0; i < videoElements.length; i++) {
    var videoScene = new ScrollMagic.Scene({
      triggerElement: videoElements[i],
      triggerHook: 'onEnter'
    }).on('enter', function (e) {
      e.target.triggerElement().play();
    }).addTo(controller);
  }
}

playVideos();