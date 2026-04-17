resource "google_cloud_run_v2_service" "default" {
  ingress  = "INGRESS_TRAFFIC_ALL"
  location = var.region
  name     = "hr-portal-ui-${terraform.workspace}"
  labels   = local.labels

  template {
    max_instance_request_concurrency = 10
    revision                         = "hr-portal-ui-${terraform.workspace}-${formatdate("YYYYMMDDhhss", timestamp())}"
    service_account                  = google_service_account.account.email
    timeout                          = "300s"

    containers {
      image = data.google_artifact_registry_docker_image.image.self_link

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
      env {
        name  = "NO_COLOR"
        value = "true"
      }
      env {
        name  = "NEXT_PUBLIC_SERVER_HOST"
        value = terraform.workspace == "production" ? "https://hr-portal-api-production-4k7lpbolra-rj.a.run.app" : "https://hr-portal-api-develop-62aanoqfpq-rj.a.run.app"
      }
      env {
        name  = "NEXT_PUBLIC_BASE_URL"
        value = terraform.workspace == "production" ? "https://portal.axenya.com" : "https://dev-portal.axenya.com"
      }
      env {
        name  = "SECRET_MANAGER_API_KEY"
        value = "${google_secret_manager_secret.apiKey.name}/versions/latest"
      }
      env {
        name  = "GOOGLE_API_URL"
        value = "https://securetoken.googleapis.com"
      }
      env {
        name  = "GCLOUD_PROJECT"
        value = var.project
      }
      env {
        name = "FIREBASE_CONFIG"
        value = jsonencode({
          "projectId" : var.project,
          "storageBucket" : "${var.project}.firebasestorage.app"
        })
      }
      env {
        name  = "SECRET_MANAGER_LOOKER_EMBED_SECRET"
        value = "${google_secret_manager_secret.lookerEmbed.name}/versions/latest"
      }
      env {
        name  = "SECRET_MANAGER_RECAPTCHA_SECRET_KEY"
        value = "${google_secret_manager_secret.recaptcha.name}/versions/latest"
      }
      env {
        name  = "RECAPTCHA_URL"
        value = "https://www.google.com/recaptcha/api/siteverify"
      }
      env {
        name  = "LOOKER_HOST"
        value = "axenya.cloud.looker.com"
      }
    }

    scaling {
      max_instance_count = 1
      min_instance_count = terraform.workspace == "production" ? 1 : 0
    }
  }
}
