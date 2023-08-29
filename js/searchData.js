import { data } from '../Team_Docs/Meteorite_Landings.js';
import { linkData } from './searchLink.js';
const normalizeStr = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // ignore accentuated caracters
    .replace(/[^a-zA-Z0-9]/g, '') // ignore special caracters
    .replaceAll(' ', '') // ignore white spaces
    .toLowerCase();
};
console.log(linkData);
export function searchData({
  name = '',
  year = '',
  recclass = '',
  massRange = [],
}) {
  let results = data;

  // 1. filter by name:
  results = !name
    ? results
    : results.filter((item) => {
        name = normalizeStr(name);
        const nameRegex = new RegExp(`^${name}`, 'i');
        const testedName = normalizeStr(item.name);

        return nameRegex.test(testedName);
      });

  // 2. filter by year:
  results = !year ? results : results.filter((item) => item.year === year);

  // 3. filter by composition (recclass):
  results = !recclass
    ? results
    : results.filter((item) => {
        recclass = normalizeStr(recclass);
        const recclassRegex = new RegExp(`^${recclass}`, 'i');
        const testedRecclass = normalizeStr(item.recclass);

        return recclassRegex.test(testedRecclass);
      });

  // 4. filter by massRange:
  results =
    massRange.length === 0
      ? results
      : results.filter(
          (item) =>
            item['mass (g)'] >= massRange[0] && item['mass (g)'] <= massRange[1]
        );

  // 5.return found results, or entire dataset:
  return results.length === 0 ? data : results;
}
