const SKILL_DEFS = {
  "Charm I":
    "When an enemy model declares Reaction against this model, it must first perform an Intellect roll. If it fails, it may not declare any Normal Action other than Nothing until the end of the Activation Sequence.",
  "Charm II":
    "When an enemy model declares Reaction against this model, it must first perform an Intellect roll. If it fails, it may not declare any Normal Action other than Nothing until end of the Activation Sequence. On a failed roll, the enemy model must also perform Walk towards the user for its entire Speed value (if able).",
  "Clairvoyance":
    "In the Reactive Role, this model may declare a Reaction using Casting Aura Spells to target enemy models within its Awareness without requiring LoS. It ignores LoS restrictions caused by Environments, the Blinded State, and the Surprise Attack Trait. In the Active Role, it does not suffer halving modifiers when casting Spells without LoS.",
  "Chain Attack":
    "Once per Activation Sequence, if an allied model scores a Hit against an enemy within this model's LoS, this model may perform an unmodified STK 1 Attack against that enemy (before DMG rolls). Not an Activation or Reaction, does not consume AP. Ignores Ranged Friendly Fire. Hits from Chain Attack cannot generate further Chain Attacks.",
  "Climbing":
    "This model can perform the Climb Special Movement as if it were a Normal Movement, ignoring restrictions against other Actions while on a vertical surface. While performing Climb, SPD is not halved.",
  "Dash":
    "When this model performs a Run Special Movement, it may declare an unmodified Strike 1 Melee Attack in its Action Step.",
  "Dual-Wield":
    "This model can equip a 2nd Melee Weapon in place of a Shield. Both weapons must have RCH of 1 or less and must not have the Two-Handed trait. Allows the model to re-roll a single Melee Attack roll. The model must decide which weapon's PW and Strike values to apply. Effects of both Weapons may apply if applicable.",
  "Finishing Strike":
    "When this model causes at least one Wound to a target, it may immediately make an unmodified STK 1 Attack against the same target using the same Item or Skill.",
  "Flicker":
    "When this model declares a Movement it may move through obstacles and other models in any direction (even vertically). Total distance measured in a straight line between start and end positions. Cannot end on another model or within an obstacle.",
  "Flight":
    "The user may enter or cancel the Flying state during its Movement step. Cannot be affected by Fall Damage. Cannot enter Flying State if in Engaged State.",
  "Follow Up":
    "If an enemy model disengages from this model, this model may move up to its halved Speed value towards the disengaged model.",
  "Foresight":
    "When this model becomes the target of an Attack in the Reactive Role and did not declare a Reaction during the Reaction Step, it may instead declare a Reaction during the Action Step, after the Active model has declared its Action.",
  "Hit and Retreat":
    "During its Movement step, this model may cancel the Engaged state without any roll required. If it declares an Attack in its Activation, it may perform Walk during the end of Resolution step.",
  "Impede":
    "When this model declares an Attack of Opportunity with a Melee Attack against a non-Engaged model, that model's Movement ends at the point of the Attack. The target also becomes Engaged immediately.",
  "Infiltration I":
    "During the Deployment Phase, you may deploy this model up to the middle line of the field (on your half).",
  "Infiltration II":
    "During the Deployment Phase, you may deploy this model anywhere outside of the opponent's Deployment Zone.",
  "Leap":
    "This model can perform the Jump Special Movement as if it were a Normal Movement. While performing Jump, its SPD is not halved.",
  "Protector":
    "When an allied model within 1/2 SPD distance is targeted in an Attack in this model's Reactive Role, this model can spend an Activation Point to move into Base Contact with the ally and become the new target of the Attack Action.",
  "Snipe":
    "STK of an Attack using this ability is 1, unmodifiable. This model ignores Cover and Ranged Friendly Fire.",
  "Stealth I":
    "When this model activates it does not provoke a Reaction from enemy models that do not have LoS to it, regardless of Awareness.",
  "Stealth II":
    "I: Does not provoke Reaction from models without LoS. II: May deploy in the Shrouded state. If no enemy has LoS, may re-enter Shrouded during Strategic Phase.",
  "Taunt":
    "When this model performs a Movement, it may force enemy models with LoS to this model or within whose awareness this model enters to perform an INT roll. Every enemy that fails needs to declare a Reaction.",
  "Tracking":
    "This model gains a +3 Modifier when performing Perceive and Uncover actions. Does not suffer INT penalty when performing Uncover. When performing Perceive, may re-roll a single roll.",
};

export default SKILL_DEFS;
