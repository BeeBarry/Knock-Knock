// src/components/TabNav.tsx
import { Link, useLocation } from 'react-router';
import { Home, User, MessageCircle, Users } from 'lucide-react';

export default function TabNav() {
    const location = useLocation();

    const tabs = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/knocks', icon: MessageCircle, label: 'Knocks' },
        { path: '/community', icon: Users, label: 'Your Community' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="flex">
                {tabs.map(({ path, icon: Icon, label }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex-1 flex flex-col items-center py-2 px-1 ${
                                isActive
                                    ? 'text-orange-600'
                                    : 'text-gray-600'
                            }`}
                        >
                            <Icon size={20} />
                            <span className="text-xs mt-1">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}