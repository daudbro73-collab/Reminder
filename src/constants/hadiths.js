// Доказательства для финансовых сунн (без фардов)

import { SUNNAH_EVIDENCE } from './sunnahEvidence.js';

const L = (ru, en, ar, es) => ({ ru, en, ar, es });
const T = (ru, en, es) => ({ ru, en, es });

export const FINANCIAL_EVIDENCE = {
  sadaqah: {
    ayah: {
      surah: 2,
      number: 261,
      textAr:
        'مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
      translation: T(
        '«Пример тех, кто расходует своё имущество на пути Аллаха, подобен зерну, из которого выросло семь колосьев, в каждом из которых по сто зёрен».',
        'The example of those who spend in the way of Allah is like a grain that grows seven ears, each with a hundred grains.',
        'El ejemplo de quienes gastan en el camino de Alá es como un grano que produce siete espigas con cien granos cada una.'
      ),
      reference: L(
        'Сура аль-Бакара, 2:261',
        'Surah Al-Baqarah, 2:261',
        'سورة البقرة، ٢٦١:٢',
        'Sura Al-Baqarah, 2:261'
      ),
    },
    hadiths: [
      {
        grade: 'Sahih',
        source: 'Sahih Muslim',
        number: '2588',
        narrator: L('Абу Хурайра', 'Abu Huraira', 'أبو هريرة', 'Abu Huraira'),
        isnad: L(
          'Абу Хурайра ← Пророк ﷺ (Муслим)',
          'Abu Huraira ← The Prophet ﷺ (narrated by Muslim)',
          'أبو هريرة ← النبي ﷺ (رواه مسلم)',
          'Abu Huraira ← El Profeta ﷺ (narrado por Muslim)'
        ),
        textAr: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ',
        translation: T(
          '«Садака не уменьшает имущество».',
          '"Charity does not decrease wealth."',
          '"La caridad no disminuye la riqueza."'
        ),
      },
      {
        grade: 'Sahih',
        source: 'Sahih al-Bukhari',
        number: '1413',
        narrator: L('Ади ибн Хатим', 'Adi ibn Hatim', 'عدي بن حاتم', 'Adi ibn Hatim'),
        isnad: L(
          'Ади ибн Хатим ← Пророк ﷺ (аль-Бухари)',
          'Adi ibn Hatim ← The Prophet ﷺ (narrated by al-Bukhari)',
          'عدي بن حاتم ← النبي ﷺ (رواه البخاري)',
          'Adi ibn Hatim ← El Profeta ﷺ (narrado por al-Bukhari)'
        ),
        textAr: 'اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ فَمَنْ لَمْ يَجِدْ فَبِكَلِمَةٍ طَيِّبَةٍ',
        translation: T(
          '«Оберегайтесь Огня хотя бы половинкой финика в садаке; а кто не найдёт — добрым словом».',
          '"Protect yourselves from the Fire even by giving half a date in charity; and if one cannot find that, then with a kind word."',
          '"Protegeos del Fuego aunque sea con media fecha en caridad; y quien no pueda, con una palabra bondadosa."'
        ),
      },
    ],
  },
};

export { SUNNAH_EVIDENCE };

export function getEvidenceForCategory(categoryId) {
  if (categoryId === 'spiritual') return SUNNAH_EVIDENCE;
  if (categoryId === 'financial') return FINANCIAL_EVIDENCE;
  return {};
}

export function getEvidenceIds(categoryId) {
  return Object.keys(getEvidenceForCategory(categoryId));
}
