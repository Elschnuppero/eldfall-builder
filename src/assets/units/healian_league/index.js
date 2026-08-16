import anariEruditeProdigy from "./anari_erudite_prodigy.json";
import citadelGuard from "./citadel_guard.json";
import expeditionaryHierophant from "./expeditionary_hierophant.json";
import flameshaper from "./flameshaper.json";
import flameweaverErrant from "./flameweaver_errant.json";
import flameweaverNoble from "./flameweaver_noble.json";
import paladinOfTheOrder from "./paladin_of_the_order.json";
import eonianRunner from "./eonian_runner.json";
import helrinExpatriate from "./helrin_expatriate.json";
import spellcrafts from "./spellcrafts.json";

export const HELIAN_LEAGUE_UNITS = [
  anariEruditeProdigy,
  citadelGuard,
  expeditionaryHierophant,
  flameshaper,
  flameweaverErrant,
  flameweaverNoble,
  paladinOfTheOrder,
  eonianRunner,
  helrinExpatriate,
];

export const HELIAN_LEAGUE_SPELLCRAFTS = spellcrafts;

export const HELIAN_LEAGUE_FACTION = {
  id: "helian_league",
  name: "Helian League",
  color: "#c8a44a",
  icon: "⚔️",
  units: HELIAN_LEAGUE_UNITS,
  spellcrafts: HELIAN_LEAGUE_SPELLCRAFTS,
};
