import { data } from "../Team_Docs/Meteorite_Landings.js";

// List of parameter values entered by the user (some examples):
const searchValueList0 = { name: "ai" };
const searchValueList1 = { massRange: [20, 22] };
const searchValueList2 = {
  name: "e",
  recclass: "l-5",
  massRange: [0, 5],
};
const searchValueList3 = {
  year: 2000,
  recclass: "LL36",
  massRange: [],
};
const searchValueList4 = {
  name: "a",
  year: 1986,
  massRange: [0, 20],
};
const searchValueList5 = { name: "acf", year: 1998 };

const normalizeStr = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ignore accentuated caracters
    .replace(/[^a-zA-Z0-9]/g, "") // ignore special caracters
    .replaceAll(" ", "") // ignore white spaces
    .toLowerCase();
};

function searchData({ name = "", year = "", recclass = "", massRange = [] }) {
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
  results = !year
    ? results
    : results.filter((item) => {
        return item.year === year;
      });

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
  results =
    massRange.length === 0
      ? results
      : results.filter(
          (item) =>
            item["mass (g)"] >= massRange[0] && item["mass (g)"] <= massRange[1]
        );

  // 5.return found results, or entire dataset:
  return results.length === 0 ? data : results;
}

// Testing:

// console.log(searchData(searchValueList0));
// console.log(searchData(searchValueList1));
// console.log(searchData(searchValueList2));
// console.log(searchData(searchValueList3));
// console.log(searchData(searchValueList4));
// console.log(searchData(searchValueList5));
