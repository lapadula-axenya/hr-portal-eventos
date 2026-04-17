import { colors } from "../theme";
import { formatMonth } from "../utils";

type ReportSelectorProps = {
  months: string[];
  selectedMonth: string;
  setSelectedMonth: (v: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export function ReportSelector({
  isOpen,
  months,
  selectedMonth,
  setIsOpen,
  setSelectedMonth,
}: ReportSelectorProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        padding: "12px 18px",
        background: colors.surface,
        border: "1px solid " + colors.border,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: colors.muted,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Relatório mensal
      </div>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{
          padding: "6px 12px",
          fontSize: 12,
          borderRadius: 6,
          border: "1px solid " + colors.border,
          color: colors.text,
          background: colors.bg,
          fontWeight: 500,
        }}
      >
        <option value="">Selecione o mês</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {formatMonth(m)}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          if (selectedMonth) setIsOpen(!isOpen);
        }}
        style={{
          padding: "6px 18px",
          fontSize: 12,
          fontWeight: 600,
          borderRadius: 6,
          border: "none",
          background: selectedMonth ? colors.teal : colors.border,
          color: selectedMonth ? colors.bg : colors.muted,
          cursor: selectedMonth ? "pointer" : "default",
        }}
      >
        {isOpen ? "Fechar relatório" : "Gerar relatório"}
      </button>
    </div>
  );
}
