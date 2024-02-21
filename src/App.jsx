import { Routes, Route } from 'react-router-dom';
import { HomeView } from './views/HomeView/HomeView.jsx';
import { IncomeView } from './views/IncomeView/IncomeView.jsx';
import { ExpenseView } from './views/ExpenseView/ExpenseView.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/income" element={<IncomeView />}></Route>
        <Route path="/expense" element={<ExpenseView />}></Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
