import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';

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
  console.log(video);
  // プレースホルダー対策
  const thumb = video.thumbnail_url || '/images/no-thumb.png';

  return (
    <Link 
      href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 border rounded-lg p-3 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`動画を視聴: ${video.title}`}
    >
      <Image
        src={thumb}
        alt=""
        width={168}
        height={94}
        className="rounded-lg shrink-0"
        priority={false}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 168px"
      />
      <div className="flex flex-col justify-between min-w-0">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <div className="text-xs text-muted-foreground flex gap-2">
          <span>{(video.total_views ?? 0).toLocaleString('ja-JP')} 回視聴</span>
          <span>·</span>
          <span>
            {formatDistanceToNow(new Date(video.published_at), { 
              addSuffix: true, 
              locale: ja 
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}