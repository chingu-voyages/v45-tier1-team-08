import { data as dataFile } from "/Team_Docs/testData.js";

console.log(dataFile);

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
const headerRow = headers.map((header) => {
  return `
  <th>${header}</th>`;
});
console.log(headerRow);
// insert array of <th> into <thead>
table.querySelector("thead").innerHTML = headerRow.join("");

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

// the json dataFile.
// Extract value from table header.
// let col = [];
// for (let i = 0; i < dataFile.length; i++) {
//   for (let key in dataFile[i]) {
//     if (col.indexOf(key) === -1) {
//       col.push(key);
//     }
//   }
// }

// Create a table.
// const table = document.createElement("table");

// // Create table header row using the extracted headers above.
// let tr = table.insertRow(-1); // table row.

// for (let i = 0; i < col.length; i++) {
//   let th = document.createElement("th"); // table header.
//   th.innerHTML = col[i];
//   tr.appendChild(th);
// }

// // add json dataFile to the table as rows.
// for (let i = 0; i < dataFile.length; i++) {
//   tr = table.insertRow(-1);

//   for (let j = 0; j < col.length; j++) {
//     let tabCell = tr.insertCell(-1);
//     tabCell.innerHTML = dataFile[i][col[j]];
//   }
// }

// Now, add the newly created table with json dataFile, to a container.
// const divShowData = document.getElementById("showData");
// dataFile.forEach(element => divShowData.appendChild(element)
// // divShowData.innerHTML = "";
// divShowData.appendChild(table);
