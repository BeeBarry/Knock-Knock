// src/components/PersonCard.tsx
// src/components/PersonCard.tsx
import type {User} from '../types';
import { MapPin } from 'lucide-react';

interface PersonCardProps {
    user: User;
    onKnock: (userId: string) => void;
    onViewProfile: (userId: string) => void;
}

export default function PersonCard({ user, onKnock, onViewProfile }: PersonCardProps) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
           <span className="text-gray-600 font-medium">
             {user.name.split(' ').map(n => n[0]).join('')}
           </span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.profession}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin size={12} className="mr-1" />
                            <span>{user.distance} km</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => onViewProfile(user.id)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700"
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => onKnock(user.id)}
                        className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md"
                    >
                        Knock
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
                {user.expertise.slice(0, 2).map((skill) => (
                    <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
           {skill}
         </span>
                ))}
            </div>
        </div>
    );
}