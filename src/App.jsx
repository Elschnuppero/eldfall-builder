import { useState, useCallback } from "react";

import { ALL_FACTIONS, ALL_SPELLCRAFTS } from "./assets/units/factions.js";
import SKILL_DEFS from "./assets/units/glossary_skills.js";
import TRAIT_DEFS from "./assets/units/glossary_traits.js";
import CLASS_DEFS from "./assets/units/glossary_classes.js";

// ============================================================
// HELPERS
// ============================================================
function getDef(name) {
  if (TRAIT_DEFS[name]) return { tag: "Trait", text: TRAIT_DEFS[name] };
  if (SKILL_DEFS[name]) return { tag: "Skill", text: SKILL_DEFS[name] };
  if (CLASS_DEFS[name]) return { tag: "Class", text: CLASS_DEFS[name] };
  // fuzzy match: strip trailing roman numerals (e.g. "Vigilance I" → "Vigilance")
  const base = name.replace(/\s+[IVX]+$/, "").trim();
  if (TRAIT_DEFS[base]) return { tag: "Trait", text: TRAIT_DEFS[base] };
  if (SKILL_DEFS[base]) return { tag: "Skill", text: SKILL_DEFS[base] };
  return null;
}

function getTotalCost(army) {
  return army.reduce((sum, e) => sum + e.unit.cost, 0);
}

// ============================================================
// STYLE CONSTANTS
// ============================================================
const TAG = {
  Trait:        "#7c5c2a",
  Skill:        "#2a5c7c",
  Class:        "#4a2a7c",
  Spellcraft:   "#2a7c4a",
  "Combat Art": "#7c4a2a",
  Authority:    "#7c4a1a",
  Subterfuge:   "#4a1a7c",
};

// ============================================================
// SHARED UI COMPONENTS
// ============================================================
function Badge({ label, color }) {
  return (
    <span style={{
      background: color || "#555", color: "#fff",
      fontSize: "0.65rem", padding: "2px 6px", borderRadius: "3px",
      fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

function StatGrid({ stats }) {
  return (
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", margin: "8px 0" }}>
      {Object.entries(stats).map(([k, v]) => (
        <div key={k} style={{
          background: "#23252b", border: "1px solid #383b42",
          borderRadius: "4px", padding: "4px 7px", textAlign: "center", minWidth: "40px",
        }}>
          <div style={{ color: "#888", fontSize: "0.6rem", letterSpacing: "0.06em" }}>{k}</div>
          <div style={{
            color: String(v).startsWith("+") ? "#6ec87a" : "#f5c842",
            fontSize: "0.95rem", fontWeight: 700,
          }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      color: "#777", fontSize: "0.65rem", marginBottom: "4px", marginTop: "8px",
      textTransform: "uppercase", letterSpacing: "0.09em",
    }}>
      {children}
    </div>
  );
}

function DefBlock({ name, def }) {
  if (!def) return (
    <div style={{
      background: "#1c1e24", border: "1px solid #2e3038",
      borderLeft: "3px solid #444", borderRadius: "4px",
      padding: "6px 10px", marginBottom: "4px",
    }}>
      <span style={{ color: "#666", fontSize: "0.8rem" }}>{name}</span>
    </div>
  );
  return (
    <div style={{
      background: "#1c1e24", border: "1px solid #2e3038",
      borderLeft: `3px solid ${TAG[def.tag] || "#555"}`,
      borderRadius: "4px", padding: "7px 11px", marginBottom: "5px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "3px" }}>
        <span style={{ color: "#e8e0cc", fontWeight: 700, fontSize: "0.82rem" }}>{name}</span>
        <Badge label={def.tag} color={TAG[def.tag]} />
      </div>
      <p style={{ color: "#b8b0a0", fontSize: "0.77rem", margin: 0, lineHeight: 1.5 }}>
        {def.text}
      </p>
    </div>
  );
}

function SpellcraftBlock({ name }) {
  const data = ALL_SPELLCRAFTS[name];
  if (!data) return (
    <div style={{
      background: "#1c1e24", border: "1px solid #2e3038",
      borderLeft: "3px solid #2a7c4a", borderRadius: "4px",
      padding: "7px 11px", marginBottom: "5px",
    }}>
      <span style={{ color: "#888", fontSize: "0.82rem" }}>{name} — keine Daten verfügbar</span>
    </div>
  );

  const isCombatArt = data.type === "Combat Art";
  const rows = isCombatArt ? data.levels : data.spells;
  const borderColor = isCombatArt ? TAG["Combat Art"] : TAG.Spellcraft;

  return (
    <div style={{
      background: "#1c1e24", border: "1px solid #2e3038",
      borderLeft: `3px solid ${borderColor}`,
      borderRadius: "4px", padding: "7px 11px", marginBottom: "5px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
        <span style={{ color: "#e8e0cc", fontWeight: 700, fontSize: "0.82rem" }}>{name}</span>
        <Badge label={isCombatArt ? "Combat Art" : "Spellcraft"} color={borderColor} />
        {!isCombatArt && data.element && <Badge label={data.element} color="#446688" />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {rows?.map((s, i) => (
          <div key={i} style={{
            background: "#23252b", borderRadius: "3px", padding: "4px 8px", fontSize: "0.76rem",
          }}>
            <span style={{ color: "#f5c842", fontWeight: 700, marginRight: "6px" }}>{s.lvl}</span>
            {!isCombatArt && s.element && (
              <span style={{ color: "#6699bb", marginRight: "6px", fontSize: "0.7rem" }}>
                [{s.element}]
              </span>
            )}
            <span style={{ color: "#d0c8b8", fontWeight: 600, marginRight: "6px" }}>{s.name}</span>
            <span style={{ color: "#999" }}>{s.effect}</span>
            {!isCombatArt && (
              <span style={{ color: "#666", marginLeft: "8px", fontSize: "0.7rem" }}>
                PW {s.pw} · RCH {s.rch} · STK {s.stk}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryTable({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{ overflowX: "auto", marginBottom: "8px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.73rem" }}>
        <thead>
          <tr style={{ background: "#23252b" }}>
            {["Name", "Effekt", "PW", "RCH", "STK", "Typ", "QTY", "WGT"].map(h => (
              <th key={h} style={{
                padding: "3px 6px", textAlign: "left", color: "#777",
                fontWeight: 600, borderBottom: "1px solid #2e3038", whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1c1e24" }}>
              <td style={{ padding: "3px 6px", color: "#e8e0cc", fontWeight: 600, whiteSpace: "nowrap" }}>{item.name}</td>
              <td style={{ padding: "3px 6px", color: "#b0a890" }}>{item.effect}</td>
              <td style={{ padding: "3px 6px", color: "#f5c842", whiteSpace: "nowrap" }}>{item.pw}</td>
              <td style={{ padding: "3px 6px", color: "#aaa", whiteSpace: "nowrap" }}>{item.rch}</td>
              <td style={{ padding: "3px 6px", color: "#aaa" }}>{item.stk}</td>
              <td style={{ padding: "3px 6px", color: "#888", whiteSpace: "nowrap" }}>{item.type}</td>
              <td style={{ padding: "3px 6px", color: "#aaa" }}>{item.qty}</td>
              <td style={{ padding: "3px 6px", color: "#aaa" }}>{item.wgt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StratagemRow({ s }) {
  return (
    <div style={{ background: "#23252b", borderRadius: "4px", padding: "5px 9px", marginBottom: "4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "2px" }}>
        <span style={{ color: "#e8e0cc", fontWeight: 700, fontSize: "0.79rem" }}>{s.name}</span>
        <Badge label={s.type} color={TAG[s.type] || "#555"} />
      </div>
      <p style={{ color: "#999", fontSize: "0.75rem", margin: 0 }}>{s.effect}</p>
    </div>
  );
}

// ============================================================
// UNIT BODY — shared between RosterCard and ArmyEntry
// ============================================================
function UnitBody({ unit }) {
  return (
    <div>
      <StatGrid stats={unit.stats} />

      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "8px" }}>
        {unit.classes.map(c => <Badge key={c} label={c} color={TAG.Class} />)}
        <Badge label={`Size: ${unit.size}`} color="#333" />
      </div>

      {unit.classes.length > 0 && (
        <>
          <SectionLabel>Classes</SectionLabel>
          {unit.classes.map(c => (
            <DefBlock key={c} name={c} def={CLASS_DEFS[c] ? { tag: "Class", text: CLASS_DEFS[c] } : null} />
          ))}
        </>
      )}

      {unit.traits?.length > 0 && (
        <>
          <SectionLabel>Traits</SectionLabel>
          {unit.traits.map(t => <DefBlock key={t} name={t} def={getDef(t)} />)}
        </>
      )}

      {unit.skills?.length > 0 && (
        <>
          <SectionLabel>Skills</SectionLabel>
          {unit.skills.map(s => <DefBlock key={s} name={s} def={getDef(s)} />)}
        </>
      )}

      {unit.combatArts?.length > 0 && (
        <>
          <SectionLabel>Combat Arts</SectionLabel>
          {unit.combatArts.map(s => <SpellcraftBlock key={s} name={s} />)}
        </>
      )}

      {unit.spellcrafts?.length > 0 && (
        <>
          <SectionLabel>Spellcrafts</SectionLabel>
          {unit.spellcrafts.map(s => <SpellcraftBlock key={s} name={s} />)}
        </>
      )}

      {unit.special && (
        <>
          <SectionLabel>Special</SectionLabel>
          <div style={{
            background: "#23252b", border: "1px solid #383b42",
            borderRadius: "4px", padding: "7px 11px", marginBottom: "5px",
          }}>
            <p style={{ color: "#b8b0a0", fontSize: "0.77rem", margin: 0 }}>{unit.special}</p>
          </div>
        </>
      )}

      {unit.inventory?.length > 0 && (
        <>
          <SectionLabel>Inventory</SectionLabel>
          <InventoryTable items={unit.inventory} />
        </>
      )}

      {unit.stratagems?.length > 0 && (
        <>
          <SectionLabel>Stratagems</SectionLabel>
          {unit.stratagems.map(s => <StratagemRow key={s.name} s={s} />)}
        </>
      )}
    </div>
  );
}

// ============================================================
// ROSTER CARD — collapsible, shown in the Roster tab
// ============================================================
function RosterCard({ unit, factionColor, count, onAdd }) {
  const [open, setOpen] = useState(false);
  const maxed = count >= unit.limit;

  return (
    <div style={{
      background: "#1e2028", border: `1px solid ${factionColor}44`,
      borderRadius: "8px", marginBottom: "8px", overflow: "hidden",
    }}>
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 13px", cursor: "pointer",
          background: open ? "#23252b" : "#1e2028",
          borderBottom: open ? `1px solid ${factionColor}33` : "none",
        }}
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <div style={{ color: "#e8e0cc", fontWeight: 700, fontSize: "0.93rem" }}>{unit.name}</div>
          <div style={{ color: "#777", fontSize: "0.7rem", marginTop: "1px" }}>
            {unit.classes.join(" · ")} · {unit.size} · {unit.cost} pts · Limit {unit.limit}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#666", fontSize: "0.75rem" }}>{open ? "▲" : "▼"}</span>
          <button
            onClick={e => { e.stopPropagation(); onAdd(unit); }}
            disabled={maxed}
            style={{
              background: maxed ? "#2a2c34" : factionColor,
              color: maxed ? "#555" : "#fff",
              border: "none", borderRadius: "5px",
              padding: "4px 11px", cursor: maxed ? "not-allowed" : "pointer",
              fontWeight: 700, fontSize: "0.78rem",
            }}
          >
            {maxed ? `${count}/${unit.limit}` : `+ Add${count ? ` (${count}/${unit.limit})` : ""}`}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ padding: "10px 13px" }}>
          <UnitBody unit={unit} />
        </div>
      )}
    </div>
  );
}

// ============================================================
// ARMY ENTRY — always expanded, shown in the Armee tab
// ============================================================
function ArmyEntry({ entry, idx, onRemove }) {
  const faction = ALL_FACTIONS.find(f => f.id === entry.factionId);
  const color = faction?.color ?? "#888";

  return (
    <div style={{
      background: "#1e2028", border: `2px solid ${color}55`,
      borderRadius: "10px", marginBottom: "14px", overflow: "hidden",
    }}>
      <div style={{
        background: color + "22", borderBottom: `1px solid ${color}44`,
        padding: "9px 13px", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={{ color: color, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {entry.factionName}
          </div>
          <div style={{ color: "#e8e0cc", fontWeight: 700, fontSize: "1rem" }}>{entry.unit.name}</div>
          <div style={{ color: "#777", fontSize: "0.7rem" }}>
            {entry.unit.classes.join(" · ")} · {entry.unit.size} · {entry.unit.cost} pts
          </div>
        </div>
        <button
          onClick={() => onRemove(idx)}
          style={{
            background: "#3a2020", border: "1px solid #6a3030",
            color: "#cc6666", borderRadius: "5px",
            padding: "4px 10px", cursor: "pointer", fontSize: "0.78rem", flexShrink: 0,
          }}
        >
          ✕ Remove
        </button>
      </div>
      <div style={{ padding: "10px 13px" }}>
        <UnitBody unit={entry.unit} />
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function ArmyBuilder() {
  const [army, setArmy] = useState([]);
  const [tab, setTab] = useState("roster");
  const [factionFilter, setFactionFilter] = useState(null);
  const [armyName, setArmyName] = useState("Meine Armee");
  const [pointLimit, setPointLimit] = useState(100);

  const totalCost = getTotalCost(army);
  const overLimit = totalCost > pointLimit;

  const counts = army.reduce((acc, e) => {
    acc[e.unit.id] = (acc[e.unit.id] || 0) + 1;
    return acc;
  }, {});

  const addUnit = useCallback((unit, faction) => {
    if ((counts[unit.id] || 0) >= unit.limit) return;
    setArmy(prev => [...prev, { unit, factionId: faction.id, factionName: faction.name }]);
  }, [counts]);

  const removeUnit = useCallback((idx) => {
    setArmy(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const visibleFactions = factionFilter
    ? ALL_FACTIONS.filter(f => f.id === factionFilter)
    : ALL_FACTIONS;

  const totalUnits = ALL_FACTIONS.reduce((s, f) => s + f.units.length, 0);

  return (
    <div style={{
      background: "#14161c", minHeight: "100vh",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e0d8c8", display: "flex", flexDirection: "column",
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: "#1a1c24", borderBottom: "1px solid #2a2c34",
        padding: "10px 18px", display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "8px",
            background: "linear-gradient(135deg, #c8a44a, #7c5c2a)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
          }}>⚔</div>
          <div>
            <div style={{ fontSize: "0.6rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Eldfall Chronicles
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e8e0cc" }}>Army Builder</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <input
            value={armyName}
            onChange={e => setArmyName(e.target.value)}
            style={{
              background: "#23252b", border: "1px solid #383b42",
              borderRadius: "5px", padding: "5px 9px",
              color: "#e8e0cc", fontSize: "0.83rem", width: "150px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#777", fontSize: "0.78rem" }}>Limit:</span>
            <input
              type="number"
              value={pointLimit}
              onChange={e => setPointLimit(Number(e.target.value))}
              style={{
                background: "#23252b", border: "1px solid #383b42",
                borderRadius: "5px", padding: "5px 7px",
                color: "#e8e0cc", fontSize: "0.83rem", width: "65px",
              }}
            />
            <span style={{ color: "#777", fontSize: "0.78rem" }}>pts</span>
          </div>
          <div style={{
            padding: "5px 13px", borderRadius: "6px",
            background: overLimit ? "#5a2020" : "#1e3a1e",
            border: `1px solid ${overLimit ? "#884444" : "#448844"}`,
            color: overLimit ? "#cc6666" : "#66cc66",
            fontWeight: 700, fontSize: "0.88rem",
          }}>
            {totalCost} / {pointLimit} pts
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", background: "#1a1c24", borderBottom: "1px solid #2a2c34" }}>
        {[["roster", `Roster (${totalUnits})`], ["army", `Armee (${army.length})`]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              background: tab === key ? "#23252b" : "transparent",
              border: "none",
              borderBottom: tab === key ? "2px solid #c8a44a" : "2px solid transparent",
              color: tab === key ? "#e8e0cc" : "#777",
              padding: "9px 18px", cursor: "pointer",
              fontSize: "0.83rem", fontWeight: tab === key ? 700 : 400,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>

        {/* ROSTER TAB */}
        {tab === "roster" && (
          <>
            {/* Faction filter */}
            <div style={{ display: "flex", gap: "7px", marginBottom: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => setFactionFilter(null)}
                style={{
                  background: !factionFilter ? "#c8a44a" : "#23252b",
                  border: `1px solid ${!factionFilter ? "#c8a44a" : "#383b42"}`,
                  color: !factionFilter ? "#14161c" : "#aaa",
                  borderRadius: "6px", padding: "4px 13px",
                  cursor: "pointer", fontWeight: 700, fontSize: "0.78rem",
                }}
              >
                Alle
              </button>
              {ALL_FACTIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFactionFilter(f.id === factionFilter ? null : f.id)}
                  style={{
                    background: factionFilter === f.id ? f.color : "#23252b",
                    border: `1px solid ${factionFilter === f.id ? f.color : "#383b42"}`,
                    color: factionFilter === f.id ? "#14161c" : "#aaa",
                    borderRadius: "6px", padding: "4px 13px",
                    cursor: "pointer", fontWeight: 700, fontSize: "0.78rem",
                  }}
                >
                  {f.icon} {f.name}
                </button>
              ))}
            </div>

            {/* Faction sections */}
            {visibleFactions.map(faction => (
              <div key={faction.id} style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "9px",
                  marginBottom: "9px", paddingBottom: "5px",
                  borderBottom: `2px solid ${faction.color}66`,
                }}>
                  <span style={{ fontSize: "1.1rem" }}>{faction.icon}</span>
                  <h2 style={{ margin: 0, color: faction.color, fontSize: "0.95rem", letterSpacing: "0.05em" }}>
                    {faction.name}
                  </h2>
                  <span style={{ color: "#555", fontSize: "0.72rem" }}>{faction.units.length} Units</span>
                </div>
                {faction.units.map(unit => (
                  <RosterCard
                    key={unit.id}
                    unit={unit}
                    factionColor={faction.color}
                    count={counts[unit.id] || 0}
                    onAdd={u => addUnit(u, faction)}
                  />
                ))}
              </div>
            ))}
          </>
        )}

        {/* ARMY TAB */}
        {tab === "army" && (
          army.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#555" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "14px" }}>⚔</div>
              <div style={{ fontSize: "1rem", marginBottom: "6px" }}>Deine Armee ist noch leer</div>
              <div style={{ fontSize: "0.82rem" }}>Wechsle zum Roster-Tab und füge Units hinzu</div>
            </div>
          ) : (
            <>
              {/* Army summary */}
              <div style={{
                background: "#1a1c24", borderRadius: "8px",
                padding: "10px 14px", marginBottom: "14px", border: "1px solid #2a2c34",
              }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e8e0cc", marginBottom: "4px" }}>
                  {armyName}
                </div>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <span style={{ color: "#777", fontSize: "0.78rem" }}>{army.length} Modelle</span>
                  <span style={{
                    color: overLimit ? "#cc6666" : "#66cc66",
                    fontWeight: 700, fontSize: "0.78rem",
                  }}>
                    {totalCost} / {pointLimit} pts {overLimit ? "⚠ Überlimit!" : "✓"}
                  </span>
                  <span style={{ color: "#777", fontSize: "0.78rem" }}>
                    {[...new Set(army.map(e => e.factionName))].join(" + ")}
                  </span>
                </div>
              </div>

              {army.map((entry, idx) => (
                <ArmyEntry key={idx} entry={entry} idx={idx} onRemove={removeUnit} />
              ))}
            </>
          )
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: "#1a1c24", borderTop: "1px solid #2a2c34",
        padding: "5px 18px", fontSize: "0.68rem", color: "#444", textAlign: "center",
      }}>
        Eldfall Chronicles Army Builder · Aug 2026 · Inoffizielle Fan-Anwendung · alle Spielinhalte © Firestorm Studio
      </div>
    </div>
  );
}
