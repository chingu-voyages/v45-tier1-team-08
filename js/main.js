let table = document.getElementById("showData");

export function makeTable(tab) {
  const rows = tab.map((data) => ({
    Name: data.name,
    Year: data.year,
    Composition: data.recclass,
    Mass: data.mass_g,
  }));

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

export function updateTable(tab) {
  const rows = tab.map((data) => ({
    Name: data.name,
    Year: data.year,
    Composition: data.recclass,
    Mass: data.mass_g,
  } ) );
  
  // creation of a brand new table at each search call:
  table = new DataTable("#showData");
  table.clear().draw(); // will reset the current table

  table.rows
    .add(rows)
    .draw();
}