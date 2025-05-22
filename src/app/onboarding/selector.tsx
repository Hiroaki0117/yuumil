'use client'
import React from 'react';
import { GenreSelectorProps } from '@/types';
import PreferenceSelector from '@/components/features/onboarding/preference-selector';

export default function GenreSelector({userId, genres}: GenreSelectorProps) {
  return <PreferenceSelector userId={userId} genres={genres} />;
}
