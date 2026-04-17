locals {
  host = terraform.workspace == "production" ? "portal.axenya.com" : "dev-portal.axenya.com"
}

resource "google_compute_global_address" "default" {
  name    = "hr-portal-${terraform.workspace}-ip"
  project = data.google_project.project.project_id
}

resource "google_compute_region_network_endpoint_group" "default" {
  name                  = "hr-portal-${terraform.workspace}-neg"
  network_endpoint_type = "SERVERLESS"
  project               = data.google_project.project.project_id
  region                = var.region

  cloud_run {
    service = google_cloud_run_v2_service.default.name
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_compute_backend_service" "default" {
  load_balancing_scheme = "EXTERNAL_MANAGED"
  name                  = "hr-portal-${terraform.workspace}-default-backend"
  protocol              = "HTTPS"
  timeout_sec           = 30

  cdn_policy {
    cache_mode = "USE_ORIGIN_HEADERS"

    cache_key_policy {
      include_host         = true
      include_protocol     = true
      include_query_string = true
    }
  }

  backend {
    group = google_compute_region_network_endpoint_group.default.id
  }

  project = data.google_project.project.project_id
}

resource "google_compute_managed_ssl_certificate" "default" {
  name    = "${terraform.workspace}-${replace(local.host, ".", "-")}"
  project = data.google_project.project.project_id

  managed {
    domains = [local.host]
  }
}

resource "google_compute_url_map" "default" {
  default_service = google_compute_backend_service.default.id
  name            = "hr-portal-${terraform.workspace}-url-map"
  project         = data.google_project.project.project_id

  host_rule {
    hosts        = [local.host]
    path_matcher = "${replace(local.host, ".", "-")}-matcher"
  }

  path_matcher {
    default_service = google_compute_backend_service.default.id
    name            = "${replace(local.host, ".", "-")}-matcher"
  }
}

resource "google_compute_target_https_proxy" "default" {
  name             = "hr-portal-${terraform.workspace}-https-proxy"
  project          = data.google_project.project.project_id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
  url_map          = google_compute_url_map.default.id
}

resource "google_compute_global_forwarding_rule" "default" {
  ip_address            = google_compute_global_address.default.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
  name                  = "hr-portal-${terraform.workspace}-forwarding-rule"
  port_range            = "443"
  project               = data.google_project.project.project_id
  target                = google_compute_target_https_proxy.default.id
}
