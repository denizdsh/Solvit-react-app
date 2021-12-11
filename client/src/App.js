import './App.css';
import { Routes, Route } from 'react-router';

import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header/Header';
import TopicDetails from './components/TopicDetails/TopicDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import CreateTopic from './components/CreateTopic/CreateTopic';
import FollowedTopics from './components/FollowedTopics';
import AllTopics from './components/AllTopics';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<FollowedTopics />} >
              <Route path="create" element={<CreateTopic />} />
            </Route>
            <Route path="/all" element={<AllTopics />}>
              <Route path="create" element={<CreateTopic />} />
            </Route>
            <Route path="/:id" element={<TopicDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;