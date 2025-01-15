// Difficulty Table
$(function () {
  // Table Load Message
  $("#table_int").before("<div id='tableLoading'>Loading...</div>");
  $.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
    $.getJSON(header.data_url, function (information) {
      makeBMSTable(information, header.symbol);
      $("#tableLoading").hide();
      $("#table_int").tablesorter({
        sortList:
          typeof tableSort === "undefined"
            ? [
                [0, 0],
                [2, 0],
              ]
            : tableSort,
      });
    });
  });
});

function makeBMSTable(info, mark) {
  var obj = $("#table_int");
  // Table Clear
  obj.empty();
  $(
    "<thead>" +
      "<tr>" +
      "<th style='width: 5%'>Lv <i class='fas fa-arrows-alt-v'></i></th>" +
      "<th style='width: 1%'>Score</th>" +
      "<th style='width: 20%'>Title <i class='fas fa-arrows-alt-v'></i></th>" +
      "<th style='width: 20%'>Artist <i class='fas fa-arrows-alt-v'></i></th>" +
      "<th style='width: 5%'>Maker <i class='fas fa-arrows-alt-v'></i></th>" +
      "<th style='width: 25%'>Comment <i class='fas fa-arrows-alt-v'></i></th>" +
      "</tr>" +
      "</thead>" +
      "<tbody></tbody>"
  ).appendTo(obj);
  Array.prototype.forEach.call(info, function (i) {
    // Main text
    var rowColor = {
      1: "state1",
      2: "state2",
      3: "state3",
      4: "state4",
      5: "state5",
      6: "state6",
    };
    if (i.state) var str = $("<tr class='" + rowColor[i.state] + "'></tr>");
    else var str = $("<tr class='tr_normal'></tr>");
    // Level
    if (mark == "年") $("<td>" + i.level + mark + "</td>").appendTo(str);
    else if (mark.trim() == "AtoZ") $("<td>" + i.level + "</td>").appendTo(str);
    else $("<td>" + mark + i.level + "</td>").appendTo(str);
    // View Chart
    $(
      "<td>" +
        "<a href='https://bms-score-viewer.pages.dev/view?md5=" +
        i.md5 +
        "' class='fas fa-lg fa-music' target='_blank'>" +
        "</a>" +
        "</td>"
    ).appendTo(str);
    // Title
    $(
      "<td>" +
        "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" +
        i.md5 +
        "' target='_blank'>" +
        i.title +
        "</a>" +
        "</td>"
    ).appendTo(str);
    // Artist (Package Link)
    var astr = "";
    if (i.url) {
      if (i.artist) {
        astr =
          "<a href='" +
          i.url +
          "' target='_blank'>" +
          (i.artist || i.url) +
          "</a>";
      }
    }
    if (i.url_pack) {
      if (i.name_pack) {
        astr +=
          "<br />(<a href='" +
          i.url_pack +
          "' target='_blank'>" +
          i.name_pack +
          "</a>)";
      } else {
        astr +=
          "<br />(<a href='" +
          i.url_pack +
          "' target='_blank'>" +
          i.url_pack +
          "</a>)";
      }
    } else {
      if (i.name_pack) {
        astr += "<br />(" + i.name_pack + ")";
      }
    }
    $("<td>" + astr + "</td>").appendTo(str);
    // Chart Download
    if (i.url_diff) {
      if (i.name_diff) {
        $(
          "<td>" +
            "<a href='" +
            i.url_diff +
            "' target='_blank'>" +
            i.name_diff +
            "</a>" +
            "</td>"
        ).appendTo(str);
      } else {
        $(
          "<td>" +
            "<a href='" +
            i.url_diff +
            "' target='_blank'>" +
            "<i class='fas fa-lg fa-arrow-down'></i>" +
            "</a>" +
            "</td>"
        ).appendTo(str);
      }
    } else {
      if (i.name_diff) {
        $("<td>" + i.name_diff + "</td>").appendTo(str);
      } else {
        $("<td></td>").appendTo(str);
      }
    }
    // Comment
    if (i.comment) {
      $("<td>" + i.comment + "</td>").appendTo(str);
    } else {
      $("<td></td>").appendTo(str);
    }
    str.appendTo(obj);
  });
}
