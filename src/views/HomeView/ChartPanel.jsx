import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Расходы и доходы',
    },
  },
};

import moment from 'moment';

export const ChartPanel = () => {
  const { expenses } = useSelector((state) => state.expense);
  const { incomes } = useSelector((state) => state.income);

  const expensesExtraction = expenses
    .map((expense) => ({ date: expense.date, price: expense.price }))
    .sort((a, b) => a.date - b.date)
    .map((expense) => ({ date: moment(expense.date).format('L'), price: expense.price }));

  const incomesExtraction = incomes
    .map((income) => ({ date: income.date, price: income.price }))
    .sort((a, b) => a.date - b.date)
    .map((income) => ({ date: moment(income.date).format('L'), price: income.price }));

  const expensesDates = expenses.map((item) => item.date);
  const incomesDates = incomes.map((item) => item.date);

  const allDates = [...expensesDates, ...incomesDates]
    .sort((a, b) => a - b)
    .map((date) => moment(date).format('L'));

  const data = {
    labels: [...new Set(allDates)],
    datasets: [
      {
        label: 'Доходы',
        data: [...new Set(allDates)].map((item) => {
          const filtr = incomesExtraction.filter((inc) => inc.date === item);
          return filtr.reduce((a, b) => a + b.price, 0);
        }),
        backgroundColor: 'rgba(0, 91, 255, 0.75)',
      },
      {
        label: 'Расходы',
        data: [...new Set(allDates)].map((item) => {
          return expensesExtraction
            .filter((inc) => inc.date === item)
            .reduce((a, b) => a + b.price, 0);
        }),
        backgroundColor: 'rgba(255,0,0,0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
