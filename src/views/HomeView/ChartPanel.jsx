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
import { convertAndSortDates, dataExtractor } from '../../helpers/dataExtractor';
import { reduceSum } from '../../helpers/reduceSum';

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

export const ChartPanel = () => {
  const { expenses } = useSelector(state => state.expense);
  const { incomes } = useSelector(state => state.income);

  const expensesExtraction = dataExtractor(expenses);
  const incomesExtraction = dataExtractor(incomes);

  const expensesDates = expenses.map(item => item.date);
  const incomesDates = incomes.map(item => item.date);

  const sortedDates = convertAndSortDates(expensesDates, incomesDates);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Доходы',
        data: reduceSum(sortedDates, incomesExtraction),
        backgroundColor: 'rgba(0, 91, 255, 0.75)',
      },
      {
        label: 'Расходы',
        data: reduceSum(sortedDates, expensesExtraction),
        backgroundColor: 'rgba(255,0,0,0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
