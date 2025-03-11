export interface Modifier {}

export interface Item {
  name: string; // unique/set name or "normal/superior/magic/rare/crafted slot"
  baseName: string;
  //   sockets: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  //   corrupted: boolean;
  //   corruptedModifier?: Modifier;
  //   ethereal?: boolean;
  modifiers: Modifier[];
}
