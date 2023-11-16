
// Tabs
$(document).ready(function () {
    let activeTabText = 'All';
    printActiveTabText(activeTabText); // Call the function on page load
    getPagination('.table_all');
    getPagination('.table_transactions');

    $(".que_wrapper_tabs_tab").click(function () {
        var activeTab = $(this);
        $(".que_wrapper_tabs_tab").removeClass("active");
        activeTab.addClass("active");
        $(".que_wrapper_content_item").hide().eq(activeTab.index()).fadeIn();

        $('.pagination').html('')

        // Get and print the inner text value of the active tab
        activeTabText = activeTab.text();
        printActiveTabText(activeTabText);

        // var activeTab = $('.tab-item.active');
        var tableId = activeTab.data('table-id');
        getPagination('.' + tableId);

    }).eq(0).addClass("active");

    function printActiveTabText(tabText) {
        // console.log('Active Tab Text:', tabText);
        activeTabText = tabText;
    }

    console.log('indexx-', 10);
});



// select dropdown
let index = 1;

const on = (listener, query, fn) => {
    document.querySelectorAll(query).forEach(item => {
        item.addEventListener(listener, el => {
            fn(el);
        })
    })
}

on('click', '.selectBtn', item => {
    const next = item.target.nextElementSibling;
    next.classList.toggle('toggle');
    next.style.zIndex = index++;
});

$(document).ready(function () {
    $('.selectBtn').on('click', function () {
        $(this).toggleClass('after-toggle');
    });
});


on('click', '.option', item => {
    item.target.parentElement.classList.remove('toggle');
    const parent = item.target.closest('.select_v2').children[0];
    parent.setAttribute('data-type', item.target.getAttribute('data-type'));
    parent.innerText = item.target.innerText;

    $('.selectBtn').toggleClass('after-toggle');

    // Remove active class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('active');
    });

    // Add active class to the clicked option
    item.target.classList.add('active');
})


function getPagination(table) {
    // var maxRows = rowsPerPage; // Maximum rows per page
    var maxRows = 10; // Maximum rows per page
    var totalRows = $(table + ' tbody tr').length; // Total number of rows

    // Show the initial page
    changePage(1, table);

    // Calculate the number of pages
    var pageNum = Math.ceil(totalRows / maxRows);

    // Generate the pagination buttons
    var pagination = $(table).closest('.containerv1').find('.pagination');
    pagination.empty(); // Clear previous pagination buttons
    for (var i = 1; i <= pageNum; i++) {
        var pageButton = i < 10 ? '0' + i : i; // Add leading zero if page number is less than 10
        pagination.append('<li data-page="' + i + '"><span>' + pageButton + '</span></li>');
    }

    // Set the active class for the first page button
    pagination.find('li:first-child').addClass('active');

    // Add click event listener for the pagination buttons
    pagination.find('li').on('click', function (e) {
        e.preventDefault();
        var pageNum = $(this).attr('data-page');
        changePage(pageNum, table);
    });

    // Add click event listener for the previous button
    var prevButton = $(table).closest('.containerv1').find('.prev-btn-pagination');
    prevButton.on('click', function (e) {
        e.preventDefault();
        var activePage = pagination.find('li.active').attr('data-page');
        var prevPage = parseInt(activePage) - 1;
        if (prevPage >= 1) {
            changePage(prevPage, table);
        }
    });

    // Add click event listener for the next button
    var nextButton = $(table).closest('.containerv1').find('.next-btn-pagination');
    nextButton.on('click', function (e) {
        e.preventDefault();
        var activePage = pagination.find('li.active').attr('data-page');
        var nextPage = parseInt(activePage) + 1;
        if (nextPage <= pageNum) {
            changePage(nextPage, table);
        }
    });
}

// Function to change the page
function changePage(pageNum, table) {
    // var maxRows = rowsPerPage; // Maximum rows per page
    var maxRows = 10; // Maximum rows per page
    var startRow = (pageNum - 1) * maxRows; // Calculate the starting row index
    var endRow = startRow + maxRows; // Calculate the ending row index

    // Hide all rows and show only the ones for the specified page
    $(table + ' tbody tr').each(function (index) {
        if (index >= startRow && index < endRow) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });

    // Set the active class for the current page button
    var pagination = $(table).closest('.containerv1').find('.pagination');
    pagination.find('li').removeClass('active');
    pagination.find('li[data-page="' + pageNum + '"]').addClass('active');

    // Disable "Previous" button on first page
    var prevButton = $(table).closest('.containerv1').find('.prev-btn-pagination');
    if (pageNum === 1) {
        prevButton.prop('disabled', true);
    } else {
        prevButton.prop('disabled', false);
    }

    // Disable "Next" button on last page
    var nextButton = $(table).closest('.containerv1').find('.next-btn-pagination');
    if (pageNum === pagination.find('li').length) {
        nextButton.prop('disabled', true);
    } else {
        nextButton.prop('disabled', false);
    }
}


// Call getPagination function on page load
$(function () {
    if ($('.pagination li:first-child').hasClass('active')) {
        $('.prev-btn-pagination').prop('disabled', true);
    } else {
        $('.prev-btn-pagination').prop('disabled', false);
    }
});


// Event listener for search input
$('.search_input_all').on('keyup', function () {
    var searchInput = $(this);
    var container = searchInput.closest('.containerv1');
    var table = container.find('.table-id');
    // var maxRows = rowsPerPage; // Maximum rows per page
    var maxRows = 10; // Maximum rows per page
    var totalRows = table.find('tbody tr').length; // Total number of rows

    // Reset pagination div
    container.find('.pagination').html('');

    // Reset tr counter
    var trnum = 0;

    // Hide rows that exceed maxRows
    table.find('tr:gt(0)').each(function () {
        trnum++;
        if (trnum > maxRows) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    // Calculate the number of pages
    var pageNum = Math.ceil(totalRows / maxRows);

    // Generate the pagination buttons
    for (var i = 1; i <= pageNum; i++) {
        var pageButton = i < 10 ? '0' + i : i; // Add leading zero if number is less than 10
        container.find('.pagination').append('<li data-page="' + i + '"><span>' + pageButton + '</span></li>');

    }


    // Add active class to the first page button
    container.find('.pagination li:first-child').addClass('active');

    // Add click event listener for the pagination buttons
    container.find('.pagination li').on('click', function (e) {
        e.preventDefault();
        var pageNum = $(this).attr('data-page');
        changePage(pageNum, table);
    });

    // Add click event listener for the previous button
    container.find('.prev-btn-pagination').on('click', function (e) {
        e.preventDefault();
        var activePage = container.find('.pagination li.active').attr('data-page');
        var prevPage = parseInt(activePage) - 1;
        if (prevPage >= 1) {
            changePage(prevPage, table);
        }
    });

    // Add click event listener for the next button
    container.find('.next-btn-pagination').on('click', function (e) {
        e.preventDefault();
        var activePage = container.find('.pagination li.active').attr('data-page');
        var nextPage = parseInt(activePage) + 1;
        if (nextPage <= pageNum) {
            changePage(nextPage, table);
        }
    });

    // Call the search function
    FilterkeyWord_all_table(searchInput, table);
});

// Event listener for search input
$('.search_input_all').on('input', function () {
    var searchInput = $(this);
    var container = searchInput.closest('.containerv1');
    var table = container.find('.table-id');

    // Call the search function
    FilterkeyWord_all_table(searchInput, table);
});

// All Table search script
function FilterkeyWord_all_table(input, table) {
    // Declare variables
    var filter = input.val().toLowerCase();
    var tr = table.find('tbody tr');


    // Loop through all table rows, and hide those that don't match the search query
    tr.each(function () {
        var flag = 0;
        $(this).find('td').each(function () {
            var td_text = $(this).text();
            if (td_text.toLowerCase().indexOf(filter) > -1) {
                flag = 1;
                return false; // Exit the inner loop if a match is found
            }
        });

        if (flag == 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// copy to clipboard function
$(document).ready(function () {
    $('.copySearchId').on('click', function () {
        var cfRefId = $(this).parent().closest('tr').find('.cf_ref_id').text();

        // Copy cf_ref_id to clipboard
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(cfRefId).select();
        document.execCommand('copy');
        tempInput.remove();


        // Hide image, show tick mark, and reset after 2 seconds
        var img = $(this).parent().find('img');
        var tick = $('<img style="scale:2" src="./assets/images/icons/green_tick.svg" alt="">');
        //   var tick = $('<div>Copied!</div>');
        img.hide();
        $(this).parent().append(tick);
        setTimeout(function () {
            tick.remove();
            img.show();
        }, 2000);
    });
});

