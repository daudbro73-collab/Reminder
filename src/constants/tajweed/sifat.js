import { category, rule } from './helpers.js';

export const SIFAT_CATEGORY = category(
  'sifat',
  '#6a1b9a',
  ['Сифат — свойства букв', 'Sifat — Letter Qualities', 'صفات الحروف', 'Sifat — cualidades'],
  [
    rule(
      'hams_jahr',
      ['Хамс и джahr', 'Hams & Jahr', 'الهمس والجهر', 'Hams y jahr'],
      [
        'Хамс (همس) — придыхание, слышно дыхание: ف ح ث هـ خ ت هـ. Джahr (جهر) — звонкий звук без придыхания: остальные буквы.',
        'Hams — breath audible (f, h, th, etc.). Jahr — voiced without audible breath.',
        'الهمس: يجري النفس. الجهر: يمنع خروج النفس مع الصوت.',
        'Hams con aliento; jahr sin aspiración.',
      ],
      'هَادٍ — هاء مهموسة / بَ — باء مجهورة'
    ),
    rule(
      'shiddah_tawassut_rakhawah',
      ['Шидда, тавассут, рахава', 'Shiddah, Tawassut, Rakhawah', 'الشدة والتوسط والرخاوة', 'Shiddah, tawassut, rakhawah'],
      [
        'Шидда (сила) — буква удерживается: ء. Тавассут (средняя) — между силой и мягкостью: ل ن ع م. Рахава (мягкость) — буква льётся: все остальные.',
        'Shiddah — held firmly (hamza). Tawassut — middle (lam, noon, ayn, meem). Rakhawah — flowing (rest).',
        'الشدة: انحباس الصوت. التوسط: بين الشدة والرخاوة. الرخاوة: جريان الصوت.',
        'Shiddah, intermedia, rakhawah.',
      ],
      'ءَ — شِدَّة / لَ — تَوَسُّط'
    ),
    rule(
      'istiqla_istifal',
      ['Исти\'ля и истифаль', 'Isti\'la & Istifal', 'الاستعلاء والاستفال', 'Isti\'la e istifal'],
      [
        'Исти\'ля (подъём) — язык поднимается к нёбу, звук тяжёлый: خ ص ض غ ط ق ظ. Истифаль (опущение) — звук лёгкий: остальные.',
        'Isti\'la — tongue rises, heavy sound (7 letters). Istifal — light sound (rest).',
        'الاستعلاء: ارتفاع اللسان. الاستفال: انخفاضه.',
        'Isti\'la pesado; istifal ligero.',
      ],
      'خُصَّ ضَغْطٍ قِظْ — استعلاء'
    ),
    rule(
      'itbaq_infitah',
      ['Итбак и инфитах', 'Itbaq & Infitah', 'الانطباق والانفتاح', 'Itbaq e infitah'],
      [
        'Итбак — плоскость языка распростёрта (ص ض ط ظ). Инфитах — язык вогнут (остальные). Влияет на полноту звука.',
        'Itbaq — tongue flat/spread (sad, dad, ta, dha). Infitah — tongue concave (others).',
        'الانطباق: استواء اللسان. الانفتاح: انحناؤه.',
        'Itbaq plano; infitah cóncavo.',
      ],
      'صَ — انطباق / تَ — انفتاح'
    ),
    rule(
      'idgham_shafawi_sifat',
      ['Идгам (слияние)', 'Idgham (Merging)', 'الإدغام', 'Idgham'],
      [
        'Сифат идгам — способность буквы сливаться с последующей. Полное слияние (камиль) или неполное (накис). Применяется в правилах нун, мим, лям шамсия.',
        'Sifat of merging — ability to blend with the next letter. Full (kamil) or partial (naqis).',
        'صفة الإدغام: اندغام الحرف في الذي يليه.',
        'Cualidad de fusión con la letra siguiente.',
      ],
      'مِنْ نُّ — إدغام'
    ),
    rule(
      'ithar_sifat',
      ['Исар (ясность)', 'Ithar (Clarity)', 'الإظهار', 'Izhar'],
      [
        'Сифат явного произношения — буква звучит полностью без слияния. Изхар халки, изхар шафави.',
        'Quality of clear pronunciation without merging. Izhar halqi, izhar shafawi.',
        'صفة الإظهار: بيان الحرف بلا إدغام.',
        'Pronunciación clara sin fusión.',
      ],
      'مِنْ عِلْمٍ — إظهار'
    ),
    rule(
      'qalqalah_sifat',
      ['Калькаля (эхо)', 'Qalqalah (Echo)', 'القلقلة', 'Qalqalah'],
      [
        'Вибрация при сукуне или остановке на: ق ط ب ج د. Сугра (в слове) и кубра (при вакф).',
        'Vibration with sukun or stop on: qaf, ta, ba, jeem, dal. Sughra and kubra.',
        'القلقلة: اهتزاز الحرف عند السكون أو الوقف.',
        'Vibración en qaf, ta, ba, jeem, dal.',
      ],
      'قُطْبُ جَدٍّ'
    ),
    rule(
      'ghunnah_sifat',
      ['Гунна (назализация)', 'Ghunnah', 'الغنة', 'Ghunnah'],
      [
        'Носовой звук из аль-хишум. Обязательна 2 счёта при شадде на ن/م, в идгаме с гунной, иклябе, ихфа.',
        'Nasal sound from khishum. Required 2 counts with shaddah on noon/meem, idgham, iqlab, ikhfa.',
        'الغنة: صوت أنفي من الخيشوم مقداره حركتان.',
        'Sonido nasal — 2 tiempos.',
      ],
      'إِنَّ — غنة'
    ),
    rule(
      'leen_sifat',
      ['Лин (мягкость)', 'Leen', 'اللين', 'Leen'],
      [
        'Мягкость: вау или йа с сукуном после фатхи. При остановке — мадд лин (2, 4 или 6 счётов).',
        'Softness: waw or ya sukun after fatha. When stopping — madd leen.',
        'اللين: الواو أو الياء الساكنتان بعد فتحة.',
        'Waw o ya sakinah tras fatha.',
      ],
      'خَوْفٍ — لين'
    ),
    rule(
      'tafkheem_tarqeeq_sifat',
      ['Тафхим и таркик', 'Tafkheem & Tarqeeq', 'التفخيم والترقيق', 'Tafkheem y tarqeeq'],
      [
        'Тафхим — тяжёлое, полное звучание (7 букв + ر по правилам + ل في «Аллах»). Таркик — лёгкое, тонкое звучание.',
        'Tafkheem — heavy/full. Tarqeeq — light/thin. Applies to 7 letters, ra rules, lam jalalah.',
        'التفخيم: ملء الفم بالصوت. الترقيق: رقته.',
        'Tafkheem pesado; tarqeeq ligero.',
      ],
      'قَ — مفخَّم / لَ — مرقَّق'
    ),
    rule(
      'sifat_summary',
      ['١٧ пар сифат', '17 Sifat Pairs', 'سبعة عشر صفة', '17 cualidades'],
      [
        'В «Муаллим сани» изучают сифат попарно: хамс/джahr, шидда/рахава, исти\'ля/истифаль и др. Знание сифат помогает отличать похожие буквы (ت/ط, س/ص, د/ض, ك/ق).',
        'Mu\'allim Sani teaches sifat in pairs. Knowing sifat helps distinguish similar letters (ta/heavy ta, sin/sad, dal/dad, kaf/qaf).',
        'تعلم الصفات يميّز الحروف المتقاربة.',
        'Las sifat distinguen letras similares.',
      ],
      'تَ — طَ / سَ — صَ / دَ — ضَ / كَ — قَ'
    ),
  ]
);
