import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  video: {
    id: string;
    youtube_id: string;
    title: string;
    thumbnail_url: string;
    published_at: string;
    total_views: number | null;
  };
}

export default function VideoCard({ video }: Props) {
  // プレースホルダー対策
  const thumb = video.thumbnail_url || '/images/no-thumb.png';

  return (
    <div className="flex gap-3 border rounded-lg p-3" data-video-card>
      <Image
        src={thumb}
        alt={video.title}
        width={168}
        height={94}
        className="rounded-lg shrink-0"
      />
      <div className="flex flex-col justify-between min-w-0">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <div className="text-xs text-muted-foreground flex gap-2">
          <span>{video.total_views ?? 0} views</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(video.published_at), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
}