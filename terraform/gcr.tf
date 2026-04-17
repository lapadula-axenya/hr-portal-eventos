resource "google_artifact_registry_repository" "default" {
  format        = "DOCKER"
  location      = var.region
  repository_id = "hr-portal-artifact-registry-repository-${terraform.workspace}"
}

data "google_artifact_registry_docker_image" "image" {
  image_name    = "hr-portal-ui-${terraform.workspace}:latest"
  location      = google_artifact_registry_repository.default.location
  repository_id = google_artifact_registry_repository.default.repository_id
}
