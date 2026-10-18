import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PERIOD_OPTIONS } from '../../utils/habitProgress';
import HabitIcon from '../icons/HabitIcon';

export default function AddHabitForm({ onSubmit, onClose, defaultPeriod = '30' }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [periodType, setPeriodType] = useState(defaultPeriod);
  const [customPeriodDays, setCustomPeriodDays] = useState(60);
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields((prev) => [...prev, { id: crypto.randomUUID(), label: '', value: '' }]);
  };

  const updateField = (id, key, val) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: val } : f)));
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title,
      note,
      fields: fields.filter((f) => f.label.trim() || f.value.trim()),
      periodType,
      customPeriodDays: periodType === 'custom' ? customPeriodDays : null,
      periodDays: periodType === 'custom' ? customPeriodDays : Number(periodType),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal habit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('newHabit')}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label={t('close')}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="habit-title">{t('habitName')} *</label>
            <div className="input-wrap">
              <span className="input-icon"><HabitIcon name="shield" size={18} /></span>
              <input
                id="habit-title"
                type="text"
                className="input-with-icon"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('habitNamePlaceholder')}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('goalPeriod')}</label>
            <div className="period-options period-options-form">
              {PERIOD_OPTIONS.map((days) => (
                <button
                  key={days}
                  type="button"
                  className={`period-btn ${periodType === String(days) ? 'active' : ''}`}
                  onClick={() => setPeriodType(String(days))}
                >
                  {t('periodDays', { days })}
                </button>
              ))}
              <button
                type="button"
                className={`period-btn ${periodType === 'custom' ? 'active' : ''}`}
                onClick={() => setPeriodType('custom')}
              >
                {t('periodCustom')}
              </button>
            </div>
            {periodType === 'custom' && (
              <div className="period-custom-input">
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={customPeriodDays}
                  onChange={(e) => setCustomPeriodDays(Number(e.target.value) || 1)}
                />
                <span className="period-custom-suffix">{t('days')}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="custom-fields-header">
              <label>{t('customFields')}</label>
              <button type="button" className="add-field-btn" onClick={addField}>
                <HabitIcon name="field" size={14} />
                {t('addField')}
              </button>
            </div>
            {fields.length === 0 ? (
              <p className="custom-fields-hint">{t('customFieldsHint')}</p>
            ) : (
              <div className="custom-fields-list">
                {fields.map((field) => (
                  <div key={field.id} className="custom-field-row">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, 'label', e.target.value)}
                      placeholder={t('fieldLabelPlaceholder')}
                      className="custom-field-label"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateField(field.id, 'value', e.target.value)}
                      placeholder={t('fieldValuePlaceholder')}
                      className="custom-field-value"
                    />
                    <button type="button" className="remove-field-btn" onClick={() => removeField(field.id)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="habit-note">{t('note')}</label>
            <textarea
              id="habit-note"
              className="textarea-field"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('habitNotePlaceholder')}
              rows={2}
            />
          </div>

          <button type="submit" className="submit-btn habit-submit" disabled={!title.trim()}>
            {t('addHabit')}
          </button>
        </form>
      </div>
    </div>
  );
}
