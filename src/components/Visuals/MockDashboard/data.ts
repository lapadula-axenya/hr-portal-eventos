/**
 * Static mock data for the Ultragaz health dashboard.
 * All data is hardcoded while the real dashboard solution is being built.
 */

export type DaysData = Record<
  string,
  Record<string, Record<string, Record<string, Record<string, number>>>>
>;

/** Dias perdidos por mes > empresa > CID > status > tipo */
export const DAYS_BY_MONTH: DaysData = {
  "2025-01": {
    Ultragaz: {
      "A/B": { Ativo: { F: 42 }, Férias: { F: 5 } },
      F: { Ativo: { F: 14 }, Férias: { F: 1 } },
      J: { Ativo: { F: 60 }, Férias: { F: 1 } },
      M: { Ativo: { F: 124 }, Férias: { F: 17 } },
      Outros: { Ativo: { F: 228 }, Férias: { F: 20 } },
      S: { Ativo: { F: 35 }, Férias: { F: 2 } },
    },
  },
  "2025-02": {
    Energias: {
      "A/B": { Ativo: { F: 4 } },
      F: { Ativo: { F: 2 } },
      J: { Ativo: { F: 4 } },
      Outros: { Ativo: { F: 8 } },
      S: { Ativo: { F: 2 } },
    },
    Neogás: {
      "A/B": { Ativo: { F: 3 } },
      Outros: { Ativo: { F: 5 } },
      S: { Ativo: { F: 15 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 48 }, Férias: { F: 3 } },
      F: { Ativo: { F: 2 } },
      J: { Ativo: { F: 37 }, Férias: { F: 5 } },
      M: { Ativo: { F: 99 }, Férias: { F: 15 } },
      Outros: { Ativo: { F: 246 }, Férias: { F: 43 } },
      S: { Ativo: { F: 36 }, Férias: { F: 14 } },
    },
  },
  "2025-03": {
    Energias: {
      "A/B": { Ativo: { F: 4 } },
      F: { Ativo: { F: 1 } },
      J: { Ativo: { F: 4 } },
      Outros: { Ativo: { F: 2 } },
    },
    Neogás: { "A/B": { Ativo: { F: 13 } }, J: { Ativo: { F: 1 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 61 }, Férias: { F: 13 } },
      F: { Ativo: { F: 3 } },
      J: { Ativo: { F: 49 }, Férias: { F: 5 } },
      M: { Ativo: { F: 89 }, Férias: { F: 18 } },
      Outros: { Ativo: { F: 284 }, Férias: { F: 34 } },
      S: { Ativo: { F: 40 }, Férias: { F: 2 } },
    },
  },
  "2025-04": {
    Energias: {
      "A/B": { Ativo: { F: 18 } },
      J: { Ativo: { F: 3 } },
      Outros: { Ativo: { F: 13 } },
      S: { Ativo: { F: 10 } },
    },
    Neogás: {
      F: { Ativo: { F: 8 } },
      M: { Ativo: { F: 11 } },
      Outros: { Ativo: { F: 2 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 77 }, Férias: { F: 11 } },
      F: { Ativo: { F: 1 } },
      J: { Ativo: { F: 58 }, Férias: { F: 2 } },
      M: { Ativo: { F: 90 }, Férias: { F: 25 } },
      Outros: { Ativo: { F: 253 }, Férias: { F: 57 } },
      S: { Ativo: { F: 72 }, Férias: { F: 1 } },
    },
  },
  "2025-05": {
    Energias: {
      "A/B": { Ativo: { F: 15 } },
      F: { Ativo: { F: 1 } },
      J: { Ativo: { F: 9 } },
      M: { Ativo: { F: 2 } },
      Outros: { Ativo: { F: 13 } },
      S: { Ativo: { F: 3 } },
    },
    Neogás: {
      "A/B": { Ativo: { F: 3 } },
      F: { Ativo: { F: 1 } },
      J: { Ativo: { F: 9 }, Férias: { F: 2 } },
      Outros: { Ativo: { F: 16 } },
      S: { Ativo: { F: 15 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 53 }, Férias: { F: 13 } },
      F: { Ativo: { F: 2 }, Férias: { F: 1 } },
      J: { Ativo: { F: 73 }, Férias: { F: 15 } },
      M: { Ativo: { F: 86, T: 26 }, Férias: { F: 30 } },
      Outros: { Ativo: { F: 274 }, Férias: { F: 46 } },
      S: { Ativo: { F: 82 }, Férias: { F: 16 } },
    },
  },
  "2025-06": {
    Energias: {
      "A/B": { Ativo: { F: 9 } },
      F: { Ativo: { F: 2 } },
      J: { Ativo: { F: 4 } },
      Outros: { Ativo: { F: 18 } },
    },
    Neogás: { J: { Ativo: { F: 10 } }, Outros: { Ativo: { F: 4 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 46 }, Férias: { F: 5 } },
      F: { Ativo: { F: 2 } },
      J: { Ativo: { F: 116 }, Férias: { F: 27 } },
      M: { Ativo: { F: 132, T: 30 }, Férias: { F: 26 } },
      Outros: { Ativo: { F: 313 }, Férias: { F: 64 } },
      S: { Ativo: { F: 37 }, Férias: { F: 5 } },
    },
  },
  "2025-07": {
    Energias: {
      "A/B": { Ativo: { F: 2 } },
      F: { Ativo: { F: 4 } },
      J: { Ativo: { F: 8 } },
      M: { Ativo: { F: 3 } },
      Outros: { Ativo: { F: 11 }, Férias: { F: 3 } },
    },
    Neogás: { J: { Ativo: { F: 6 } }, Outros: { Ativo: { F: 10 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 40 }, Férias: { F: 2 } },
      F: { Ativo: { F: 6 }, Férias: { F: 8 } },
      J: { Ativo: { F: 104 }, Férias: { F: 12 } },
      M: { Ativo: { F: 118, T: 31 }, Férias: { F: 16 } },
      Outros: { Ativo: { F: 303 }, Férias: { F: 37 } },
      S: { Ativo: { F: 44 }, Férias: { F: 3 } },
    },
  },
  "2025-08": {
    Energias: {
      "A/B": { Ativo: { F: 6 } },
      J: { Ativo: { F: 8 } },
      M: { Ativo: { F: 9 } },
      Outros: { Ativo: { F: 14 }, Férias: { F: 1 } },
    },
    Neogás: {
      F: { Ativo: { F: 3 } },
      J: { Ativo: { F: 6 } },
      M: { Ativo: { F: 5 } },
      Outros: { Ativo: { F: 10 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 71 }, Férias: { F: 13 } },
      F: { Ativo: { F: 24 }, Férias: { F: 3 } },
      J: { Ativo: { F: 111 }, Férias: { F: 9 } },
      M: { Ativo: { F: 113, T: 31 }, Férias: { F: 20 } },
      Outros: { Ativo: { F: 345 }, Férias: { F: 46 } },
      S: { Ativo: { F: 106, T: 18 }, Férias: { F: 5 } },
    },
  },
  "2025-09": {
    Energias: {
      "A/B": { Ativo: { F: 8 } },
      F: { Ativo: { F: 2 } },
      J: { Ativo: { F: 7 } },
      Outros: { Ativo: { F: 17 }, Férias: { F: 4 } },
    },
    Neogás: {
      "A/B": { Ativo: { F: 14 } },
      M: { Ativo: { F: 6 } },
      Outros: { Ativo: { F: 12 }, Férias: { F: 4 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 50 }, Férias: { F: 2 } },
      F: { Ativo: { F: 20 } },
      J: { Ativo: { F: 66 }, Férias: { F: 10 } },
      M: { Ativo: { F: 118, T: 30 }, Férias: { F: 2 } },
      Outros: { Ativo: { F: 323 }, Férias: { F: 23 } },
      S: { Ativo: { F: 46, T: 30 }, Férias: { F: 6 } },
    },
  },
  "2025-10": {
    Energias: { "A/B": { Ativo: { F: 2 } }, J: { Ativo: { F: 5 } } },
    Neogás: {
      "A/B": { Ativo: { F: 1 } },
      M: { Ativo: { F: 8 } },
      Outros: { Ativo: { F: 30 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 56 }, Férias: { F: 5 } },
      F: { Ativo: { F: 6 } },
      J: { Ativo: { F: 116 }, Férias: { F: 1 } },
      M: { Ativo: { F: 159, T: 15 }, Férias: { F: 8 } },
      Outros: { Ativo: { F: 489 }, Férias: { F: 40 } },
      S: { Ativo: { F: 98, T: 27 } },
    },
  },
  "2025-11": {
    Neogás: {
      "A/B": { Ativo: { F: 4 } },
      J: { Ativo: { F: 1 } },
      M: { Ativo: { F: 4 } },
      Outros: { Ativo: { F: 15 } },
      S: { Ativo: { F: 13 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 35 }, Férias: { F: 8 } },
      F: { Ativo: { F: 7 }, Férias: { F: 1 } },
      J: { Ativo: { F: 64 }, Férias: { F: 1 } },
      M: { Ativo: { F: 125 }, Férias: { F: 8 } },
      Outros: { Ativo: { F: 388 }, Férias: { F: 41 } },
      S: { Ativo: { F: 32 } },
    },
  },
  "2025-12": {
    Neogás: {
      "A/B": { Ativo: { F: 1 } },
      M: { Ativo: { F: 15 } },
      Outros: { Ativo: { F: 2 } },
      S: { Ativo: { F: 2 } },
    },
    Ultragaz: {
      "A/B": { Ativo: { F: 30 }, Férias: { F: 2 } },
      F: { Ativo: { F: 12 } },
      J: { Ativo: { F: 45 }, Férias: { F: 2 } },
      M: { Ativo: { F: 121 }, Férias: { F: 16 } },
      Outros: { Ativo: { F: 291 }, Férias: { F: 47 } },
      S: { Ativo: { F: 76 } },
    },
  },
  "2026-01": {
    Energias: {
      "A/B": { Ativo: { F: 1 } },
      M: { Ativo: { F: 1 } },
      Outros: { Ativo: { F: 7 } },
    },
    Neogás: { Outros: { Ativo: { F: 15 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 41 }, Férias: { F: 1 } },
      F: { Ativo: { F: 20 } },
      J: { Ativo: { F: 26 }, Férias: { F: 1 } },
      M: { Ativo: { F: 109 }, Férias: { F: 7 } },
      Outros: { Ativo: { F: 275 }, Férias: { F: 23 } },
      S: { Ativo: { F: 73 }, Férias: { F: 14 } },
    },
  },
  "2026-02": {
    Energias: { Outros: { Ativo: { F: 3 } } },
    Neogás: { "A/B": { Ativo: { F: 1 } }, Outros: { Ativo: { F: 8 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 52 }, Férias: { F: 6 } },
      F: { Ativo: { F: 24 }, Férias: { F: 5 } },
      J: { Ativo: { F: 68 } },
      M: { Ativo: { F: 148 }, Férias: { F: 2 } },
      Outros: { Ativo: { F: 281 }, Férias: { F: 51 } },
      S: { Ativo: { F: 58 }, Férias: { F: 2 } },
    },
  },
  "2026-03": {
    Energias: {
      "A/B": { Ativo: { F: 6 } },
      J: { Ativo: { F: 4 } },
      Outros: { Ativo: { F: 8 } },
    },
    Neogás: { F: { Ativo: { F: 11 } }, Outros: { Ativo: { F: 35 } } },
    Ultragaz: {
      "A/B": { Ativo: { F: 61 }, Férias: { F: 38 } },
      F: { Ativo: { F: 57 }, Férias: { F: 7 } },
      J: { Ativo: { F: 72 }, Férias: { F: 12 } },
      M: { Ativo: { F: 165 }, Férias: { F: 8 } },
      Outros: { Ativo: { F: 392 }, Férias: { F: 20 } },
      S: { Ativo: { F: 60 } },
    },
  },
};

/** HHT por mes: [total, ultragaz, neogas, energias] */
export const HHT_BY_MONTH: Record<string, number[]> = {
  "2025-01": [720037.95, 671008, 37517.95, 11512],
  "2025-02": [667206.38, 621312, 34309.38, 11585],
  "2025-03": [693783.84, 648600, 34488.84, 10695],
  "2025-04": [668216.12, 622080, 35433.12, 10703],
  "2025-05": [729062.07, 672464, 37046.07, 19552],
  "2025-06": [667177.09, 617664, 34921.09, 14592],
  "2025-07": [749618.53, 697896, 35954.53, 15768],
  "2025-08": [720758.12, 670800, 36022.12, 13936],
  "2025-09": [721495.66, 668304, 35927.66, 17264],
  "2025-10": [753660.42, 698760, 37404.42, 17496],
  "2025-11": [659924.8, 595608, 49964.8, 14352],
  "2025-12": [733886.73, 672464, 47069.73, 14353],
  "2026-01": [729710, 673712, 41438, 14560],
  "2026-02": [676734, 620736, 41438, 14560],
  "2026-03": [734201, 674544, 45097, 14560],
};

/** Afastamentos previdenciarios: [geral, cid_f] */
export const PREV_BY_MONTH: Record<string, number[]> = {
  "2025-01": [3162, 248],
  "2025-02": [2804, 268],
  "2025-03": [3028, 248],
  "2025-04": [2796, 210],
  "2025-05": [3001, 248],
  "2025-06": [3008, 240],
  "2025-07": [3227, 248],
  "2025-08": [3097, 211],
  "2025-09": [2905, 218],
  "2025-10": [3070, 217],
  "2025-11": [3283, 270],
  "2025-12": [3314, 248],
  "2026-01": [3281, 248],
  "2026-02": [2896, 251],
};

/** OKR Qualidade de Vida: m=mes, a=ativos, e=elegiveis, p=percentual */
export const OKR_DATA = [
  { m: "2025-03", a: 645, e: 689, p: 93.6 },
  { m: "2025-04", a: 645, e: 689, p: 93.6 },
  { m: "2025-05", a: 549, e: 609, p: 90.0 },
  { m: "2025-06", a: 432, e: 447, p: 96.6 },
  { m: "2025-07", a: 446, e: 495, p: 90.1 },
  { m: "2025-08", a: 454, e: 495, p: 91.7 },
  { m: "2025-09", a: 454, e: 473, p: 96.0 },
  { m: "2025-10", a: 469, e: 476, p: 98.5 },
  { m: "2025-11", a: 486, e: 504, p: 96.4 },
  { m: "2025-12", a: 486, e: 504, p: 96.4 },
  { m: "2026-01", a: 488, e: 506, p: 96.4 },
  { m: "2026-02", a: 488, e: 506, p: 96.4 },
];

/** Atividade restrita: f=filial, n=nome, d=dias */
export const RESTRICTED_ACTIVITY = [
  { f: "Capuava", n: "beneficiario_a", d: 31 },
  { f: "Capuava", n: "beneficiario_b", d: 31 },
  { f: "Capuava", n: "beneficiario_c", d: 31 },
  { f: "Capuava", n: "beneficiario_d", d: 31 },
  { f: "Capuava", n: "beneficiario_e", d: 31 },
  { f: "Capuava", n: "beneficiario_f", d: 31 },
  { f: "Capuava", n: "beneficiario_g", d: 31 },
  { f: "Capuava", n: "beneficiario_h", d: 31 },
  { f: "Capuava", n: "beneficiario_i", d: 31 },
  { f: "Capuava", n: "beneficiario_j", d: 31 },
  { f: "Capuava", n: "beneficiario_k", d: 31 },
  { f: "Capuava", n: "beneficiario_l", d: 31 },
  { f: "Capuava", n: "beneficiario_m", d: 31 },
  { f: "Capuava", n: "beneficiario_n", d: 31 },
  { f: "Capuava", n: "beneficiario_o", d: 31 },
  { f: "Capuava", n: "beneficiario_p", d: 15 },
  { f: "Duque de Caxias/RJ", n: "beneficiario_q", d: 31 },
  { f: "Duque de Caxias/RJ", n: "beneficiario_r", d: 31 },
  { f: "Duque de Caxias/RJ", n: "beneficiario_s", d: 31 },
  { f: "Duque de Caxias/RJ", n: "beneficiario_t", d: 31 },
  { f: "Mataripe/BA", n: "beneficiario_u", d: 31 },
  { f: "Mataripe/BA", n: "beneficiario_v", d: 31 },
  { f: "Mataripe/BA", n: "beneficiario_w", d: 31 },
  { f: "Mataripe/BA", n: "beneficiario_x", d: 31 },
  { f: "Araucaria/PR", n: "beneficiario_y", d: 31 },
  { f: "Araucaria/PR", n: "beneficiario_z", d: 31 },
  { f: "Araucaria/PR", n: "beneficiario_aa", d: 31 },
  { f: "Araucaria/PR", n: "beneficiario_ab", d: 19 },
  { f: "Araucaria/PR", n: "beneficiario_ac", d: 12 },
  { f: "Santos", n: "beneficiario_ad", d: 31 },
];

export const CID_GROUPS = ["A/B", "F", "J", "M", "S", "Outros"] as const;
export const CID_CHART_GROUPS = ["A/B", "F", "J", "M", "S"] as const;
export const COMPANIES = ["Ultragaz", "Neogás", "Energias"] as const;
export const STATUS_OPTIONS = ["Ativo", "Férias"] as const;
export const HHT_COMPANY_INDEX: Record<string, number> = {
  Ultragaz: 1,
  Neogás: 2,
  Energias: 3,
};
export const SALARY_BASE = 3273.01;

export const MONTH_NAMES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
export const MONTH_NUMBERS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
