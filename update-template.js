let weeklyUpdate = {
  week: 52,
  date: "12/12/2020",
  file: "filename",
};

let quarterlyUpdate = {
  date: "11/12/2020",
  quarter: 2,
  file: "filename",
};

let annualUpdate = {
  year: 2020,
  file: "filename",
};

let updateList = [weeklyUpdate, quarterlyUpdate, annualUpdate];

$(document).ready(function () {});

var populateUpdates = function () {};

var getUpdateLineTemplate = function () {
  var anchor = "<a></a>";
  anchor.attr("target", "_blank");
  anchor.addClass("update-line");
  return anchor;
};

var addWeeklyUpdateContent = function (anchor, update) {
  anchor.append("Week #" + update.week + "; Year: " + getYear(update.date));
  return anchor;
};

var addQuarterlyUpdateContent = function (anchor, update) {
  anchor.append("Date: " + update.date + "; Quarter: " + update.quarter);
  return anchor;
};

var addAnnualUpdateContent = function (anchor, update) {
  anchor.append("Year: " + getYear(update.date));
  return anchor;
};

var getYear = function (date) {
  return date.substr(date.lastIndexOf("/"), 4);
};
