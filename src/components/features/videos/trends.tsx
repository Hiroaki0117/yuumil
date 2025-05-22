"use client"
import { useRankingFeed } from "@/lib/hooks/useRankingFeed";
import { PeriodType, Pref } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useState } from "react";
import TrendRow from "./trend-row";

interface Props {
  prefs: Pref[];
}
export default function Trends({prefs}: Props) {
    const [periodType, setPeriodType] = useState("daily");
    const [activePref, setActivePref] = useState("");

    const { trends, isLoading } = useRankingFeed(periodType as PeriodType, activePref); 
    return (
        <div>
            {/* 期間選択 */}
            <ToggleGroup type="single" value={periodType} onValueChange={setPeriodType}>
                <ToggleGroupItem value="daily">daily</ToggleGroupItem>
                <ToggleGroupItem value="weekly">weekly</ToggleGroupItem>
            </ToggleGroup>
            {/* ジャンル・キーワード選択 */}
            {(prefs && prefs.length) && (
                <ToggleGroup type="single" value={activePref} onValueChange={setActivePref}>
                    {prefs.map((pref) => (
                        <ToggleGroupItem key={`${pref.type}:${pref.id}`} value={`${pref.type}:${pref.id}`} className="px-4 py-1 rounded-full">
                        {pref.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            )}
            <div className="space-y-2">
                {(trends && trends.length) && trends.map((t) => (
                    <TrendRow key={t.video_id as string} videoId={t.video_id as string} />
                ))}
                {isLoading && <p>Loading…</p>}
            </div>

        </div>
    );
}