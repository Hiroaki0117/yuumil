export interface Genre {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Keyword {
  id: string;
  name: string;
  description: string;
}

export interface SelectedGenre extends Genre {
  type: 'genre';
}

export interface SelectedKeyword {
  type: 'keyword';
  value: string;
}

export type SelectedItem = SelectedGenre | SelectedKeyword;

export interface GenreSelectorProps {
  userId: string;
  genres: Genre[];
}