"use server";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }

  if (!token) {
    console.error("No reCAPTCHA token provided");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    if (!response.ok) {
      console.error("reCAPTCHA verification request failed:", response.status);
      return false;
    }

    const data: RecaptchaResponse = await response.json();

    if (!data.success && data["error-codes"]) {
      console.error(
        "reCAPTCHA verification failed with errors:",
        data["error-codes"]
      );
    }

    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
