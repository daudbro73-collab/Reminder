import { category, rule } from './helpers.js';

export const MAKHARIJ_CATEGORY = category(
  'makharij',
  '#2e7d32',
  ['Махаридж — точки выхода (١٧)', 'Makharij — 17 Exit Points', 'مخارج الحروف (١٧)', 'Makharij — 17 puntos'],
  [
    rule(
      'jauf',
      ['Аль-джауф (полость рта)', 'Al-Jauf (Oral Cavity)', 'الجوف', 'Al-jauf'],
      [
        'Полость рта — махрадж для букв мадда при удлинении: ا (с фатхой), و (с даммой), ي (с касрой). Звук идёт из глубины полости без касания языка нёбом.',
        'Oral cavity — makhraj for madd letters when prolonged: alif, waw, ya with their harakat.',
        'الجوف: مخرج حروف المد الثلاثة عند المد.',
        'Cavidad oral — madd letters.',
      ],
      'قَالَ — الجوف'
    ),
    rule(
      'halq_ahsa',
      ['Хальк — ахса (крайний)', 'Halq — Ahsa (deepest)', 'أقصى الحلق', 'Halq — más profundo'],
      [
        'Крайняя гортань: ء (хамза) и ه (ха). Самые глубокие точки выхода.',
        'Deepest throat: hamza and ha. The deepest articulation points.',
        'أقصى الحلق: الهمزة والهاء.',
        'Garganta más profunda: hamza y ha.',
      ],
      'أَ — هَـ'
    ),
    rule(
      'halq_wasat',
      ['Хальк — васат (средний)', 'Halq — Wasat (middle)', 'وسط الحلق', 'Halq — medio'],
      [
        'Средняя гортань: ع (айн) и ح (ха). Звук гортанный, ع — джahr, ح — хамс.',
        'Middle throat: ayn and ha. Ayn is jahr, ha is hams.',
        'وسط الحلق: العين والحاء.',
        'Garganta media: ayn y ha.',
      ],
      'عَ — حَـ'
    ),
    rule(
      'halq_adna',
      ['Хальк — адна (ближний)', 'Halq — Adna (nearest)', 'أدنى الحلق', 'Halq — inferior'],
      [
        'Нижняя гортань: غ (гайн) и خ (хот). غ — джahr тяжёлая, خ — хамс тяжёлая.',
        'Lower throat: ghayn and kha. Ghayn jahr heavy, kha hams heavy.',
        'أدنى الحلق: الغين والخاء.',
        'Garganta inferior: ghayn y kha.',
      ],
      'غَ — خَـ'
    ),
    rule(
      'lisan_aqsal',
      ['Язык — аксаль (корень)', 'Tongue — Aqsal (root)', 'أقصى اللسان', 'Lengua — raíz'],
      [
        'Корень языка касается мягкого нёба: ق (кaf тяжёлый) и ك (kaf лёгкий). ق глубже и тяжелее.',
        'Tongue root touches soft palate: qaf (heavy) and kaf (light). Qaf is deeper.',
        'أقصى اللسان: القاف والكاف.',
        'Raíz de la lengua: qaf y kaf.',
      ],
      'قَ — كَـ'
    ),
    rule(
      'lisan_wasat',
      ['Язык — васат (середина)', 'Tongue — Wasat (middle)', 'وسط اللسان', 'Lengua — centro'],
      [
        'Середина языка касается твёрдого нёба: ج (джим) и ش (шин) и ي (йа, когда не мадд).',
        'Middle of tongue on hard palate: jeem, sheen, and ya (when not madd).',
        'وسط اللسان: الجيم والشين والياء.',
        'Centro: jeem, sheen, ya.',
      ],
      'جَ — شَـ — يَـ'
    ),
    rule(
      'lisan_hafat',
      ['Язык — хафат (бок)', 'Tongue — Hafat (side)', 'حافة اللسان', 'Lengua — lateral'],
      [
        'Боковая часть языка прижимается к верхним коренным зубам: ض (дад) — уникальный звук, ص (сод) — тяжёлая.',
        'Side of tongue on upper molars: dad (unique) and sad (heavy).',
        'حافة اللسان: الضاد والصاد.',
        'Lado de la lengua: dad y sad.',
      ],
      'ضَ — صَـ'
    ),
    rule(
      'lisan_taraf_thana',
      ['Язык — кончик у резцов', 'Tongue — Tip at Teeth', 'طرف اللسان مع الثنايا', 'Lengua — punta en dientes'],
      [
        'Кончик языка у верхних резцов: ت ث د ذ ط ظ ل ن ر ز س. Различаются по положению (между зубами, на краю, с нажатием).',
        'Tongue tip at upper teeth: ta, tha, dal, dhal, heavy ta/dha, lam, noon, ra, zay, sin.',
        'طرف اللسان: التاء والدال والراء والنون وغيرها.',
        'Punta de la lengua: ta, dal, ra, noon, etc.',
      ],
      'تَ — دَ — رَ — نَ'
    ),
    rule(
      'shafatain',
      ['Аш-шафатайн (губы)', 'Ash-Shafatain (Lips)', 'الشفتان', 'Labios'],
      [
        'Обе губы: ب (ба) и م (мим) — полное смыкание. و (вау) — округление губ (не полное смыкание как у м).',
        'Both lips: ba and meem — full closure. Waw — lip rounding.',
        'الشفتان: الباء والميم والواو.',
        'Labios: ba, meem, waw.',
      ],
      'بَ — مَ — وَ'
    ),
    rule(
      'khishum',
      ['Аль-хишум (носовая полость)', 'Al-Khishum (Nasal Cavity)', 'الخيشوم', 'Cavidad nasal'],
      [
        'Носовая полость — место выхода гунны (носового звука) при ن и م с шаддой, а также в идгаме, иклябе и ихфа.',
        'Nasal cavity — where ghunnah resonates for shaddah noon/meem and in idgham, iqlab, ikhfa.',
        'الخيشوم: مخرج الغنة.',
        'Cavidad nasal — ghunnah.',
      ],
      'إِنَّ — غُنَّة من الخيشوم'
    ),
    rule(
      'makharij_summary',
      ['Запоминание: ٥ مناطق', 'Summary: 5 Areas', 'خمسة مخارج', 'Resumen: 5 áreas'],
      [
        'Пять основных областей: ١) аль-джауф ٢) аль-хальк (٣ уровня) ٣) аль-лисан (٨ положений) ٤) аш-шафатайн ٥) аль-хишум. Всего ١٧ мخرجاً.',
        'Five areas: 1) jauf 2) halq (3 levels) 3) lisan (8 positions) 4) shafatain 5) khishum. Total 17 exits.',
        'الجوف والحلق واللسان والشفتان والخيشوم — سبعة عشر مخرجاً.',
        '5 áreas, 17 puntos en total.',
      ],
      'الْحُرُوفُ تَخْرُجُ مِنْ مَخَارِجَهَا'
    ),
  ]
);
