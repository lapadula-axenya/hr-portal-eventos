import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { LoginData } from "./loginService.type";

export async function login({ email, password }: LoginData) {
  if (!firebaseAuth) return;
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
}

export async function logout() {
  if (!firebaseAuth) return;
  return await signOut(firebaseAuth);
}
