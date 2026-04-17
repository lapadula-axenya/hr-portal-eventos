export type Dashboard = {
  id: string;
  name: string;
  description: string;
  embedPath: string;
  externalId: string;
  model: string;
  params: string[];
};

export type PrincipalDashboard = {
  id: string;
  name: string;
  hasAccess: boolean;
};

export type DashboardFilter = {
  name?: string;
};
