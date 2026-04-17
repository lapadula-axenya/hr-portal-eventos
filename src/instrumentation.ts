export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const g = global as unknown as Record<string, unknown>;

    // Node.js 22 enables --experimental-webstorage which creates a partial
    // localStorage object (without getItem/setItem). Patch it with a working
    // in-memory implementation so SSR code doesn't crash.
    if (typeof g["localStorage"] !== "undefined" && typeof (g["localStorage"] as Storage)?.getItem !== "function") {
      const store: Record<string, string> = {};
      g["localStorage"] = {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
          store[key] = String(value);
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          Object.keys(store).forEach((k) => delete store[k]);
        },
        key: (index: number) => Object.keys(store)[index] ?? null,
        get length() {
          return Object.keys(store).length;
        },
      };
    }
  }
}
