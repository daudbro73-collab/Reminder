import { useLanguage } from '../i18n/LanguageContext';
import { PRESETS } from '../constants/presets';
import { getCategoryProgress } from '../hooks/useTasks';
import PresetIcon from './icons/PresetIcon';
import CategoryIcon from './icons/CategoryIcon';
import HadithSection from './HadithSection';
import CollapsibleSection from './CollapsibleSection';

export default function PresetTasks({ categoryId, tasks, onAdd }) {
  const { t, getCategory } = useLanguage();
  const presets = PRESETS[categoryId] || [];
  const cat = getCategory(categoryId);

  const existingPresetIds = new Set(
    tasks.filter((task) => task.category === categoryId && task.presetId).map((task) => task.presetId)
  );

  const available = presets.filter((p) => !existingPresetIds.has(p.id));
  const hasHadiths = categoryId === 'spiritual' || categoryId === 'financial';
  const { completed, total, percent } = getCategoryProgress(tasks, categoryId);

  if (available.length === 0 && !hasHadiths) return null;

  const title = cat.label;

  const badge = [
    total > 0 ? `${completed}/${total}` : null,
    available.length > 0 ? `+${available.length}` : null,
    total > 0 ? `${percent}%` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <CollapsibleSection
      title={title}
      icon={<CategoryIcon name={categoryId} size={20} />}
      badge={badge || null}
      defaultOpen={false}
      className="preset-collapsible"
    >
      {available.length > 0 && (
        <div className="preset-section preset-section-nested">
          <div className="preset-grid preset-grid-scroll">
            {available.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-card"
                onClick={() =>
                  onAdd({
                    title: t(`presets.${categoryId}.${preset.id}`),
                    category: categoryId,
                    presetId: preset.id,
                    deadline: '',
                    note: '',
                  })
                }
              >
                <span className="preset-card-icon-wrap">
                  <PresetIcon name={preset.icon} size={24} />
                </span>
                <span className="preset-card-label">
                  {t(`presets.${categoryId}.${preset.id}`)}
                </span>
                <span className="preset-card-add">+</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <HadithSection categoryId={categoryId} />
    </CollapsibleSection>
  );
}
