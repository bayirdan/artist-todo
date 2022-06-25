export const getDate = (date) => {
  const errorMessage =
    "Lütfen tarihi geçerli zamanlarda ve gösterildiği şekilde giriniz";

  let dateFormat = date.split("/");
  if (dateFormat.length !== 3) {
    return alert(errorMessage);
  }
  dateFormat = dateFormat
    .map((item) => Number(item))
    .filter((item) => {
      if (typeof item === "number" || typeof item !== "NaN") {
        return item;
      }
    });

  if (dateFormat.length !== 3) {
    return alert(errorMessage);
  }

  let day = dateFormat[0];
  let month = dateFormat[1];
  let year = dateFormat[2];

  if (
    day > 31 ||
    day < 1 ||
    month > 12 ||
    month < 1 ||
    year > 2999 ||
    year < 2022
  ) {
    return alert(errorMessage);
  }

  day = Math.floor(day);
  month = Math.floor(month);
  year = Math.floor(year);

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalDate = `${dayNames[day % 7]}, ${monthNames[month - 1]} ${Number(
    String(year).slice(-2)
  )}`;

  if (finalDate) {
    return finalDate;
  }
};
