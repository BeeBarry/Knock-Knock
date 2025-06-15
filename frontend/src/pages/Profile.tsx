import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { User } from '../types';

export default function Profile() {
    const { username } = useParams(); // Get the username from the route params
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:7001/api/profiles/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data: User = await response.json();
                setProfile(data);
            } catch (err) {
                setError('An error occurred while fetching the profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    if (!profile) {
        return <div className="text-center mt-5">Profile not found.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button className="btn btn-outline-secondary">
                        <span className="fs-4">☰</span>
                    </button>
                    <h1 className="fw-bold">Knock Knock</h1>
                    <button className="btn btn-outline-secondary">
                        <span className="fs-4">👤</span>
                    </button>
                </div>

                {/* Profile Card */}
                <div className="card mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-4">
                            <img
                                src={profile.avatarUrl || 'https://via.placeholder.com/64'}
                                alt={profile.fullName}
                                className="rounded-circle me-3"
                                style={{ width: '64px', height: '64px' }}
                            />
                            <div>
                                <h2 className="fw-bold">{profile.fullName}</h2>
                                <span className="badge bg-warning text-dark">{profile.title}</span>
                                <p className="text-muted mt-1">📍 {profile.location}</p>
                            </div>
                        </div>
                        <div className="alert alert-light text-center mb-4">
                            Glad to help you out, there are no stupid questions! :)
                        </div>
                        <button className="btn btn-warning w-100">Knock</button>
                    </div>
                </div>

                {/* Expertise Section */}
                <div className="mt-5">
                    <h3 className="fw-bold mb-3">Expertise</h3>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        {profile.expertise && profile.expertise.map((skill, index) => (
                            <span key={index} className="badge bg-light text-dark border">
                                {skill.icon} {skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Previously Helped Section */}
                <div className="mt-5">
                    <h3 className="fw-bold mb-3">Previously Helped</h3>
                    <ul className="list-group">
                        {profile.previousHelps && profile.previousHelps.map((help, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {help.withUserName} - {help.topic}
                                <span className="badge bg-success">
                                    {new Date(help.dateUtc).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}