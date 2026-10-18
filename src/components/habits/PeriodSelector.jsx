import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PERIOD_OPTIONS } from '../../utils/habitProgress';

export default function PeriodSelector({ value, customDays, onChange, onCustomChange }) {
  const { t } = useLanguage();
  const [showCustom, setShowCustom] = useState(value === 'custom');

  const handleSelect = (period) => {
    if (period === 'custom') {
      setShowCustom(true);
      onChange('custom');
    } else {
      setShowCustom(false);
      onChange(String(period));
    }
  };

  return (
    <div className="period-selector">
      <span className="period-label">{t('progressPeriod')}</span>
      <div className="period-options">
        {PERIOD_OPTIONS.map((days) => (
          <button
            key={days}
            type="button"
            className={`period-btn ${value === String(days) ? 'active' : ''}`}
            onClick={() => handleSelect(days)}
          >
            {t('periodDays', { days })}
          </button>
        ))}
        <button
          type="button"
          className={`period-btn ${value === 'custom' ? 'active' : ''}`}
          onClick={() => handleSelect('custom')}
        >
          {t('periodCustom')}
        </button>
      </div>
      {showCustom && (
        <div className="period-custom-input">
          <input
            type="number"
            min="1"
            max="999"
            value={customDays || ''}
            onChange={(e) => onCustomChange(Number(e.target.value) || 1)}
            placeholder={t('periodCustomPlaceholder')}
          />
          <span className="period-custom-suffix">{t('days')}</span>
        </div>
      )}
    </div>
  );
}
