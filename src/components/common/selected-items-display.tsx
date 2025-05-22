'use client'
import React from 'react';
import { SelectedItem } from '@/types';
import { X } from 'lucide-react';

interface SelectedItemsDisplayProps {
  items: SelectedItem[];
  onRemove?: (item: SelectedItem) => void;
  showRemoveButton?: boolean;
}

export default function SelectedItemsDisplay({ 
  items, 
  onRemove, 
  showRemoveButton = false 
}: SelectedItemsDisplayProps) {
  const getItemLabel = (item: SelectedItem) => {
    return item.type === "genre" ? item.name : item.value;
  };

  const getItemKey = (item: SelectedItem) => {
    return item.type === "genre" ? item.id : item.value;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span 
          key={getItemKey(item)}
          className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-2"
        >
          {getItemLabel(item)}
          {showRemoveButton && onRemove && (
            <button
              onClick={() => onRemove(item)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`${getItemLabel(item)}を削除`}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
} 