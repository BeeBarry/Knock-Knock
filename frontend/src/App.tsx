// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import TabNav from './components/TabNav';
import Home from './pages/Home';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Knocks from './pages/Knocks';
import Chat from './pages/Chat';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/knocks" element={<Knocks />} />
                    <Route path="/chat/:userId" element={<Chat />} />
                    <Route path="/chat/existing/:chatId" element={<Chat />} />
                </Routes>
                <TabNav />
            </div>
        </Router>
    );
}

export default App;