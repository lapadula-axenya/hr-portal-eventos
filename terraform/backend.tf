terraform {
  backend "gcs" {
    bucket = "axenya-iac-terraform-state"
    prefix = "hr-portal-ui/states"
  }


  required_providers {
    google = {
      version = "~> 6.0.0"
    }
  }

  required_version = "~>1.12"
}
