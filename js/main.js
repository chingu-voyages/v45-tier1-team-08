export function makeTable(tab) {
  //select table elemnt in the DOM
  const table = document.getElementById("showData");


  //creat array of <tr> elements for table
  const rows = tab.map((data) => {
    return `<tr>
    <td>${data.name}</td>
    <td>${data.year}</td>
    <td>${data.recclass}</td>
    <td>${data.mass_g}</td>
  </tr>`;
  });

  // insert array of <tr> elements into table
  table.querySelector("tbody").innerHTML = rows.join("");

  $(document).ready(function () {
    // wait for page to load
    $("th").click(function () {
      // sorts table by clicking on header element
      var table = $(this).parents("table").eq(0);
      var rows = table
        .find("tr:gt(0)")
        .toArray()
        .sort(comparer($(this).index()));
      this.asc = !this.asc;
      if (!this.asc) {
        rows = rows.reverse();
      }
      for (var i = 0; i < rows.length; i++) {
        table.append(rows[i]);
      }
    });
    function comparer(index) {
      return function (a, b) {
        var valA = getCellValue(a, index),
          valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB)
          ? valA - valB
          : valA.toString().localeCompare(valB);
      };
    }
    function getCellValue(row, index) {
      return $(row).children("td").eq(index).text();
    }
  });
}
