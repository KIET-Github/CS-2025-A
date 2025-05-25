export const getDate = (date) => {
  const ISODate = new Date(date);
  const formattedDate = ISODate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};
