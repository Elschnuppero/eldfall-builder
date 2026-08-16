import academyExpeditioner from "./academy_expeditioner.json";
import farisOutrider from "./faris_outrider.json";
import naraVeilWatcher from "./nara_veil_watcher.json";
import spelldancerAeroturge from "./spelldancer_aeroturge.json";
import spelldancerVoidcaster from "./spelldancer_voidcaster.json";
import vizierOfConjurations from "./vizier_of_conjurations.json";
import taskmageExplorer from "./taskmage_explorer.json";
import spellcrafts from "./spellcrafts.json";

export const SAND_KINGDOMS_UNITS = [
  academyExpeditioner,
  farisOutrider,
  naraVeilWatcher,
  spelldancerAeroturge,
  spelldancerVoidcaster,
  vizierOfConjurations,
  taskmageExplorer,
];

export const SAND_KINGDOMS_SPELLCRAFTS = spellcrafts;

export const SAND_KINGDOMS_FACTION = {
  id: "sand_kingdoms",
  name: "Sand Kingdoms",
  color: "#c8874a",
  icon: "🏜️",
  units: SAND_KINGDOMS_UNITS,
  spellcrafts: SAND_KINGDOMS_SPELLCRAFTS,
};
