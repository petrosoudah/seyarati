import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RegisterCar from './pages/RegisterCar';
import Parts from './pages/Parts';
import Mechanics from './pages/Mechanics';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import AIChatbot from './components/AIChatbot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterCar />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/mechanics" element={<Mechanics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
