const formatDatePart = (part) => {
  return ('0' + (part)).slice(-2);
};

function dateString() {
  const rDate = new Date();
  const year = rDate.getFullYear();
  const month = formatDatePart(rDate.getMonth() + 1);
  const day = formatDatePart(rDate.getDate());
  const hours = formatDatePart(rDate.getHours());
  const minutes = formatDatePart(rDate.getMinutes());
  const seconds = formatDatePart(rDate.getSeconds());

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

export { dateString };
