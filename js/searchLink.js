const searchButtons = document.querySelectorAll('.searchBtn');
const searchTerms = document.querySelectorAll('.searchTerm');
let linkData = [];

function fetchData(e) {
  e.preventDefault();
  [...searchTerms].map((elem) => {
    linkData.push(elem.value);
  });
}

[...searchButtons].map((elem) => {
  elem.addEventListener('click', fetchData);
});

export { linkData };
