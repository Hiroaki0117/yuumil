import { UnifiedRow } from "@/types";
import useSWRInfinite from "swr/infinite";

interface PageData {
  nextCursor: string | null;
  data: UnifiedRow[]; // 実際のデータ配列（オプショナル）
}

export function useVideoFeed(activePref: string, period: string = "trend24h") {
    const PAGE_SIZE = 20;

    const getKey = (page: number, prev: PageData) => {
        if (!activePref) return null;
        if (prev && !prev.nextCursor) return null;  // ページが最後である

        const cursor = page === 0 ? null : prev.nextCursor;
        return `api/videos/news?pref=${activePref}&period=${period}&limit=${PAGE_SIZE}${cursor ? `&cursor=${cursor}` : ''}`;
    };

    const { data, size, setSize, isValidating, mutate} = useSWRInfinite(getKey, 
        url => fetch(url).then(r => r.json()), 
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1分間は重複リクエストを防ぐ
    });

    const items = data ? data.flatMap(d => d.data) : [];
    const isLoadingMore = isValidating && data && typeof data[size - 1] === "undefined";

    return { items, setSize, isLoadingMore, mutate};
}