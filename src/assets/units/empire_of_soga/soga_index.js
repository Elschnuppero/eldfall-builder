import bushiAttendant from "./bushi_attendant.json";
import clanChampion from "./clan_champion.json";
import greatGuard from "./great_guard.json";
import kitsuneSpellmaiden from "./kitsune_spellmaiden.json";
import mushaBowmaster from "./musha_bowmaster.json";
import seigenOfTheKeshobarai from "./seigen_of_the_keshobarai.json";
import mushaBlademaster from "./musha_blademaster.json";
import onitaoshi from "./onitaoshi.json";
import scholarOfTheTrueWord from "./scholar_of_the_true_word.json";
import spellcrafts from "./spellcrafts.json";

export const EMPIRE_OF_SOGA_UNITS = [
  bushiAttendant,
  clanChampion,
  greatGuard,
  kitsuneSpellmaiden,
  mushaBowmaster,
  seigenOfTheKeshobarai,
  mushaBlademaster,
  onitaoshi,
  scholarOfTheTrueWord,
];

export const EMPIRE_OF_SOGA_SPELLCRAFTS = spellcrafts;

export const EMPIRE_OF_SOGA_FACTION = {
  id: "empire_of_soga",
  name: "Empire of Soga",
  color: "#c04040",
  icon: "🏯",
  units: EMPIRE_OF_SOGA_UNITS,
  spellcrafts: EMPIRE_OF_SOGA_SPELLCRAFTS,
};
