const TRAIT_DEFS = {
  "Acute Senses":
    "This model may perform Perceive and Uncover Actions using AG instead of INT. Its Awareness increases by 3 inches. When Dodging without LoS, its AG is not halved.",
  "Advantage (Beast)":
    "Once per Activation Sequence, this model may reroll any number of dice (once) during an Attack Action against a target with the Beast characteristic.",
  "Advantage (Large, Huge, Colossal)":
    "Once per Activation Sequence, this model may reroll any number of dice (once) during an Attack Action against a target of Size Large, Huge, or Colossal.",
  "Advantage (Size: Large, Huge)":
    "Once per Activation Sequence, this model may reroll any number of dice (once) during an Attack Action against a target of Size Large or Huge.",
  "Affinity (Air, Elder)":       "This model can cast Air and Elder Spells.",
  "Affinity (Divine)":           "This model can cast Divine Spells.",
  "Affinity (Earth)":            "This model can cast Earth Spells.",
  "Affinity (Elder)":            "This model can cast Elder Spells.",
  "Affinity (Elder, Earth)":     "This model can cast Elder and Earth Spells.",
  "Affinity (Fire)":             "This model can cast Fire Spells.",
  "Affinity (Fire, Water)":      "This model can cast Fire and Water Spells.",
  "Affinity (Fire, Profane)":    "This model can cast Fire and Profane Spells.",
  "Affinity (Profane)":          "This model can cast Profane Spells.",
  "Armor-Piercing":
    "When making a DMG roll for a Hit with this Trait, subtract only half the target's ARM value.",
  "Bleed":
    "If a model suffers at least one Wound with this Trait, it enters Bleeding (State).",
  "Cleave":
    "If a model suffers at least one Wound with this Trait, it automatically suffers another Wound.",
  "Demon":
    "When this model deals a Wound, the target must perform an M roll. On fail, it becomes Panicked until the end of the turn. On a Critical Hit, the target automatically becomes Panicked. This model's Attack gains +4 modifier against Panicked targets. Does not affect models with the Demon Trait.",
  "Duelist":
    "The target of this model's Attack cannot use Combat Arts of level III or lower.",
  "Fearless":
    "This model cannot become Panicked (State).",
  "Inspiring":
    "Other allied models within this model's Awareness and with the same Affiliation gain +6 M.",
  "Resistance (Sorcery, Enchantment) II":
    "Hits and effects from an Attack with the Sorcery or Enchantment Type against this model are negated.",
  "Resistance (Spells, Profane) I":
    "The Power of a Hit dealt to this model by an Attack with the Spells or Profane Type is halved.",
  "Resourceful I":   "This model may receive 1 additional Upgrade.",
  "Resourceful II":  "This model may receive 2 additional Upgrades.",
  "Spellbound (Life Leech)":
    "This model or Item is permanently enchanted by the Life Leech Enchantment Spell for the entire game.",
  "Stagger":
    "A model that suffers a Hit with this Trait loses 1 Activation Point (until the end of the turn). Does not affect models two or more Sizes larger than the attacker.",
  "Strategist":
    "This model can use two Stratagems of different names in its Strategic Phase.",
  "Survival (Difficult, Forest)":  "This model is unaffected by Difficult and Forest Environments.",
  "Survival (Difficult, Hazy)":    "This model is unaffected by Difficult and Hazy Environments.",
  "Survival (Forest, Difficult)":  "This model is unaffected by Forest and Difficult Environments.",
  "Survival (Scorching)":          "This model is unaffected by the Scorching Environment.",
  "Survival (Scorching, Dark)":    "This model is unaffected by Scorching and Dark Environments.",
  "Tactician":
    "The Deployment Zone of the party in which this model is present is extended for 5 inches (towards the middle of the field).",
  "Throwing":
    "An Item with this Trait enables a Ranged Attack with RCH equal to the user's T. STK can be up to the Item's QTY. Upon use, remove QTY equal to the STK, even if the Attack is unsuccessful.",
  "Two-Handed":
    "A Weapon with this Trait cannot be used with an equipped Shield or another Weapon.",
  "Unwieldy":
    "When used by a Size: Medium or smaller model, STK can never exceed 1. When performing an Attack with this item while not Mounted, the model may re-roll 1 Attack roll once.",
  "Vigilance":
    "This model is immune to the Surprise Attack Trait, has a 360° Front arc, and no Back arc.",
  "Watchful":
    "This model receives double AP in its Reactive Role.",
};

export default TRAIT_DEFS;
