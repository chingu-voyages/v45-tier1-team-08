import { data } from "/Team_Docs/Meteorite_Landings.js";

// const searchButtons = document.getElementsByClassName("searchBtn");
const searchTerms = document.getElementsByClassName("searchTerm");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

let linkData = [];

export function fetchData(e) {
  e.preventDefault();
  linkData = [];
  Array.from(searchTerms).map((elem) => {
    linkData.push(elem.value);
  });
  console.log(linkData);

  const formattedSearchData = {
    name: linkData[0],
    year: linkData[1],
    recclass: linkData[2],
    minMassRange: linkData[3],
    maxMassRange: linkData[4],
  };

  console.log(searchData(formattedSearchData));
}

export function resetFunction(e) {
  e.preventDefault();
  linkData = [];
  Array.from(searchTerms).map((elem) => {
    elem.value = "";
  });
}

// Array.from(searchButtons).map((elem) => {
//   elem.addEventListener("click", fetchData);
// });

searchButton.addEventListener("click", fetchData);
resetButton.addEventListener("click", resetFunction);

const normalizeStr = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ignore accentuated caracters
    .replace(/[^a-zA-Z0-9]/g, "") // ignore special caracters
    .replaceAll(" ", "") // ignore white spaces
    .toLowerCase();
};

export function searchData({
  name,
  year,
  recclass,
  minMassRange,
  maxMassRange,
}) {
  let results = data;

  // 1. filter by name:
  results = !name
    ? results
    : results.filter((item) => {
        name = normalizeStr(name);
        const nameRegex = new RegExp(`^${name}`, "i");
        const testedName = normalizeStr(item.name);

        return nameRegex.test(testedName);
      });

  // 2. filter by year:
  results = !year ? results : results.filter((item) => +item.year == +year);

  // 3. filter by composition (recclass):
  results = !recclass
    ? results
    : results.filter((item) => {
        recclass = normalizeStr(recclass);
        const recclassRegex = new RegExp(`^${recclass}`, "i");
        const testedRecclass = normalizeStr(item.recclass);

        return recclassRegex.test(testedRecclass);
      });

  // 4. filter by massRange:
  if (!minMassRange && !maxMassRange)
    return results.length === 0 ? data : results;

  if (!minMassRange && maxMassRange)
    results = results.filter((item) => {
      return item.mass_g && +item.mass_g <= +maxMassRange;
    });
  else if (minMassRange && !maxMassRange) {
    results = results.filter((item) => {
      return item.mass_g && +item.mass_g >= +minMassRange;
    });
  } else {
    results = results.filter((item) => {
      return (
        item.mass_g &&
        +item.mass_g >= +minMassRange &&
        +item.mass_g <= +maxMassRange
      );
    });
  }

  // 5.return found results, or entire dataset:
  return results;
}
