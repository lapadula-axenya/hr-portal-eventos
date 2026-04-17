resource "google_service_account" "account" {
  account_id  = "hr-portal-ui-sa-${terraform.workspace}"
  description = "Service Account for HR Portal Ui Cloud Run"
}
