import { data as dataFile } from "/Team_Docs/testData.js";

//select table elemnt in the DOM
const table = document.getElementById("showData");

//list of specific keys to extract
const keyHeaders = ["name", "year", "recclass", "mass_g"];

//Gather array of object keys (headers for table)
const filteredHeaders = Object.keys(dataFile[0]).filter((key) =>
  keyHeaders.includes(key)
);
console.log(filteredHeaders);

// reorder headers for table
const headers = keyHeaders.map((key) => filteredHeaders.find((k) => k === key));

//Create array of <th> elemnets for table
// const headerRow = headers.map((header) => {
//   return `
//   <th>${header}</th>`;
// });
// console.log(headerRow);
// insert array of <th> into <thead>
// table.querySelector("thead").innerHTML = headerRow.join("");

//creat array pf <tr> elements for table
const rows = dataFile.map((data) => {
  return `<tr>
    <td>${data.name}</td>
    <td>${data.year}</td>
    <td>${data.recclass}</td>
    <td>${data.mass_g}</td>
  </tr>`;
});

// insert array of <tr> elements into table
table.querySelector("tbody").innerHTML = rows.join("");

// $("table > tbody > tr").hide().slice(0, 15).show();
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("showData");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
