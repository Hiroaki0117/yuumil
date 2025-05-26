'use client'
import React from 'react';
import { GenreSelectorProps } from '@/types';
import TagSelector from '@/components/features/onboarding/tag-selector';

export default function GenreSelector({userId, genres}: GenreSelectorProps) {
  return <TagSelector userId={userId} genres={genres} />;
}
