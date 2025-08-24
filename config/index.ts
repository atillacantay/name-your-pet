export const config = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000",

  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  recaptchaActions: {
    generatePetName: "generate_pet_name",
  },

  // Localization Configuration
  supportedLocales: ["en", "de", "es", "fr", "zh", "tr"],
  defaultLocale: "en",

  // Cloudflare AI Configuration
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
    apiUrl: "https://api.cloudflare.com/client/v4/accounts",
  },

  // File upload limits
  maxFileSizeInMB: 10,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  allowedFileExtensions: ["JPG", "JPEG", "PNG", "WEBP"],

  // Cloudflare AI model configurations
  models: {
    imageToText: process.env.NEXT_PUBLIC_IMAGE_TO_TEXT_MODEL,
    textGeneration: process.env.NEXT_PUBLIC_TEXT_GENERATION_MODEL,
  },

  // Text generation parameters
  textGenerationParams: {
    max_tokens: 150,
    temperature: 0.8,
  },

  // AI Prompts (English only)
  prompts: {
    imageAnalysis: `Analyze this pet photo and provide a detailed description using the following structure:

1. ANIMAL TYPE: Specify exact species (dog, cat, rabbit, bird, etc.)
2. BREED: Identify breed if recognizable, or describe as mixed/unknown
3. PHYSICAL FEATURES:
   - Size: (tiny/small/medium/large/giant)
   - Primary colors and patterns
   - Distinctive markings or features
   - Eye color and expression
   - Fur/feather texture (fluffy, sleek, curly, etc.)
4. APPARENT AGE: (puppy/kitten/young/adult/senior)
5. PERSONALITY INDICATORS: Based on posture, expression, and body language
6. UNIQUE CHARACTERISTICS: Any special or unusual features

Focus only on the pet itself. Be factual and specific. This description will be used to generate creative pet names.`,

    nameGeneration: (description: string, locale: string = "en") => {
      const localeInstructions = {
        en: `Generate exactly 3 creative pet names following these rules:
- Single words only
- Easy to pronounce
- Memorable and unique
- Suitable for calling out loud
- Appropriate for all ages`,

        de: `Generate exactly 3 creative pet names for German-speaking owners:
- Single German words or German-friendly names
- Consider German pronunciation
- May include umlauts (ä, ö, ü)
- Reflect German naming traditions`,

        es: `Generate exactly 3 creative pet names for Spanish-speaking owners:
- Single Spanish words or Spanish-friendly names
- Consider Spanish pronunciation and accent marks
- May reflect Latin American or Spanish culture
- Warm and affectionate tone`,

        fr: `Generate exactly 3 creative pet names for French-speaking owners:
- Single French words or French-style names
- Consider French pronunciation
- May include accents (é, è, ê, etc.)
- Elegant or charming character`,

        zh: `Generate exactly 3 creative pet names for Chinese-speaking owners:
- Use pinyin romanization or English names popular in China
- Consider meaning and lucky associations
- Easy for Chinese speakers to pronounce
- Positive connotations`,

        tr: `Generate exactly 3 creative pet names for Turkish-speaking owners:
- Single Turkish words or Turkish-friendly names
- Consider Turkish pronunciation
- May reflect Turkish culture and traditions
- Meaningful and endearing`,
      };

      const instruction =
        localeInstructions[locale as keyof typeof localeInstructions] ||
        localeInstructions.en;

      return `Based on this pet description: "${description}"

${instruction}

Consider the pet's:
- Physical appearance (color, size, features)
- Personality traits
- Breed characteristics
- Any unique features mentioned

CRITICAL REQUIREMENTS:
- Output EXACTLY 3 names only
- Separate with commas
- NO explanations, NO prefixes, NO suffixes
- Each name must be a SINGLE WORD
- Names should be diverse in style (not all similar)

OUTPUT FORMAT: Name1, Name2, Name3`;
    },
  },

  // Fallback values
  fallbacks: {
    description: "cute pet",
    names: {
      en: ["Buddy", "Luna", "Max"],
      de: ["Felix", "Luna", "Bruno"],
      es: ["Amigo", "Luna", "Diego"],
      fr: ["Copain", "Luna", "Pierre"],
      zh: ["小宝", "月月", "豆豆"],
      tr: ["Sevgi", "Ay", "Kaplan"],
    },
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours (daily limit)
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 3, // Maximum 3 requests per IP per day
    message:
      "You've reached your daily limit of 3 pet name generations. Please try again tomorrow.",
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  },
};
