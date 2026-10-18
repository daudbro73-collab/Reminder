import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import PresetIcon from './icons/PresetIcon';

export default function AddTaskForm({ onSubmit, onClose }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title,
      category: 'spiritual',
      deadline: null,
      note,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('newReminder')}</h2>
          <button className="modal-close" onClick={onClose} aria-label={t('close')}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="title">{t('taskLabel')}</label>
            <div className="input-wrap">
              <span className="input-icon">
                <PresetIcon name="book" size={18} />
              </span>
              <input
                id="title"
                type="text"
                className="input-with-icon"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('taskPlaceholder')}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note">{t('note')}</label>
            <textarea
              id="note"
              className="textarea-field"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('notePlaceholder')}
              rows={2}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={!title.trim()}>
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
