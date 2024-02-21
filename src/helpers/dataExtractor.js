import moment from 'moment';

export const dataExtractor = arr => {
  return arr
    .map(item => ({ date: item.date, price: item.price }))
    .sort((a, b) => a.date - b.date)
    .map(item => ({ date: moment(item.date).format('L'), price: item.price }));
};

export const convertAndSortDates = (expensesDates, incomesDates) => {
  const allDates = [...expensesDates, ...incomesDates]
    .sort((a, b) => a - b)
    .map(date => moment(date).format('L'));

  return [...new Set(allDates)];
};
