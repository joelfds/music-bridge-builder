
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { SpotifyUserProfile, YouTubeUserProfile } from '@/lib/api';

interface UserProfileCardProps {
  profile: SpotifyUserProfile | YouTubeUserProfile;
  service: 'spotify' | 'youtube';
  isLoading?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  profile, 
  service,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full h-[180px] animate-pulse">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="w-10 h-10 bg-muted rounded-full mx-auto"></div>
            <div className="h-4 w-24 bg-muted rounded mx-auto"></div>
            <div className="h-3 w-32 bg-muted rounded mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if it's a Spotify profile
  const isSpotify = service === 'spotify';
  const spotifyProfile = isSpotify ? (profile as SpotifyUserProfile) : null;
  const youtubeProfile = !isSpotify ? (profile as YouTubeUserProfile) : null;

  // Get the appropriate display values
  const displayName = isSpotify ? spotifyProfile?.display_name : youtubeProfile?.name;
  const imageUrl = isSpotify 
    ? spotifyProfile?.images?.[0]?.url 
    : youtubeProfile?.picture;
  const followerCount = isSpotify 
    ? spotifyProfile?.followers?.total 
    : youtubeProfile?.subscriberCount;

  return (
    <Card className={cn(
      "w-full border shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden",
      service === 'spotify' ? "border-l-4 border-l-spotify" : "border-l-4 border-l-youtube"
    )}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            service === 'spotify' ? "bg-spotify text-white" : "bg-youtube text-white"
          )}>
            {service === 'spotify' ? (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            ) : (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            )}
          </div>
          <span className="font-medium text-sm text-muted-foreground">
            {service === 'spotify' ? 'Spotify Account' : 'YouTube Account'}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback>
              {displayName?.charAt(0) || (service === 'spotify' ? 'S' : 'Y')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold">{displayName}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {followerCount} {isSpotify ? 'followers' : 'subscribers'}
              </span>
              {isSpotify && spotifyProfile?.product && (
                <>
                  <span>•</span>
                  <span className="capitalize">{spotifyProfile.product}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
