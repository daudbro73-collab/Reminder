import { cat, item } from './helpers.js';
import {
  TRAVEL_DUA,
  SAYYID_ISTIGHFAR,
  JANAZAH_DUA,
  ADHAN_RESPONSE,
  SICK_DUA,
  DEATH_DUA,
  EVIL_EYE_DUA,
  BEFORE_INTIMACY_DUA,
  NEW_CLOTHES_DUA,
} from './fullTexts.js';

export const TRAVEL_ADHKAR = cat(
  'travel',
  '#6b4c9a',
  ['Путешествие', 'Travel', 'السفر', 'Viaje'],
  [
    item(
      'travel_leave',
      ['Выход в путь', 'Setting out', 'الخروج للسفر', 'Salir de viaje'],
      'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ — سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
      ['При посадке на транспорт.', 'When boarding transport.', 'عند ركوب الدابة أو السيارة.', 'Al subir al transporte.'],
      ['Муслим, 1342', 'Muslim 1342', 'مسلم ١٣٤٢', 'Muslim 1342']
    ),
    item(
      'travel_dua',
      ['Дуа в пути', 'Travel supplication', 'دُعَاءُ السَّفَر', 'Dua de viaje'],
      TRAVEL_DUA,
      ['Во время путешествия.', 'During travel.', 'في أثناء السفر.', 'Durante el viaje.'],
      ['Муслим, 1342', 'Muslim 1342', 'مسلم ١٣٤٢', 'Muslim 1342']
    ),
    item(
      'travel_return',
      ['Возвращение', 'Returning home', 'الرُّجُوعُ', 'Regreso'],
      'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
      ['При возвращении из пути.', 'When returning from travel.', 'عند الرجوع من السفر.', 'Al regresar del viaje.'],
      ['Муслим, 1342', 'Muslim 1342', 'مسلم ١٣٤٢', 'Muslim 1342']
    ),
  ]
);

export const DISTRESS_ADHKAR = cat(
  'distress',
  '#c1121f',
  ['Горе и тревога', 'Distress & anxiety', 'الكَرْبُ والهَمُّ', 'Angustia y ansiedad'],
  [
    item(
      'yunus_dua',
      ['Дуа Юнуса', 'Dua of Yunus', 'دُعَاءُ يُونُس', 'Dua de Yunus'],
      'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      ['В тревоге и горе — Аллах отвечает на мольбу.', 'In distress — Allah answers the supplication.', 'لا يردها الله لصاحبها.', 'En la angustia — Alá responde la súplica.'],
      ['Тирмизи, 3505 — сахих', 'Tirmidhi 3505 — sahih', 'الترمذي ٣٥٠٥ — صحيح', 'Tirmidhi 3505 — sahih']
    ),
    item(
      'anxiety_dua',
      ['От тревоги', 'Relief from anxiety', 'دُعَاءُ الهَمِّ', 'Dua contra ansiedad'],
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
      ['Дуа пророка ﷺ.', 'The Prophet\'s ﷺ supplication.', 'دعاء النبي ﷺ.', 'Súplica del Profeta ﷺ.'],
      ['Бухари, 6369', 'Bukhari 6369', 'البخاري ٦٣٦٩', 'Bujari 6369']
    ),
    item(
      'fear_dua',
      ['От страха', 'Against fear', 'دُعَاءُ الخَوْف', 'Contra el miedo'],
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ',
      ['При страхе и бедствии.', 'In fear and calamity.', 'عند الخوف والبلاء.', 'En miedo y calamidad.'],
      ['Бухари, 6347', 'Bukhari 6347', 'البخاري ٦٣٤٧', 'Bujari 6347']
    ),
    item(
      'hasbunallah',
      ['Хасбуналлах', 'Hasbunallah', 'حسبنا الله', 'Hasbunallah'],
      'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
      ['При страхе врагов — сказал Ибрахим (мир ему).', 'When fearing enemies — said Ibrahim (as).', 'قالها إبراهيم عليه السلام.', 'Ante enemigos — dijo Ibrahim (la paz sea con él).'],
      ['Бухари, 4563', 'Bukhari 4563', 'البخاري ٤٥٦٣', 'Bujari 4563']
    ),
    item(
      'la_hawla',
      ['Ля хауля', 'La hawla', 'لا حول ولا قوة', 'La hawla'],
      'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      ['Сокровище из сокровищ Рая.', 'A treasure from the treasures of Paradise.', 'كنز من كنوز الجنة.', 'Un tesoro del Paraíso.'],
      ['Бухари, 6384; Муслим, 2705', 'Bukhari 6384; Muslim 2705', 'البخاري ٦٣٨٤؛ مسلم ٢٧٠٥', 'Bujari 6384; Muslim 2705']
    ),
    item(
      'rain_dua',
      ['Дуа при дожде', 'Dua when it rains', 'دُعَاءُ المَطَر', 'Dua con la lluvia'],
      'اللَّهُمَّ صَيِّبًا نَافِعًا',
      ['Когда идёт дождь.', 'When it rains.', 'عند نزول المطر.', 'Cuando llueve.'],
      ['Бухари, 1032', 'Bukhari 1032', 'البخاري ١٠٣٢', 'Bujari 1032']
    ),
    item(
      'thunder',
      ['При громе', 'Upon thunder', 'عند الرَّعْد', 'Con el trueno'],
      'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
      ['При громе и молнии.', 'When hearing thunder.', 'عند سماع الرعد.', 'Al oír el trueno.'],
      ['Муваддати, 1198 — сахих', 'Al-Muwatta 1198 — sahih', 'الموطأ ١١٩٨ — صحيح', 'Al-Muwatta 1198 — sahih']
    ),
  ]
);

export const FORGIVENESS_ADHKAR = cat(
  'forgiveness',
  '#40916c',
  ['Прощение', 'Forgiveness', 'الاستغفار', 'Perdón'],
  [
    item(
      'istighfar',
      ['Истигфар', 'Istighfar', 'أَسْتَغْفِرُ اللَّه', 'Istighfar'],
      'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      ['Часто в течение дня.', 'Often throughout the day.', 'كثيراً في اليوم.', 'A menudo durante el día.'],
      ['Бухари, 6307', 'Bukhari 6307', 'البخاري ٦٣٠٧', 'Bujari 6307']
    ),
    item(
      'rabbi_ghfir',
      ['Рабби гъфир ли', 'Rabbi ghfir li', 'رَبِّ اغْفِرْ لِي', 'Rabbi ghfir li'],
      'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
      ['Между двумя сурудом.', 'Between the two prostrations.', 'بين السجدتين.', 'Entre las dos prosternaciones.'],
      ['Абу Дауд, 874 — сахих', 'Abu Dawud 874 — sahih', 'أبو داود ٨٧٤ — صحيح', 'Abu Dawud 874 — sahih']
    ),
    item(
      'sayyid_istighfar_daily',
      ['Саййид аль-истигфар', 'Sayyid al-Istighfar', 'سَيِّدُ الِاسْتِغْفَار', 'Sayyid al-Istighfar'],
      SAYYID_ISTIGHFAR,
      ['Утром и вечером с убеждённостью.', 'Morning and evening with conviction.', 'صباحاً ومساءً.', 'Mañana y tarde con convicción.'],
      ['Бухари, 6306', 'Bukhari 6306', 'البخاري ٦٣٠٦', 'Bujari 6306']
    ),
  ]
);

export const PRAISE_ADHKAR = cat(
  'praise',
  '#b8860b',
  ['Похвала Аллаху', 'Praise of Allah', 'التَّسْبِيحُ والحَمْد', 'Alabanza a Alá'],
  [
    item(
      'subhanallah',
      ['СубханаЛлах', 'SubhanAllah', 'سُبْحَانَ اللَّه', 'SubhanAllah'],
      'سُبْحَانَ اللَّهِ',
      ['Частый зикр в любое время.', 'Frequent dhikr anytime.', 'ذكر في كل وقت.', 'Dhikr frecuente en cualquier momento.'],
      ['Бухари; Муслим', 'Bukhari; Muslim', 'البخاري؛ مسلم', 'Bujari; Muslim']
    ),
    item(
      'alhamdulillah',
      ['Альхамдулиллях', 'Alhamdulillah', 'الْحَمْدُ لِلَّه', 'Alhamdulillah'],
      'الْحَمْدُ لِلَّهِ',
      ['После каждого блага и в намазе.', 'After every blessing.', 'عند كل نعمة.', 'Tras cada bendición.'],
      ['Бухари; Муслим', 'Bukhari; Muslim', 'البخاري؛ مسلم', 'Bujari; Muslim']
    ),
    item(
      'allahu_akbar',
      ['Аллаху акбар', 'Allahu Akbar', 'اللَّهُ أَكْبَر', 'Allahu Akbar'],
      'اللَّهُ أَكْبَرُ',
      ['Велик Аллах — в зикре и намазе.', 'Allah is the Greatest.', 'في الذكر والصلاة.', 'En el dhikr y la oración.'],
      ['Бухари; Муслим', 'Bukhari; Muslim', 'البخاري؛ مسلم', 'Bujari; Muslim']
    ),
    item(
      'subhan_bihamdihi',
      ['СубханаЛлахи ва бихамдихи', 'SubhanAllahi wa bihamdihi', 'سبحان الله وبحمده', 'SubhanAllahi wa bihamdihi'],
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      ['Лёгкие для языка, тяжёлые на весах.', 'Light on the tongue, heavy on the scales.', 'خفيفتان على اللسان ثقيلتان في الميزان.', 'Ligeras en la lengua, pesadas en la balanza.'],
      ['Бухари, 6406; Муслим, 2691', 'Bukhari 6406; Muslim 2691', 'البخاري ٦٤٠٦؛ مسلم ٢٦٩١', 'Bujari 6406; Muslim 2691']
    ),
    item(
      'subhan_33',
      ['После намаза — 33', 'Post-prayer 33', 'ثلاث وثلاثون', '33 tras la oración'],
      'سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ',
      ['По 33 раза после каждого намаза.', '33 times each after every prayer.', 'ثلاثاً وثلاثين بعد كل صلاة.', '33 veces tras cada oración.'],
      ['Муслим, 597', 'Muslim 597', 'مسلم ٥٩٧', 'Muslim 597'],
      33
    ),
    item(
      'tabarak_allah',
      ['Табарак Аллах', 'Tabarak Allah', 'تَبَارَكَ اللَّه', 'Tabarak Allah'],
      'تَبَارَكَ اللَّهُ',
      ['При виде чего-то приятного.', 'When seeing something pleasing.', 'عند رؤية ما يعجبه.', 'Al ver algo agradable.'],
      ['Абу Дауд, 5092 — сахих', 'Abu Dawud 5092 — sahih', 'أبو داود ٥٠٩٢ — صحيح', 'Abu Dawud 5092 — sahih']
    ),
  ]
);

export const PROTECTION_ADHKAR = cat(
  'protection',
  '#1b4332',
  ['Защита', 'Protection', 'الحِفْظُ والرُّقْيَة', 'Protección'],
  [
    item(
      'kalimat_full',
      ['Калимат ат-тааммат', 'Perfect words of Allah', 'الكلمات التامات', 'Palabras perfectas'],
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      ['Три раза утром и вечером.', 'Three times morning and evening.', 'ثلاث مرات صباحاً ومساءً.', 'Tres veces mañana y tarde.'],
      ['Муслим, 2708', 'Muslim 2708', 'مسلم ٢٧٠٨', 'Muslim 2708'],
      3
    ),
    item(
      'shaytan_refuge',
      ['От шайтана', 'From Satan', 'الاستعاذة من الشيطان', 'Refugio del shaytan'],
      'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      ['Перед чтением Корана, при гневе, при страхе.', 'Before Quran, anger, fear.', 'قبل القراءة وعند الغضب.', 'Antes del Corán, ira, miedo.'],
      ['Бухари; Муслим', 'Bukhari; Muslim', 'البخاري؛ مسلم', 'Bujari; Muslim']
    ),
    item(
      'evil_eye',
      ['От сглаза', 'From evil eye', 'العَيْنُ والحَسَد', 'Mal de ojo'],
      EVIL_EYE_DUA,
      ['Для защиты детей и себя.', 'Protection for children and oneself.', 'للتحصين من العين.', 'Protección para niños y uno mismo.'],
      ['Бухари, 3371', 'Bukhari 3371', 'البخاري ٣٣٧١', 'Bujari 3371']
    ),
    item(
      'before_intimacy',
      ['Перед близостью', 'Before intimacy', 'عند الجِمَاع', 'Antes de la intimidad'],
      BEFORE_INTIMACY_DUA,
      ['Если сказать — шайтан не навредит ребёнку.', 'If said — Satan will not harm the child.', 'إن قالها لم يضره الشيطان.', 'Si se dice — el shaytan no dañará al hijo.'],
      ['Бухари, 141; Муслим, 1434', 'Bukhari 141; Muslim 1434', 'البخاري ١٤١؛ مسلم ١٤٣٤', 'Bujari 141; Muslim 1434']
    ),
  ]
);

export const SICKNESS_ADHKAR = cat(
  'sickness',
  '#6b4c9a',
  ['Болезнь и смерть', 'Sickness & death', 'المرض والميت', 'Enfermedad y muerte'],
  [
    item(
      'visit_sick',
      ['Навещение больного', 'Visiting the sick', 'عِيَادَةُ المَرِيض', 'Visitar al enfermo'],
      'لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
      ['Семь раз навещать больного.', 'Visit the sick seven times.', 'من عاد مريضاً سبع مرات.', 'Visitar al enfermo siete veces.'],
      ['Бухари, 5656', 'Bukhari 5656', 'البخاري ٥٦٥٦', 'Bujari 5656']
    ),
    item(
      'sick_dua',
      ['Дуа за больного', 'Dua for the sick', 'دُعَاءُ المَرِيض', 'Dua por el enfermo'],
      SICK_DUA,
      ['При навещении больного.', 'When visiting the sick.', 'عند عيادة المريض.', 'Al visitar al enfermo.'],
      ['Бухари, 5672; Муслим, 2191', 'Bukhari 5672; Muslim 2191', 'البخاري ٥٦٧٢؛ مسلم ٢١٩١', 'Bujari 5672; Muslim 2191']
    ),
    item(
      'pain_dua',
      ['От боли в теле', 'For bodily pain', 'دُعَاءُ الأَلَم', 'Dolor corporal'],
      'بِسْمِ اللَّهِ — وَضَعَ يَدَهُ عَلَى الَّذِي يَأْلَمُ مِنْ جَسَدِهِ',
      ['Трижды «Бисмиллях» и рука на больное место.', 'Three times Bismillah with hand on pain.', 'ثلاث مرات بسم الله مع وضع اليد.', 'Tres veces Bismillah con la mano en el dolor.'],
      ['Муслим, 2202', 'Muslim 2202', 'مسلم ٢٢٠٢', 'Muslim 2202'],
      3
    ),
    item(
      'death_inna',
      ['При вести о смерти', 'Upon hearing of death', 'عِنْدَ المَوْت', 'Al oír de una muerte'],
      DEATH_DUA,
      ['При постигшем несчастье.', 'When struck by calamity.', 'عند المصيبة.', 'Ante una calamidad.'],
      ['Муслим, 918', 'Muslim 918', 'مسلم ٩١٨', 'Muslim 918']
    ),
    item(
      'janazah_dua',
      ['Дуа за умершего', 'Dua for the deceased', 'دُعَاءُ المَيِّت', 'Dua por el difunto'],
      JANAZAH_DUA,
      ['Во время джаназа.', 'During the funeral prayer.', 'في صلاة الجنازة.', 'Durante la oración fúnebre.'],
      ['Муслим, 920', 'Muslim 920', 'مسلم ٩٢٠', 'Muslim 920']
    ),
  ]
);

export const MISC_ADHKAR = cat(
  'misc',
  '#2d6a4f',
  ['Разное', 'Miscellaneous', 'أذكار متفرقة', 'Varios'],
  [
    item(
      'sneeze',
      ['Чихание', 'Sneezing', 'العُطَاس', 'Estornudo'],
      'الْحَمْدُ لِلَّهِ — يَرْحَمُكَ اللَّهُ — يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ',
      ['Этикет при чихании и ответ.', 'Etiquette of sneezing and response.', 'آداب العطاس والرد.', 'Etiqueta del estornudo y respuesta.'],
      ['Бухари, 6224', 'Bukhari 6224', 'البخاري ٦٢٢٤', 'Bujari 6224']
    ),
    item(
      'new_clothes',
      ['Новая одежда', 'New clothes', 'الثَّوْبُ الجَدِيد', 'Ropa nueva'],
      NEW_CLOTHES_DUA,
      ['При надевании новой вещи.', 'When wearing new clothes.', 'عند لبس الثوب الجديد.', 'Al vestir ropa nueva.'],
      ['Абу Дауд, 4020 — сахих', 'Abu Dawud 4020 — sahih', 'أبو داود ٤٠٢٠ — صحيح', 'Abu Dawud 4020 — sahih']
    ),
    item(
      'mirror',
      ['Зеркало', 'Mirror', 'النَّظَرُ في المِرْآة', 'Espejo'],
      'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
      ['При взгляде в зеркало.', 'When looking in the mirror.', 'عند النظر في المرآة.', 'Al mirarse en el espejo.'],
      ['Абу Дауд, 4020 — сахих', 'Abu Dawud 4020 — sahih', 'أبو داود ٤٠٢٠ — صحيح', 'Abu Dawud 4020 — sahih']
    ),
    item(
      'hearing_news',
      ['Новость', 'Hearing news', 'عِنْدَ الخَبَر', 'Al oír noticias'],
      'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
      ['При радостной вести.', 'Upon hearing good news.', 'عند السماع بخبر طيب.', 'Al oír buenas noticias.'],
      ['Абу Дауд, 5092 — сахих', 'Abu Dawud 5092 — sahih', 'أبو داود ٥٠٩٢ — صحيح', 'Abu Dawud 5092 — sahih']
    ),
    item(
      'adhan_response',
      ['Ответ на азан', 'Response to adhan', 'عِنْدَ الأَذَان', 'Respuesta al adhan'],
      ADHAN_RESPONSE,
      ['После «ашхаду анна Мухаммадан расулюллах».', 'After the Muhammad adhan phrase.', 'بعد شهادة محمد رسول الله.', 'Tras la shahada de Muhammad.'],
      ['Бухари, 614', 'Bukhari 614', 'البخاري ٦١٤', 'Bujari 614']
    ),
    item(
      'bathroom_enter',
      ['Туалет — вход', 'Bathroom — enter', 'دُخُولُ الخَلَاء', 'Baño — entrar'],
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      ['Перед входом.', 'Before entering.', 'قبل الدخول.', 'Antes de entrar.'],
      ['Бухари, 142; Муслим, 375', 'Bukhari 142; Muslim 375', 'البخاري ١٤٢؛ مسلم ٣٧٥', 'Bujari 142; Muslim 375']
    ),
    item(
      'bathroom_exit',
      ['Туалет — выход', 'Bathroom — exit', 'الخُرُوجُ مِنَ الخَلَاء', 'Baño — salir'],
      'غُفْرَانَكَ',
      ['После выхода.', 'After exiting.', 'بعد الخروج.', 'Al salir.'],
      ['Абу Дауд, 30 — сахих', 'Abu Dawud 30 — sahih', 'أبو داود ٣٠ — صحيح', 'Abu Dawud 30 — sahih']
    ),
  ]
);
