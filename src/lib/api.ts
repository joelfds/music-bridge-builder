
// Placeholder for actual API implementation
// In a real app, this would interact with backend services

import { Playlist } from '@/components/PlaylistCard';
import { toast } from 'sonner';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const YOUTUBE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// Mock client IDs (would come from environment variables in production)
const SPOTIFY_CLIENT_ID = 'spotify-client-id';
const YOUTUBE_CLIENT_ID = 'youtube-client-id';

// Mock redirect URIs
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

// Mock data for demo purposes
const mockSpotifyPlaylists: Playlist[] = [
  {
    id: 'sp1',
    name: 'Discover Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 30,
    source: 'spotify'
  },
  {
    id: 'sp2',
    name: 'Chill Vibes',
    imageUrl: 'https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 45,
    source: 'spotify'
  },
  {
    id: 'sp3',
    name: 'Workout Mix',
    imageUrl: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 25,
    source: 'spotify'
  },
  {
    id: 'sp4',
    name: 'Focus Flow',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 50,
    source: 'spotify'
  },
  {
    id: 'sp5',
    name: 'Summer Hits',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 35,
    source: 'spotify'
  },
  {
    id: 'sp6',
    name: 'Throwback Classics',
    imageUrl: '',
    trackCount: 40,
    source: 'spotify'
  }
];

const mockYoutubePlaylists: Playlist[] = [
  {
    id: 'yt1',
    name: 'Liked Videos',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 128,
    source: 'youtube'
  },
  {
    id: 'yt2',
    name: 'Electronic Mix',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 42,
    source: 'youtube'
  },
  {
    id: 'yt3',
    name: 'Acoustic Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    trackCount: 18,
    source: 'youtube'
  },
  {
    id: 'yt4',
    name: 'Music Videos',
    imageUrl: '',
    trackCount: 65,
    source: 'youtube'
  }
];

// Simulating authentication
export const authenticateSpotify = () => {
  // Store the current path to come back to after auth
  localStorage.setItem('auth_return_path', window.location.pathname);
  
  // In a real app, this would redirect to Spotify auth
  const scopes = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
  
  // For demo purposes, we'll just simulate the auth flow
  const authUrl = `${SPOTIFY_AUTH_URL}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=code`;
  
  // For the demo, we'll just simulate a successful auth
  simulateAuthRedirect('spotify');
  
  console.log('Would redirect to:', authUrl);
  return new Promise<void>((resolve) => {
    toast.info('Simulating Spotify authentication');
    setTimeout(resolve, 1500);
  });
};

export const authenticateYouTube = () => {
  // Store the current path to come back to after auth
  localStorage.setItem('auth_return_path', window.location.pathname);
  
  // In a real app, this would redirect to YouTube/Google auth
  const scopes = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl';
  
  // For demo purposes, we'll just simulate the auth flow
  const authUrl = `${YOUTUBE_AUTH_URL}?client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=code&access_type=offline`;
  
  // For the demo, we'll just simulate a successful auth
  simulateAuthRedirect('youtube');
  
  console.log('Would redirect to:', authUrl);
  return new Promise<void>((resolve) => {
    toast.info('Simulating YouTube authentication');
    setTimeout(resolve, 1500);
  });
};

// Simulates the redirect that would happen during OAuth
const simulateAuthRedirect = (service: 'spotify' | 'youtube') => {
  // In a real app, the browser would be redirected to the service's auth page
  // and then back to the callback URL. For the demo, we'll simulate this.
  console.log(`Simulating ${service} auth redirect`);
};

// Mock API calls
export const fetchSpotifyPlaylists = (): Promise<Playlist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSpotifyPlaylists);
    }, 800);
  });
};

export const fetchYouTubePlaylists = (): Promise<Playlist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockYoutubePlaylists);
    }, 800);
  });
};

export const convertPlaylist = (
  playlist: Playlist, 
  targetPlatform: 'spotify' | 'youtube'
): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`Converting ${playlist.name} to ${targetPlatform}`);
    // In a real app, this would make API calls to convert the playlist
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
