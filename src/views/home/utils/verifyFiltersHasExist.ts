function verifyFilterHasExist(filterName: string, filters: string[]) {
  if (!filterName) return;
  const verifyFilterHasExist = filters.includes(filterName);
  if (verifyFilterHasExist) return filterName;
}

export default verifyFilterHasExist;
