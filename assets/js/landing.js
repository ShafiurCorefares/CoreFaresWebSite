// AOS
// below listed default settings
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    offset: 0,
    startEvent: 'load',
});

$(document).ready(function () {
    $('.products_container_tabs_tab').on('click', function () {
        // Get the parent container of the clicked tab
        var container = $(this).closest('.products_container');

        // Remove the active class from all content tabs within this container
        container.find('.content_tab').removeClass('active_tab');

        // Find the data-tab attribute value of the clicked tab
        var tabIndex = $(this).attr('for').split('-')[1];

        // Add active class to the corresponding content tab within this container
        container.find('.content_tab[data-tab="' + tabIndex + '"]').addClass('active_tab');
    });

    // Trigger click on the initial active tab for each container
    $('.products_container_tabs_tab[for^="radio-1"]').trigger('click');
});

// logos carousel
$('.logos_wrapper_container_carousel .owl-carousel').each(function () {
    var _rtlSet = ($(this).parent().attr('data-reverse') === 'true') ? true : false;

    $(this).owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 800,
        margin: 32,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 3800,
        autoplaySpeed: 3800,
        // autoplayHoverPause: true,
        rtl: _rtlSet,
        responsive: {
            320: {
                items: 2,
                margin: 10,
            },
            768: {
                items: 5,
                margin: 60,
            }
        }
    })
})

// header
$(window).scroll(function () {
    var scroll = $(window).scrollTop();


    if (scroll >= 100) $(".header_v2").addClass("darkHeader");
    else $(".header_v2").removeClass("darkHeader");
});


// var tabsv2 = $('.tabsv2'),
//     tabsv2Lists = $('.tabsv2 ul.tabsv2--list li');
// tabsv2.each(function () {
//     var tab = $(this),
//         tabItems = tab.find('ul.tabsv2--list'),
//         tabContentWrapper = tab.children('ul.tabsv2--content');

//     tabItems.on('click', 'a', function (event) {
//         event.preventDefault();
//         var activedItem = $(this);
//         if (!activedItem.hasClass('actived')) {
//             var activedTab = activedItem.data('content'),
//                 activedContent = tabContentWrapper.find('li[data-content="' + activedTab + '"]');

//             tabItems.find('a.actived').removeClass('actived');
//             activedItem.addClass('actived');
//             activedContent.addClass('actived').siblings('li').removeClass('actived');
//         }
//     });
// });

// tabsv2Lists.click(function (e) {
//     if ($(this).hasClass('moving-tab')) {
//         return;
//     }
//     var whatTab = $(this).index();
//     var howFar = 25 * whatTab;
//     $(".moving-tab").css({
//         left: howFar + "%"
//     });
// });

// accordion
$(document).ready(function () {
    $('.accordion-list > li > .answer').hide();

    $('.accordion-list > li').click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").find(".answer").slideUp();
        } else {
            $(".accordion-list > li.active .answer").slideUp();
            $(".accordion-list > li.active").removeClass("active");
            $(this).addClass("active").find(".answer").slideDown();
        }
        return false;
    });

});

// navigation
$('.header_v2_menu_hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.header_v2_menu_hamburger_menu').toggleClass('open');
    if ($('.header_v2_menu_hamburger').hasClass('open')) {
        $('html').css({
            'overflow': 'hidden'
        })
    }
    else {
        $('html').css({
            'overflow': 'auto'
        })
    }
})