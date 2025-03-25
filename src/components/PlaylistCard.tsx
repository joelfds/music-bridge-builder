
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  trackCount: number;
  source: 'spotify' | 'youtube';
}

interface PlaylistCardProps {
  playlist: Playlist;
  isSelected?: boolean;
  onClick?: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ 
  playlist, 
  isSelected = false,
  onClick 
}) => {
  const { name, imageUrl, trackCount, source } = playlist;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-md",
        isSelected ? "ring-2 ring-primary" : "hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-950">
            {source === 'spotify' ? (
              <svg className="w-16 h-16 text-spotify/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            ) : (
              <svg className="w-16 h-16 text-youtube/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            )}
          </div>
        )}
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        
        {/* Source badge */}
        <div className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium",
          source === 'spotify' 
            ? "bg-spotify/90 text-white" 
            : "bg-youtube/90 text-white"
        )}>
          {source === 'spotify' ? 'Spotify' : 'YouTube'}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-sm line-clamp-1 mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground">{trackCount} tracks</p>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
