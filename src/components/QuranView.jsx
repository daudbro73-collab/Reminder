import { useLanguage } from '../i18n/LanguageContext';
import MushafReader from './MushafReader';
import EmojiIcon from './icons/EmojiIcon';

export default function QuranView() {
  const { t } = useLanguage();

  return (
    <div className="quran-view">
      <header className="quran-header">
        <EmojiIcon name="quran" size={32} />
        <div>
          <h2 className="quran-title">{t('quranTitle')}</h2>
        </div>
      </header>

      <MushafReader />
    </div>
  );
}
