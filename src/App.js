import './App.css';
import Header from './components/Header/Header';
import Topics from './components/Topics/Topics';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
      <Topics />
      </main>
    </div>
  );
}

export default App;
