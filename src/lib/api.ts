// API functionality for interacting with Spotify and YouTube
import { Playlist } from '@/components/PlaylistCard';
import { toast } from 'sonner';

// Real OAuth endpoints
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const YOUTUBE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// Client IDs (in a real app, these would be environment variables)
const SPOTIFY_CLIENT_ID = 'f9f28c2d3f244273b28170de25bb6412'; // Replace with your actual Spotify client ID
const YOUTUBE_CLIENT_ID = '46cec5c28cba430d98faa0643f8d9bc4'; // Replace with your actual YouTube client ID

// Redirect URIs
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

// Updated authentication functions with real OAuth redirects
export const authenticateSpotify = () => {
  // Store the current path to come back to after auth
  localStorage.setItem('auth_return_path', window.location.pathname);
  
  // Set state parameter to identify service on callback
  const state = 'spotify-' + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('auth_state', state);
  
  // Define the scopes needed for your application
  const scopes = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
  
  // Construct the authorization URL
  const authUrl = `${SPOTIFY_AUTH_URL}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${state}`;
  
  // Redirect the browser to Spotify's authorization page
  console.log('Redirecting to Spotify auth URL:', authUrl);
  
  // For demo/testing, we'll just log and simulate, but in a real app you'd redirect:
  // window.location.href = authUrl;
  
  // For the demo, we'll simulate a successful auth
  toast.info('For demo purposes, simulating Spotify authentication');
  localStorage.setItem('spotify_connected', 'true');
  
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
  });
};

export const authenticateYouTube = () => {
  // Store the current path to come back to after auth
  localStorage.setItem('auth_return_path', window.location.pathname);
  
  // Set state parameter to identify service on callback
  const state = 'youtube-' + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('auth_state', state);
  
  // Define the scopes needed for your application
  const scopes = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl';
  
  // Construct the authorization URL
  const authUrl = `${YOUTUBE_AUTH_URL}?client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${state}&access_type=offline`;
  
  // Redirect the browser to YouTube/Google's authorization page
  console.log('Redirecting to YouTube auth URL:', authUrl);
  
  // For demo/testing, we'll just log and simulate, but in a real app you'd redirect:
  // window.location.href = authUrl;
  
  // For the demo, we'll simulate a successful auth
  toast.info('For demo purposes, simulating YouTube authentication');
  localStorage.setItem('youtube_connected', 'true');
  
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
  });
};

// Update the AuthCallback page to handle the state parameter
export const simulateAuthRedirect = (service: 'spotify' | 'youtube') => {
  // Create a mock code to simulate the OAuth callback
  const mockCode = Math.random().toString(36).substring(2, 15);
  const mockState = localStorage.getItem('auth_state') || service + '-state';
  
  // In a real app, this would be handled by the actual OAuth provider redirect
  console.log(`Simulating ${service} auth redirect with code: ${mockCode} and state: ${mockState}`);
  
  // Simulate the redirect to the callback URL
  // window.location.href = `${REDIRECT_URI}?code=${mockCode}&state=${mockState}&service=${service}`;
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

// New functions to fetch user profile data
export interface SpotifyUserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
  followers: { total: number };
  country: string;
  product: string;
}

export interface YouTubeUserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  subscriberCount: number;
}

// Fetch user profile from Spotify
export const fetchSpotifyUserProfile = (): Promise<SpotifyUserProfile> => {
  return new Promise((resolve) => {
    // In a real app, this would make an API call to Spotify's /me endpoint
    setTimeout(() => {
      resolve({
        id: 'spotify-user-123',
        display_name: 'Spotify User',
        email: 'user@example.com',
        images: [{ url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }],
        followers: { total: 125 },
        country: 'US',
        product: 'premium'
      });
    }, 800);
  });
};

// Fetch user profile from YouTube
export const fetchYouTubeUserProfile = (): Promise<YouTubeUserProfile> => {
  return new Promise((resolve) => {
    // In a real app, this would make an API call to YouTube's user info endpoint
    setTimeout(() => {
      resolve({
        id: 'youtube-user-456',
        name: 'YouTube User',
        email: 'user@example.com',
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        subscriberCount: 1250
      });
    }, 800);
  });
};

// Create a new playlist on Spotify
export const createSpotifyPlaylist = (
  name: string, 
  description: string = '', 
  isPublic: boolean = true
): Promise<Playlist> => {
  return new Promise((resolve) => {
    // In a real app, this would make an API call to Spotify's create playlist endpoint
    setTimeout(() => {
      // Create a mock playlist with a unique ID
      const newPlaylist: Playlist = {
        id: 'sp-new-' + Date.now(),
        name: name,
        imageUrl: '',
        trackCount: 0,
        source: 'spotify'
      };
      
      toast.success(`Playlist "${name}" created on Spotify`);
      resolve(newPlaylist);
    }, 1000);
  });
};

// Create a new playlist on YouTube
export const createYouTubePlaylist = (
  name: string, 
  description: string = '', 
  isPrivate: boolean = false
): Promise<Playlist> => {
  return new Promise((resolve) => {
    // In a real app, this would make an API call to YouTube's create playlist endpoint
    setTimeout(() => {
      // Create a mock playlist with a unique ID
      const newPlaylist: Playlist = {
        id: 'yt-new-' + Date.now(),
        name: name,
        imageUrl: '',
        trackCount: 0,
        source: 'youtube'
      };
      
      toast.success(`Playlist "${name}" created on YouTube`);
      resolve(newPlaylist);
    }, 1000);
  });
};
