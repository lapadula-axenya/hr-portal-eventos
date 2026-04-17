import { redirect } from "next/navigation";
import { AppRoutes } from "@/config/appRoutes";

export default function MainHomePage() {
  redirect(AppRoutes.MAIN.REGISTRATION_STATUS);
}
