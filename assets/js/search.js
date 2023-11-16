// /GDS Itinerary popup

//dropdown on  hover //
$(".dropdown_hover ").on({
    mouseenter: function () {
        $(".drop-content .drop-hover").slideDown();
    },
    mouseleave: function () {
        $(".drop-content .drop-hover").slideUp();
    }
});

$(".dropdown_hover .drop-content .drop-hover li span").on('click', function () {
    $(".dropdown_hover .selected  span").html($(this).html());
    $(".dropdown_hover .drop-content .drop-hover").slideUp();
});

$(document).bind('click', function (e) {
    var $clickhide = $(e.target);
    if (!$clickhide.parents().hasClass("dropdown_c"))
        $(".dropdown_c .drop-content ul").slideUp();


});


// select city  dropdown

//1.where from 

$('body').on('focus', '.whereFromInput', function () {
    $(".dropdown-menu-1").fadeOut(300);
    $(".dropdown-menu-2").fadeOut(300);
    $(this).next(".dropdown-menu-1").fadeIn(300);
    console.log('where');


})


// Detect all clicks on the document
$(document).click(function (event) {
    // If user clicks inside the element, do nothing
    if ($(event.target).closest(".dropdown-1").length !== 0) return;

    // If user clicks outside the element, hide it!
    $(".dropdown-menu-1").fadeOut(300);
});

//1.where to
$('body').on('focus', '.whereToInput', function () {
    $(".dropdown-menu-1").fadeOut(300);
    $(".dropdown-menu-2").fadeOut(300);
    $(this).next(".dropdown-menu-2").fadeIn(300);

});


// Detect all clicks on the document
$(document).click(function (event) {
    // If user clicks inside the element, do nothing
    if ($(event.target).closest(".dropdown-2").length !== 0) return;

    // If user clicks outside the element, hide it!
    $(".dropdown-menu-2").fadeOut(300);
});

$('body').on('click', '.right-remove-box', function () {
    var _cardsLength = $('.destination-card').length;
    console.log(_cardsLength);
    if (_cardsLength > 2) {
        $(this).parents('.destination-card').fadeOut(500, function () {
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


// Define the named function for toggling inputs
function toggleInputs(inputsContainer) {
    const input1 = inputsContainer.find('.input-1');
    const input2 = inputsContainer.find('.input-2');
    const temp = input1.val();// store input1 value in temporary variable
    input1.val(input2.val());// set input1 value to input2 value
    input2.val(temp);// set input2 value to temporary variable
}

// Call the toggleInputs function on click of toggle button for existing cards
$('.pair').each(function () {
    const inputsContainer = $(this);
    const toggleBtn = inputsContainer.find('.toggle-icon');

    toggleBtn.click(function () {
        toggleInputs(inputsContainer);
    });
});

// Call the toggleInputs function on click of toggle button for cloned cards
$('#add-multicity').click(function () {
    var liItem = $('.destination-card').last().clone();
    $('#destination-cards').append(liItem)
    $('.right-remove-box').css({
        'opacity': '1',
        'pointer-events': 'all'
    })

    // Call the toggleInputs function for the cloned card
    const inputsContainer = liItem.find('.pair');
    const toggleBtn = inputsContainer.find('.toggle-icon');
    toggleBtn.click(function () {
        toggleInputs(inputsContainer);
    });

    // Recall the calendar widgets for the cloned card
    let calendarWidgets1 = liItem[0].querySelectorAll(".calendar-widget");
    calendarWidgetsRecall(calendarWidgets1);

});


// GDS Itinerary popup
const gdsItOpen = document.getElementById("gds-it");
const gdsItPopup = document.getElementById("gds-it-popup");
const gdsItClose = document.getElementById("close-gds-popup");

if (gdsItOpen) {
    // open
    gdsItOpen.addEventListener("click", () => {
        gdsItPopup.classList.add("show");
    })

    // close
    gdsItClose.addEventListener("click", () => {
        gdsItPopup.classList.remove("show");
    })
    // console.log('gds present in page');
}
else {
    // console.log('gds absent in page');
}


$('.gds_radio input').on('change', function () {
    if ($(this).is(':checked')) {
        // Remove the class from all other .gds_radio elements
        $('.gds_radio').removeClass('checked_gds');
        $(this).closest('.gds_radio').addClass('checked_gds');
    } else {
        $(this).closest('.gds_radio').removeClass('checked_gds');
    }
});




