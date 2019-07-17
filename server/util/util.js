function formatDate(date) {
  // Year starts from 1900, month indexes from 0 and getDate() returns proper day apparently
  const formattedDate = [];
  formattedDate.push(1900 + date.getYear());
  const month = date.getMonth() + 1;
  formattedDate.push(month <= 10 ? `0${month}` : month);
  const day = date.getDate();
  formattedDate.push(day <= 10 ? `0${day}` : month);
  return formattedDate.join("-");
}

/* Helper to parse MySQL raw data */
const convertJSON = obj => JSON.parse(JSON.stringify(obj));

module.exports = { formatDate, convertJSON };
