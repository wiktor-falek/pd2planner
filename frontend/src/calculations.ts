export function calculateQuestSkillPoints(characterLevel: number) {
  let points = 0;

  // Normal
  if (characterLevel >= 2) points += 1; // Den
  if (characterLevel >= 14) points += 1; // Radament
  if (characterLevel >= 26) points += 2; // Izual

  // Nightmare
  if (characterLevel >= 36) points += 1; // Den
  if (characterLevel >= 42) points += 1; // Radament
  if (characterLevel >= 54) points += 2; // Izual

  // Hell
  if (characterLevel >= 60) points += 1; // Den
  if (characterLevel >= 62) points += 1; // Radament
  if (characterLevel >= 64) points += 2; // Izual

  return points;
}

export function calculateQuestAttributePoints(characterLevel: number) {
  let attributes = 0;

  if (characterLevel >= 24) attributes += 5;
  if (characterLevel >= 52) attributes += 5;
  if (characterLevel >= 64) attributes += 5;

  return attributes;
}
