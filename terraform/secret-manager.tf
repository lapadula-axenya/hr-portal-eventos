resource "google_secret_manager_secret" "recaptcha" {
  secret_id = "hr-portal-recaptcha-secret-${terraform.workspace}"
  project   = data.google_project.project.project_id

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
}

resource "google_secret_manager_secret" "apiKey" {
  secret_id = "hr-portal-api-key-secret-${terraform.workspace}"
  project   = data.google_project.project.project_id

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
}

resource "google_secret_manager_secret" "lookerEmbed" {
  secret_id = "hr-portal-ui-looker-embed-secret-${terraform.workspace}"
  project   = data.google_project.project.project_id

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
}