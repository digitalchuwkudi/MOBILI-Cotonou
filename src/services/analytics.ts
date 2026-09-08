export interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, any>;
}

export const trackEvent = (eventName: string, params?: Record<string, any>): void => {
  // In Stage 1 & 2, we log to the console with custom brand styling for clear developer visibility.
  // Stage 3 can easily connect Google Analytics, Meta Pixel, or Mixpanel here.
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `%c[Mobili Analytics]%c Event: %c${eventName}%c`,
      'color: #FAF9F6; background: #102A43; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
      'color: inherit;',
      'color: #C6922E; font-weight: bold;',
      'color: inherit;',
      params || ''
    );
  }
};
