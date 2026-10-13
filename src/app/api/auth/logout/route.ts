import { endSession } from "@/lib/session";

export async function POST() {
  await endSession();
  return new Response(null, { status: 204 });
}
