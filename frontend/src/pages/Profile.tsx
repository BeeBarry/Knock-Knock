// src/pages/Profile.tsx
import { currentUser } from '../data';
import PreviouslyHelped from '../components/PreviouslyHelped';

export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-200 p-4">
                <h1 className="text-xl font-semibold text-center">Min Profil</h1>
            </div>

            <div className="p-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <span className="text-gray-600 font-medium text-lg">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                {currentUser.profession}
              </span>
                            <p className="text-gray-600 mt-1">📍 {currentUser.location}</p>
                        </div>
                    </div>

                    {currentUser.bio && (
                        <div className="bg-gray-100 rounded-lg p-3 mb-6">
                            <p className="text-gray-700">{currentUser.bio}</p>
                            <button className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center">
                                💬 Knock
                            </button>
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {currentUser.expertise.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm border">
                  {skill === 'Bicycles' && '🚲'} {skill}
                </span>
                            ))}
                        </div>
                    </div>

                    <PreviouslyHelped helpHistory={currentUser.previouslyHelped} />
                </div>
            </div>
        </div>
    );
}