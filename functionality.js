var root = $(":root");
// 1rem in px:
let rem = root.css("font-size");

// transition time constant in ms.
let transitionTime = 500;

$(document).ready(function() {
  recolourNavbar();
  uniformTabHeight();
  resize();
  navButtonClick();
  aboutHover();
})

var resize = function() {
  $(window).resize(function() {
    // resetting the height in case the dimensions change
    $(".tab").css("min-height", 0)
    uniformTabHeight();
    // console.log("resize");

    // resetting the tab buttons in the navbar
    $(".navbar-nav").removeClass("solid-bg");
  });
}

var uniformTabHeight = function() {
  var infoTab = $("#info");
  var height = infoTab.outerHeight();
  // console.log(height);
  var tab = $(".tab");
  // making all tabs of uniform height.
  tab.css("min-height", height);
}

var getThreshold = function() {
  var doc = $(document);
  var win = $(window);
  var nav = $(".navbar");
  var head = $("#heading");

  //height of the window
  var winHeight = win.outerHeight();
  // height of the navbar
  var navHeight = nav.outerHeight();
  // position of the heading in the document.
  var headingPos = head.offset().top;

  // threshold at which colour needs to be changed
  // double navHeight: to make sure change happens
  // before user scrolls past the heading.
  var threshold = headingPos - 2 * navHeight;
  // console.log(threshold);

  return threshold;
};

var recolourNavbar = function() {
  var doc = $(document);
  var nav = $(".navbar");

  var threshold = getThreshold();

  // if already past, threshold, change instantaneously
  if (doc.scrollTop() > threshold) {
    nav.addClass("solid-bg");
  }

  doc.scroll(function() {
    // pixels that are scrolled down.
    var scroll = doc.scrollTop();
    if (scroll > threshold) {
      nav.addClass("solid-bg", transitionTime);
      // console.log("Changed colour.");
    }
    if (scroll < threshold) {
      nav.removeClass("solid-bg", transitionTime);
    }
    // console.log(scroll - threshold);
  })
}

var isMobile = function() {
    var width = $(window).width();
    var height = $(window).height();
    var ratio = width/height;

      console.log("isMobile: ");
    if(ratio < 1)
    {
      console.log("true");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }

  var navButtonClick = function() {
    var navButton = $("#navButton");
    navButton.click(function() {
      $(".navbar-nav").addClass("solid-bg", transitionTime);
      if ($(document).scrollTop() < getThreshold()) {
        $(".navbar").toggleClass("solid-bg", transitionTime);
      }
    })
  }

  var aboutHover = function() {
    var about = $(".about");
    var ul = createList("intent");
    ul.hide();
    var aboutCard;
    $("#intent").children(".card-body").append(ul);
    about.hover(function() {
      // id of the hovered upon card
      var id = $(this).attr("id");
      // console.log(id);
      aboutCard = $("#"+id);

      // carousel of the hovered on card.
      var carousel = $("#"+id+"-carousel");
      // hiding in when hovered.
      carousel.toggleClass("display-none");

      // stretching the card to take up the whole row.
      aboutCard.toggleClass("col-lg-12");
      // console.log("col-12");
      // aligning the text in the card to top right.
      var cardBody = aboutCard.children(".card-body");
      cardBody.toggleClass("align-top-left");

      // showing the list only when hovered.
      $("#"+id+"-list").toggle();
    });
  }

  var createList = function(aboutId) {
    var ul = $("<ul id='"+aboutId+"-list'></ul>");
    ul.addClass("pad");
    ul.addClass("about-list");
    ul.css("text-align", "left");
    about[aboutId].forEach((item, i) => {
      ul.append($("<li></li>").append(item));
    });
    return ul;

  }
