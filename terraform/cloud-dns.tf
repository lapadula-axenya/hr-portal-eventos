resource "google_dns_managed_zone" "default" {
  description = "Zona DNS para ${google_cloud_run_v2_service.default.name}"
  dns_name    = "${local.host}."
  name        = replace(local.host, ".", "-")
  project     = data.google_project.project.project_id
}

resource "google_dns_record_set" "default" {
  managed_zone = google_dns_managed_zone.default.name
  name         = "${local.host}."
  project      = data.google_project.project.project_id
  rrdatas      = [google_compute_global_address.default.address]
  ttl          = 300
  type         = "A"
}
