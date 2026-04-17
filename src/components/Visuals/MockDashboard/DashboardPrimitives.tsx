/**
 * Small reusable UI primitives for the mock dashboard.
 */

import { colors } from "./theme";

/** Card wrapper with title and optional note */
export function DashCard(props: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: colors.surface,
        border: "1px solid " + colors.border,
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: colors.text,
          marginBottom: props.note ? 2 : 12,
          textAlign: "center",
        }}
      >
        {props.title}
      </div>
      {props.note && (
        <div
          style={{
            fontSize: 10,
            color: colors.muted,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {props.note}
        </div>
      )}
      {props.children}
    </div>
  );
}

/** KPI metric box with label + value */
export function KpiBox(props: {
  label: string;
  value: string | number;
  noAccum?: boolean;
}) {
  return (
    <div
      style={{
        minWidth: 120,
        maxWidth: 150,
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
          color: colors.muted,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          fontWeight: 600,
        }}
      >
        {props.label}
      </div>
      {!props.noAccum && (
        <div
          style={{
            fontSize: 8,
            color: colors.teal,
            marginBottom: 8,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          ACUMULADO
        </div>
      )}
      {props.noAccum && <div style={{ marginBottom: 8 }} />}
      <div style={{ fontSize: 22, fontWeight: 700, color: colors.accent }}>
        {props.value}
      </div>
    </div>
  );
}

/** Chart + KPI side by side */
export function ChartRow(props: {
  kpiLabel?: string;
  kpiValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
      <div style={{ flex: 1, minWidth: 0 }}>{props.children}</div>
      {props.kpiLabel && (
        <KpiBox label={props.kpiLabel} value={props.kpiValue ?? ""} />
      )}
    </div>
  );
}

/** Toggle chip / filter button */
export function Chip(props: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      style={{
        padding: "4px 12px",
        fontSize: 11,
        borderRadius: 20,
        border: "1.5px solid " + (props.on ? colors.teal : colors.border),
        background: props.on ? colors.teal : "transparent",
        color: props.on ? colors.bg : colors.muted,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {props.label}
    </button>
  );
}

/** Chart legend */
export function Legend(props: { items: [string, string, string][] }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        fontSize: 11,
        color: colors.muted,
        marginTop: 8,
        flexWrap: "wrap",
      }}
    >
      {props.items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: item[2] === "line" ? 18 : 10,
              height: item[2] === "line" ? 2.5 : 10,
              borderRadius: item[2] === "line" ? 1 : 2,
              background: item[1],
              display: "inline-block",
            }}
          />
          {item[0]}
        </span>
      ))}
    </div>
  );
}

/** Stat box used inside report panel */
export function StatBox(props: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: colors.bg,
        borderRadius: 8,
        padding: "12px 16px",
        flex: 1,
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: colors.muted,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 4,
        }}
      >
        {props.label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, color: colors.accent }}>
        {props.value}
      </div>
      {props.sub && (
        <div style={{ fontSize: 10, color: colors.muted, marginTop: 2 }}>
          {props.sub}
        </div>
      )}
    </div>
  );
}

/** Small accumulated KPI box (for side panels) */
export function AccumKpiBox(props: { label: string; value: string }) {
  return (
    <div
      style={{
        minWidth: 80,
        background: colors.bg,
        border: "1px solid " + colors.border,
        borderRadius: 8,
        padding: "8px 6px",
        textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: colors.muted,
          fontWeight: 600,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}
      >
        Acumulado
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: colors.accent,
          marginTop: 3,
        }}
      >
        {props.value}
      </div>
    </div>
  );
}
