var root = $(":root");
// 1rem in px:
let rem = root.css("font-size");

// transition time constant in ms.
let transitionTime = 500;

// accent colour classes for index page depending on
let colourClasses = ["solid-bg", "accent-color-green"];

let accentColour = "accent-color";

$(document).ready(function () {
  recolourNavbar();
  uniformTabHeight();
  resize();
  navButtonClick();
  aboutHover("intent");
  checkMobile();
  // carouselUpdate();
});

var carouselUpdate = function () {
  var topCarousel = $("#top-carousel");
  topCarousel.on("slide.bs.carousel", function () {
    changeAccentColour("accent-color-green");
  });
  topCarousel.on("slid.bs.carousel", function () {
    $(".accent-color-green").each(function () {
      $(this).removeClass("accent-color-green");
    });
    console.log("Removed accent colour.");
  });
};

var changeAccentColour = function (colourClass) {
  var accentColourElements = $(".solid-bg");
  // console.log(accentColourElements);
  accentColourElements.each(function () {
    $(this).addClass(colourClass);
  });
};

var removeClassFromAll = function (className) {
  $("." + className).each(function () {
    $(this).removeClass(className);
  });
};

var getNextColour = function (colour) {};

var getPreviousColour = function (colour) {};

var resize = function () {
  $(window).resize(function () {
    // resetting the height in case the dimensions change
    $(".tab>.card-block").css("min-height", 0);
    uniformTabHeight();
    // console.log("resize");
    checkMobile();

    // resetting the tab buttons in the navbar
    $(".navbar-nav").removeClass(accentColour);
  });
};

var uniformTabHeight = function () {
  var infoTab = $("#info");
  // resetting.
  infoTab.css("min-height", 0);
  var height = infoTab.outerHeight();
  // console.log(height);
  var tab = $(".tab>.card-block");
  // making all tabs of uniform height.
  tab.css("min-height", height);
};

var uniformCardHeight = function (className) {
  var cards = $(className);
  // resetting.
  cards.css("min-height", 0);
  var maxHeight = findMaxHeight(cards);
  // console.log(maxHeight);
  cards.css("min-height", maxHeight);
};

var findMaxHeight = function (elements) {
  var maxHeight = -1;
  // console.log(elements);
  elements.each(function () {
    // console.log(this);
    // console.log(i);
    var height = $(this).outerHeight();
    // console.log(height);
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  // console.log(maxHeight);
  return maxHeight;
};

var getThreshold = function () {
  var doc = $(document);
  var win = $(window);
  var nav = $(".navbar");
  // getting the heading of the active item of the top carousel.
  var top = getCurrentItemTopCarousel();
  if (top.length == 0) {
    top = $("#top");
  }
  // console.log(top);
  var head = top.find(".heading");
  // console.log(head);

  //height of the window
  var winHeight = win.outerHeight();
  // height of the navbar
  var navHeight = nav.outerHeight();
  // position of the heading in the document.
  var headingPos = head.offset().top;
  console.log("Heading Pos: " + headingPos);

  // threshold at which colour needs to be changed
  // double navHeight: to make sure change happens
  // before user scrolls past the heading.
  var threshold = headingPos; //- 2 * navHeight;
  console.log(threshold);

  return threshold;
};

var recolourNavbar = function () {
  var doc = $(document);
  var nav = $(".navbar");

  var threshold = getThreshold();

  // if already past, threshold, change instantaneously
  if (doc.scrollTop() > threshold) {
    nav.addClass(accentColour);
  }

  doc.scroll(function () {
    // pixels that are scrolled down.
    var scroll = doc.scrollTop();
    if (scroll > threshold) {
      nav.addClass(accentColour, transitionTime);
      // console.log("Changed colour.");
    }
    if (scroll < threshold) {
      nav.removeClass(accentColour, transitionTime);
    }
    // console.log(scroll - threshold);
  });
};

var isMobile = function () {
  var width = $(window).width();
  var height = $(window).height();
  var ratio = width / height;

  // console.log("isMobile: ");
  if (ratio < 1) {
    // console.log("true");
    return true;
  } else {
    // console.log("false");
    return false;
  }
};

var toMobile = function () {
  $("body").addClass("mobile");
  resize();
  // console.log("to mobile");
};

var toDesktop = function () {
  $("body").removeClass("mobile");
  resize();
  // console.log("to desktop");
};

var checkMobile = function () {
  if (isMobile()) {
    toMobile();
  } else {
    toDesktop();
  }
};

var navButtonClick = function () {
  var navButton = $("#navButton");
  navButton.click(function () {
    $(".navbar-nav").addClass(accentColour, transitionTime);
    // console.log("Class added");
    var threshold = getThreshold();
    // console.log(threshold);
    // if before threshold, hide colouring.
    if ($(document).scrollTop() < threshold) {
      $(".navbar").toggleClass(accentColour, transitionTime);
      //console.log("Class toggled.");
    }
  });
};

var aboutHover = function (section) {
  var about = $(".about");
  var ul = createList(section);
  ul.hide();
  var aboutCard;
  $("#" + section)
    .children(".card-body")
    .append(ul);
  about.hover(function () {
    // id of the hovered upon card
    var id = $(this).attr("id");
    // console.log(id);
    aboutCard = $("#" + id);

    // carousel of the hovered on card.
    var carousel = $("#" + id + "-carousel");
    // hiding in when hovered.
    carousel.toggleClass("display-none");

    // stretching the card to take up the whole row.
    aboutCard.toggleClass("col-lg-12");
    // console.log("col-12");
    // aligning the text in the card to top right.
    var cardBody = aboutCard.children(".card-body");
    cardBody.toggleClass("align-top-left");

    // showing the list only when hovered.
    $("#" + id + "-list").toggle();
  });
};

var createList = function (aboutId) {
  var ul = $("<ul id='" + aboutId + "-list'></ul>");
  ul.addClass("pad");
  ul.addClass("about-list");
  ul.css("text-align", "left");
  about[aboutId].forEach((item, i) => {
    ul.append($("<li></li>").append(item));
  });
  return ul;
};

var getCurrentItemTopCarousel = function () {
  // active is the current item displayed.
  var active = $("#top-carousel>.carousel-inner>.active");
  // console.log(active.text());
  return active;
};
