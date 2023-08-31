import { data as dataFile } from "/Team_Docs/Meteorite_Landings.js";

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

// $("table > tbody > tr").hide().slice(0, 15).show();
