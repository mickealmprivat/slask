"use strict";
var controller = new ScrollMagic.Controller();

// Portfolio videos play on enter
function playVideos() {
  var videoElements = document.getElementsByClassName('portfolio-video');

  for (var i=0; i<videoElements.length; i++) {
    var videoScene = new ScrollMagic.Scene({
      triggerElement: videoElements[i],
      triggerHook: 'onEnter'
    })
      .on('enter', function(e) {
        e.target.triggerElement().play();
      })
      .addTo(controller);
  }
}
playVideos();
