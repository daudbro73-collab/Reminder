import { category, rule } from './helpers.js';

export const HARAKAT_CATEGORY = category(
  'harakat',
  '#1565c0',
  ['Огласовки и знаки', 'Harakat & Signs', 'الحركات والعلامات', 'Harakat y signos'],
  [
    rule(
      'fatha',
      ['Фатха', 'Fatha', 'الفتحة', 'Fatha'],
      [
        'Краткий звук «а» над буквой (بَ). Обозначает открытую гласную. При фатхе на букве мадда (ا و ي) — удлинение на 2 счёта.',
        'Short "a" vowel above the letter (بَ). On madd letters (alif, waw, ya) — 2-count prolongation.',
        'حركة الفتح: صوت قصير مفتوح فوق الحرف، مثل بَ. ومع حروف المد تُمد حركتين.',
        'Vocal corta "a" sobre la letra (بَ). En letras de madd — 2 tiempos.',
      ],
      'كَتَبَ — فَتْحَة',
      { harakatSample: 'بَ' }
    ),
    rule(
      'kasra',
      ['Касра', 'Kasra', 'الكسرة', 'Kasra'],
      [
        'Краткий звук «и» под буквой (بِ). При касре на йа мадда — удлинение 2 счёта. Касра перед лям «Аллах» даёт таркик лям аль-джалала.',
        'Short "i" vowel below the letter (بِ). Kasra on ya madd — 2 counts. Kasra before/allah gives tarqeeq of lam jalalah.',
        'حركة الكسر: صوت قصير تحت الحرف، مثل بِ. ومع الياء مد حركتين.',
        'Vocal corta "i" bajo la letra (بِ).',
      ],
      'كِتَاب — كَسْرَة',
      { harakatSample: 'بِ' }
    ),
    rule(
      'damma',
      ['Дамма', 'Damma', 'الضمة', 'Damma'],
      [
        'Краткий звук «у» над буквой (بُ). При дамме на вау мадда — удлинение 2 счёта. При остановке на дамме допускается ишмам (слегка округлить губы).',
        'Short "u" vowel above the letter (بُ). Damma on waw madd — 2 counts. Ishmam allowed when stopping.',
        'حركة الضم: صوت قصير مدور، مثل بُ. ومع الواو مد حركتين.',
        'Vocal corta "u" sobre la letra (بُ). Con waw madd — 2 tiempos.',
      ],
      'كُتُب — ضَمَّة',
      { harakatSample: 'بُ' }
    ),
    rule(
      'sukun',
      ['Сукун', 'Sukun', 'السكون', 'Sukun'],
      [
        'Знак сукун (بْ) означает отсутствие гласной — буква произносится с остановкой звука без движения. Основа для правил нун/мим сакина, калькали, ихфа.',
        'Sukun (بْ) means no vowel — the letter stops without movement. Basis for noon/meem sakinah, qalqalah, ikhfa rules.',
        'السكون: ثبوت الحرف بلا حركة، مثل بْ. أساس أحكام النون والميم الساكنتين.',
        'Sin vocal en la letra (بْ) — base de nun/mim sakinah y qalqalah.',
      ],
      'مِنْ — سُكُون',
      { harakatSample: 'بْ' }
    ),
    rule(
      'shaddah',
      ['Шадда', 'Shaddah', 'الشدة', 'Shaddah'],
      [
        'Удвоение буквы (بَّ): первая с сукуном, вторая с огласовкой. На ن и م — обязательная гунна 2 счёта. На солнечных буквах после لام التعريف — лям не читается.',
        'Letter doubling (بَّ): first with sukun, second with harakah. On noon/meem — ghunnah 2 counts. Solar lam: lam is silent.',
        'الشدة: تضعيف الحرف، مثل بَّ. وللنون والميم المشددتين غنة.',
        'Duplicación de letra (بَّ). Ghunnah en nun/meem.',
      ],
      'إِنَّ — شَدَّة + غُنَّة',
      { harakatSample: 'بَّ' }
    ),
    rule(
      'tanween_fath',
      ['Танвин фатх', 'Tanween Fath', 'تنوين الفتح', 'Tanwin fath'],
      [
        'Двойная фатха в конце слова (بً) — звук «ан». Правила такие же, как у нун сакина: изхар, идгам, икляб, ихфа.',
        'Double fatha at word end (بً) — "an" sound. Same rules as noon sakinah.',
        'تنوين الفتح في آخر الكلمة، مثل بً، صوته «اً».',
        'Doble fatha al final (بً) — sonido "an".',
      ],
      'كِتَابًا — تَنْوِين فَتْح',
      { harakatSample: 'بً' }
    ),
    rule(
      'tanween_kasr',
      ['Танвин каср', 'Tanween Kasr', 'تنوين الكسر', 'Tanwin kasr'],
      [
        'Двойная касра (بٍ) — звук «ин». Подчиняется тем же 4 правилам нун сакина.',
        'Double kasra (بٍ) — "in" sound. Same 4 noon sakinah rules apply.',
        'تنوين الكسر في آخر الكلمة، مثل بٍ.',
        'Doble kasra (بٍ) — "in".',
      ],
      'كِتَابٍ — تَنْوِين كَسْر',
      { harakatSample: 'بٍ' }
    ),
    rule(
      'tanween_damm',
      ['Танвин дамм', 'Tanween Damm', 'تنوين الضم', 'Tanwin damm'],
      [
        'Двойная дамма (بٌ) — звук «ун». Подчиняется тем же 4 правилам нун сакина.',
        'Double damma (بٌ) — "un" sound. Same 4 noon sakinah rules apply.',
        'تنوين الضم في آخر الكلمة، مثل بٌ.',
        'Doble damma (بٌ) — "un".',
      ],
      'كِتَابٌ — تَنْوِين ضَمّ',
      { harakatSample: 'بٌ' }
    ),
    rule(
      'madd_letters_intro',
      ['Буквы мадда (حروف المد)', 'Madd Letters', 'حروف المد الثلاثة', 'Letras de madd'],
      [
        'Три буквы удлинения: ا (после фатхи), و (после даммы), ي (после касры). Естественный мадд — 2 счёта. При хамзе, сукуне или остановке — другие виды мадда.',
        'Three madd letters: alif (after fatha), waw (after damma), ya (after kasra). Natural madd — 2 counts.',
        'حروف المد ثلاثة: الألف والواو والياء. مدها الطبيعي حركتان.',
        'Tres letras: alif, waw, ya. Madd natural — 2 tiempos.',
      ],
      'قَالُوا — ا و ي حروف مد'
    ),
    rule(
      'levels_recitation',
      ['Скорости чтения', 'Recitation Levels', 'مراتب التلاوة', 'Niveles de recitación'],
      [
        'Тартиль — размеренное чтение с соблюдением всех правил (рекомендуется). Тадвир — быстрее, с сохранением таджвида. Хадр — быстрое чтение для тех, кто владеет правилами.',
        'Tarteel — measured recitation with full tajweed (recommended). Tadweer — faster but correct. Hadr — fast for advanced reciters.',
        'الترتيل: أتم التجويد. التدوير: أسرع مع الحفظ. الحدر: سريع لمن أتقن.',
        'Tarteel (lento), tadweer (medio), hadr (rápido).',
      ],
      'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا'
    ),
  ]
);
