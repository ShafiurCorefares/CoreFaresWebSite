// GDS Itinerary popup
const gdsItOpen = document.getElementById("gds-it");
const gdsItPopup = document.getElementById("gds-it-popup");
const gdsItClose = document.getElementById("close-gds-popup");

// open
gdsItOpen.addEventListener("click", () => {
  gdsItPopup.classList.add("show");
});

// // close
// gdsItClose.addEventListener("click", () => {
//   gdsItPopup.classList.remove("show");
// });

$(".profile-container").click(function () {
  // console.log('clicked');
  document.querySelectorAll('.passenger_form').forEach(function (ele) {
    ele.classList.remove("active-passenger");
    // console.log('removed');
  })
  $(this).parent(".person-section").find(".passenger_form").addClass("active-passenger").slideToggle("fast");
  $(this).parent(".person-section").find(".upCaret").toggle();
  $(this).parent(".person-section").find(".downCaret").toggle();
});

// Add frequent  Flyer cards
// REMOVE BTN OF  Flyer CARD 
$('body').on('click', '.right-remove-box', function () {
  var _cardsLength = $('.flyer-card').length;
  console.log(_cardsLength);
  if (_cardsLength > 2) {
    $(this).parents('.flyer-card').fadeOut(500, function () {
      $(this).remove();
    });

  }
  if (_cardsLength <= 3) {

    $('.right-remove-box').css({
      'opacity': '0',
      'pointer-events': 'none'
    })
  }
})

// ADD OR CLONE  Flyer

$('.add-flyer').click(function () {
  $(".multiple-select").multipleSelect("destroy");
  var liItem = $('.flyer-card').last().clone();
  $('.flyer-cards').append(liItem)
  $('.right-remove-box').css({
    'opacity': '1',
    'pointer-events': 'all'
  });

  $(function () {
    $(".multiple-select").multipleSelect("refresh");
  });

});




