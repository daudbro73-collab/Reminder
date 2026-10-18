import { cat, item } from './helpers.js';
import { AYAT_AL_KURSI, THREE_QULS } from './fullTexts.js';

export const EVENING_ADHKAR = cat(
  'evening',
  '#6b4c9a',
  ['Вечерние азкары', 'Evening adhkar', 'أذكار المساء', 'Adhkar vespertinos'],
  [
    item(
      'evening_sovereignty',
      ['Суверенитет Аллаха', 'Allah\'s sovereignty', 'تَمْلِيكُ المساء', 'Soberanía vespertina'],
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      ['Сказать вечером один раз.', 'Say once in the evening.', 'يُقال مرة في المساء.', 'Decir una vez por la tarde.'],
      ['Муслим, 2723', 'Muslim 2723', 'مسلم ٢٧٢٣', 'Muslim 2723']
    ),
    item(
      'evening_refuge',
      ['Вечернее обращение', 'Evening supplication', 'دُعَاءُ المساء', 'Súplica vespertina'],
      'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      ['Вечерняя версия дуа.', 'Evening version of the supplication.', 'دعاء المساء.', 'Versión vespertina.'],
      ['Абу Дауд, 5068 — сахих', 'Abu Dawud 5068 — sahih', 'أبو داود ٥٠٦٨ — صحيح', 'Abu Dawud 5068 — sahih']
    ),
    item(
      'evening_raditu',
      ['Довольство Исламом', 'Pleased with Islam', 'الرِّضَا', 'Contento con el Islam'],
      'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا',
      ['Три раза вечером.', 'Three times in the evening.', 'ثلاث مرات مساءً.', 'Tres veces por la tarde.'],
      ['Абу Дауд, 5072 — сахих', 'Abu Dawud 5072 — sahih', 'أبو داود ٥٠٧٢ — صحيح', 'Abu Dawud 5072 — sahih'],
      3
    ),
    item(
      'evening_hasbi',
      ['«Достаточен мне Аллах»', 'Hasbiyallah', 'حَسْبِيَ اللَّه', 'Hasbiyallah'],
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      ['Семь раз вечером.', 'Seven times in the evening.', 'سبع مرات مساءً.', 'Siete veces por la tarde.'],
      ['Абу Дауд, 5081 — сахих', 'Abu Dawud 5081 — sahih', 'أبو داود ٥٠٨١ — صحيح', 'Abu Dawud 5081 — sahih'],
      7
    ),
    item(
      'evening_ayat_kursi',
      ['Аят аль-Курси', 'Ayat al-Kursi', 'آية الكرسي', 'Ayat al-Kursi'],
      AYAT_AL_KURSI,
      ['Вечером — защита до утра.', 'In the evening — protected until morning.', 'حين يمسي — أجير حتى يصبح.', 'Por la tarde — protegido hasta la mañana.'],
      ['النسائي — حسن', 'An-Nasa\'i — hasan', 'النسائي — حسن', 'An-Nasa\'i — hasan']
    ),
    item(
      'evening_muawwidhat',
      ['Три последние суры', 'The three Quls', 'المعوذات', 'Las tres suras'],
      THREE_QULS,
      ['По три раза вечером.', 'Three times each in the evening.', 'ثلاث مرات مساءً.', 'Tres veces cada una por la tarde.'],
      ['Абу Дауд, 5082 — сахих', 'Abu Dawud 5082 — sahih', 'أبو داود ٥٠٨٢ — صحيح', 'Abu Dawud 5082 — sahih'],
      3
    ),
    item(
      'evening_bismillah_protect',
      ['Бисмиллях — защита', 'Bismillah protection', 'بسم الله حماية', 'Protección Bismillah'],
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      ['Три раза вечером.', 'Three times in the evening.', 'ثلاث مرات مساءً.', 'Tres veces por la tarde.'],
      ['Ат-Тирмизи, 3388 — сахих', 'At-Tirmidhi 3388 — sahih', 'الترمذي ٣٣٨٨ — صحيح', 'At-Tirmidhi 3388 — sahih'],
      3
    ),
    item(
      'evening_kalimat',
      ['Прибежище в Словах Аллаха', 'Refuge in Allah\'s words', 'الكلمات التامات', 'Refugio en las palabras'],
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      ['Три раза вечером.', 'Three times in the evening.', 'ثلاث مرات مساءً.', 'Tres veces por la tarde.'],
      ['Муслим, 2708', 'Muslim 2708', 'مسلم ٢٧٠٨', 'Muslim 2708'],
      3
    ),
    item(
      'evening_subhan_100',
      ['СубханаЛлахи ва бихамдихи', 'SubhanAllahi wa bihamdihi', 'سبحان الله وبحمده', 'SubhanAllahi wa bihamdihi'],
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      ['Сто раз вечером.', 'One hundred times in the evening.', 'مائة مرة مساءً.', 'Cien veces por la tarde.'],
      ['Бухари, 6406', 'Bukhari 6406', 'البخاري ٦٤٠٦', 'Bujari 6406'],
      100
    ),
    item(
      'evening_tahlil',
      ['Тахлиль', 'Tahlil', 'التهليل', 'Tahlil'],
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      ['Сто раз вечером.', 'One hundred times in the evening.', 'مائة مرة مساءً.', 'Cien veces por la tarde.'],
      ['Бухари, 3293; Муслим, 2691', 'Bukhari 3293; Muslim 2691', 'البخاري ٣٢٩٣؛ مسلم ٢٦٩١', 'Bujari 3293; Muslim 2691'],
      100
    ),
  ]
);
