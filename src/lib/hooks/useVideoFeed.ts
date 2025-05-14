import useSWRInfinite from "swr/infinite";

export function useVideoFeed(activePref: string) {
    const PAGE_SIZE = 20;

    const getKey = (page: number, prev: any) => {
        if (!activePref) return null;
        if (prev && !prev.nextCursor) return null;  // ページが最後である

        const cursor = page === 0 ? null : prev.nextCursor;
        return `api/videos?pref=${activePref}&limit=${PAGE_SIZE}${cursor ? `&cursor=${cursor}` : ''}`;
    };

    const { data, size, setSize, isValidating} = useSWRInfinite(getKey, 
        url => fetch(url).then(r => r.json()), 
        {
        revalidateOnFocus: false,
    });

    const items = data ? data.flatMap(d => d.data) : [];
    const isLoadingMore = isValidating && data && typeof data[size - 1] === "undefined";

    return { items, setSize, isLoadingMore};
}