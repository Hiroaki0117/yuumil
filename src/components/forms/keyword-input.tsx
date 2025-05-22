'use client'
import React from 'react';
import { Button } from '@/components/ui/button';

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function KeywordInput({ 
  value, 
  onChange, 
  onAdd, 
  disabled = false,
  placeholder = 'キーワードを入力してください'
}: KeywordInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="flex gap-2">
      <input 
        type="text" 
        className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      <Button onClick={onAdd} disabled={disabled || !value.trim()}>
        追加
      </Button>
    </div>
  );
} 