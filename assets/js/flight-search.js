// Select price
let rangeInput = document.querySelectorAll('.range-input input');
let rangeText = document.querySelectorAll('.range-text div');
let progress = document.querySelector('.progress');
let priceMax = rangeInput[0].max;
let priceGap = 1;

rangeInput.forEach(input => {
    input.addEventListener('input', (event) => {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (event.target.className === 'range-min') {
                minVal = rangeInput[0].value = maxVal - priceGap;
            } else {
                maxVal = rangeInput[1].value = minVal + priceGap;
            }
        }
        (minVal == 0) ? rangeText[0].style.display = "none" : rangeText[0].style.display = "block";
        (maxVal == 50) ? rangeText[1].style.display = "none" : rangeText[1].style.display = "block";
        let positionMin = (minVal / priceMax) * 100;
        let positionMax = 100 - ((maxVal / priceMax) * 100);
        progress.style.left = positionMin + '%';
        progress.style.right = positionMax + '%';
        rangeText[0].style.left = positionMin + '%';
        rangeText[1].style.right = positionMax + '%';
        rangeText[0].innerText = minVal.toLocaleString() + "k";
        rangeText[1].innerText = maxVal.toLocaleString() + "k";
    })
})



// travel duration

let rangeInput2 = document.querySelectorAll('.range-input2 input');
let rangeText2 = document.querySelectorAll('.range-text2 div');
let progress2 = document.querySelector('.progress2');
let priceMax2 = rangeInput2[0].max;
let priceGap2 = 1;

rangeInput2.forEach(input => {
    input.addEventListener('input', (event) => {
        let minVal = parseInt(rangeInput2[0].value);
        let maxVal = parseInt(rangeInput2[1].value);

        if (maxVal - minVal < priceGap2) {
            if (event.target.className === 'range-min2') {
                minVal = rangeInput2[0].value = maxVal - priceGap2;
            } else {
                maxVal = rangeInput2[1].value = minVal + priceGap2;
            }
        }
        (minVal == 0) ? rangeText2[0].style.display = "none" : rangeText2[0].style.display = "block";
        (maxVal == 8) ? rangeText2[1].style.display = "none" : rangeText2[1].style.display = "block";
        let positionMin = (minVal / priceMax2) * 100;
        let positionMax = 100 - ((maxVal / priceMax2) * 100);
        progress2.style.left = positionMin + '%';
        progress2.style.right = positionMax + '%';
        rangeText2[0].style.left = positionMin + '%';
        rangeText2[1].style.right = positionMax + '%';
        rangeText2[0].innerText = minVal.toLocaleString() + "hr";
        rangeText2[1].innerText = maxVal.toLocaleString() + "hr";
    })
})

// select city autocomplete dropdown

function createAuto(i, elem) {

    var input = $(elem);
    var dropdown = input.closest('.dropdown');
    var listContainer = dropdown.find('.list-autocomplete');
    var listItems = listContainer.find('.dropdown-item');
    var hasNoResults = dropdown.find('.hasNoResults');

    listItems.hide();
    listItems.each(function () {
        $(this).data('value', $(this).text());
        //!important, keep this copy of the text outside of keyup/input function
    });

    input.on("input", function (e) {

        if ((e.keyCode ? e.keyCode : e.which) == 13) {
            $(this).closest('.dropdown').removeClass('open').removeClass('in');
            return; //if enter key, close dropdown and stop
        }
        if ((e.keyCode ? e.keyCode : e.which) == 9) {
            return; //if tab key, stop
        }


        var query = input.val().toLowerCase();

        if (query.length > 1) {

            dropdown.addClass('open').addClass('in');

            listItems.each(function () {

                var text = $(this).data('value');
                if (text.toLowerCase().indexOf(query) > -1) {

                    var textStart = text.toLowerCase().indexOf(query);
                    var textEnd = textStart + query.length;
                    var htmlR = text.substring(0, textStart) + '<em>' + text.substring(textStart, textEnd) + '</em>' + text.substring(textEnd + length);
                    $(this).html(htmlR);
                    $(this).show();

                } else {

                    $(this).hide();

                }
            });

            var count = listItems.filter(':visible').length;
            (count > 0) ? hasNoResults.hide() : hasNoResults.show();

        } else {
            listItems.hide();
            dropdown.removeClass('open').removeClass('in');
            hasNoResults.show();
        }
    });

    listItems.on('click', function (e) {
        var txt = $(this).text().replace(/^\s+|\s+$/g, "");  //remove leading and trailing whitespace
        input.val(txt);
        dropdown.removeClass('open').removeClass('in');
    });

}

$('.jAuto').each(createAuto);


$(document).on('focus', '.jAuto', function () {
    $(this).select();  // in case input text already exists
});


// onclick select toggle to selected
$(".select-btn").click(function () {
    $(this).toggleClass("selected");
    if ($(this).hasClass('selected')) {
        $(this).parents('.card').addClass('active');
    }
    else {
        $(this).parents('.card').removeClass('active');
    }

    $(this).text(function (i, text) {
        return text === "Selected" ? "Select" : "Selected";
    });
});


//view flight details 
var isDetailsShown = false;

$(".view-details").click(function () {

    var $card = $(this).closest(".card"); // find the closest card element
    $card.find(".view-flight-details").slideToggle("fast");
    // $card.find(".view-flight-details").toggle("show");



    isDetailsShown = !isDetailsShown;
    if (isDetailsShown) {
        $(this).find("img").css("transform", "rotate(180deg)");
    } else {
        $(this).find("img").css("transform", "rotate(0deg)");
    }
})

// detail fare options activeness
$('.other-discounts li').click(function () {
    // Remove the active class from all cards
    $('.other-discounts li').removeClass('active');
    // Add the active class to the clicked card
    $(this).addClass('active');
});


// checked text color chnage
$('.check-wrap .cl-checkbox .inCheck').change(function () {
    if (this.checked) {
        $(this).next('.check-wrap .cl-checkbox .check').css('color', '#189eff').css('font-weight', '600');
        $(this).closest('.check-wrap').css('border', '1px solid #189eff')
    } else {
        $(this).next('.check-wrap .cl-checkbox .check').css('color', '').css('font-weight', '');
        $(this).closest('.check-wrap').css('border', '')
    }
});

// tabs open based on used clicks
$(document).ready(function () {
    // When a modal is shown
    $('#exampleModal3').on('shown.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        // console.log(button);

        var target = button.data('bsTarget'); // Get the target of the button (in this case, #exampleModal3)
        // console.log(target);


        // Set the appropriate radio button as checked based on the target of the button
        if (target === '#exampleModal3') {
            if (button.text() === 'Fare Rule') {
                $('#tab-1').prop('checked', true);
                // console.log('rule');

            } else if (button.text() === 'Fare Breakup') {
                $('#tab-2').prop('checked', true);
                // console.log('Breakup');
            } else if (button.text() === 'Baggage Policy') {
                $('#tab-3').prop('checked', true);
                // console.log('Baggage');
            }
        }
    });
});

// instant purchase hover
$(document).ready(function () {
    applyHoverEffect(); // Apply hover effect on page load

    $(window).resize(function () {
        applyHoverEffect(); // Apply hover effect on screen size change
    });
});

function applyHoverEffect() {
    if ($(window).width() < 950) {
        $('.instant-purchase').hover(function () {
            $(this).find('div').addClass('show');
        }, function () {
            $(this).find('div').removeClass('show');
        });
    } else {
        $('.instant-purchase').off('mouseenter mouseleave'); // Remove hover event if screen size is >= 950px
        $('.instant-purchase div').removeClass('show'); // Remove show class from div element
    }
}

// progressbar and skeleton
let barWidth = 0;

const animate = () => {
    barWidth++;
    $("#bar").width(`${barWidth}%`);
};

$(".bottom-right").on("click", () => {
    barWidth = 0;
    $("#bar").show();
    window.scrollTo(0, 0);
    $("#no_results_id").hide(); // Hide no results
    $("#skeleton_id").show(); // Show skeleton
    $(".results_data").hide();
    let intervalID = setInterval(() => {
        if (barWidth === 100) {
            clearInterval(intervalID);
            $("#bar").hide(); // hide the progress bar when it reaches 100%

            // Hide skeleton and no results, show the data
            $("#no_results_id, #skeleton_id").hide();
            $(".results_data").show();
        } else {
            animate();
        }
    }, 50);
});

$(document).ready(function () {
    // Hide the initial elements
    $("#no_results_id").show();
    $("#skeleton_id").hide();
    $(".results_data").hide();
});


$(document).ready(function () {
    $('#showDangerAlertBtn').click(function () {
        showAlert('danger', "danger message!");
    });

    $('#showSuccessAlertBtn').click(function () {
        showAlert('success', "success message!");
    });

    $('#showInfoAlertBtn').click(function () {
        showAlert('info', "info message!");
    });

    $('#showWarningAlertBtn').click(function () {
        showAlert('warning', "warning message!");
    });


    function showAlert(type, msg) {
        let alertHtml;

        if (type == "danger") {
            alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <img src="./assets/images/icons/danger_alert.svg" height="34.1px" width="34.1px" alt="danger_icon">
            <span class="alert_msg">${msg}</span>
              <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close"><svg width="28.42" height="28.42" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4114 7.94038L21.7417 6.27075L15.1224 12.8901L8.50312 6.27075L6.8335 7.94038L13.4528 14.5597L6.8335 21.179L8.50312 22.8486L15.1224 16.2293L21.7417 22.8486L23.4114 21.179L16.7921 14.5597L23.4114 7.94038Z" fill="currentColor"/></button>
            </div>
          `;
        }
        else if (type == "success") {
            alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <img src="./assets/images/icons/success_alert.svg" height="34.1px" width="34.1px" alt="danger_icon">
            <span class="alert_msg">${msg}</span>
              <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
              <svg width="28.42" height="28.42" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4114 7.94038L21.7417 6.27075L15.1224 12.8901L8.50312 6.27075L6.8335 7.94038L13.4528 14.5597L6.8335 21.179L8.50312 22.8486L15.1224 16.2293L21.7417 22.8486L23.4114 21.179L16.7921 14.5597L23.4114 7.94038Z" fill="currentColor"/></button>
            </div>
          `;
        }
        else if (type == "info") {
            alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <img src="./assets/images/icons/info_alert.svg" height="34.1px" width="34.1px" alt="danger_icon">
            <span class="alert_msg">${msg}</span>
              <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close"><svg width="28.42" height="28.42" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4114 7.94038L21.7417 6.27075L15.1224 12.8901L8.50312 6.27075L6.8335 7.94038L13.4528 14.5597L6.8335 21.179L8.50312 22.8486L15.1224 16.2293L21.7417 22.8486L23.4114 21.179L16.7921 14.5597L23.4114 7.94038Z" fill="currentColor"/></button>
            </div>
          `;
        }
        else if (type == "warning") {
            alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <img src="./assets/images/icons/warning_alert.svg" height="34.1px" width="34.1px" alt="danger_icon">
            <span class="alert_msg">${msg}</span>
              <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close"><svg width="28.42" height="28.42" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4114 7.94038L21.7417 6.27075L15.1224 12.8901L8.50312 6.27075L6.8335 7.94038L13.4528 14.5597L6.8335 21.179L8.50312 22.8486L15.1224 16.2293L21.7417 22.8486L23.4114 21.179L16.7921 14.5597L23.4114 7.94038Z" fill="currentColor"/></button>
            </div>
          `;
        }

        var $alert = $(alertHtml);
        $('#alertContainer').append($alert);

        // Auto-close after 3 seconds
        setTimeout(function () {
            $alert.alert('remove').fadeOut(600, 0);
        }, 3000);

    }
});


// quote dropdown ^

$(document).ready(function () {
    $('.caret_switch').click(function () {
        var $caretSwitch = $(this);
        var $downCaret = $caretSwitch.find('.downCaret');
        var $upCaret = $caretSwitch.find('.upCaret');
        var $qcBottombar = $caretSwitch.closest('.quote_card').find('.qc_bottombar');
        var $dropBox = $caretSwitch.parent(".drop_box");

        if ($dropBox.css("background-color") === "rgb(226, 231, 238)") {
            $dropBox.css("transition", "background-color 0.5s ease");
            $dropBox.css("background-color", "#FFFFFF");
        } else {
            $dropBox.css("transition", "background-color 0.5s ease");
            $dropBox.css("background-color", "#E2E7EE");
        }



        $downCaret.toggle();
        $upCaret.toggle();
        $qcBottombar.slideToggle("fast");
    });
});

// quote dropdowm +
$(".view_info").click(function () {
    var $eventEle = $(this).next('.Passenger-table');
    $eventEle.find(".view_info_data").slideToggle("fast");
    $(this).find(".closed_plus").toggle();
    $(this).find(".opened_minus").toggle();
});







