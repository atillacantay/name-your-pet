import { sendGTMEvent } from "@next/third-parties/google";

// 1. Page/App Initialization
export const trackPageView = (locale: string, page: string) => {
  sendGTMEvent({
    event: "page_view",
    page_title: `Pet Name Generator - ${page}`,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 2. Language/Locale Change
export const trackLocaleChange = (fromLocale: string, toLocale: string) => {
  sendGTMEvent({
    event: "locale_changed",
    previous_locale: fromLocale,
    new_locale: toLocale,
    timestamp: Date.now(),
  });
};

// 3. Image Upload Start
export const trackImageUploadStart = (locale: string) => {
  sendGTMEvent({
    event: "image_upload_start",
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 4. Image Upload Success
export const trackImageUploadSuccess = (file: File, locale: string) => {
  sendGTMEvent({
    event: "image_upload_success",
    file_size_kb: Math.round(file.size / 1024),
    file_type: file.type,
    file_name_extension: file.name.split(".").pop()?.toLowerCase(),
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 5. Image Upload Error
export const trackImageUploadError = (errorType: string, locale: string) => {
  sendGTMEvent({
    event: "image_upload_error",
    error_type: errorType,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 6. Name Generation Start
export const trackNameGenerationStart = (
  method: "image" | "description",
  locale: string
) => {
  sendGTMEvent({
    event: "name_generation_start",
    generation_method: method,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 7. Name Generation Success
export const trackNameGenerationSuccess = (
  method: "image" | "description",
  locale: string,
  namesCount: number,
  processingTimeMs: number
) => {
  sendGTMEvent({
    event: "name_generation_success",
    generation_method: method,
    user_locale: locale,
    names_generated: namesCount,
    processing_time_ms: processingTimeMs,
    timestamp: Date.now(),
  });
};

// 8. Name Generation Error
export const trackNameGenerationError = (
  method: "image" | "description",
  errorType: string,
  locale: string
) => {
  sendGTMEvent({
    event: "name_generation_error",
    generation_method: method,
    error_type: errorType,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 9. Name Click/Copy
export const trackNameInteraction = (
  action: "click" | "copy" | "share",
  petName: string,
  position: number,
  locale: string
) => {
  sendGTMEvent({
    event: "name_interaction",
    interaction_type: action,
    pet_name: petName,
    name_position: position,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 10. Try Another Photo Button
export const trackTryAnotherPhoto = (locale: string) => {
  sendGTMEvent({
    event: "try_another_photo",
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 11. Form Submission (Text Description)
export const trackDescriptionSubmit = (
  description: string,
  locale: string,
  descriptionLength: number
) => {
  sendGTMEvent({
    event: "description_submit",
    description_length: descriptionLength,
    has_description: description.length > 0,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 12. API Response Time
export const trackApiPerformance = (
  endpoint: "image-analysis" | "name-generation",
  responseTimeMs: number,
  success: boolean,
  locale: string
) => {
  sendGTMEvent({
    event: "api_performance",
    api_endpoint: endpoint,
    response_time_ms: responseTimeMs,
    api_success: success,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 13. reCAPTCHA Events
export const trackRecaptchaEvent = (
  action: "start" | "success" | "error",
  score?: number,
  locale?: string
) => {
  sendGTMEvent({
    event: "recaptcha_event",
    recaptcha_action: action,
    recaptcha_score: score,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 14. App Errors
export const trackAppError = (
  errorType: string,
  errorMessage: string,
  component: string,
  locale: string
) => {
  sendGTMEvent({
    event: "app_error",
    error_type: errorType,
    error_message: errorMessage,
    error_component: component,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 15. Session Engagement
export const trackSessionEngagement = (
  timeSpentMs: number,
  actionsCompleted: number,
  locale: string
) => {
  sendGTMEvent({
    event: "session_engagement",
    time_spent_ms: timeSpentMs,
    actions_completed: actionsCompleted,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 16. Feature Usage
export const trackFeatureUsage = (
  feature: "drag_drop" | "click_upload" | "text_input" | "locale_switch",
  locale: string
) => {
  sendGTMEvent({
    event: "feature_usage",
    feature_name: feature,
    user_locale: locale,
    timestamp: Date.now(),
  });
};

// 17. Conversion Funnel
export const trackConversionFunnel = (
  step: "landing" | "upload" | "processing" | "results" | "interaction",
  locale: string
) => {
  sendGTMEvent({
    event: "conversion_funnel",
    funnel_step: step,
    user_locale: locale,
    timestamp: Date.now(),
  });
};
