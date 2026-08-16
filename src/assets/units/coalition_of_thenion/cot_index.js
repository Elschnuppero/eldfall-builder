import bladebrethrenElite from "./bladebrethren_elite.json";
import nightTemplePriestess from "./night_temple_priestess.json";
import nightshade from "./nightshade.json";
import rangersGuildHunter from "./rangers_guild_hunter.json";
import tharosOneEyedWolf from "./tharos_one_eyed_wolf.json";
import hiredBlade from "./hired_blade.json";
import lupusRex from "./lupus_rex.json";
import thenrinSwashbuckler from "./thenrin_swashbuckler.json";
import slayerDragoon from "./slayer_dragoon.json";
import spellcrafts from "./spellcrafts.json";

export const COALITION_OF_THENION_UNITS = [
  bladebrethrenElite,
  nightTemplePriestess,
  nightshade,
  rangersGuildHunter,
  tharosOneEyedWolf,
  hiredBlade,
  lupusRex,
  thenrinSwashbuckler,
  slayerDragoon,
];

export const COALITION_OF_THENION_SPELLCRAFTS = spellcrafts;

export const COALITION_OF_THENION_FACTION = {
  id: "coalition_of_thenion",
  name: "Coalition of Thenion",
  color: "#4a7c59",
  icon: "🗡️",
  units: COALITION_OF_THENION_UNITS,
  spellcrafts: COALITION_OF_THENION_SPELLCRAFTS,
};
