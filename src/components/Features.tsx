
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  delay = '0ms'
}) => (
  <div 
    className="relative rounded-xl overflow-hidden transition-all duration-300 group hover:shadow-xl"
    style={{ animationDelay: delay }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-950/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="glass-panel h-full relative rounded-xl p-6 border border-border/50 hover:border-brand-200/50 dark:hover:border-brand-800/50 transition-colors duration-300">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-200">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      title: "Convert Spotify to YouTube",
      description: "Transform your Spotify playlists to YouTube Music with a single click. All your songs, preserved perfectly.",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.021z"/>
        </svg>
      ),
      delay: '100ms'
    },
    {
      title: "Convert YouTube to Spotify",
      description: "Take your YouTube Music playlists to Spotify without the hassle of manually searching and recreating.",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
        </svg>
      ),
      delay: '200ms'
    },
    {
      title: "Keep All Metadata",
      description: "Preserve all your playlist details, including song order, artists, and album information during conversion.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      delay: '300ms'
    },
    {
      title: "Smart Matching",
      description: "Our intelligent algorithm finds the closest matches between platforms, ensuring you get the right songs.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      delay: '400ms'
    },
    {
      title: "Secure Authentication",
      description: "Connect securely to Spotify and YouTube using official OAuth, ensuring your account stays safe.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M12 16V18M8 11H16C17.1046 11 18 11.8954 18 13V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V13C6 11.8954 6.89543 11 8 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      delay: '500ms'
    },
    {
      title: "Bulk Conversion",
      description: "Convert multiple playlists at once, saving you time and effort when moving your music library.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      delay: '600ms'
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-200 rounded-full px-3 py-1 mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for seamless playlist conversion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our powerful tools make transferring your music between platforms simple, fast, and accurate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-brand-200/20 dark:bg-brand-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-brand-200/20 dark:bg-brand-800/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;
