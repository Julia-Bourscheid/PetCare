import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;

// Formato salvo no banco: "<salt>:<hash>", ambos em hexadecimal.
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, KEY_LENGTH);
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const expected = Buffer.from(hash ?? "", "hex");
  if (!salt || expected.length !== KEY_LENGTH) return false;

  const actual = await scryptAsync(password, salt, KEY_LENGTH);
  return timingSafeEqual(actual, expected);
}
