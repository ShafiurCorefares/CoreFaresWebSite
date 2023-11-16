// Replace all SVG images with inline SVG
function svgInline() {
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}

// jquery toggle just the attribute value
$.fn.toggleAttrVal = function (attr, val1, val2) {
    var test = $(this).attr(attr);
    if (test === val1) {
        $(this).attr(attr, val2);
        return this;
    }
    if (test === val2) {
        $(this).attr(attr, val1);
        return this;
    }
    // default to val1 if neither
    $(this).attr(attr, val1);
    return this;
};

// password show/hidden
$('.input-group .input-eye').each(function () {
    $(this).on('click', function () {
        $(this).toggleClass('active');
        $(this).parents('.input-group').find('input').toggleAttrVal('type', 'text', 'password')
    })
})

function getMsg(selector) {
    return $(selector).attr('data-msg');
}

// sign in
if ($('#cf_sign_in_form').length) {
    $('#cf_sign_up_link').on('click', function () {
        var _this = $('#cf_sign_in_form');
        _this.parents('.cf_login_block').removeClass('active');
        $('#cf_sign_up').addClass('active');
    })

    $('#cf_sign_in_form').validate({
        submitHandler: function (form) {
            console.log('success')
        },
        messages: {
            name: getMsg('name'),
        }
    });
}

// send mail quote
if ($('#send-mail-form').length) {
    $('#send-mail-form').validate({
        submitHandler: function (form) {
            console.log('success')
        },
        messages: {
            name: getMsg('name'),
        }
    });
}

// sign up
if ($('#cf_sign_up_form').length) {
    $("#cf_sign_up_form").validate({
        submitHandler: function (form) {
            var _this = $('#cf_sign_up_form');
            _this.parents('.cf_login_block').removeClass('active');
            $('#cf_sign_up_success').addClass('active');
        }
    });
}

$('#cf_sign_in_link,#cf_sign_in_link_remember').on('click', function () {
    $(this).parents('.cf_login_block').removeClass('active');
    $('#cf_sign_in').addClass('active');
})


// forgot password
if ($('#cf_forgot_pwd_form').length) {
    $('#cf_forgot_pwd_link').on('click', function () {
        $(this).parents('.cf_login_block').removeClass('active');
        $('#cf_forgot_pwd').addClass('active');
    })

    $('#cf_forgot_pwd_form').validate({
        submitHandler: function (form) {
            console.log('success');
            var _this = $('#cf_forgot_pwd_form');
            $('.cf_forgot_link_success').addClass('active');
            $('#cf_forgot_btn').html('Signin');
            $('#cf_forgot_btn').on('click', function () {
                _this.parents('.cf_login_block').removeClass('active');
                $('#cf_reset_pwd').addClass('active');
            })
        }
    })
}

// reset password
if ($('#cf_reset_pwd_form').length) {
    $('#cf_reset_pwd_form').validate({
        submitHandler: function (form) {
            console.log('success');
            var _this = $('#cf_reset_pwd_form');
            _this.parents('.cf_login_block').removeClass('active');
            $('#cf_reset_success').addClass('active');
        }
    })
}

// reset login
$('#reset_login').on('click', function (e) {
    e.preventDefault();
    var _this = $(this);
    _this.parents('.cf_login_block').removeClass('active');
    $('#cf_sign_in').addClass('active');
})

//testimonials
if ($('.testimonials').length) {
    $('.testimonials').owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        dots: false,
        smartSpeed: 750,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
}

// star rating
// https://nashio.github.io/star-rating-svg/demo/
if ($('.show_rating').length) {
    $(".show_rating").starRating({
        totalStars: 5,
        starSize: 20,
        emptyColor: '#fff',
        hoverColor: 'salmon',
        activeColor: '#189EFF',
        useGradient: false
    });
}

// dropdown version 1
$('.cf_dropdown_v1--show').click(function () {
    document.querySelectorAll('.cf_dropdown_v1').forEach(function (ele) {
        ele.classList.remove("cf_hover");
    })
    $(this).parents('.cf_dropdown_v1').addClass('cf_hover');
})

$('.cf_dropdown_v1').mouseleave(function () {
    $(this).removeClass('cf_hover');
});

$(document).click(function (event) {
    // If user clicks inside the element, do nothing
    if ($(event.target).closest(".cf_dropdown_v1").length !== 0) return;

    // If user clicks outside the element, hide it!
    document.querySelectorAll('.cf_dropdown_v1').forEach(function (ele) {
        ele.classList.remove("cf_hover");
    })
});



$('.cf_dropdown_v1 .cf_dropdown_v1_list_each').on('click', function () {
    var _item = $(this).attr('data-item'),
        _icon = $(this).find('.icon img').attr('src'),
        _text = $(this).find('.text').html();
    var _showIcon = $(this).parents('.cf_dropdown_v1').find('.cf_dropdown_v1--show .icon img').attr('src', _icon),
        _showText = $(this).parents('.cf_dropdown_v1').find('.cf_dropdown_v1--show .text').html(_text),
        _showItem = $(this).parents('.cf_dropdown_v1').find('.cf_dropdown_v1--show').attr('data-item', _item);
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parents('.cf_dropdown_v1').removeClass('cf_hover');


    // console.log("item:-",_item,"icon:-", _icon,"text:-", _text);

    // flight tabs
    if ($('.cf_flight_tabs_content').length) {
        $('.cf_flight_tabs_content ' + _item).addClass('active').siblings().removeClass('active');
    }
})


// plus/minus
var travelCount = 0;
$('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count;
    if (parseInt($input.val()) > 0 && parseInt($input.val()) < 10) {
        count = '0' + (parseInt($input.val()) - 1);
    }
    else {
        count = '0' + (parseInt($input.val()));
    }

    count = count < 0 ? 00 : count;
    if (count <= 0) {
        $(this).parent().find('input').prev('.minus').css(
            { 'pointer-events': 'none' }
        )
    }

    if (travelCount <= 0) {
        travelCount = 0;
    }
    else {
        travelCount--;
    }
    $('.traveler_count').html(travelCount);
    $input.val(count);
    $input.change();
    // console.log(travelCount);
    return false;
});
$('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $(this).parent().find('input').prev('.minus').css(
        { 'pointer-events': 'all' }
    )

    if (parseInt($input.val()) < 9) {
        $input.val('0' + (parseInt($input.val()) + 1));
    }
    else {
        $input.val(parseInt($input.val()) + 1);
    }
    travelCount++;
    $('.traveler_count').html(travelCount);
    $input.change();
    // console.log(travelCount);
    return false;
});


// multi select
if ($('.multiple-select').length) {
    var _resetBtn = "<button id='cf_btn_reset' class='cf_btns--reset'>Reset</button>",
        _doneBtn = "<button id='cf_btn_done' class='cf_btns--done'>Done</button>",
        _html = "<div class='cf_btns'>" + _resetBtn + _doneBtn + "</div>";
    var _onlyLabel = "<button class='cf_only'>only</button>"
    $('.multiple-select').multipleSelect({
        maxHeight: 140,
        animate: "fade",
    })
    setTimeout(() => {
        $('.multiple-select.extra_btns .ms-drop').append(_html);
        $('.multiple-select.extra_btns .ms-drop ul li label').append(_onlyLabel);
    }, 300);

    $('body').on('click', '#cf_btn_reset', function () {
        $(this).parents('.cf_select2').find('select').multipleSelect('uncheckAll');
    })

    $('body').on('click', '#cf_btn_done', function () {
        $(this).parents('.cf_select2').find('select').multipleSelect('close');
    })

    $('body').on('click', '.cf_only', function () {
        $(this).parents('.cf_select2').find('select').multipleSelect('uncheckAll');
        $(this).parent().find('input').trigger('click');
    })
    $(document).ready(function () {
        $(".ms-select-all span").text("[Select all airlines]");
    });
}

// window load functions
$(window).on('load', function () {
    svgInline();
})


// trash
$('.status-container').each(function () {
    // var statusValue = $(this).find('.status-value').text().trim();
    var statusValue = $(this).find('#status_value_1').text().trim();
    var statusMap = {
        'Booked': '#booking_time_1, #email_quote_btn_1, #order_ticket_btn_1',
        'Ticket Ordered': '#email_quote_btn_1, #cancel_ticket_btn_1',
        'Ticketed': '#email_e_ticket_btn_1, #download_ticket_btn_1',
        'Quote': '#email_quote_btn_1, #confirm_ticket_btn_1',
        'None': '#order_ticket_btn_1',
        'Not Booked': '#email_itinerary_btn_1'
    };
    console.log("statusValue-", statusValue);


    if (statusMap.hasOwnProperty(statusValue)) {
        $(this).removeClass().addClass('status-container active');
        $(this).find(statusMap[statusValue]).addClass('active');
    } else {
        $(this).removeClass('active');
        $(this).find('#booking_time_1, #email_quote_btn_1, #order_ticket_btn_1, #email_e_ticket_btn_1, #cancel_ticket_btn_1, #confirm_ticket_btn_1, #email_itinerary_btn_1, #download_ticket_btn_1').removeClass('active');
    }
});


// select city

$(document).ready(function () {
    $(".search-input").on("focus", function () {
        $(this).val("");
        updateSearchList($(this));
    });

    $(".search-list").on("change", "li:not(.select-all) input[type='checkbox']", function () {
        var list = $(this).closest(".search-list");
        list.find(".select-all").removeClass("hidden");
        list.prepend(list.find(".select-all"));
        var selectedItems = list.find("input[type='checkbox']:checked").closest("li").not(".select-all");
        if (selectedItems.length > 0) {
            var selectAll = list.find(".select-all");
            selectAll.after(selectedItems);
        }
        $(this).closest(".checkboxes-1").find(".search-input").val("");
        updateSearchList($(this).closest(".checkboxes-1").find(".search-input"));
    });

    $(".view-all").click(function () {
        var list = $(this).prev(".search-list");
        var hiddenItems = list.find("li.hidden");
        if ($(this).text() == "View All") {
            hiddenItems.slideDown();
            $(this).text("View Less");
            list.css({
                "max-height": "320px",
                "overflow": "auto"
            });
        } else {
            hiddenItems.slideUp("slow");
            $(this).text("View All");
            list.css({
                "max-height": "160px",
                "overflow": "hidden"
            });
            list.scrollTop(0);
        }
    });



    $(".search-input").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        updateSearchList($(this));
    });

    $(".search-list").on("change", ".select-all input[type='checkbox']", function () {
        var list = $(this).closest(".search-list");
        var checkboxes = list.find("input[type='checkbox']");
        checkboxes.prop("checked", $(this).prop("checked"));
        var selectedItems = checkboxes.filter(":checked").closest("li");
        list.prepend(selectedItems);
    });

    function updateSearchList(input) {
        var list = input.closest(".search-list-container").find(".search-list");
        var matchFound = false;

        list.find("li:not(.select-all)").each(function () {
            var listItem = $(this);
            var text = listItem.text().toLowerCase();

            if (text.indexOf(input.val().toLowerCase()) > -1 || input.val() === "") {
                listItem.show();
                matchFound = true;
            } else {
                listItem.hide();
            }
        });

        list.find(".no-match").remove();

        if (!matchFound) {
            var noMatchLi = $("<li>").text("No matches found!").addClass("no-match");
            list.append(noMatchLi);
        }

        list.find(".select-all").removeClass("hidden");
        list.prepend(list.find(".select-all"));

        var selectedItems = list.find("input[type='checkbox']:checked").closest("li").not(".select-all");
        if (selectedItems.length > 0) {
            var selectAll = list.find(".select-all");
            selectAll.after(selectedItems);
        }
    }
});





