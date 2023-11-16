let bookingDetails = document.getElementById("view-booking");
let viewHead = document.getElementById("view-head");
let viewTable = document.getElementById("view-table");
let downIcon = document.getElementById("img-down");
let UpIcon = document.getElementById("img-up");
let refund = document.getElementById("refund");
let reissue = document.getElementById("reissue");
let refundTable = document.getElementById("refund-table");
let ReissueTable = document.getElementById("Reissue-table");


// email modal
let SpecialButton1 = document.getElementById("email_quote_btn_1");
let SpecialPop1 = document.getElementById("Special-Services-popUp");
let SpecialButton2 = document.getElementById("Special-button-2");

//order modal
let orderTicketPop = document.getElementById("order-ticket-pop");
// let orderButton1 = document.getElementById("order_ticket_btn_1");
// let orderButton2 = document.getElementById("order-button-2");

// scr modal
// let ssrButton1 = document.getElementById("ssr-button-1");
// let ssrButton2 = document.getElementById("ssr-button-2");
let ssrModalPop = document.getElementById("ssr-modal-pop");

//amount modal function
let sufficientBalance = document.getElementById("sufficient-balance");
let LessAmount = document.getElementById("less-amount");
let confirmButton = document.getElementById("confirm-button");
let errorMessage = document.getElementById("error-message");
let addButton = document.getElementById("add-button");
let walleteSvgPath = document.querySelector("#wallete_icon path");

// add funds modal
let addFundsDiv = document.querySelector("#addFunds_id");
let lowFundsDiv = document.querySelector("#lowFunds_id");
let closeFundsBtn = document.querySelector("#close_funds_btn_id");

// email modal
// SpecialButton1.addEventListener("click", () => {
//   SpecialPop1.classList.add("show");
// });

// SpecialButton2.addEventListener("click", () => {
//   SpecialPop1.classList.add("show");
// });

//order modal
// orderButton1.addEventListener("click", () => {
//   orderTicketPop.classList.add("show");
// });
// orderButton2.addEventListener("click", () => {
//   orderTicketPop.classList.add("show");
// });

// scr modal
// ssrButton1.addEventListener("click", () => {
//   ssrModalPop.classList.add("show");
// });

// ssrButton2.addEventListener("click", () => {
//   ssrModalPop.classList.add("show");
// });

//amount modal function
confirmButton.addEventListener("click", function () {
  sufficientBalance.style.display = "none";
  LessAmount.style.display = "block";
  errorMessage.style.display = "block";
  addButton.style.display = "flex";
  confirmButton.classList.add("opacity-btn");
  walleteSvgPath.style.stroke = "#DD1F03";
});

addButton.addEventListener("click", function () {
  addFundsDiv.style.display = "block";
  lowFundsDiv.classList.add("hide_it");
});

closeFundsBtn.addEventListener("click", () => {
  addFundsDiv.style.display = "none";
  lowFundsDiv.classList.remove("hide_it");
  sufficientBalance.style.display = "block";
  LessAmount.style.display = "none";
  errorMessage.style.display = "none";
  addButton.style.display = "none";
  confirmButton.classList.remove("opacity-btn");
  addFundsDiv.classList.add("show");
})

// reissue.addEventListener("click", function () {
//   reissue.classList.add("table-active");
//   refund.classList.remove("table-active");
//   refund.classList.add("non-active");
//   refundTable.style.display = "none";
//   ReissueTable.style.display = "block";
// });

// refund.addEventListener("click", function () {
//   refund.classList.add("table-active");
//   reissue.classList.remove("table-active");
//   reissue.classList.add("non-active");
//   refundTable.style.display = "block";
//   ReissueTable.style.display = "none";
// });

$("#view-booking").click(function () {
  $("#view-table").slideToggle("fast");
  viewHead.classList.toggle("view-head-active");
  viewTable.classList.toggle("view-table-active");
  downIcon.classList.toggle("img-non1");
  UpIcon.classList.toggle("img-active2");
});

// $(".view_info").click(function () {
//   $(".view_info_data").slideToggle("slow");
//   $(".closed_plus").toggle();
//   $(".opened_minus").toggle();
// });

$(".view_info").click(function () {
  var $parent = $(this).closest('tr');
  $parent.next(".view_info_data").slideToggle("fast");
  $parent.find(".closed_plus").toggle();
  $parent.find(".opened_minus").toggle();
});



// REMOVE BTN OF SSR CARD
$('body').on('click', '.right-remove-box', function () {
  var _cardsLength = $('.ssr-card').length;
  console.log(_cardsLength);
  if (_cardsLength > 2) {
    $(this).parents('.ssr-card').fadeOut(500, function () {
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

// ADD OR CLONE SSR

$('#add-ssr').click(function () {
  $(".multiple-select").multipleSelect("destroy");
  var liItem = $('.ssr-card').last().clone();
  $('#ssr-cards').append(liItem)
  $('.right-remove-box').css({
    'opacity': '1',
    'pointer-events': 'all'
  });

  $(function () {
    $(".multiple-select").multipleSelect("refresh");
  });

});

// detail fare options activeness
$('.other-discounts li').click(function () {
  // Remove the active class from all cards
  $('.other-discounts li').removeClass('active');
  // Add the active class to the clicked card
  $(this).addClass('active');
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


// Add notes

$(document).ready(function () {
  $(".add-button").click(function () {
    var text = $(".text-area").val();
    if (text.trim() === '') {
      return;
    }
    var d = new Date();
    var dateStr = d.getDate() + " " + d.toLocaleString('default', { month: 'short' }) + " " + d.getFullYear();
    var timeStr = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var html = `
      <div class="add-item">
        <div class="head-container">
          <div class="circle-container">
            <div class="circle-el">
              <img src="/assets/images/icons/dpimg.png" />
            </div>
            <p>By Username</p>
            <div class="edit_btn">
              <img src="./assets/images/icons/edit_icon.svg" alt="">
            </div>
          </div>
          <p>${dateStr} ${timeStr}</p>
        </div>
        <p class="para-el">${text}</p>
        <div class="button-container">
        </div>
      </div>
    `;
    $(".text-area").val("");
    $(".add-item:first").before(html);
  });

  $(document).on("click", ".edit_btn", function () {
    var text = $(this).parent().parent().siblings(".para-el").text().trim();
    $(this).parent().parent().siblings(".para-el").replaceWith(`<textarea class="text-edit" rows="4" cols="50">${text}</textarea>`);
    $(this).parent().parent().siblings(".button-container").replaceWith(`
    <div class="button-container" style="display: flex;justify-content: end;">
      <button class="update_btn">Update notes</button>
     </div>`);
    $(this).hide();
  });


  $(document).on("click", ".update_btn", function () {
    var text = $(this).closest(".add-item").find(".text-edit").val();
    $(this).closest(".add-item").find(".text-edit").replaceWith(`<p class="para-el">${text}</p>`);
    $(this).closest(".add-item").find(".edit_btn").show();
    $(this).hide()
  });
});


// status container
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


// multiple emails
$(document).ready(function () {
  var emailList = [];

  $('#email_input').on('input', function () {
    var emailInput = $(this);
    var email = emailInput.val();

    if (validateEmail(email)) {
      emailInput.next(".input-border").removeClass('invalid').addClass('valid');
    } else if (email === "") {
      emailInput.next(".input-border").removeClass('valid').removeClass('invalid');
      emailInput.next(".input-border").removeClass('invalid');
    } else {
      emailInput.next(".input-border").removeClass('valid').addClass('invalid');
    }
  });

  $('#email_input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      var emailInput = $(this);
      var email = emailInput.val();

      if (validateEmail(email)) {
        emailList.push(email);
        updateEmailList();
        emailInput.val('');
        emailInput.next(".input-border").removeClass('invalid').removeClass('valid');
      } else {
        emailInput.addClass('invalid');
      }
    }

    if (emailList.length !== 0) {
      $(this).closest(".modal-item").find(".input-border").removeClass('invalid');
      $(this).closest(".modal-item").find("#error_mail_msg_id").text('');
    }

  });

  $('#send_multiple_mails').on('click', function (event) {
    event.preventDefault();

    const modalItem = $(this).parent(".sendmail_wrapper").prev(".modal-item");
    const inputField = $(this).parent(".sendmail_wrapper").prev(".modal-item").find("#email_input");

    // console.log("len", emailList.length);
    // console.log('val-', inputField.val());

    if (inputField.val() === "" && emailList.length === 0) {
      modalItem.find(".input-border").addClass('invalid');
      modalItem.find("#error_mail_msg_id").text('Please provide at least one valid email address.');
      return;
    }
    else {
      modalItem.find(".input-border").removeClass('invalid');
      modalItem.find("#error_mail_msg_id").text('');
    }

    // Perform send mail action
    // sendMail(emailList);
    // console.log('mail sent');

    $(this).closest(".multiple_emails").hide();
    $(this).closest(".multiple_emails").next(".email_thanks_msg").fadeIn();
  });

  $(document).on('click', '.remove', function () {
    var email = $(this).prev('.email').text();
    var index = emailList.indexOf(email);

    if (index !== -1) {
      emailList.splice(index, 1);
      updateEmailList();
    }
  });

  function validateEmail(email) {
    // Simple email validation regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function updateEmailList() {
    var emailListDiv = $('#email-list');
    emailListDiv.empty();

    for (var i = 0; i < emailList.length; i++) {
      var emailItem = $('<div class="email-item">');
      var email = $('<span class="email">').text(emailList[i]);
      var removeButton = $('<span class="remove">').html('<img height="6px" width="6px" src="./assets/images/icons/email_remove.svg">');

      emailItem.append(email);
      emailItem.append(removeButton);
      emailListDiv.append(emailItem);
    }
  }
});

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

// quote dropdown ^

$(document).ready(function () {
  $('.caret_switch').click(function () {
    var $caretSwitch = $(this);
    var $downCaret = $caretSwitch.find('.downCaret');
    var $upCaret = $caretSwitch.find('.upCaret');
    var $qcBottombar = $caretSwitch.closest('.quote_card').find('.qc_bottombar');
    var $checkWrapper = $caretSwitch.closest('.quote_card').find('.qc_check_wrapper');
    var $dropBox = $caretSwitch.parent(".drop_box");

    if ($dropBox.css("background-color") === "rgb(226, 231, 238)") {
      $dropBox.css("transition", "background-color 0.5s ease");
      $dropBox.css("background-color", "#FFFFFF");
      $checkWrapper.css("border-color", "transparent")
    } else {
      $dropBox.css("transition", "background-color 0.5s ease");
      $dropBox.css("background-color", "#E2E7EE");
      $checkWrapper.css("border-color", "#E2E7EE")

    }

    $downCaret.toggle();
    $upCaret.toggle();
    $qcBottombar.slideToggle("fast");
  });
});


// checkbox card selected
$(document).ready(function () {
  $('.qc_check_wrapper input[type="checkbox"]').change(function () {
    var isChecked = $(this).is(':checked');
    var quoteCards = $(this).closest('.quote_card');
    if (isChecked) {
      quoteCards.css("border-color", "#189EFF");
    } else {
      quoteCards.css("border-color", "transparent");
    }
  });
});

// radio card selected

$(document).ready(function () {
  $('.qc_check_wrapper input[type="radio"]').change(function () {
    var isChecked = $(this).is(':checked');
    var quoteCards = $(this).closest('.quote_card');
    if (isChecked) {
      // Remove border color from all quote cards
      $('.quote_card').css("border-color", "transparent");
      // Apply border color only to the selected radio button's closest quote card
      quoteCards.css("border-color", "#189EFF");
    }
  });
});



$(document).ready(function () {
  $('.caret_switch_v1').click(function () {
    var $caretSwitch = $(this);
    var $downCaret = $caretSwitch.find('.downCaret');
    var $upCaret = $caretSwitch.find('.upCaret');
    var $qcBottombar = $caretSwitch.closest('.Itinerary-container').find('.ic_bottombar');
    var leftContent = $caretSwitch.prev(".db_left");;
    if (leftContent.css("opacity") == "0") {
      leftContent.css("opacity", 1);
    } else {
      leftContent.css("opacity", 0);
    }

    $downCaret.toggle();
    $upCaret.toggle();
    $qcBottombar.slideToggle("fast");
  });
});

$(document).ready(function () {
  $('.caret_switch_v2').click(function () {
    var $caretSwitchV2 = $(this);
    var $downCaretV2 = $caretSwitchV2.find('.downCaret');
    var $upCaretV2 = $caretSwitchV2.find('.upCaret');
    var $qcBottombarV2 = $caretSwitchV2.closest('.pdb_topbar').next(".pdb_bottombar");

    $downCaretV2.toggle();
    $upCaretV2.toggle();
    $qcBottombarV2.slideToggle("fast");
  });
});

