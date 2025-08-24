import type { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";
import "server-only";

export async function getIpAddress() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown";
}

export async function checkRateLimit(ratelimit: Ratelimit) {
  const ip = await getIpAddress();
  console.log(`Client IP Address: ${ip}`);

  const result = await ratelimit.limit(ip);
  if (result.success === false) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
  }

  return result;
}
