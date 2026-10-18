import { PRESETS } from '../constants/presets';

export function getPresetIcon(categoryId, presetId) {
  const preset = PRESETS[categoryId]?.find((p) => p.id === presetId);
  return preset?.icon ?? null;
}
