export type Company = {
  id: string;
  name: string;
  document: string;
};

export type CompanyWithMeta = {
  id: string;
  name: string;
  isHome: boolean;
  isActive: boolean;
};
