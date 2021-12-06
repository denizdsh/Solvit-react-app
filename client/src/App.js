import './App.css';
import { Routes, Route } from 'react-router';

import { AuthContext } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';

import Header from './components/Header/Header';
import Topics from './components/Topics/Topics';
import TopicDetails from './components/TopicDetails/TopicDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


const initialUserData = {
  _id: '',
  email: '',
  imageUrl: '',
  accessToken: '',
  username: ''
}

function App() {
  const [user, setUser] = useLocalStorage('user', initialUserData)

  const login = (userData) => {
    setUser({ ...userData, username: userData.email.split('@')[0] });
  }

  const logout = () => {
    setUser(initialUserData);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }} >
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
    </AuthContext.Provider>
  );
}

export default App;
