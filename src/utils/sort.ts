export const handleSort = (
  e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLLIElement, MouseEvent>,
  array: any[],
  filteredArray: any[],
  sorts: {},
  setSorts: (value: object) => void,
  setFilteredArray: (value: any[]) => void
) => {
  const id = e.currentTarget.id as keyof (typeof array)[0];
  const sort = e.currentTarget.dataset.sort;

  let sortedArray = filteredArray;

  sortedArray = [...array].sort((user1, user2) => {
    if (user1[id] === null || user2[id] === null) return -1;

    const usersArr = [user1, user2];

    if (sort === "asc") {
      usersArr.reverse();
      e.currentTarget.dataset.sort = "desc";
      setSorts({
        ...sorts,
        [id]: "desc",
      });
    } else if (sort === "desc") {
      usersArr.sort();
      e.currentTarget.dataset.sort = "asc";
      setSorts({
        ...sorts,
        [id]: "asc",
      });
    }

    let result = 0;
    if (
      typeof usersArr[0][id] === "number" &&
      typeof usersArr[1][id] === "number"
    ) {
      result = (usersArr[0][id] as number) - (usersArr[1][id] as number);
    } else if (
      typeof usersArr[0][id] === "string" &&
      typeof usersArr[1][id] === "string"
    ) {
      result = (usersArr[0][id] as string).localeCompare(
        usersArr[1][id] as string
      );
    }

    return result;
  });

  setFilteredArray(sortedArray);
};
