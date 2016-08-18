function DateString() {
  const rDate = new Date();
  rDate.setDate(rDate.getDate() + 1);
  return `${rDate.getFullYear()}_${('0'+(rDate.getMonth()+1)).slice(-2)}_${('0'+(rDate.getDate())).slice(-2)}_${('0'+(rDate.getHours())).slice(-2)}_${('0'+(rDate.getMinutes())).slice(-2)}_${('0'+(rDate.getSeconds())).slice(-2)}`;
}

export { DateString };