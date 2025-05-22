import { auth } from "@clerk/nextjs/server";
import { listUserPreferencesByClerkId } from '@/dal/users';
import Trends from "@/components/features/videos/trends";

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
      const prefs = await listUserPreferencesByClerkId(userId);

      if (prefs?.length) {
        return (
          <div>
            <Trends prefs={prefs} />
          </div>
        );
      }
  }
}
