'use client'
import React from 'react';
import { Genre } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenreGridProps {
  genres: Genre[];
  selectedGenres: Genre[];
  onToggleGenre: (genre: Genre) => void;
  disabled: boolean;
}

export default function GenreGrid({ 
  genres, 
  selectedGenres, 
  onToggleGenre, 
  disabled 
}: GenreGridProps) {
  const isGenreSelected = (genre: Genre) => 
    selectedGenres.some((g) => g.id === genre.id);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      {genres.map((genre) => {
        const selectedFlag = isGenreSelected(genre);
        return (
          <Card
            key={genre.id}
            role="button"
            aria-pressed={selectedFlag}
            onClick={() => onToggleGenre(genre)}
            className={cn(
              'transition-all cursor-pointer border-primary/20 hover:border-primary',
              selectedFlag
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : disabled
                ? 'opacity-50 pointer-events-none'
                : 'bg-muted'
            )}
          >
            <CardContent className="flex items-center justify-between p-4">
              <span>{genre.name}</span>
              {selectedFlag && <Check className="w-4 h-4" />}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 