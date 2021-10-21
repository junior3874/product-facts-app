import Feedback from "@/entity/Feedback";
import { expect, test, describe, jest } from "@jest/globals";
import filteredBy from "./sortedBy";

describe("#filtered by", () => {
  test("filtered more upvotes", () => {
    const list = [
      {
        id: 1,
        upvotes: 10,
      },
      { id: 2, upvotes: 20 },
    ];
    const res = filteredBy("Most Upvotes", list);

    const expectedList = [
      { id: 2, upvotes: 20 },
      {
        id: 1,
        upvotes: 10,
      },
    ];

    expect(res).toEqual(expectedList);
  });

  test("filtered least upvotes", () => {
    const list = [
      {
        id: 1,
        upvotes: 30,
      },
      { id: 2, upvotes: 40 },
    ];
    const res = filteredBy("Least Upvotes", list);

    expect(res).toEqual(list);
  });

  test("filtered more comments", () => {
    const list = [
      {
        id: 1,
      },
      { id: 3 },
      { id: 2, comments: ["", ""] },
    ];
    const res = filteredBy("Most Comments", list);

    const expectedList = [
      { id: 2, comments: ["", ""] },

      {
        id: 1,
      },
      { id: 3 },
    ];

    expect(res).toEqual(expectedList);
  });

  test("filtered least comments", () => {
    const list = [
      {
        id: 1,
        comments: [""],
      },
      { id: 2, comments: ["", ""] },
    ];
    const res = filteredBy("Least Comments", list);

    expect(res).toEqual(list);
  });
});
