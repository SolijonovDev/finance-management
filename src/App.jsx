import { Routes, Route } from 'react-router-dom';
import { HomeView } from './views/HomeView/HomeView.jsx';
import { IncomeView } from './views/IncomeView/IncomeView.jsx';
import { ExpenseView } from './views/ExpenseView/ExpenseView.jsx';
import { Header } from './components/header/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/income" element={<IncomeView />}></Route>
        <Route path="/expense" element={<ExpenseView />}></Route>
      </Routes>
    </>
  );
}

export default App;
