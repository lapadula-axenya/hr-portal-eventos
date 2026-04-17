locals {
  # Allowed workspaces and mapping to env label
  workspace_env = {
    develop    = "develop"
    production = "production"
  }

  env = lookup(local.workspace_env, terraform.workspace, null)

  labels = merge({
    env         = local.env
    gcproject   = var.gcproject
    cost_center = var.cost_center
    team        = var.team
    app         = var.app
    owner       = var.owner
    managed_by  = "terraform"
    lifecycle   = "ephemeral"
  }, var.extra_labels)
}


check "workspace_is_valid" {
  assert {
    condition     = local.env != null
    error_message = "Invalid workspace: ${terraform.workspace}. Use only: develop, production."
  }
}
