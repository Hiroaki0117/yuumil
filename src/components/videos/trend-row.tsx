'use client'

import useSWR from "swr";
import VideoCard from "./video-card";

interface Props {
  videoId: string;
}

export default function TrendRow({videoId}: Props) {
    const { data } = useSWR(`/api/videos/single?vid=${videoId}`, (u) => fetch(u).then((r) => r.json()));

    if (!data) return <div className="h-[54px]" />;
    return (
        <div>
            <VideoCard video={data} data-video-card />
        </div>
    );
};