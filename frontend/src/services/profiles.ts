
import { apiRequest } from './api';
import { Profile, ProfileDTO } from '../types/backend';

export const profileService = {
  async getAllProfiles(): Promise<Profile[]> {
    return apiRequest<Profile[]>('/profiles');
  },

  async getProfileByUsername(username: string): Promise<Profile> {
    return apiRequest<Profile>(`/profiles/${username}`);
  },

  async updateProfile(userId: string, profileData: ProfileDTO): Promise<Profile> {
    return apiRequest<Profile>(`/profiles/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async createProfile(profileData: ProfileDTO): Promise<Profile> {
    return apiRequest<Profile>('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }
};
