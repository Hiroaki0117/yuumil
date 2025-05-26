import { auth } from "@clerk/nextjs/server";
import { listUserTagsByClerkId } from '@/dal/users';
import Trends from "@/components/features/videos/trends";

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
      const tags = await listUserTagsByClerkId(userId);

      if (tags?.length) {
        return (
          <div>
            <Trends prefs={tags} />
          </div>
        );
      }
  }
}
