import { getPets } from "@/database/pets/get-pets";
import { currentUser, unauthorized } from "@/lib/session";

export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();

  return Response.json(await getPets(user.id));
}
