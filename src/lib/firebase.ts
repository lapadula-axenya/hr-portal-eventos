import type { Auth } from "firebase/auth";
import type { RemoteConfig } from "firebase/remote-config";
import type { FirebaseApp } from "firebase/app";

// Mock: Firebase disabled for static demo
const firebaseApp: FirebaseApp | undefined = undefined;
const firebaseAuth: Auth | undefined = undefined;
const remoteConfig: RemoteConfig | undefined = undefined;

export { firebaseApp, firebaseAuth, remoteConfig };
