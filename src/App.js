import './App.css';
import { Routes, Route } from 'react-router';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { TopicProvider } from './contexts/TopicContext'
import { BrowseCategoriesProvider } from './contexts/BrowseCategoriesContext';

import Header from './components/Header/Header';
import FollowedTopics from './components/FollowedTopics';
import AllTopics from './components/AllTopics';
import CategoryTopics from './components/CategoryTopics';
import UserTopics from './components/UserTopics/UserTopics';
import SavedTopics from './components/SavedTopics';
import TopicDetails from './components/TopicDetails/TopicDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import EditProfile from './components/EditProfile'
import Notification from './components/Common/Notification/Notification';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={
              <BrowseCategoriesProvider>
                <Routes>
                  <Route path='/*' element={<FollowedTopics />} />
                  <Route path="/all/*" element={<AllTopics />} />
                  <Route path="/c/:category/*" element={<CategoryTopics />} />
                  <Route path="/u/:user" element={<UserTopics />} />
                  <Route path="/saved" element={<SavedTopics />} />
                </Routes>
              </BrowseCategoriesProvider>
            } />
            <Route path="/t/*" element={
              <TopicProvider>
                <Routes>
                  <Route path="/:id/*" element={<TopicDetails />} />
                </Routes>
              </TopicProvider>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
          <Notification />
        </main>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;