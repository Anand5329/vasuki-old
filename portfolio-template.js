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
  colour: "green-grad",
  logo: "Pictures/logo.jpg",
};

let companyB = {
  name: "Company B",
  country: "Country I",
  description: "Revolutionized the sector of ...",
  status: "current",
  pipeline: "pre-evaluation",
  pdf: "example.pdf",
  colour: "blue-grad",
  logo: "Pictures/logo.jpg",
};

let companyC = {
  name: "Company C",
  country: "Country J",
  description: "Revolutionized the sector of ...",
  status: "current",
  pipeline: "early",
  pdf: "example.pdf",
  colour: "red-grad",
  logo: "Pictures/logo.jpg",
};

var companyList = [companyA, companyB, companyC];

var doc = $(document);

doc.ready(function () {
  createCompanyList("current");
  createCompanyList("past");
  createCompanyList("all");
  uniformCardHeight("company");
  // viewAll();
});

var createCompanyList = function (category, page = null) {
  var currentContainer = $("#" + category);
  var table = $("#" + category + "-table");
  var emptyFlag = true;
  companyList.forEach((item, i) => {
    if (item.status == category || category == "all") {
      emptyFlag = false;
      if (page == null) {
        //currentContainer.append(getCompanyTemplate(item));
        table.append(getCompanyTemplateVertical(item));
      } else {
        currentContainer.append(getCompanyTemplate(item, page));
      }
    }
  });
  if (emptyFlag) {
    currentContainer.append(getNoContentMessage);
    console.log("No content.");
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

var getCompanyTemplateVertical = function (company) {
  var row = $("<tr></tr>");
  row.addClass("usual-colour");
  var logo = $("<img/>");
  logo.attr("src", company.logo);
  logo.css("height", "4rem");
  logo = $("<td></td>").append(logo);
  logo.css("padding", "0 1rem");
  var name = $("<th></th>");
  name.append(company.name);

  var country = $("<td></td>").append(company.country);
  var file = $("<td></td>");
  var pdf = $("<a target='blank'></a>").append(
    '<i class="far fa-file-pdf"></i>'
  );
  pdf.attr("href", company.pdf);
  file.append(pdf);

  var desc = $("<td></td>").append(company.description);

  row.append(logo);
  row.append(name);
  row.append(country);
  row.append(desc);
  row.append(file);

  return row;
};

var getCompanyTemplate = function (company, page = null) {
  // container col to get sizes right
  var col = $("<div></div>");
  col.addClass(["col-12", "col-lg-4", "pad"]);
  // creating the card
  var card = $("<div></div>");
  card.addClass(["card", "company", company.colour, "usual-color"]);
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
    cardLink.attr("href", "club_files.html");
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

  // adding title, subtitle and desc. to card-body
  cardBody.append(cardTitle);
  cardBody.append(cardSubtitle);
  cardBody.append(cardText);

  // adding body to card
  card.append(cardBody);
  col.append(card);
  return col;
};

var viewAll = function () {
  $("#view-all-btn").click(function () {
    var collapsibleElements = $(".collapse-company");
    collapsibleElements.each(function () {
      $(this).show();
      this.style.removeProperty("display");
      // console.log(this);
    });
  });
};
