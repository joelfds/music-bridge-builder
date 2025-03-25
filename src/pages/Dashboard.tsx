
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthButtons from '@/components/AuthButtons';
import PlaylistConverter from '@/components/PlaylistConverter';
import { Playlist } from '@/components/PlaylistCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  authenticateSpotify, 
  authenticateYouTube,
  fetchSpotifyPlaylists,
  fetchYouTubePlaylists,
  convertPlaylist
} from '@/lib/api';

const Dashboard = () => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(false);
  const [isYouTubeLoading, setIsYouTubeLoading] = useState(false);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState<Playlist[]>([]);
  const [youtubePlaylists, setYoutubePlaylists] = useState<Playlist[]>([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

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
      }
      
      if (youtubeConnected) {
        loadYoutubePlaylists();
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

  const handleSpotifyLogin = async () => {
    try {
      setIsSpotifyLoading(true);
      await authenticateSpotify();
      
      // In a real app, this would happen after the redirect callback
      localStorage.setItem('spotify_connected', 'true');
      setIsSpotifyConnected(true);
      
      toast.success('Successfully connected to Spotify');
      loadSpotifyPlaylists();
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
            </section>
            
            {/* Playlist conversion */}
            {(isSpotifyConnected || isYouTubeConnected) && (
              <section className="glass-panel rounded-xl p-6 shadow-sm">
                <Tabs defaultValue="convert">
                  <TabsList className="mb-6">
                    <TabsTrigger value="convert">Convert Playlists</TabsTrigger>
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
