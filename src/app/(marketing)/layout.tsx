import { ReactNode } from 'react';
import MarketingHeader from '@/components/layout/marketing-header';
import './marketing.css';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="marketing-layout">
      {/* マーケティング専用ヘッダー */}
      <MarketingHeader />
      
      {/* メインコンテンツ */}
      <div className="marketing-content">
        {children}
      </div>
    </div>
  );
} 