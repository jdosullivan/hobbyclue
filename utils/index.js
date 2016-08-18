const dateString = () => {
  const rDate = new Date();
  const currentMonth = rDate.getMonth() + 1;
  const year = rDate.getFullYear();
  const month = `0${(currentMonth).slice(-2)}`;
  const day = `0${(rDate.getDate()).slice(-2)}`;
  const hours = `0${(rDate.getHours()).slice(-2)}`;
  const minutes = `0${(rDate.getMinutes()).slice(-2)}`;
  const seconds = `0${(rDate.getSeconds()).slice(-2)}`;

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
};

export { dateString };
