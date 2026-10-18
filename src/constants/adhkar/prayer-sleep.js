import { cat, item } from './helpers.js';
import {
  AYAT_AL_KURSI,
  THREE_QULS,
  LAST_TWO_AYAHS_BAQARAH,
  SLEEP_ALHAMD,
} from './fullTexts.js';

export const PRAYER_ADHKAR = cat(
  'after_prayer',
  '#1b4332',
  ['После намаза', 'After prayer', 'بعد الصلاة', 'Tras la oración'],
  [
    item(
      'after_istighfar',
      ['Истигфар', 'Istighfar', 'الاستغفار', 'Istighfar'],
      'أَسْتَغْفِرُ اللَّهَ',
      ['Три раза после каждого намаза.', 'Three times after every prayer.', 'ثلاث مرات بعد كل صلاة.', 'Tres veces tras cada oración.'],
      ['Муслим, 591', 'Muslim 591', 'مسلم ٥٩١', 'Muslim 591'],
      3
    ),
    item(
      'after_salam_dua',
      ['Дуа после саляма', 'Dua after salam', 'دُعَاءٌ بَعْدَ السَّلَامِ', 'Dua tras el salam'],
      'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
      ['Сразу после саляма.', 'Right after the salam.', 'بعد التسليم مباشرة.', 'Inmediatamente tras el salam.'],
      ['Муслим, 591', 'Muslim 591', 'مسلم ٥٩١', 'Muslim 591']
    ),
    item(
      'after_tasbih',
      ['Тасбих', 'Tasbih', 'التسبيح', 'Tasbih'],
      'سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ',
      ['По 33 раза, затем тахлиль один раз.', '33 times each, then tahlil once.', 'ثلاثاً وثلاثين لكل منها ثم التهليل.', '33 veces cada uno, luego tahlil una vez.'],
      ['Муслим, 597', 'Muslim 597', 'مسلم ٥٩٧', 'Muslim 597'],
      33
    ),
    item(
      'after_tahlil',
      ['Тахлиль после тасбиха', 'Tahlil after tasbih', 'التهليل بعد التسبيح', 'Tahlil tras tasbih'],
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      ['Один раз после 33 тасбихов.', 'Once after the 33 tasbihs.', 'مرة بعد التسبيح.', 'Una vez tras los 33 tasbihs.'],
      ['Муслим, 597', 'Muslim 597', 'مسلم ٥٩٧', 'Muslim 597']
    ),
    item(
      'after_ayat_kursi',
      ['Аят аль-Курси', 'Ayat al-Kursi', 'آية الكرسي', 'Ayat al-Kursi'],
      AYAT_AL_KURSI,
      ['После каждого обязательного намаза.', 'After every obligatory prayer.', 'دبر كل صلاة مكتوبة.', 'Tras cada oración obligatoria.'],
      ['Ан-Nasa\'i, 9928 — сахих', 'An-Nasa\'i 9928 — sahih', 'النسائي ٩٩٢٨ — صحيح', 'An-Nasa\'i 9928 — sahih']
    ),
    item(
      'after_dhikr_fingers',
      ['Зикр на пальцах', 'Dhikr on fingers', 'الذكر على الأصابع', 'Dhikr en los dedos'],
      'سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ',
      [
        'Считать на пальцах — пророк ﷺ делал так после каждой молитвы.',
        'Count on fingers — the Prophet ﷺ did this after every prayer.',
        'يُحصى على الأصابع — كان النبي ﷺ يفعله بعد كل صلاة.',
        'Contar en los dedos — el Profeta ﷺ lo hacía tras cada oración.',
      ],
      ['Абу Дауд, 5065 — сахих', 'Abu Dawud 5065 — sahih', 'أبو داود ٥٠٦٥ — صحيح', 'Abu Dawud 5065 — sahih']
    ),
  ]
);

export const SLEEP_ADHKAR = cat(
  'before_sleep',
  '#2d6a4f',
  ['Перед сном', 'Before sleep', 'قبل النوم', 'Antes de dormir'],
  [
    item(
      'sleep_dua',
      ['Дуа при ложении', 'Lying down dua', 'دُعَاءُ النَّوْم', 'Dua al acostarse'],
      'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      ['При ложении на бок, затем читать азкары.', 'When lying on your side, then recite adhkar.', 'عند النوم على الجنب.', 'Al acostarse de lado.'],
      ['Бухари, 6324', 'Bukhari 6324', 'البخاري ٦٣٢٤', 'Bujari 6324']
    ),
    item(
      'sleep_ayat_kursi',
      ['Аят аль-Курси', 'Ayat al-Kursi', 'آية الكرسي', 'Ayat al-Kursi'],
      AYAT_AL_KURSI,
      ['Кто прочитает — ангел охраняет всю ночь.', 'Whoever recites it — an angel guards all night.', 'من قرأها لم يزل عليه من الله حافظ.', 'Quien la recite — un ángel guarda toda la noche.'],
      ['Бухари, 2311', 'Bukhari 2311', 'البخاري ٢٣١١', 'Bujari 2311']
    ),
    item(
      'sleep_last_ayahs',
      ['Последние аяты аль-Бакара', 'Last ayahs of Al-Baqarah', 'خاتمة البقرة', 'Final de Al-Baqarah'],
      LAST_TWO_AYAHS_BAQARAH,
      ['Достаточно на ночь.', 'Sufficient for the night.', 'كفتاه من قراءة الليلة.', 'Basta para la noche.'],
      ['Бухари, 5009; Муслим, 807', 'Bukhari 5009; Muslim 807', 'البخاري ٥٠٠٩؛ مسلم ٨٠٧', 'Bujari 5009; Muslim 807']
    ),
    item(
      'sleep_muawwidhat',
      ['Три суры с дуновением', 'Three Quls with blowing', 'المعوذات والنفث', 'Tres suras con soplo'],
      THREE_QULS,
      ['По разу, подуть в ладони и провести по телу.', 'Once each, blow into palms and wipe over body.', 'يقرأها ثم ينفث في كفيه ويمسح بهما.', 'Una vez cada una, soplar y pasar por el cuerpo.'],
      ['Бухари, 5017', 'Bukhari 5017', 'البخاري ٥٠١٧', 'Bujari 5017']
    ),
    item(
      'sleep_tasbih_33',
      ['Тасбих перед сном', 'Tasbih before sleep', 'التسبيح قبل النوم', 'Tasbih antes de dormir'],
      'سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ',
      ['По 33 раза, затем тахлиль.', '33 times each, then tahlil.', 'ثلاثاً وثلاثين ثم التهليل.', '33 veces cada uno, luego tahlil.'],
      ['Бухари, 5362; Муслим, 2727', 'Bukhari 5362; Muslim 2727', 'البخاري ٥٣٦٢؛ مسلم ٢٧٢٧', 'Bujari 5362; Muslim 2727'],
      33
    ),
    item(
      'sleep_protect',
      ['Защита на ночь', 'Night protection', 'الحفظ ليلاً', 'Protección nocturna'],
      'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      ['Три раза перед сном.', 'Three times before sleep.', 'ثلاث مرات.', 'Tres veces antes de dormir.'],
      ['Абу Дауд, 5045 — сахих', 'Abu Dawud 5045 — sahih', 'أبو داود ٥٠٤٥ — صحيح', 'Abu Dawud 5045 — sahih'],
      3
    ),
    item(
      'sleep_alhamd',
      ['Благодарность за пищу и сон', 'Thanks for food and sleep', 'الحمد على الطعام', 'Gracias por la comida'],
      SLEEP_ALHAMD,
      ['После ужина, перед сном.', 'After dinner, before sleep.', 'بعد العشاء.', 'Tras la cena, antes de dormir.'],
      ['Муслим, 2715', 'Muslim 2715', 'مسلم ٢٧١٥', 'Muslim 2715']
    ),
  ]
);

export const WAKING_ADHKAR = cat(
  'waking',
  '#40916c',
  ['Пробуждение', 'Upon waking', 'عند الاستيقاظ', 'Al despertar'],
  [
    item(
      'wake_hamd',
      ['Благодарность за жизнь', 'Thanks for life', 'الحمد عند اليقظة', 'Gracias por la vida'],
      'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      ['Первые слова после пробуждения.', 'First words upon waking.', 'أول كلام عند الاستيقاظ.', 'Primeras palabras al despertar.'],
      ['Бухари, 6312', 'Bukhari 6312', 'البخاري ٦٣١٢', 'Bujari 6312']
    ),
    item(
      'wake_tahlil',
      ['Тахлиль утром', 'Morning tahlil', 'التهليل', 'Tahlil'],
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      ['После пробуждения.', 'After waking up.', 'عند الاستيقاظ.', 'Al despertar.'],
      ['Бухари, 6314', 'Bukhari 6314', 'البخاري ٦٣١٤', 'Bujari 6314']
    ),
    item(
      'wake_water_dua',
      ['Дуа при питье воды', 'Dua when drinking water', 'دُعَاءُ الشُّرب', 'Dua al beber agua'],
      'الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ وَلَمْ يَجْعَلْهُ مِلْحًا أُجَاجًا بِذُنُوبِنَا',
      ['При питье воды утром.', 'When drinking water in the morning.', 'عند شرب الماء.', 'Al beber agua por la mañana.'],
      ['Ат-Тирмизи, 3379 — сахих', 'At-Tirmidhi 3379 — sahih', 'الترمذي ٣٣٧٩ — صحيح', 'At-Tirmidhi 3379 — sahih']
    ),
  ]
);
