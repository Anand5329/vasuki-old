let addionics = {
  name: "Addionics",
  country: "United Kingdom",
  description: "Developed a unique electro-printing method to create 3D current collectors for Li-ion batteries enabling energy and power customisation.",
  status: "current",
  pdf: "#"
};

let companyA = {
  name: "Company A",
  country: "Country K",
  description: "Revolutionized the sector of ...",
  status: "current",
  pdf: "example.pdf"
}

let companyB = {
  name: "Company B",
  country: "Country I",
  description: "Revolutionized the sector of ...",
  status: "current",
  pdf: "example.pdf"
}

let companyC = {
  name: "Company C",
  country: "Country J",
  description: "Revolutionized the sector of ...",
  status: "current"
}

var companyList = [companyA, companyB, companyC];

var doc = $(document);

doc.ready(function() {
  createCurrentList();
  uniformCardHeight("company");
});

var createCurrentList = function() {
  var currentContainer = $("#current");
  companyList.forEach((item, i) => {
    if (item.status == "current") {
      currentContainer.append(getCompanyTemplate(item));
    }
  });
};

var getCompanyTemplate = function(company) {
  // container col to get sizes right
  var col = $("<div></div>");
  col.addClass(["col-12", "col-lg-4", "pad"]);
  // creating the card
  var card = $("<div></div>");
  card.addClass(["card", "company"]);
  // card-body
  var cardBody = $("<div></div>");
  cardBody.addClass("card-body");

  //card-title
  var cardTitle = $("<h5></h5>");
  cardTitle.addClass("card-title");
  var cardLink = $("<a></a>");
  cardLink.attr("href", company.pdf);
  cardLink.attr("target", "_blank");
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
}
