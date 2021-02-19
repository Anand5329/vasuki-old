let intents = [
"Platform to tap into the vast knowledge base of the LP network"
+ " across product areas, value chain and geographies.",
"Access to mentoring, guidance and direction from Rothschild & Co’s"
+ " global automotive team as advisors, across all major automotive"
+ " and industrial hubs.",
"Commercial relationships between strategic LPs and portfolio"
+ " company.",
"Frequent networking opportunities between portfolio companies and"
+ " LPs organised by Rothschild & Co.",
"Access to strategic capital with a focus beyond just financial returns"];

let about = {
  "intent" : intents
};

$(document).ready(function() {
  populateIntents();
});

var populateIntents = function() {
  var intentCarousel = $("#intent-carousel").children(".carousel-inner");
  intents.forEach((item, i) => {
    var text = $("<p></p>").text(item);
    var div = $("<div></div>");
    if (i == 0) {
      div.addClass("active");
    }
    div.addClass("carousel-item");
    intentCarousel.append(div.append(text));
  });
}
