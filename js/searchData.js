import { data } from "/Team_Docs/Meteorite_Landings.js";
const searchButtons = document.getElementsByClassName("searchBtn");
const searchTerms = document.getElementsByClassName("searchTerm");
export let linkData = [];

export function fetchData(e) {
  e.preventDefault();
  linkData = [];
  Array.from(searchTerms).map((elem) => {
    linkData.push(elem.value);
  } );
  console.log( linkData );
    const formattedSearchData = {
      name: linkData[0],
      year: linkData[1],
      recclass: linkData[2],
      minMassRange: linkData[3],
      maxMassRange: linkData[4],
    };
  console.log(searchData(formattedSearchData));
  searchData(formattedSearchData).then((res) => {
    console.log(res);
  });
}

function makeLiList(elem) {
  const formattedSearchData = {
    name: linkData[0],
    year: linkData[1],
    recclass: linkData[2],
    minMassRange: linkData[3],
    maxMassRange: linkData[4],
  };

  let results = searchData(formattedSearchData);
  console.log("elem", elem);

  const currentUl = elem.parentNode.querySelector("ul");

  console.log("results", results);
  console.log("linkData", linkData);

  // open a ul box (make it visible)

  // displa first 10 results for searchData

  if (!currentUl || results.length == 0) return;

  results = results.length <= 10 ? results : results.splice(0, results[10]);

  console.log(results);

  currentUl && console.log(currentUl.id);

  const liList = results
    .map(
      (elem) =>
        `
          <li>
            <span class="name">${elem.name}, <span class="name">${elem.recclass},
           <span class="name">${elem.year},...
          </li>
          `
    )
    .join("");
}

// Array.from(searchTerms).map((elem) => {
//   elem.addEventListener("input", ()=>{makeLiList(elem)});
// });

Array.from(searchButtons).map((elem) => {
  elem.addEventListener("click", fetchData);
});

const normalizeStr = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ignore accentuated caracters
    .replace(/[^a-zA-Z0-9]/g, "") // ignore special caracters
    .replaceAll(" ", "") // ignore white spaces
    .toLowerCase();
};

export async function searchData({
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

  // 5.return found results:
  return await results;
}
