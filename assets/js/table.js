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
  obj.html("");
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
    var str = $("<tr class='tr_normal'></tr>");
    if (i.state == 1) str = $("<tr class='state1'></tr>");
    if (i.state == 2) str = $("<tr class='state2'></tr>");
    if (i.state == 3) str = $("<tr class='state3'></tr>");
    if (i.state == 4) str = $("<tr class='state4'></tr>");
    if (i.state == 5) str = $("<tr class='state5'></tr>");
    if (i.state == 6) str = $("<tr class='state6'></tr>");
    // Level
    if (mark == "年") $("<td>" + i.level + mark + "</td>").appendTo(str);
    else if (mark.trim() == "AtoZ") $("<td>" + i.level + "</td>").appendTo(str);
    else $("<td>" + mark + i.level + "</td>").appendTo(str);
    // View Chart
    $(
      "<td>" +
        "<a href='http://www.ribbit.xyz/bms/score/view?p=1&md5=" +
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
        astr = "<a href='" + i.url + "' target='_blank'>" + i.artist + "</a>";
      } else {
        astr = "<a href='" + i.url + "' target='_blank'>" + i.url + "</a>";
      }
    } else {
      if (i.artist) {
        astr = i.artist;
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
