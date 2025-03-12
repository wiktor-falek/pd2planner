export interface Modifier {}

export interface Item {
  name: string; // unique/set name or "normal/superior/magic/rare/crafted slot"
  baseName: string;
  requiredLevel: number;
  requiredStrength: number;
  requiredDexterity: number;
  //   sockets: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  //   corrupted: boolean;
  //   corruptedModifier?: Modifier;
  //   ethereal?: boolean;
  modifiers: Modifier[];
}

/*


Shako
Base Defense: 98-141
Base Durability: 12
Defense: 98-141
Required Strength: 50
Required Level: 62

+2 to All Skills
+2 to All Attributes
+[1-99] to Life (+1 per Character Level)
+[1-99] to Mana (+1 per Character Level)
Physical Damage Taken Reduced by [3-5]%
[25-50]% Better Chance of Getting Magic Items
*/
export const HarlequinCrest: Item = {
  name: "Harlequin Crest",
  baseName: "Shako",
  requiredLevel: 62,
  requiredStrength: 50,
  requiredDexterity: 0,
  modifiers: [],
};
