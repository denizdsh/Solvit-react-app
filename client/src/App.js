import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/Header/Header';
import Topics from './components/Topics/Topics';
import TopicDetails from './components/Topics/TopicDetails';

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
        </Routes>

      </main>
    </div>
  );
}

export default App;
