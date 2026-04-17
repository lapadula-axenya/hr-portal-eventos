interface AmplitudePlugin {
  plugin: (options: { sampleRate: number }) => unknown;
}

interface AmplitudeInstance {
  add: (plugin: unknown) => void;
  init: (apiKey: string | undefined, options?: Record<string, unknown>) => void;
}

interface Window {
  amplitude: AmplitudeInstance;
  sessionReplay: AmplitudePlugin;
}
