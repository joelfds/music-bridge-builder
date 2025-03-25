
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { createSpotifyPlaylist, createYouTubePlaylist } from '@/lib/api';
import { toast } from 'sonner';

interface AddPlaylistFormProps {
  service: 'spotify' | 'youtube';
  onPlaylistCreated: () => void;
}

const AddPlaylistForm: React.FC<AddPlaylistFormProps> = ({ service, onPlaylistCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }
    
    try {
      setIsCreating(true);
      
      if (service === 'spotify') {
        await createSpotifyPlaylist(name, description, isPublic);
      } else {
        await createYouTubePlaylist(name, description, !isPublic);
      }
      
      // Reset form and close dialog
      setName('');
      setDescription('');
      setIsPublic(true);
      setIsOpen(false);
      
      // Refresh playlists
      onPlaylistCreated();
      
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error(`Failed to create ${service} playlist`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className={service === 'spotify' ? 'bg-spotify hover:bg-spotify/90' : 'bg-youtube hover:bg-youtube/90'}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New {service === 'spotify' ? 'Spotify' : 'YouTube'} Playlist
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create {service === 'spotify' ? 'Spotify' : 'YouTube'} Playlist
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for your playlist"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="visibility"
              className="rounded border-gray-300"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label htmlFor="visibility" className="text-sm">
              {service === 'spotify' 
                ? 'Make this playlist public' 
                : 'Make this playlist public'}
            </label>
          </div>
          
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit"
              disabled={isCreating}
              className={service === 'spotify' ? 'bg-spotify hover:bg-spotify/90' : 'bg-youtube hover:bg-youtube/90'}
            >
              {isCreating ? 'Creating...' : 'Create Playlist'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylistForm;
