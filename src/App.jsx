import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import StartPage from './components/StartPage';
import YesPage from './components/YesPage';
import NoPage from './components/NoPage';
import BlackBoxPage from './components/BlackBoxPage';
import QuestionPage from './components/QuestionPage';
import NumberPage from './components/NumberPage';
import ResultPage from './components/ResultPage';
import PetalPage from './components/PetalPage';
import EndingPage from './components/EndingPage';
import NoStockPage from './components/NoStockPage';
import Layout from './components/Layout';
import './css/App.css';

const App = () => {
  useEffect(() => {
    let inactivityTimer;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        window.location.href = '/';
      }, 10 * 60 * 1000); // 10 minutes in milliseconds
    };

    // Reset timer on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/yes" element={<YesPage />} />  
          <Route path="/no" element={<NoPage />} />  
          <Route path="/black-box" element={<BlackBoxPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/number" element={<NumberPage />} />  
          <Route path="/result" element={<ResultPage />} />  
          <Route path="/petal" element={<PetalPage />} />  
          <Route path="/ending" element={<EndingPage />} />  
          <Route path="/no-stock" element={<NoStockPage />} />  
        </Route>
      </Routes>
    </Router>
  );
};

export default App;