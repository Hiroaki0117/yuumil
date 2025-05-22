'use client'
import React, { useState } from 'react';
import { Genre, GenreSelectorProps, SelectedItem } from '@/types';
import { useRouter } from 'next/navigation';
import { insertUserGenres, insertUserKeywords, upsertKeywords } from '@/dal/genre';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function GenreSelector({userId, genres}: GenreSelectorProps) {
    const MAX = 3;
    const [selected, setSelected] = useState<SelectedItem[]>([]);
    const [keyword, setKeyword] = useState("");
    const router = useRouter();
    // キーワード追加
    const addKeyword = () => {
        if (!keyword.trim() || selected.length >= MAX) return;
        if (!selected.find(m => m.type === "keyword" && m.value === keyword )) {
            setSelected([...selected, {type: "keyword", value: keyword}]);
            setKeyword("");
        }
    };

    // ジャンルの選択
    const toggleGenre = (g: Genre) => {
        if (selected.find(m => m.type === "genre" && m.id === g.id )) {
            setSelected(selected.filter(m => !(m.type === "genre" && m.id === g.id)))
        } else if (selected.length < MAX) {
            setSelected([...selected, {...g, type: "genre"}]);
        }
    };

    // 保存処理
    const save = async() => {
        const keywordItems = selected.filter(s => s.type === "keyword");
        const genreItems = selected.filter(s => s.type === 'genre');

        try {
            // キーワード登録
            const kwRows: { id: string }[] | null = await upsertKeywords(keywordItems);
            
            if (genreItems.length) {
                // ユーザージャンル登録
                await insertUserGenres(userId, genreItems);
            }

            if (kwRows != null && kwRows?.length) {
                // ユーザーキーワード登録
                await insertUserKeywords(userId, kwRows);
            }
            router.push('/dashboard');
        }
        catch {
            console.log("error");
        }
    };

  const isGenreSelected = (g: Genre) => selected.some((m) => m.type === 'genre' && m.id === g.id);
  const disableSelect = selected.length >= MAX;
  return (
    <div className='space-y-6 py-8'>
        <h1 className='text-2xl font-bold'>興味のあるジャンル・キーワードを選択してください</h1>
        {/* ジャンルカード (略: アコーディオン＆カード実装) */}
        <Accordion type="single" collapsible defaultValue="genres">
            <AccordionItem value="genres">
            <AccordionTrigger className="text-lg font-semibold">ジャンル一覧</AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {genres.map((g) => {
                    const selectedFlag = isGenreSelected(g);
                    return (
                    <Card
                        key={g.id}
                        role="button"
                        aria-pressed={selectedFlag}
                        onClick={() => toggleGenre(g)}
                        className={cn(
                        'transition-all cursor-pointer border-primary/20 hover:border-primary',
                        selectedFlag
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : disableSelect
                            ? 'opacity-50 pointer-events-none'
                            : 'bg-muted'
                        )}
                    >
                        <CardContent className="flex items-center justify-between p-4">
                        <span>{g.name}</span>
                        {selectedFlag && <Check className="w-4 h-4" />}
                        </CardContent>
                    </Card>
                    );
                })}
                </div>
            </AccordionContent>
            </AccordionItem>
        </Accordion>

        {/* キーワード入力 */}
        <div className='flex gap-2'>
            <input 
                type="text" 
                className='flex-1 border px-2 py-1 rounded'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                // onChange={(e) => setKeyword(e.target.value)}
                placeholder='キーワードを入力してください'
                 />
            <Button onClick={addKeyword}>追加</Button>
        </div>

        {/* 選択・入力済表示 */}
        <div className='flex flex-wrap gap-2'>
            {selected.map(s => (
                <span 
                    key={s.type === "genre" ? s.id : s.value}
                    className='px-3 py-1 bg-muted rounded-full text-sm'
                >
                    {s.type === "genre" ? s.name : s.value}
                </span>
            ))}
        </div>

        <Button disabled={selected.length === 0} onClick={save}>
            保存してフィードへ
        </Button>
    </div>
  )
}
