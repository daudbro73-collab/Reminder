import { cat, item } from './helpers.js';
import { ENTER_HOME_PROTECT } from './fullTexts.js';

export const WUDU_ADHKAR = cat(
  'wudu',
  '#2d6a4f',
  ['Омовение', 'Wudu', 'الوضوء', 'Ablución'],
  [
    item(
      'wudu_bismillah',
      ['Бисмиллях', 'Bismillah', 'البسملة', 'Bismillah'],
      'بِسْمِ اللَّهِ',
      ['Перед омовением.', 'Before starting wudu.', 'قبل الوضوء.', 'Antes del wudu.'],
      ['Абу Дауд, 101 — сахих', 'Abu Dawud 101 — sahih', 'أبو داود ١٠١ — صحيح', 'Abu Dawud 101 — sahih']
    ),
    item(
      'wudu_shahada',
      ['Шахада после омовения', 'Shahada after wudu', 'الشهادة بعد الوضوء', 'Shahada tras wudu'],
      'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      ['Откроются врата Рая, один из восьми входов.', 'The eight gates of Paradise open to him.', 'فُتِحَتْ لَهُ أَبْوَابُ الْجَنَّةِ الثَّمَانِيَةِ.', 'Se le abren las ocho puertas del Paraíso.'],
      ['Муслим, 234', 'Muslim 234', 'مسلم ٢٣٤', 'Muslim 234']
    ),
    item(
      'wudu_dua',
      ['Дуа после омовения', 'Dua after wudu', 'دُعَاءُ الوضوء', 'Dua tras wudu'],
      'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
      ['После завершения омовения.', 'After completing wudu.', 'بعد الفراغ من الوضوء.', 'Tras completar el wudu.'],
      ['Муслим, 607', 'Muslim 607', 'مسلم ٦٠٧', 'Muslim 607']
    ),
  ]
);

export const HOME_ADHKAR = cat(
  'home',
  '#b8860b',
  ['Дом', 'Home', 'المنزل', 'Hogar'],
  [
    item(
      'enter_home_bismillah',
      ['Вход в дом', 'Entering home', 'دُخُولُ البَيْت', 'Entrar al hogar'],
      'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَىٰ رَبِّنَا تَوَكَّلْنَا',
      ['При входе, упоминая имя Аллаха.', 'Upon entering, mentioning Allah\'s name.', 'عند الدخول.', 'Al entrar, mencionando el nombre de Alá.'],
      ['Абу Дауд, 5096 — сахих', 'Abu Dawud 5096 — sahih', 'أبو داود ٥٠٩٦ — صحيح', 'Abu Dawud 5096 — sahih']
    ),
    item(
      'enter_home_protect',
      ['Защита при входе', 'Protection entering', 'الحفظ عند الدخول', 'Protección al entrar'],
      ENTER_HOME_PROTECT,
      ['При входе в дом.', 'When entering the home.', 'عند دخول البيت.', 'Al entrar en casa.'],
      ['Абу Дауд, 5095 — сахих', 'Abu Dawud 5095 — sahih', 'أبو داود ٥٠٩٥ — صحيح', 'Abu Dawud 5095 — sahih']
    ),
    item(
      'leave_home',
      ['Выход из дома', 'Leaving home', 'الخُرُوجُ مِنَ البَيْت', 'Salir de casa'],
      'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      [
        'При выходе — направляют, оберегают и достаточно.',
        'When leaving — guided, protected and sufficed.',
        'يُقال عند الخروج — يُهْدَى ويُكْفَى ويُحْفَظ.',
        'Al salir — guiado, protegido y bastado.',
      ],
      ['Абу Дауд, 5095 — сахих', 'Abu Dawud 5095 — sahih', 'أبو داود ٥٠٩٥ — صحيح', 'Abu Dawud 5095 — sahih']
    ),
  ]
);

export const MOSQUE_ADHKAR = cat(
  'mosque',
  '#1b4332',
  ['Мечеть', 'Mosque', 'المسجد', 'Mezquita'],
  [
    item(
      'enter_mosque',
      ['Вход в мечеть', 'Entering mosque', 'دُخُولُ المَسْجِد', 'Entrar a la mezquita'],
      'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      ['При входе правой ногой.', 'Entering with the right foot.', 'عند الدخول بالرجل اليمنى.', 'Entrando con el pie derecho.'],
      ['Муслим, 713', 'Muslim 713', 'مسلم ٧١٣', 'Muslim 713']
    ),
    item(
      'leave_mosque',
      ['Выход из мечети', 'Leaving mosque', 'الخُرُوجُ مِنَ المَسْجِد', 'Salir de la mezquita'],
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
      ['При выходе левой ногой.', 'Leaving with the left foot.', 'عند الخروج بالرجل اليسرى.', 'Saliendo con el pie izquierdo.'],
      ['Муслим, 713', 'Muslim 713', 'مسلم ٧١٣', 'Muslim 713']
    ),
    item(
      'mosque_tahiyyat',
      ['Тахиятуль-масджид', 'Tahiyyat al-masjid', 'تحية المسجد', 'Tahiyyat al-masjid'],
      'رَكْعَتَانِ قَبْلَ الجُلُوسِ',
      [
        'Два ракяата приветствия мечети перед посадкой.',
        'Two rak\'ahs greeting the mosque before sitting.',
        'ركعتان قبل الجلوس تحية للمسجد.',
        'Dos rak\'ahs de saludo a la mezquita antes de sentarse.',
      ],
      ['Бухари, 444; Муслим, 714', 'Bukhari 444; Muslim 714', 'البخاري ٤٤٤؛ مسلم ٧١٤', 'Bujari 444; Muslim 714']
    ),
  ]
);

export const FOOD_ADHKAR = cat(
  'food',
  '#e07c24',
  ['Еда и питьё', 'Food & drink', 'الطعام والشراب', 'Comida y bebida'],
  [
    item(
      'before_eat',
      ['Перед едой', 'Before eating', 'قبل الأكل', 'Antes de comer'],
      'بِسْمِ اللَّهِ',
      ['В начале каждой еды.', 'At the start of every meal.', 'في أول الطعام.', 'Al inicio de cada comida.'],
      ['Бухари, 5376; Муслим, 2014', 'Bukhari 5376; Muslim 2014', 'البخاري ٥٣٧٦؛ مسلم ٢٠١٤', 'Bujari 5376; Muslim 2014']
    ),
    item(
      'forgot_bismillah',
      ['Если забыли бисмиллях', 'If forgot Bismillah', 'إن نسي البسملة', 'Si olvidó Bismillah'],
      'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
      ['В середине еды, если забыли в начале.', 'Mid-meal if forgotten at the start.', 'في أثناء الأكل إن نسي.', 'A mitad de la comida si lo olvidó.'],
      ['Абу Дауд, 3767 — сахих', 'Abu Dawud 3767 — sahih', 'أبو داود ٣٧٦٧ — صحيح', 'Abu Dawud 3767 — sahih']
    ),
    item(
      'after_eat',
      ['После еды', 'After eating', 'بعد الأكل', 'Después de comer'],
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      ['После еды — прощаются прошлые грехи.', 'After eating — past sins are forgiven.', 'من قالها غُفِرَتْ ذُنُوبُهُ ما تقدم.', 'Tras comer — se perdonan pecados pasados.'],
      ['Ат-Тирмизи, 3458 — сахих', 'At-Tirmidhi 3458 — sahih', 'الترمذي ٣٤٥٨ — صحيح', 'At-Tirmidhi 3458 — sahih']
    ),
    item(
      'guest_dua',
      ['Дуа за хозяина', 'Dua for host', 'دُعَاءٌ لِصَاحِبِ الطَّعَام', 'Dua por el anfitrión'],
      'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
      ['Гость за тех, кто накормил.', 'Guest prays for the one who fed them.', 'الضيف يدعو لمن أطعمه.', 'El invitado ora por quien le alimentó.'],
      ['Муслим, 2042', 'Muslim 2042', 'مسلم ٢٠٤٢', 'Muslim 2042']
    ),
  ]
);
