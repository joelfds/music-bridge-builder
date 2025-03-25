
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthButtons from '@/components/AuthButtons';
import PlaylistConverter from '@/components/PlaylistConverter';
import UserProfileCard from '@/components/UserProfileCard';
import AddPlaylistForm from '@/components/AddPlaylistForm';
import { Playlist } from '@/components/PlaylistCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  authenticateSpotify, 
  authenticateYouTube,
  fetchSpotifyPlaylists,
  fetchYouTubePlaylists,
  fetchSpotifyUserProfile,
  fetchYouTubeUserProfile,
  convertPlaylist,
  SpotifyUserProfile,
  YouTubeUserProfile
} from '@/lib/api';

const Dashboard = () => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(false);
  const [isYouTubeLoading, setIsYouTubeLoading] = useState(false);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<Playlist[]>([]);
  const [youtubePlaylists, setYoutubePlaylists] = useState<Playlist[]>([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  
  // New state for user profiles
  const [spotifyProfile, setSpotifyProfile] = useState<SpotifyUserProfile | null>(null);
  const [youtubeProfile, setYoutubeProfile] = useState<YouTubeUserProfile | null>(null);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  useEffect(() => {
    // Check if user has connected accounts previously
    const checkConnections = () => {
      // In a real app, would check localStorage tokens or call an API
      const spotifyConnected = localStorage.getItem('spotify_connected') === 'true';
      const youtubeConnected = localStorage.getItem('youtube_connected') === 'true';
      
      setIsSpotifyConnected(spotifyConnected);
      setIsYouTubeConnected(youtubeConnected);
      
      if (spotifyConnected) {
        loadSpotifyPlaylists();
        loadSpotifyProfile();
      }
      
      if (youtubeConnected) {
        loadYoutubePlaylists();
        loadYoutubeProfile();
      }
    };
    
    checkConnections();
  }, []);

  const loadSpotifyPlaylists = async () => {
    try {
      setIsLoadingPlaylists(true);
      const playlists = await fetchSpotifyPlaylists();
      setSpotifyPlaylists(playlists);
    } catch (error) {
      console.error('Error loading Spotify playlists:', error);
      toast.error('Failed to load Spotify playlists');
    } finally {
      setIsLoadingPlaylists(false);
    }
  };
  
  const loadYoutubePlaylists = async () => {
    try {
      setIsLoadingPlaylists(true);
      const playlists = await fetchYouTubePlaylists();
      setYoutubePlaylists(playlists);
    } catch (error) {
      console.error('Error loading YouTube playlists:', error);
      toast.error('Failed to load YouTube playlists');
    } finally {
      setIsLoadingPlaylists(false);
    }
  };
  
  // New functions to load user profiles
  const loadSpotifyProfile = async () => {
    try {
      setIsLoadingProfiles(true);
      const profile = await fetchSpotifyUserProfile();
      setSpotifyProfile(profile);
    } catch (error) {
      console.error('Error loading Spotify profile:', error);
      toast.error('Failed to load Spotify user profile');
    } finally {
      setIsLoadingProfiles(false);
    }
  };
  
  const loadYoutubeProfile = async () => {
    try {
      setIsLoadingProfiles(true);
      const profile = await fetchYouTubeUserProfile();
      setYoutubeProfile(profile);
    } catch (error) {
      console.error('Error loading YouTube profile:', error);
      toast.error('Failed to load YouTube user profile');
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      setIsSpotifyLoading(true);
      await authenticateSpotify();
      
      // In a real app, this would happen after the redirect callback
      localStorage.setItem('spotify_connected', 'true');
      setIsSpotifyConnected(true);
      
      toast.success('Successfully connected to Spotify');
      loadSpotifyPlaylists();
      loadSpotifyProfile();
    } catch (error) {
      console.error('Spotify authentication error:', error);
      toast.error('Failed to connect to Spotify');
    } finally {
      setIsSpotifyLoading(false);
    }
  };
  
  const handleYouTubeLogin = async () => {
    try {
      setIsYouTubeLoading(true);
      await authenticateYouTube();
      
      // In a real app, this would happen after the redirect callback
      localStorage.setItem('youtube_connected', 'true');
      setIsYouTubeConnected(true);
      
      toast.success('Successfully connected to YouTube Music');
      loadYoutubePlaylists();
      loadYoutubeProfile();
    } catch (error) {
      console.error('YouTube authentication error:', error);
      toast.error('Failed to connect to YouTube Music');
    } finally {
      setIsYouTubeLoading(false);
    }
  };
  
  const handleConvertPlaylist = async (playlist: Playlist, targetPlatform: 'spotify' | 'youtube') => {
    try {
      await convertPlaylist(playlist, targetPlatform);
      toast.success(`Successfully converted "${playlist.name}" to ${targetPlatform === 'spotify' ? 'Spotify' : 'YouTube Music'}`);
    } catch (error) {
      console.error('Error converting playlist:', error);
      toast.error(`Failed to convert "${playlist.name}"`);
      throw error;
    }
  };
  
  const handlePlaylistCreated = (service: 'spotify' | 'youtube') => {
    if (service === 'spotify') {
      loadSpotifyPlaylists();
    } else {
      loadYoutubePlaylists();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto pt-24 px-4 pb-16 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Music Bridge Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect your Spotify and YouTube Music accounts to convert playlists between platforms.
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Account connections */}
            <section className="glass-panel rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Connect Your Accounts</h2>
              <AuthButtons 
                onSpotifyLogin={handleSpotifyLogin}
                onYouTubeLogin={handleYouTubeLogin}
                isSpotifyConnected={isSpotifyConnected}
                isYouTubeConnected={isYouTubeConnected}
                isSpotifyLoading={isSpotifyLoading}
                isYouTubeLoading={isYouTubeLoading}
              />
              
              {/* User profiles */}
              {(isSpotifyConnected || isYouTubeConnected) && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isSpotifyConnected && (
                    <UserProfileCard 
                      profile={spotifyProfile!} 
                      service="spotify"
                      isLoading={isLoadingProfiles || !spotifyProfile}
                    />
                  )}
                  
                  {isYouTubeConnected && (
                    <UserProfileCard 
                      profile={youtubeProfile!} 
                      service="youtube"
                      isLoading={isLoadingProfiles || !youtubeProfile}
                    />
                  )}
                </div>
              )}
            </section>
            
            {/* Playlist management */}
            {(isSpotifyConnected || isYouTubeConnected) && (
              <section className="glass-panel rounded-xl p-6 shadow-sm">
                <Tabs defaultValue="convert">
                  <TabsList className="mb-6">
                    <TabsTrigger value="convert">Convert Playlists</TabsTrigger>
                    <TabsTrigger value="manage">Manage Playlists</TabsTrigger>
                    <TabsTrigger value="history">Conversion History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="convert" className="space-y-6">
                    {isLoadingPlaylists ? (
                      <div className="flex items-center justify-center p-8">
                        <div className="space-y-2 text-center">
                          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                          <p className="text-muted-foreground">Loading playlists...</p>
                        </div>
                      </div>
                    ) : (
                      <PlaylistConverter 
                        spotifyPlaylists={spotifyPlaylists}
                        youtubePlaylists={youtubePlaylists}
                        isSpotifyConnected={isSpotifyConnected}
                        isYouTubeConnected={isYouTubeConnected}
                        onConvert={handleConvertPlaylist}
                      />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="manage">
                    <div className="space-y-8">
                      {/* Spotify playlists section */}
                      {isSpotifyConnected && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xl font-semibold">Spotify Playlists</h3>
                            <AddPlaylistForm 
                              service="spotify" 
                              onPlaylistCreated={() => handlePlaylistCreated('spotify')}
                            />
                          </div>
                          
                          {isLoadingPlaylists ? (
                            <div className="h-40 flex items-center justify-center">
                              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            </div>
                          ) : spotifyPlaylists.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-muted p-8 text-center">
                              <h4 className="font-medium text-lg mb-2">No Spotify playlists found</h4>
                              <p className="text-muted-foreground mb-4">
                                Create your first Spotify playlist to get started
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {spotifyPlaylists.map((playlist) => (
                                <div 
                                  key={playlist.id} 
                                  className="rounded-lg border bg-card overflow-hidden hover:shadow-sm transition-all"
                                >
                                  <div className="aspect-square bg-muted relative">
                                    {playlist.imageUrl ? (
                                      <img 
                                        src={playlist.imageUrl} 
                                        alt={playlist.name} 
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-950">
                                        <svg className="w-12 h-12 text-spotify/30" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-3">
                                    <h5 className="font-medium text-sm line-clamp-1">{playlist.name}</h5>
                                    <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* YouTube playlists section */}
                      {isYouTubeConnected && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xl font-semibold">YouTube Playlists</h3>
                            <AddPlaylistForm 
                              service="youtube" 
                              onPlaylistCreated={() => handlePlaylistCreated('youtube')} 
                            />
                          </div>
                          
                          {isLoadingPlaylists ? (
                            <div className="h-40 flex items-center justify-center">
                              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            </div>
                          ) : youtubePlaylists.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-muted p-8 text-center">
                              <h4 className="font-medium text-lg mb-2">No YouTube playlists found</h4>
                              <p className="text-muted-foreground mb-4">
                                Create your first YouTube playlist to get started
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {youtubePlaylists.map((playlist) => (
                                <div 
                                  key={playlist.id} 
                                  className="rounded-lg border bg-card overflow-hidden hover:shadow-sm transition-all"
                                >
                                  <div className="aspect-square bg-muted relative">
                                    {playlist.imageUrl ? (
                                      <img 
                                        src={playlist.imageUrl} 
                                        alt={playlist.name} 
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-950">
                                        <svg className="w-12 h-12 text-youtube/30" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-3">
                                    <h5 className="font-medium text-sm line-clamp-1">{playlist.name}</h5>
                                    <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="rounded-lg border border-dashed border-muted p-8 text-center">
                      <h3 className="font-medium text-lg mb-2">No conversion history yet</h3>
                      <p className="text-muted-foreground">
                        Convert your first playlist to see the history here
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
