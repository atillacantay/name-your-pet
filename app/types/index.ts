export interface GeneratedResult {
  names: string[];
  message: string;
}

export interface PetNameResponse {
  success: boolean;
  names: string[];
  message: string;
  error?: string;
}

export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}
