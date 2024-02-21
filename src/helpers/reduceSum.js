export const reduceSum = (dates, extraction) => {
  return dates.map(date => {
    return extraction.filter(item => item.date === date).reduce((a, b) => a + b.price, 0);
  });
};

export const reduceAllSumms = arr => {
  return arr.reduce((a, b) => a + b.price, 0);
};
