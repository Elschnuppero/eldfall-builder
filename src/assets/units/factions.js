import { HELIAN_LEAGUE_FACTION, HELIAN_LEAGUE_SPELLCRAFTS }           from "./helian_league/index.js";
import { EMPIRE_OF_SOGA_FACTION, EMPIRE_OF_SOGA_SPELLCRAFTS }         from "./empire_of_soga/index.js";
import { COALITION_OF_THENION_FACTION, COALITION_OF_THENION_SPELLCRAFTS } from "./coalition_of_thenion/index.js";
import { SAND_KINGDOMS_FACTION, SAND_KINGDOMS_SPELLCRAFTS }            from "./sand_kingdoms/index.js";

// All factions in display order
export const ALL_FACTIONS = [
  HELIAN_LEAGUE_FACTION,
  EMPIRE_OF_SOGA_FACTION,
  COALITION_OF_THENION_FACTION,
  SAND_KINGDOMS_FACTION,
];

// Merged spellcraft lookup — later factions override earlier ones on key collision,
// but in practice each spellcraft key is unique across factions.
export const ALL_SPELLCRAFTS = {
  ...HELIAN_LEAGUE_SPELLCRAFTS,
  ...EMPIRE_OF_SOGA_SPELLCRAFTS,
  ...COALITION_OF_THENION_SPELLCRAFTS,
  ...SAND_KINGDOMS_SPELLCRAFTS,
};

export {
  HELIAN_LEAGUE_FACTION,
  EMPIRE_OF_SOGA_FACTION,
  COALITION_OF_THENION_FACTION,
  SAND_KINGDOMS_FACTION,
};
