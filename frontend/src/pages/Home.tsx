// src/pages/Home.tsx
import { currentUser } from '../data';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pb-20">
            <div className="text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">
                        <span className="text-black font-bold">Knock Knock</span>
                        <span className="text-orange-600 ml-2">📢</span>
                    </div>
                </div>
                <h1 className="text-xl text-gray-800 mb-8">
                    Vem kommer du hjälpa idag, {currentUser.name.split(' ')[1]}?
                </h1>
            </div>
        </div>
    );
}