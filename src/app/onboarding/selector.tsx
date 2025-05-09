'use client'
import React, { useState } from 'react';
import { Genre, GenreSelectorProps, SelectedItem } from '@/types/genre';
import { useRouter } from 'next/navigation';
import { insertUserGenres, insertUserKeywords, upsertKeywords } from '@/dal/genre';
import { Button } from '@/components/ui/button';

export default function GenreSelector({userId, genres}: GenreSelectorProps) {
    const [selected, setSelected] = useState<SelectedItem[]>([]);
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    // キーワード追加
    const addKeyword = () => {
        if (!keyword.trim() || selected.length >= 3) return;
        if (!selected.find(m => m.type === "keyword" && m.value === keyword )) {
            setSelected([...selected, {type: "keyword", value: keyword}]);
            setKeyword("");
        }
    };

    // ジャンルの選択
    const toggleGenre = (g: Genre) => {
        if (selected.find(m => m.type === "genre" && m.id === g.id )) {
            setSelected(selected.filter(m => !(m.type === "genre" && m.id === g.id)))
        } else if (selected.length < 3) {
            setSelected([...selected, {...g, type: "genre"}]);
        }
    };

    // 保存処理
    const save = async() => {
        console.log("save発火")
        const keywordItems = selected.filter(s => s.type === "keyword");
        const genreItems = selected.filter(s => s.type === 'genre');

        try {
            // キーワード登録
            const kwRows: { id: string }[] | null = await upsertKeywords(keywordItems);
            console.log("upsertKeywords完了");
            
            if (genreItems.length) {
                // ユーザージャンル登録
                await insertUserGenres(userId, genreItems);
            }

            if (kwRows != null && kwRows?.length) {
                // ユーザーキーワード登録
                await insertUserKeywords(userId, kwRows);
                console.log("insertUserKeywords");
            }
            router.push('/dashboard');
        }
        catch {
            console.log("error");
        }
    };
  return (
    <div className='space-y-6 py-8'>
        <h1 className='text-2xl font-bold'>興味のあるジャンル・キーワードを選択してください</h1>
        {/* ジャンルカード (略: アコーディオン＆カード実装) */}

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
