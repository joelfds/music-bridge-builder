
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import PlaylistCard, { Playlist } from './PlaylistCard';
import { toast } from 'sonner';

interface PlaylistConverterProps {
  spotifyPlaylists: Playlist[];
  youtubePlaylists: Playlist[];
  isSpotifyConnected: boolean;
  isYouTubeConnected: boolean;
  onConvert: (sourcePlaylist: Playlist, targetPlatform: 'spotify' | 'youtube') => Promise<void>;
}

const PlaylistConverter: React.FC<PlaylistConverterProps> = ({
  spotifyPlaylists,
  youtubePlaylists,
  isSpotifyConnected,
  isYouTubeConnected,
  onConvert
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [targetPlatform, setTargetPlatform] = useState<'spotify' | 'youtube'>('youtube');
  const [isConverting, setIsConverting] = useState(false);
  
  // Determine which playlists to display based on selected platform
  const displayPlaylists = 
    targetPlatform === 'youtube' ? spotifyPlaylists : youtubePlaylists;
  
  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };
  
  const handleChangeTargetPlatform = (value: string) => {
    setTargetPlatform(value as 'spotify' | 'youtube');
    setSelectedPlaylist(null);
  };
  
  const handleConvert = async () => {
    if (!selectedPlaylist) {
      toast.error('Please select a playlist to convert');
      return;
    }
    
    try {
      setIsConverting(true);
      await onConvert(selectedPlaylist, targetPlatform);
      toast.success(`Playlist "${selectedPlaylist.name}" conversion started`);
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Failed to convert playlist. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };
  
  const isReady = 
    (targetPlatform === 'youtube' && isYouTubeConnected) || 
    (targetPlatform === 'spotify' && isSpotifyConnected);
  
  const canConvert = selectedPlaylist && isReady;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-semibold">Convert Playlist</h2>
        
        <div className="w-full sm:w-72">
          <Select
            value={targetPlatform}
            onValueChange={handleChangeTargetPlatform}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Convert to..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-youtube rounded-full"></div>
                  <span>Convert to YouTube Music</span>
                </div>
              </SelectItem>
              <SelectItem value="spotify">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-spotify rounded-full"></div>
                  <span>Convert to Spotify</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {!isReady ? (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/50 p-4 text-sm text-yellow-800 dark:text-yellow-200">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V16.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              Please connect to {targetPlatform === 'youtube' ? 'YouTube Music' : 'Spotify'} first
            </span>
          </div>
        </div>
      ) : displayPlaylists.length === 0 ? (
        <div className="rounded-lg border border-muted p-8 text-center">
          <h3 className="font-medium text-lg mb-2">No playlists found</h3>
          <p className="text-muted-foreground">
            {targetPlatform === 'youtube' 
              ? "We couldn't find any Spotify playlists to convert"
              : "We couldn't find any YouTube Music playlists to convert"}
          </p>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground">
            Select a playlist to convert to {targetPlatform === 'youtube' ? 'YouTube Music' : 'Spotify'}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                isSelected={selectedPlaylist?.id === playlist.id}
                onClick={() => handleSelectPlaylist(playlist)}
              />
            ))}
          </div>
        </>
      )}
      
      <div className="pt-4 border-t border-border flex justify-end">
        <Button 
          onClick={handleConvert}
          disabled={!canConvert || isConverting}
          className="min-w-[150px]"
        >
          {isConverting ? 'Converting...' : 'Convert Playlist'}
        </Button>
      </div>
    </div>
  );
};

export default PlaylistConverter;
