'use client'
import React, { useState } from 'react';
import { Genre, GenreSelectorProps, SelectedItem } from '@/types';
import { useRouter } from 'next/navigation';
import { insertUserGenres, insertUserKeywords, upsertKeywords } from '@/dal/genre';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import GenreGrid from './genre-grid';
import KeywordInput from '@/components/forms/keyword-input';
import SelectedItemsDisplay from '@/components/common/selected-items-display';
import { APP_CONFIG } from '@/lib/constants';

export default function TagSelector({userId, genres}: GenreSelectorProps) {
    const MAX = APP_CONFIG.MAX_TAGS;
    const [selected, setSelected] = useState<SelectedItem[]>([]);
    const [keyword, setKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
            setSelected(selected.filter(m => !(m.type === "genre" && m.id === g.id)));
        } else if (selected.length < MAX) {
            setSelected([...selected, {type: "genre", id: g.id, value: g.name}]);
        }
    };

    // 選択削除
    const removeItem = (item: SelectedItem) => {
        setSelected(selected.filter(s => !(s.type === item.type && 
            (s.type === "genre" ? s.id === item.id : s.value === item.value))));
    };

    // 保存処理
    const save = async () => {
        if (selected.length === 0) return;
        
        setIsLoading(true);
        try {
            const userGenres = selected.filter(s => s.type === "genre").map(s => s.id!);
            const userKeywords = selected.filter(s => s.type === "keyword").map(s => s.value);

            if (userGenres.length > 0) {
                await insertUserGenres(userId, userGenres);
            }

            if (userKeywords.length > 0) {
                await upsertKeywords(userKeywords);
                await insertUserKeywords(userId, userKeywords);
            }

            router.push("/dashboard");
        } catch (error) {
            console.error('保存エラー:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold holographic">興味のあるタグを選択</h1>
                <p className="text-muted-foreground">最大{MAX}個まで選択できます</p>
            </div>

            <SelectedItemsDisplay
                selected={selected}
                onRemove={removeItem}
                max={MAX}
            />

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="genres" className="glass-morphism rounded-xl px-6">
                    <AccordionTrigger className="text-lg font-semibold py-6">
                        🎵 ジャンルから選択
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                        <GenreGrid
                            genres={genres}
                            selected={selected}
                            onToggle={toggleGenre}
                            disabled={selected.length >= MAX}
                        />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keywords" className="glass-morphism rounded-xl px-6">
                    <AccordionTrigger className="text-lg font-semibold py-6">
                        🔍 キーワードで追加
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                        <KeywordInput
                            keyword={keyword}
                            setKeyword={setKeyword}
                            onAdd={addKeyword}
                            disabled={selected.length >= MAX}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="flex justify-center">
                <Button
                    onClick={save}
                    disabled={selected.length === 0 || isLoading}
                    className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? '保存中...' : '設定を保存'}
                </Button>
            </div>
        </div>
    );
}