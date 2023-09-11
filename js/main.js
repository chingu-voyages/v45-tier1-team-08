let table = document.getElementById("showData");

export function makeTable(tab) {
  const rows = [
    {
      Name: "data.name",
      Year: "data.year",
      Composition: "data.recclass",
      Mass: "data.mass_g",
    }, // dummy data; should be a list of objects with exact same format. Have a look here: https://datatables.net/reference/option/data
  ];

  $("#showData").dataTable({
    data: rows,
    columns: [
      { data: "Name" },
      { data: "Year" },
      { data: "Composition" },
      { data: "Mass" },
    ],
  });
  showData_filter.remove();
}

export function updateTable( tab ) {
  // creation of a brand new table at each search call:
  table = new DataTable("#showData");
  table.clear().draw(); // will reset the current table
  table.row
    .add({
      Name: "data.!!!!!",
      Year: "data.!!!!!",
      Composition: "data.!!!!!",
      Mass: "data.!!!!!",
    }) // same format here as well
    .draw();
}

// DataTables warning: table id=showData - Requested unknown parameter '0' for row 0, column 0. For more information about this error, please see http://datatables.net/tn/4
