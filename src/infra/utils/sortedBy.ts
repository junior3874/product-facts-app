const sortNames: { [index: string]: string } = {
  ["Most Upvotes"]: "upvotes",
  ["Least Upvotes"]: "upvotes",
  ["Most Comments"]: "comments",
  ["Least Comments"]: "comments",
};

function sortedBy(name: string, list: Array<any>) {
  const newList = list.slice(0);
  newList.sort((a, b) => {
    if (name.includes("Most")) {
      return typeof a[`${sortNames[`${name}`]}`] === typeof []
        ? sortedMostComments(
            a[`${sortNames[`${name}`]}`],
            b[`${sortNames[`${name}`]}`]
          )
        : sortedMostUpvotes(
            a[`${sortNames[`${name}`]}`],
            b[`${sortNames[`${name}`]}`]
          );
    }
    return typeof a[`${sortNames[`${name}`]}`] === typeof []
      ? sortedLeastComments(
          a[`${sortNames[`${name}`]}`],
          b[`${sortNames[`${name}`]}`]
        )
      : sortedLeastUpvotes(
          a[`${sortNames[`${name}`]}`],
          b[`${sortNames[`${name}`]}`]
        );
  });
  return newList;
}

function sortedMostComments(a: Array<any>, b: Array<any>) {
  return a.length || [].length > b.length || [].length ? -1 : 1;
}

function sortedLeastComments(a: Array<any>, b: Array<any>) {
  return a.length || [].length > b.length || [].length ? 1 : -1;
}

function sortedMostUpvotes(a: number, b: number) {
  return a > b ? -1 : 1;
}

function sortedLeastUpvotes(a: number, b: number) {
  return a > b ? 1 : -1;
}

export default sortedBy;
