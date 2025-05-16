import { PeriodType, RankRow } from "@/type";
import useSWR from "swr";

export function useRankingFeed(periodType: PeriodType, activePref: string) {
    const PAGE_SIZE = 20;
    const apiKey = `api/videos/trends?type=${periodType}&limit=${PAGE_SIZE}&pref=${activePref}`;

    const { data, error, isValidating } = useSWR<RankRow[]>(apiKey, 
        url => fetch(url).then(r => r.json()),
        {
            refreshInterval: 12 * 60 * 60,
            revalidateOnFocus: true,
        });
  return { trends: data ?? [], isLoading: !data && !error, isValidating, error };
};