resource "google_cloud_run_service_iam_member" "invoker" {
  location = google_cloud_run_v2_service.default.location
  member   = "allUsers"
  role     = "roles/run.invoker"
  service  = google_cloud_run_v2_service.default.name
}

resource "google_project_iam_member" "firebase_sdk_admin_permissions" {
  member  = "serviceAccount:${google_service_account.account.email}"
  project = data.google_project.project.project_id
  role    = "roles/firebase.sdkAdminServiceAgent"
}

resource "google_project_iam_member" "firebase_sdk_sign_in_permissions" {
  member  = "serviceAccount:${google_service_account.account.email}"
  project = data.google_project.project.project_id
  role    = "roles/iam.serviceAccountTokenCreator"
}

resource "google_secret_manager_secret_iam_member" "recaptcha_secret_access" {
  member    = "serviceAccount:${google_service_account.account.email}"
  project   = data.google_project.project.project_id
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.recaptcha.secret_id
}

resource "google_secret_manager_secret_iam_member" "apiKey_secret_access" {
  member    = "serviceAccount:${google_service_account.account.email}"
  project   = data.google_project.project.project_id
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.apiKey.secret_id
}

resource "google_secret_manager_secret_iam_member" "looker_embed_secret_access" {
  member    = "serviceAccount:${google_service_account.account.email}"
  project   = data.google_project.project.project_id
  role      = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.lookerEmbed.secret_id
}
