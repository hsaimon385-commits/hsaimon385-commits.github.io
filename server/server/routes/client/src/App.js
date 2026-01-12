import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux'; // Combined imports
import { store } from './redux/store';
import { ToastContainer, toast } from 'react-toastify'; // Added 'toast' here
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

// Placeholder components (You must create these files or the app breaks)
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
// import Profile from './pages/Profile';
// import EventDetails from './pages/EventDetails';
// import Login from './pages/Login';

// Connect to backend
const socket = io('http://localhost:5000');

function AppContent() {
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated); // Safe access
  const darkMode = useSelector(state => state.settings?.darkMode);

  useEffect(() => {
    // Auto-detect dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) store.dispatch({ type: 'settings/toggleDarkMode' });

    // Real-time notifications
    socket.on('rsvp-update', (msg) => {
      toast.info(msg); // This will now work
    });

    return () => {
      socket.off('rsvp-update'); // Cleanup listener
    };
  }, []);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} /> 
            {/* Authenticated routes temporarily open for testing */}
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
