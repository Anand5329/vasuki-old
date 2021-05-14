let addionics = {
  name: "Addionics",
  country: "United Kingdom",
  description:
    "Developed a unique electro-printing method to create 3D current collectors for Li-ion batteries enabling energy and power customisation.",
  status: "current",
  pdf: "#",
  colour: "blue-grad",
};

// TODO: Add choosing functionality for colours when creating company card.

let companyA = {
  name: "Company A",
  country: "Country K",
  description: "Revolutionized the sector of ...",
  status: "current",
  pipeline: "evaluation",
  pdf: "example.pdf",
  logo: "Pictures/logo.png",
  colour1: "#000",
  colour2: "#000",
};

let companyB = {
  name: "Company B",
  country: "Country I",
  description: "Revolutionized the sector of ...",
  status: "current",
  pipeline: "pre-evaluation",
  pdf: "example.pdf",
  logo: "Pictures/logo.png",
  colour1: "#000",
  colour2: "#000",
};

let companyC = {
  name: "Company C",
  country: "Country J",
  description: "Revolutionized the sector of ...",
  status: "current",
  pipeline: "early",
  pdf: "example.pdf",
  logo: "Pictures/logo.png",
  colour1: "#000",
  colour2: "#000",
};

var companyList = [companyA, companyB, companyC];

var doc = $(document);

doc.ready(function () {
  //console.log("Running");
  createCompanyList("current");
  createCompanyList("past");
  createCompanyList("all");
  uniformCompanyHeight();
  //console.log(companyList);
  // setTimeout(function () {
  //   uniformCardHeight(".company");
  // }, 4000);
  // window.onload = function () {
  //   console.log("uniforming");

  //   uniformCardHeight(".company");
  // };
});

var createCompanyList = function (category, page = null, link = null) {
  var id = "#" + category;
  if (page != null) {
    id = id + "-" + page;
  }
  var currentContainer = $(id);
  var emptyFlag = true;
  companyList.forEach((item, i) => {
    if (item.status == category || category == "all") {
      emptyFlag = false;
      currentContainer.append(getCompanyTemplate(item, page, link));
    }
  });
  if (emptyFlag) {
    currentContainer.append(getNoContentMessage);
    //console.log("No content.");
  }
};

var getNoContentMessage = function () {
  var italics = $("<em></em>");
  italics.append("No content to show.");
  var h5 = $("<h5></h5>");
  h5.addClass(["center", "text-muted", "no-content"]);
  h5.append(italics);
  return h5;
};

var getCompanyTemplate = function (company, page = null, link = null) {
  // container col to get sizes right
  var col = $("<div></div>");
  col.addClass(["col-12", "col-lg-4", "pad"]);
  // creating the card
  var card = $("<div></div>");
  card.addClass(["card", "company"]);
  //card.addClass("usual-colour"); don't seem to need this
  card.css(
    "background-image",
    "linear-gradient(180deg, " + company.colour1 + ", " + company.colour2
  );
  // card-body
  var cardBody = $("<div></div>");
  cardBody.addClass("card-body");

  //card-title
  var cardTitle = $("<h5></h5>");
  cardTitle.addClass("card-title");
  var cardLink = $("<a></a>");
  if (page == null || page == "portfolio") {
    cardLink.attr("href", company.pdf);
    cardLink.attr("target", "_blank");
  } else {
    cardLink.attr("href", link + company.portfolio);
  }
  cardLink.append(company.name);
  cardTitle.append(cardLink);
  //card-subtitle
  var cardSubtitle = $("<h6></h6>");
  cardSubtitle.addClass("card-subtitle");
  cardSubtitle.append(company.country);
  //card-text
  var cardText = $("<p></p>");
  cardText.addClass("card-text");
  cardText.append(company.description);

  // logo:
  console.log(page);
  if (company.logo != "" && company.logo != null && page == null) {
    var logo = $("<img/>");
    logo.attr("src", company.logo);
    logo.css("max-height", "3.5rem");
    logo.css("max-width", "15rem");
    var website = $("<a href='" + company.website + "'></a>");
    //adding logo:
    website.append(logo);
    cardBody.append(website);
  }

  // adding title, subtitle to card-body
  cardBody.append(cardTitle);
  cardBody.append(cardSubtitle);
  //desc not needed.
  //cardBody.append(cardText);

  // adding body to card
  card.append(cardBody);
  col.append(card);
  return col;
};

var uniformCompanyHeight = function () {
  var collapsibleElements = $(".collapse-company");
  var size = collapsibleElements.length;
  collapsibleElements.each(function () {
    //console.log("showing");
    $(this).collapse("show");
    //$(this).css("display", "flex");

    //console.log(this);
  });

  var onlyOnce = new Array(size);
  onlyOnce.fill(true);
  var i = 0;
  //console.log(onlyOnce);
  //console.log("uniforming");
  var cards = $(".company");

  setTimeout(function () {
    uniformCardHeight(".company");
  }, 0);

  collapsibleElements.each(function () {
    $(this).on("shown.bs.collapse", function () {
      //console.log("hiding");
      //console.log(onlyOnce);
      if (onlyOnce[i]) {
        $(this).collapse("hide");
        onlyOnce[i] = false;
        i++;
      }
    });
  });

  // setTimeout(function () {
  //   collapsibleElements.each(function () {
  //     console.log("showed");
  //     uniformCardHeight(".company");
  //     $(this).collapse("hide");
  //   });
  // }, 100);

  // uniformCardHeight(".company");
};

var createSlimCard = function (title, link) {
  var container = $("<div></div>");
  container.addClass(["col-lg-6", "col-12", "pad"]);

  var card = $("<div></div>");
  card.addClass("card");

  var anchor = $("<a></a>");
  anchor.addClass("mini-head");
  anchor.attr("href", link);
  anchor.append(title);

  card.append(anchor);
  container.append(card);

  return container;
};
