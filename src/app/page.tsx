import { Suspense } from 'react';
import MarketingLanding from './(marketing)/page'; // <- 同一ツリー内参照

export default async function Home() {
  return (
    <Suspense>
      <MarketingLanding />
    </Suspense>
  );
}