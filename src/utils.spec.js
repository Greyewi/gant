import { addPreviousMonth, addNextMonth, getDaysArrayByMonth } from "./utils";

it("Add previous month has been working", () => {
  const Month = ["22-11-2020"];
  const addPrevMonth = addPreviousMonth(Month);
  expect(addPrevMonth).toEqual(["22-10-2020", "22-11-2020"]);
});

it("Add next month has been working", () => {
  const Month = ["22-11-2020"];
  const Months = addNextMonth(Month);
  expect(Months).toEqual(["22-11-2020", "22-12-2020"]);
});

it("Get days array by month has been working", () => {
  const Month = ["22-11-2020"];
  const Days = getDaysArrayByMonth(Month);
  expect(Days).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  expect(Days).not.toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);
});
