
  // Year starts from 1900 so we add the difference
const STARTING_YEAR = 1900;
const LAST_ONE_DIGIT_NUM = 10;

/* Helper to convert a Javascript date to the MySQL String-representation of a date */ 
const formatDate = (date) => {
  const formattedDate = [];
  formattedDate.push(STARTING_YEAR + date.getYear());
  const month = date.getMonth() + 1;
  formattedDate.push(month < LAST_ONE_DIGIT_NUM ? `0${month}` : month);
  const day = date.getDate();
  formattedDate.push(day < LAST_ONE_DIGIT_NUM ? `0${day}` : day);
  return formattedDate.join("-");
};

/* Helper to parse MySQL raw data */
const convertJSON = obj => JSON.parse(JSON.stringify(obj));

module.exports = { formatDate, convertJSON };
