variable "project" {
  description = "The project name for deployment"
  type        = string

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{4,28}[a-z0-9]$", var.project))
    error_message = "Invalid project name provided for deployment"
  }
}

variable "region" {
  default     = "southamerica-east1"
  description = "The region for deployment"
  type        = string

  validation {
    condition     = can(regex("^(southamerica-east1)$", var.region))
    error_message = "Invalid region name provided for deployment"
  }
}

variable "gcproject" {
  default     = "hrp"
  description = "Internal gcproject id used for labeling"
  type        = string
}

variable "cost_center" {
  default     = "dev"
  description = "FinOps cost center label"
  type        = string

  validation {
    condition     = contains(["dev", "data"], var.cost_center)
    error_message = "Invalid cost center. Use only: dev, data."
  }
}

variable "team" {
  default     = "tech-dev"
  description = "Owning team label"
  type        = string
}

variable "app" {
  default     = "hrp"
  description = "Product/workload label"
  type        = string
}

variable "owner" {
  default     = "estevao_at_axenya_com"
  description = "Owning group/alias label"
  type        = string
}

variable "extra_labels" {
  description = "Additional labels merged into common labels"
  type        = map(string)
  default     = {}
}
