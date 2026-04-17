import { DashCard, KpiBox } from "../DashboardPrimitives";
import { RESTRICTED_ACTIVITY, SALARY_BASE } from "../data";
import { colors } from "../theme";
import { useRestrictedActivityData } from "../useDashboardData";

type RestrictedActivitySectionProps = {
  selectedBranch: string | null;
  setSelectedBranch: (v: string | null) => void;
};

export function RestrictedActivitySection({
  selectedBranch,
  setSelectedBranch,
}: RestrictedActivitySectionProps) {
  const { aggPeople, maxDays, rows, sortedBranches } =
    useRestrictedActivityData(selectedBranch);

  const totalPeople = RESTRICTED_ACTIVITY.length;
  const totalDias = RESTRICTED_ACTIVITY.reduce((s, r) => s + r.d, 0);
  const valorEcon = Math.round((totalDias / 30) * SALARY_BASE);

  return (
    <DashCard
      title="Atividade Restrita"
      note="Competência: JAN-26. Clique em uma filial para filtrar a tabela abaixo."
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <KpiBox
          label="Pessoas em atividade restrita"
          value={totalPeople}
          noAccum
        />
        <KpiBox
          label="Total de dias"
          value={totalDias.toLocaleString()}
          noAccum
        />
        <div
          style={{
            minWidth: 120,
            maxWidth: 170,
            background: colors.bg,
            border: "1px solid " + colors.border,
            borderRadius: 10,
            padding: "14px 12px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: colors.accent,
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              fontWeight: 600,
            }}
          >
            Valor economizado
          </div>
          <div
            style={{
              fontSize: 8,
              color: colors.accent,
              marginBottom: 8,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            ACUMULADO
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.accent }}>
            {"R$ " + valorEcon.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>

      {/* Horizontal bar chart by branch */}
      {sortedBranches.map((pair) => {
        const fil = pair[0],
          tot = pair[1];
        const ppl = aggPeople[fil] || 0;
        const avg = ppl > 0 ? Math.round((tot / ppl) * 10) / 10 : 0;
        const pct = Math.max((tot / maxDays) * 100, 8);
        return (
          <div
            key={fil}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 6,
              cursor: "pointer",
              opacity: selectedBranch && selectedBranch !== fil ? 0.3 : 1,
              transition: "opacity 0.15s",
            }}
            onClick={() =>
              setSelectedBranch(selectedBranch === fil ? null : fil)
            }
          >
            <span
              style={{
                width: 130,
                textAlign: "right",
                paddingRight: 10,
                fontSize: 11,
                fontWeight: 500,
                color: colors.muted,
              }}
            >
              {fil}
            </span>
            <div
              style={{
                flex: 1,
                height: 28,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: pct + "%",
                  height: "100%",
                  background:
                    selectedBranch === fil ? colors.accent : colors.tealDark,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>
                  {tot}
                </span>
              </div>
            </div>
            <div
              style={{
                width: 140,
                paddingLeft: 10,
                display: "flex",
                gap: 8,
                fontSize: 10,
              }}
            >
              <span style={{ color: colors.text, fontWeight: 600 }}>
                {ppl}{" "}
                <span style={{ fontWeight: 400, color: colors.muted }}>
                  pessoas
                </span>
              </span>
              <span style={{ color: colors.muted }}>|</span>
              <span style={{ color: colors.text, fontWeight: 600 }}>
                {avg}{" "}
                <span style={{ fontWeight: 400, color: colors.muted }}>
                  dias/pessoa
                </span>
              </span>
            </div>
          </div>
        );
      })}

      <div
        style={{
          textAlign: "center",
          fontSize: 10,
          color: colors.muted,
          margin: "6px 0 14px",
        }}
      >
        Total de dias em Atividades Restritas
      </div>

      {/* Detail table */}
      <div
        style={{
          maxHeight: 280,
          overflowY: "auto",
          border: "1px solid " + colors.border,
          borderRadius: 8,
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
        >
          <thead>
            <tr style={{ position: "sticky", top: 0, background: colors.bg }}>
              {[
                "Filial",
                "Nome Beneficiário",
                "Dias Em Atividade Restrita",
              ].map((header, idx) => (
                <th
                  key={header}
                  style={{
                    padding: "8px 12px",
                    textAlign: idx === 2 ? "right" : "left",
                    fontWeight: 600,
                    fontSize: 10,
                    color: colors.muted,
                    borderBottom: "1px solid " + colors.border,
                    textTransform: "uppercase",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "transparent" : colors.bg,
                }}
              >
                <td
                  style={{
                    padding: "6px 12px",
                    borderBottom: "1px solid " + colors.border,
                    color: colors.text,
                  }}
                >
                  {r.f}
                </td>
                <td
                  style={{
                    padding: "6px 12px",
                    borderBottom: "1px solid " + colors.border,
                    color: colors.text,
                  }}
                >
                  {r.n}
                </td>
                <td
                  style={{
                    padding: "6px 12px",
                    borderBottom: "1px solid " + colors.border,
                    textAlign: "right",
                    fontWeight: 500,
                    color: colors.text,
                  }}
                >
                  {r.d}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashCard>
  );
}
