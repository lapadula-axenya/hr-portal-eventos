import { colors } from "../theme";

type DashboardHeaderProps = {
  lastMonth: string;
};

export function DashboardHeader({ lastMonth }: DashboardHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
        paddingBottom: 12,
        borderBottom: "3px solid " + colors.teal,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            color: colors.teal,
          }}
        >
          AXENYA
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: colors.text }}>
          Dashboard de Saúde Populacional — Ultragaz
        </div>
      </div>
      <div
        style={{
          background: colors.bg,
          border: "1px solid " + colors.border,
          borderRadius: 8,
          padding: "6px 16px",
          textAlign: "right",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: colors.text }}>
          {lastMonth}
        </div>
        <div style={{ fontSize: 10, color: colors.muted }}>
          Última atualização
        </div>
      </div>
    </div>
  );
}
