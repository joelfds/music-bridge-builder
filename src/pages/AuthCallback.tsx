
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [service, setService] = useState<'spotify' | 'youtube' | null>(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get the authorization code from the URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        
        if (!code) {
          throw new Error('No authorization code found');
        }
        
        // Determine which service we're authenticating with
        // In a real app, this would be encoded in the state parameter
        const serviceParam = params.get('service') || state;
        const authService = serviceParam?.includes('spotify') 
          ? 'spotify' 
          : serviceParam?.includes('youtube')
            ? 'youtube'
            : null;
            
        setService(authService);
        
        if (!authService) {
          throw new Error('Unknown authentication service');
        }
        
        // In a real app, this would exchange the code for an access token
        console.log(`Processing ${authService} authentication with code: ${code}`);
        
        // Simulate API call to exchange code for token
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Successfully authenticated
        setStatus('success');
        
        // Store the token (in a real app)
        localStorage.setItem(`${authService}_connected`, 'true');
        
        // Redirect back to where the user was
        const returnPath = localStorage.getItem('auth_return_path') || '/dashboard';
        
        // Wait a moment before redirecting so the user sees the success message
        setTimeout(() => {
          navigate(returnPath);
        }, 1500);
        
      } catch (error) {
        console.error('Authentication callback error:', error);
        setStatus('error');
        
        // Wait a moment before redirecting
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    };
    
    processAuth();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-panel rounded-xl p-8 shadow-md max-w-md w-full text-center">
        <div className="mb-6">
          {status === 'processing' && (
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          )}
          
          {status === 'success' && (
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold mb-2">
          {status === 'processing' && 'Authenticating...'}
          {status === 'success' && 'Authentication Successful'}
          {status === 'error' && 'Authentication Failed'}
        </h1>
        
        <p className="text-muted-foreground mb-6">
          {status === 'processing' && `We're connecting your ${service || 'music'} account`}
          {status === 'success' && `Your ${service || 'music'} account has been connected successfully`}
          {status === 'error' && `There was a problem connecting your ${service || 'music'} account. Please try again.`}
        </p>
        
        <div className="animate-pulse text-sm text-muted-foreground">
          {status === 'success' && 'Redirecting you back...'}
          {status === 'error' && 'Redirecting you to dashboard...'}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
