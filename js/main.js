import { data as dataFile } from "/Team_Docs/testData.js";

//select table elemnt in the DOM
const table = document.getElementById("showData");

// //list of specific keys to extract
// const keyHeaders = ["name", "year", "recclass", "mass_g"];

// //Gather array of object keys (headers for table)
// const filteredHeaders = Object.keys(dataFile[0]).filter((key) =>
//   keyHeaders.includes(key)
// );
// console.log(filteredHeaders);

// // reorder headers for table
// const headers = keyHeaders.map((key) => filteredHeaders.find((k) => k === key));

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

// Gather cell values
const getCellValue = (tr, idx) =>
  tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
      ? v1 - v2
      : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

// do the work...
document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("showData");
    const tbody = table.querySelector("tbody");
    Array.from(tbody.querySelectorAll("tr"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          (this.asc = !this.asc)
        )
      )
      .forEach((tr) => tbody.appendChild(tr));
  })
);
