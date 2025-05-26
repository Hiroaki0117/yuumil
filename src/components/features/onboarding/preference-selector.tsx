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

export default function TagSelector({userId, genres}: GenreSelectorProps) {
    const MAX = 3;
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
            setSelected(selected.filter(m => !(m.type === "genre" && m.id === g.id)))
        } else if (selected.length < MAX) {
            setSelected([...selected, {...g, type: "genre"}]);
        }
    };

    // 選択済みアイテムを削除
    const removeItem = (item: SelectedItem) => {
        if (item.type === "genre") {
            setSelected(selected.filter(m => !(m.type === "genre" && m.id === item.id)));
        } else {
            setSelected(selected.filter(m => !(m.type === "keyword" && m.value === item.value)));
        }
    };

    // 保存処理
    const save = async() => {
        setIsLoading(true);
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
        catch (error) {
            console.error("保存に失敗しました:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedGenres = selected.filter(s => s.type === 'genre') as (SelectedItem & { type: 'genre' })[];
    const disableSelect = selected.length >= MAX;

    return (
        <div className='space-y-6 py-8'>
            <h1 className='text-2xl font-bold'>興味のあるジャンル・キーワードを選択してください</h1>
            <p className='text-muted-foreground'>最大{MAX}つまで選択できます。</p>
            
            {/* ジャンル選択 */}
            <Accordion type="single" collapsible defaultValue="genres">
                <AccordionItem value="genres">
                    <AccordionTrigger className="text-lg font-semibold">ジャンル一覧</AccordionTrigger>
                    <AccordionContent>
                        <GenreGrid 
                            genres={genres}
                            selectedGenres={selectedGenres}
                            onToggleGenre={toggleGenre}
                            disabled={disableSelect}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* キーワード入力 */}
            <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>キーワード追加</h3>
                <KeywordInput 
                    value={keyword}
                    onChange={setKeyword}
                    onAdd={addKeyword}
                    disabled={disableSelect}
                />
            </div>

            {/* 選択・入力済表示 */}
            {selected.length > 0 && (
                <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>選択済み ({selected.length}/{MAX})</h3>
                    <SelectedItemsDisplay 
                        items={selected} 
                        onRemove={removeItem}
                        showRemoveButton={true}
                    />
                </div>
            )}

            <Button 
                disabled={selected.length === 0 || isLoading} 
                onClick={save}
                className="w-full"
            >
                {isLoading ? "保存中..." : "保存してフィードへ"}
            </Button>
        </div>
    );
} 