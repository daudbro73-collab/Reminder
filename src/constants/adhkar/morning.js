import { cat, item } from './helpers.js';
import {
  AYAT_AL_KURSI,
  MORNING_WITNESS,
  THREE_QULS,
  SAYYID_ISTIGHFAR,
} from './fullTexts.js';

export const MORNING_ADHKAR = cat(
  'morning',
  '#e07c24',
  ['Утренние азкары', 'Morning adhkar', 'أذكار الصباح', 'Adhkar matutinos'],
  [
    item(
      'morning_sovereignty',
      ['Суверенитет Аллаха', 'Allah\'s sovereignty', 'تَمْلِيكُ الصَّبَاح', 'Soberanía matutina'],
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      [
        'Сказать утром один раз.',
        'Say once in the morning.',
        'يُقال مرة واحدة في الصباح.',
        'Decir una vez por la mañana.',
      ],
      ['Муслим, 2723', 'Muslim 2723', 'مسلم ٢٧٢٣', 'Muslim 2723']
    ),
    item(
      'morning_refuge',
      ['Утреннее обращение', 'Morning supplication', 'دُعَاءُ الصَّبَاح', 'Súplica matutina'],
      'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      [
        '«О Аллах, Тобой мы вступаем в утро…»',
        '“O Allah, by You we enter the morning…”',
        '«اللَّهُمَّ بِكَ أَصْبَحْنَا…»',
        '“Oh Alá, por Ti entramos en la mañana…”',
      ],
      ['Абу Дауд, 5068 — сахих', 'Abu Dawud 5068 — sahih', 'أبو داود ٥٠٦٨ — صحيح', 'Abu Dawud 5068 — sahih']
    ),
    item(
      'morning_raditu',
      ['Довольство Исламом', 'Pleased with Islam', 'الرِّضَا بِالإِسْلَام', 'Contento con el Islam'],
      'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا',
      [
        'Кто скажет трижды утром — Аллах удовлетворит его в Судный день.',
        'Whoever says it three times in the morning — Allah will please him on the Day of Judgment.',
        'من قالها ثلاث مرات حين يصبح رضي الله عنه يوم القيامة.',
        'Quien lo diga tres veces por la mañana — Alá estará complacido con él el Día del Juicio.',
      ],
      ['Абу Дауд, 5072 — сахих', 'Abu Dawud 5072 — sahih', 'أبو داود ٥٠٧٢ — صحيح', 'Abu Dawud 5072 — sahih'],
      3
    ),
    item(
      'sayyid_istighfar',
      ['Саййид аль-истигфар', 'Sayyid al-Istighfar', 'سَيِّدُ الِاسْتِغْفَار', 'Maestro de la istighfar'],
      SAYYID_ISTIGHFAR,
      [
        'Главное слово прощения — утром или вечером с убеждённостью.',
        'The master supplication for forgiveness — morning or evening with conviction.',
        'سيد الاستغفار — صباحاً أو مساءً.',
        'La súplica maestra de perdón — mañana o tarde con convicción.',
      ],
      ['Бухари, 6306', 'Bukhari 6306', 'البخاري ٦٣٠٦', 'Bujari 6306']
    ),
    item(
      'morning_hasbi',
      ['«Достаточен мне Аллах»', 'Hasbiyallah', 'حَسْبِيَ اللَّه', 'Hasbiyallah'],
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      [
        'Семь раз утром — защита от зла этого дня.',
        'Seven times in the morning — protection from the evil of this day.',
        'سبع مرات صباحاً — يكفيه شر هذا اليوم.',
        'Siete veces por la mañana — protección del mal de este día.',
      ],
      ['Абу Дауд, 5081 — сахих', 'Abu Dawud 5081 — sahih', 'أبو داود ٥٠٨١ — صحيح', 'Abu Dawud 5081 — sahih'],
      7
    ),
    item(
      'morning_ayat_kursi',
      ['Аят аль-Курси', 'Ayat al-Kursi', 'آية الكرسي', 'Ayat al-Kursi'],
      AYAT_AL_KURSI,
      [
        'Утром — под защитой до вечера.',
        'In the morning — protected until evening.',
        'من قرأها حين يصبح أجير حتى يمسي.',
        'Por la mañana — protegido hasta la tarde.',
      ],
      ['النسائي — حسن', 'An-Nasa\'i — hasan', 'النسائي — حسن', 'An-Nasa\'i — hasan']
    ),
    item(
      'morning_muawwidhat',
      ['Три последние суры', 'The three Quls', 'المعوذات', 'Las tres suras'],
      THREE_QULS,
      [
        'По три раза каждую утром — достаточная защита.',
        'Three times each in the morning — sufficient protection.',
        'ثلاث مرات لكل سورة — تكفيه من كل شيء.',
        'Tres veces cada una por la mañana — protección suficiente.',
      ],
      ['Абу Дауд, 5082 — сахих', 'Abu Dawud 5082 — sahih', 'أبو داود ٥٠٨٢ — صحيح', 'Abu Dawud 5082 — sahih'],
      3
    ),
    item(
      'morning_bismillah_protect',
      ['Бисмиллях — защита', 'Bismillah protection', 'بسم الله حماية', 'Protección Bismillah'],
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      [
        'Три раза утром — ничто не навредит до вечера.',
        'Three times in the morning — nothing will harm until evening.',
        'ثلاث مرات صباحاً — لم يضره شيء حتى يمسي.',
        'Tres veces por la mañana — nada le dañará hasta la tarde.',
      ],
      ['Ат-Тирмизи, 3388 — сахих', 'At-Tirmidhi 3388 — sahih', 'الترمذي ٣٣٨٨ — صحيح', 'At-Tirmidhi 3388 — sahih'],
      3
    ),
    item(
      'morning_kalimat',
      ['Прибежище в Словах Аллаха', 'Refuge in Allah\'s words', 'الكلمات التامات', 'Refugio en las palabras'],
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      [
        'Три раза утром — защита от вреда творений.',
        'Three times in the morning — protection from the evil of creation.',
        'ثلاث مرات — لم يضره شيء حتى يمسي.',
        'Tres veces — protección del mal de la creación.',
      ],
      ['Муслим, 2708', 'Muslim 2708', 'مسلم ٢٧٠٨', 'Muslim 2708'],
      3
    ),
    item(
      'morning_subhan_100',
      ['СубханаЛлахи ва бихамдихи', 'SubhanAllahi wa bihamdihi', 'سبحان الله وبحمده', 'SubhanAllahi wa bihamdihi'],
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      [
        'Сто раз утром — простятся грехи, даже если их много как пена моря.',
        'One hundred times — sins forgiven even if like sea foam.',
        'مائة مرة — غُفِرَتْ ذُنُوبُهُ وإن كانت مثل زبد البحر.',
        'Cien veces — se perdonan los pecados aunque sean como espuma del mar.',
      ],
      ['Бухари, 6406', 'Bukhari 6406', 'البخاري ٦٤٠٦', 'Bujari 6406'],
      100
    ),
    item(
      'morning_tahlil',
      ['Тахлиль', 'Tahlil', 'التهليل', 'Tahlil'],
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      [
        'Сто раз — как освобождение десяти рабов, сто хасанат, стираются сто грехов.',
        'One hundred times — like freeing ten slaves, 100 hasanat, 100 sins erased.',
        'مائة مرة — كعتق عشر رقاب ومائة حسنة ومحو مائة سيئة.',
        'Cien veces — como liberar diez esclavos, 100 hasanat, 100 pecados borrados.',
      ],
      ['Бухари, 3293; Муслим, 2691', 'Bukhari 3293; Muslim 2691', 'البخاري ٣٢٩٣؛ مسلم ٢٦٩١', 'Bujari 3293; Muslim 2691'],
      100
    ),
    item(
      'morning_witness',
      ['Свидетельство утром', 'Morning witness', 'الشَّهَادَةُ الصَّبَاحِيَّة', 'Testimonio matutino'],
      MORNING_WITNESS,
      [
        'Четыре раза утром — освобождение от огня в тот день.',
        'Four times in the morning — freed from Hellfire that day.',
        'أربع مرات — أعتق من النار.',
        'Cuatro veces — liberado del Fuego ese día.',
      ],
      ['Абу Дауд, 5069 — сахих', 'Abu Dawud 5069 — sahih', 'أبو داود ٥٠٦٩ — صحيح', 'Abu Dawud 5069 — sahih'],
      4
    ),
  ]
);
