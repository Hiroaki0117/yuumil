'use client';

import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';

interface HeaderClientProps {
  isAuthenticated: boolean;
}

export default function HeaderClient({ isAuthenticated }: HeaderClientProps) {
  return (
    <div className="flex items-center gap-4">
      <ModeToggle />
      
      {!isAuthenticated ? (
        <SignedOut>
          <SignInButton>
            <button className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      ) : (
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
        </SignedIn>
      )}
    </div>
  );
} 