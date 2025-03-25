
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient and noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80 bg-noise opacity-20 z-0"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-tr from-brand-400/10 to-brand-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-spotify/10 to-youtube/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-8 animate-slide-down">
            <span className="inline-block animate-fade-in text-xs font-medium bg-brand-100 text-brand-800 rounded-full px-3 py-1">
              Simplify your music experience
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className="bg-clip-text text-foreground">
                Seamlessly Convert Your Music <span className="animate-pulse-light">Playlists</span>
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Transform your playlists between Spotify and YouTube Music with just a few clicks. No more manual searching or rebuilding your favorite music collections.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up">
            <Button asChild size="lg" className="min-w-[160px] h-12 animate-fade-in">
              <Link to="/dashboard">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px] h-12 animate-fade-in delay-100">
              <a href="#features">
                Learn More
              </a>
            </Button>
          </div>
          
          {/* Platform logos */}
          <div className="mt-16 flex items-center justify-center gap-8 animate-fade-in delay-200">
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-spotify rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Spotify</span>
            </div>
            
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-youtube rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">YouTube Music</span>
            </div>
          </div>
          
          {/* Preview image/mockup */}
          <div className="relative mt-16 mx-auto max-w-4xl animate-fade-in delay-300">
            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-zinc-950 to-zinc-900 overflow-hidden">
                {/* Application mock UI */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="h-6 w-64 rounded-full bg-white/10"></div>
                    <div className="h-6 w-24 rounded-md bg-white/10"></div>
                  </div>
                  <div className="flex flex-1">
                    <div className="w-64 border-r border-white/10 p-4">
                      <div className="h-10 w-full rounded-md bg-white/10 mb-4"></div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-8 w-full rounded-md bg-white/5"></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="h-12 w-full rounded-md bg-white/10 mb-6"></div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-video rounded-md bg-white/5 shimmer"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 glass-panel rounded-lg p-2 px-3 shadow-xl rotate-3 animate-pulse-light">
              <span className="text-xs font-medium">Easy conversion</span>
            </div>
            <div className="absolute -bottom-4 -left-6 glass-panel rounded-lg p-2 px-3 shadow-xl -rotate-3 animate-pulse-light delay-700">
              <span className="text-xs font-medium">Preserve your playlists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-light"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
