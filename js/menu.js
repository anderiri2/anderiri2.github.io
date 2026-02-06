var slideout;

function checkmenu() {
  var isMobile = window.innerWidth < 768;

  if (isMobile) {
    if (!slideout) {
      slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 150,
        'tolerance': 70,
      });

      // Toggle button
      document.querySelector('.toggle-button').addEventListener('click', function () {
        slideout.toggle();
      });
    }
  } else {
    if (slideout) {
      slideout.destroy();
      slideout = null;
    }
  }
}

$(document).ready(function () {
  checkmenu();
  window.onresize = checkmenu;
});

