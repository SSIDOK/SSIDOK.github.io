const iconWrap = document.getElementById('iconWrap')
const iconOpen = document.getElementById('iconOpen')
const iconClose = document.getElementById('iconClose')
const mainMenu = document.getElementById('mainMenu')

iconWrap.addEventListener('click',() => {
	mainMenu.classList.toggle('hide-menu')
	iconOpen.classList.toggle('hide')
	iconClose.classList.toggle('hide')
})

$(document).ready(function() {
  $('#mainMenu a, .latest-work a, .up-button a').on('click', function(event) {
    event.preventDefault();

    var targetSection = $($(this).attr('href'));

    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top
      }, 1000);
    }
  });
});
