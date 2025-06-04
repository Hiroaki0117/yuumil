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
      className="group relative flex gap-4 glass-morphism rounded-xl p-4 transition-all duration-500 hover:scale-[1.02] hover:neon-glow focus:outline-none focus:ring-2 focus:ring-primary/50 focus:scale-[1.02]"
      aria-label={`動画を視聴: ${video.title}`}
    >
      {/* 背景のグラデーション効果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* サムネイル */}
      <div className="relative shrink-0 overflow-hidden rounded-lg">
        <Image
          src={thumb}
          alt=""
          width={168}
          height={94}
          className="rounded-lg transition-transform duration-500 group-hover:scale-110"
          priority={false}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 168px"
        />
        {/* サムネイルのホログラフィック枠 */}
        <div className="absolute inset-0 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        {/* 再生アイコンオーバーレイ */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* コンテンツ */}
      <div className="relative flex flex-col justify-between min-w-0 flex-1">
        {/* タイトル */}
        <h3 className="text-sm font-semibold line-clamp-2 mb-2 text-white group-hover:text-white transition-all duration-300 font-bold">
          {video.title}
        </h3>
        
        {/* メタデータ - コントラスト改善版 */}
        <div className="text-xs readable-over-glass flex items-center gap-2">
          {/* 視聴回数 */}
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
            {(video.total_views ?? 0).toLocaleString('ja-JP')} 回視聴
          </span>
          
          <span className="text-white/30">·</span>
          
          {/* 投稿日時 */}
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
            {formatDistanceToNow(new Date(video.published_at), { 
              addSuffix: true, 
              locale: ja 
            })}
          </span>
        </div>
        
        {/* トレンドインジケーター */}
        <div className="absolute top-0 right-0">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-60 pulse-neon"></div>
        </div>
      </div>
      
      {/* ホバー時のシマー効果 */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500">
        <div className="shimmer absolute inset-0"></div>
      </div>
    </Link>
  );
}