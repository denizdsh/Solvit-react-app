import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/Header/Header';
import Topics from './components/Topics/Topics';
import TopicDetails from './components/TopicDetails/TopicDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Topics />} />
          <Route path="/:id" element={<TopicDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
