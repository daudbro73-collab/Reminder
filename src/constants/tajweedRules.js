// Полный курс таджвида по программе «Муаллим сани»
import { L, rule } from './tajweed/helpers.js';
import { ALPHABET_CATEGORY } from './tajweed/alphabet.js';
import { HARAKAT_CATEGORY } from './tajweed/harakat.js';
import { MAKHARIJ_CATEGORY } from './tajweed/makharij.js';
import { SIFAT_CATEGORY } from './tajweed/sifat.js';

const CLASSIC_CATEGORIES = [
  {
    id: 'foundations',
    color: '#1b4332',
    title: L(
      'Основы таджвида',
      'Foundations of Tajweed',
      'أصول التجويد',
      'Fundamentos del tajweed'
    ),
    rules: [
      rule(
        'tajweed_definition',
        ['Что такое таджвид', 'What is Tajweed', 'تعريف التجويد', 'Qué es el tajweed'],
        [
          'Таджвид — наука о правильном произношении букв Корана с их качествами: выход (махрадж), свойства (сифат), удлинения, слияния и остановки.',
          'Tajweed is the science of reciting the Quran correctly: articulation points (makharij), letter qualities (sifat), prolongation, merging, and stopping.',
          'التجويد: إعطاء كل حرف حقه ومخرجه من مخرجه، مع مراعاة أحكامه عند التلاوة.',
          'El tajweed es la ciencia de recitar el Corán dando a cada letra su derecho y su punto de articulación.',
        ],
        'التَّجْوِيدُ لَغَةً: الإتقان'
      ),
      rule(
        'istiadhah',
        ['Истиаза', 'Isti\'adhah', 'الاستعاذة', 'Isti\'adha'],
        [
          'Перед чтением говорят: «أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ» — ищут убежища у Аллаха от проклятого шайтана.',
          'Before reciting: "A\'udhu billahi min ash-shaytan ir-rajim" — seeking refuge in Allah from the accursed Satan.',
          'قول «أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ» قبل البدء بالقراءة.',
          'Decir "A\'udhu billahi min ash-shaytan ir-rajim" antes de comenzar la recitación.',
        ],
        'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'
      ),
      rule(
        'basmalah',
        ['Басмала', 'Basmalah', 'البسملة', 'Basmala'],
        [
          '«بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ» — в начале каждой суры, кроме суры 9 (ат-Тауба). Между сурами в мусхафе — басмала читается.',
          '"Bismillah ir-Rahman ir-Rahim" at the start of every surah except 9 (at-Tawbah). Between surahs in the Mushaf, the basmalah is recited.',
          'البسملة في أول كل سورة ما عدا سورة التوبة، وتُقرأ بين السورتين.',
          'La basmala al inicio de cada sura excepto la 9; se recita entre suras en el mushaf.',
        ],
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
      ),
      rule(
        'makharij',
        ['Махаридж (выход букв)', 'Makharij al-Huruf', 'مخارج الحروف', 'Makharij'],
        [
          '17 основных точек выхода звуков: гортань, язык (9 положений), губы, нос, нёбо. Каждая арабская буква имеет свой махрадж.',
          '17 main articulation areas: throat, tongue (9 positions), lips, nose, palate. Each Arabic letter has its specific exit point.',
          'سبعة عشر مخرجاً للحروف: الحلق، اللسان، الشفتان، الخيشوم، الحنك.',
          '17 puntos de articulación: garganta, lengua, labios, nariz y paladar.',
        ],
        'الْحَلْقُ — أَقْصَاهُ / أَوْسَطُهُ / أَدْنَاهُ'
      ),
      rule(
        'sifat',
        ['Сифат (свойства букв)', 'Sifat al-Huruf', 'صفات الحروف', 'Sifat'],
        [
          'Качества букв: твердость/мягкость, придыхание (хамс), звонкость, назализация и др. Влияют на правильность звука.',
          'Letter qualities: heaviness/lightness, aspiration (hams), echo (qalqalah), nasalization (ghunnah), etc.',
          'صفات الحروف: الهمس والجهر، الشدة والرخاوة، التفخيم والترقيق، القلقلة، الغنة.',
          'Cualidades: aspiración, fuerza, tafkheem/tarqeeq, qalqalah, ghunnah.',
        ],
        'الْحُرُوفُ الْهَمْسَةُ: حَرْفٌ يَجْرِي فِيهِ النَّفَسُ'
      ),
    ],
  },
  {
    id: 'noon_tanween',
    color: '#e63946',
    title: L(
      'Нун сакина и танвин',
      'Noon Sakinah & Tanween',
      'أحكام النون الساكنة والتنوين',
      'Nun sakinah y tanwin'
    ),
    rules: [
      rule(
        'idgham_letters_yarmalun',
        ['Буквы идгама: ярамалун', 'Idgham Letters: Yarmalun', 'حروف الإدغام: يرملون', 'Letras idgham: yarmalun'],
        [
          'Для идгама с гунной запоминают: ي ر م ل و ن (ярамалун). Для идгама без гунны: ل ر. Для икляба: ب. Для изхара: ء ه ع ح غ خ.',
          'Idgham with ghunnah: ي ن م و. Without ghunnah: ل ر. Iqlab: ب. Izhar: ء ه ع ح غ خ.',
          'للإدغام بغنة: يرملون. بلا غنة: لر. للإقلاب: ب. للإظهار: حروف الحلق.',
          'Idgham con ghunnah: y n m w. Sin ghunnah: l r.',
        ],
        'يَرْمَلُونَ — يرملون'
      ),
      rule(
        'ikhfa_letters',
        ['١٥ букв ихфа', '15 Ikhfa Letters', 'حروف الإخفاء الخمسة عشر', '15 letras ikhfa'],
        [
          'Буквы ихфа (скрытие с гунной): ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك. Запоминание: تصف ذا ثنا كم جاد شخص قد سما دم طيباً زد في تقى ضع ظالماً.',
          '15 ikhfa letters: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
          'حروف الإخفاء: تصف ذا ثنا كم جاد شخص قد سما دم طيباً زد في تقى ضع ظالماً.',
          '15 letras de ikhfa con ghunnah.',
        ],
        'تَصِفْ ذَا ثَنَا كَمْ — حروف الإخفاء'
      ),
      rule(
        'izhar_halqi',
        ['Изхар халки', 'Izhar Halqi', 'الإظهار الحلقي', 'Izhar halqi'],
        [
          'Ясное произношение нун/танвина перед 6 гортанными буквами: ء ه ع ح غ خ. Без слияния и без гунны.',
          'Clear pronunciation before 6 throat letters: ء ه ع ح غ خ. No merging, no ghunnah.',
          'إظهار النون الساكنة أو التنوين عند حروف الحلق الستة بلا غنة.',
          'Pronunciación clara ante las 6 letras de garganta, sin ghunnah.',
        ],
        'مِنْ عِلْمٍ — إظهار'
      ),
      rule(
        'idgham_ghunnah',
        ['Идгам с гунной', 'Idgham with Ghunnah', 'الإدغام بغنة', 'Idgham con ghunnah'],
        [
          'Слияние нун/танвина в следующую букву с гунной (2 счёта) перед: ي ن م و.',
          'Merge noon/tanween into the next letter with ghunnah (2 counts) before: ي ن م و.',
          'إدغام النون الساكنة أو التنوين في الياء والنون والميم والواو مع غنة.',
          'Fusión con ghunnah ante ي ن م و.',
        ],
        'مِنْ وَلِيٍّ — إدغام بغنة'
      ),
      rule(
        'idgham_bila_ghunnah',
        ['Идгам без гунны', 'Idgham without Ghunnah', 'الإدغام بلا غنة', 'Idgham sin ghunnah'],
        [
          'Полное слияние без гунны перед буквами ل и ر.',
          'Full merging without ghunnah before ل and ر.',
          'إدغام النون الساكنة أو التنوين في اللام والراء بلا غنة.',
          'Fusión completa sin ghunnah ante ل y ر.',
        ],
        'مِنْ رَبِّهِمْ — إدغام بلا غنة'
      ),
      rule(
        'iqlab',
        ['Икляб', 'Iqlab', 'الإقلاب', 'Iqlab'],
        [
          'Замена нун/танвина на мим с гунной (2 счёта) перед буквой ب.',
          'Convert noon/tanween to meem with ghunnah (2 counts) before ب.',
          'قلب النون الساكنة أو التنوين ميماً مخفاة بغنة عند الباء.',
          'Convertir nun/tanwin en mim con ghunnah ante ب.',
        ],
        'مِنْ بَعْدِ — إقلاب'
      ),
      rule(
        'ikhfa',
        ['Ихфа', 'Ikhfa', 'الإخفاء', 'Ikhfa'],
        [
          'Скрытое произношение с гунной (2 счёта) перед 15 буквами: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
          'Hidden pronunciation with ghunnah (2 counts) before 15 letters: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
          'إخفاء النون الساكنة أو التنوين مع الغنة عند بقية الحروف الخمسة عشر.',
          'Ocultación con ghunnah ante 15 letras.',
        ],
        'مِنْ قَبْلُ — إخفاء'
      ),
      rule(
        'izhar_mutlaq',
        ['Изхар мутлак', 'Izhar Mutlaq', 'الإظهار المطلق', 'Izhar mutlaq'],
        [
          'Обязательное ясное произношение нун с сукуном, стоящей после танвина на конце слова (редкий случай в мусхафе).',
          'Required clear noon with sukun after tanween at word end (rare in the Mushaf).',
          'إظهار النون الساكنة إذا وقعت بعد تنوين في آخر الكلمة.',
          'Pronunciación clara de nun sakinah tras tanwin al final de palabra.',
        ],
        'مِنْۢ — إظهار مطلق'
      ),
    ],
  },
  {
    id: 'meem_sakinah',
    color: '#457b9d',
    title: L(
      'Мим сакина',
      'Meem Sakinah',
      'أحكام الميم الساكنة',
      'Mim sakinah'
    ),
    rules: [
      rule(
        'idgham_shafawi',
        ['Идгам шафави', 'Idgham Shafawi', 'الإدغام الشفوي', 'Idgham shafawi'],
        [
          'Слияние мим с сукуном в следующую мим с гунной (2 счёта): م + م.',
          'Merge meem sakinah into following meem with ghunnah (2 counts).',
          'إدغام الميم الساكنة في ميم مع غنة.',
          'Fusión de mim sakinah en mim con ghunnah.',
        ],
        'لَهُمْ مَّا — إدغام شفوي'
      ),
      rule(
        'ikhfa_shafawi',
        ['Ихфа шафави', 'Ikhfa Shafawi', 'الإخفاء الشفوي', 'Ikhfa shafawi'],
        [
          'Скрытие мим с сукуном с гунной перед любой буквой, кроме ب и م.',
          'Hide meem sakinah with ghunnah before any letter except ب and م.',
          'إخفاء الميم الساكنة مع الغنة عند ما عدا الباء والميم.',
          'Ocultar mim sakinah con ghunnah excepto ante ب y م.',
        ],
        'تَرْمِيهِم بِحِجَارَةٍ — إخفاء شفوي'
      ),
      rule(
        'izhar_shafawi',
        ['Изхар шафави', 'Izhar Shafawi', 'الإظهار الشفوي', 'Izhar shafawi'],
        [
          'Ясное произношение мим с сукуном перед буквой ب без гунны.',
          'Clear meem sakinah before ب without ghunnah.',
          'إظهار الميم الساكنة عند الباء بلا غنة.',
          'Pronunciación clara de mim sakinah ante ب.',
        ],
        'أَنتُم بِهِ — إظهار شفوي'
      ),
    ],
  },
  {
    id: 'madd',
    color: '#9b5de5',
    title: L(
      'Мадд (удлинение)',
      'Madd (Prolongation)',
      'أحكام المد',
      'Madd'
    ),
    rules: [
      rule(
        'madd_tabii',
        ['Мадд табии (естественный)', 'Natural Madd', 'المد الطبيعي', 'Madd natural'],
        [
          'Удлинение на 2 счёта (хараката) при алиф после фатхи, вау после даммы, йа после касры — без причины удлинения.',
          '2-count prolongation: alif after fatha, waw after damma, ya after kasra — without extra cause.',
          'مد حرف المد طبيعياً بمقدار حركتين.',
          '2 tiempos: alif, waw o ya de madd natural.',
        ],
        'قَالَ — مد طبيعي (٢)'
      ),
      rule(
        'madd_badal',
        ['Мадд аль-бадль', 'Madd al-Badl', 'مد البدل', 'Madd al-badl'],
        [
          'Заменительный мадд: хамза перед хамзой аль-васля или перед буквой мадда — удлиняется на 2 счёта.',
          'Substitute madd when hamza precedes hamzat al-wasl or a madd letter — 2 counts.',
          'مد البدل: همزة قبل همزة الوصل أو حرف المد.',
          'Madd sustituto: hamza antes de hamzat al-wasl o letra de madd.',
        ],
        'ءَامَنُوا — مد بدل'
      ),
      rule(
        'madd_muttasil',
        ['Мадд муттасиль', 'Madd Muttasil', 'المد المتصل', 'Madd muttasil'],
        [
          'Связанный мадд: хамза после буквы мадда в одном слове — 4 или 5 счётов (по риваяту).',
          'Connected madd: hamza after madd letter in the same word — 4 or 5 counts.',
          'مد متصل: همزة بعد حرف مد في كلمة واحدة (٤ أو ٥).',
          'Madd conectado en una palabra — 4 o 5 tiempos.',
        ],
        'جَاءَ — مد متصل (٤–٥)'
      ),
      rule(
        'madd_munfasil',
        ['Мадд мунфасиль', 'Madd Munfasil', 'المد المنفصل', 'Madd munfasil'],
        [
          'Разделённый мадд: хамза после буквы мадда в двух словах — 4 или 5 счётов.',
          'Separated madd: hamza after madd letter in two words — 4 or 5 counts.',
          'مد منفصل: همزة بعد حرف مد بين كلمتين (٤ أو ٥).',
          'Madd separado entre dos palabras — 4 o 5 tiempos.',
        ],
        'يَا أَيُّهَا — مد منفصل'
      ),
      rule(
        'madd_lazim',
        ['Мадд лязим', 'Madd Lazim', 'المد اللازم', 'Madd lazim'],
        [
          'Обязательный мадд: 6 счётов. Лязим калими (в слове) или лязим харфи (в буквах открытия сур).',
          'Compulsory madd: 6 counts. Lazim kalimi (in word) or lazim harfi (opening letters).',
          'مد لازم ست حركات: لازم كلمي أو لازم حرفي.',
          'Madd obligatorio: 6 tiempos.',
        ],
        'الْحَآقَّةُ — مد لازم (٦)'
      ),
      rule(
        'madd_iwad',
        ['Мадд ивад', 'Madd \'Iwad', 'مد العوض', 'Madd \'iwad'],
        [
          'Мадд замены: при остановке на танвин фатх вместо «ан» читают «а» с удлинением 2 счёта (как фатха + алиф).',
          'Compensatory madd: when stopping on tanween fath, replace "an" with prolonged "aa" (2 counts).',
          'مد العوض: عوض التنوين بالألف المدية عند الوقف.',
          'Al parar en tanwin fath — madd sustituto.',
        ],
        'كِتَابًاۖ — مد عوض (٢)'
      ),
      rule(
        'madd_silah_kubra',
        ['Мадд сила кубра', 'Madd Silah Kubra', 'مد الصلة الكبرى', 'Madd silah kubra'],
        [
          'Большой мадд местоимения: هِ после كسры при остановке — 4 или 5 счётов (по риваяту).',
          'Greater connecting madd: ha pronoun after kasra when stopping — 4 or 5 counts.',
          'مد هاء الضمير الكبرى عند الوقف: أربع أو خمس.',
          'Madd silah kubra al parar — 4 o 5 tiempos.',
        ],
        'فِيهِۖ — مد صلة كبرى'
      ),
      rule(
        'madd_arid',
        ['Мадд арид', 'Madd \'Arid', 'المد العارض', 'Madd \'arid'],
        [
          'Случайный мадд при остановке на букве мадда — 2, 4 или 6 счётов в зависимости от типа.',
          'Temporary madd when stopping on a madd letter — 2, 4, or 6 counts by type.',
          'مد عارض للسكون عند الوقف على حرف مد.',
          'Madd temporal al detenerse en letra de madd.',
        ],
        'الْعَالَمِينَۚ — مد عارض (٢–٤–٦)'
      ),
      rule(
        'madd_leen',
        ['Мадд лин', 'Madd Leen', 'المد اللين', 'Madd leen'],
        [
          'Мягкое удлинение: вау или йа с сукуном после фатхи. При остановке — 2, 4 или 6 счётов; внутри аята — 2.',
          'Soft prolongation: waw or ya sukun after fatha. When stopping: 2, 4, or 6; mid-verse: 2.',
          'مد لين: واو أو ياء ساكنة بعد فتحة.',
          'Prolongación suave de waw o ya sakinah tras fatha.',
        ],
        'خَوْفٍ — مد لين'
      ),
      rule(
        'madd_silah',
        ['Мадд сила', 'Madd Silah', 'مد الصلة', 'Madd silah'],
        [
          'Удлинение местоимения هاء (هِ) при соединении — 2 счёта; при остановке на нём — 4 или 5.',
          'Prolongation of connecting pronoun haa (هِ) — 2 counts; when stopping: 4 or 5.',
          'مد هاء الضمير: حركتان، وعند الوقف أربع أو خمس.',
          'Madd del pronombre هاء — 2 tiempos; al parar 4 o 5.',
        ],
        'إِنَّهُۥ — مد صلة'
      ),
    ],
  },
  {
    id: 'qalqalah',
    color: '#f4a261',
    title: L(
      'Калькаля',
      'Qalqalah',
      'القلقلة',
      'Qalqalah'
    ),
    rules: [
      rule(
        'qalqalah_letters',
        ['Буквы калькали', 'Qalqalah Letters', 'حروف القلقلة', 'Letras de qalqalah'],
        [
          'Пять букв с «эхом»: ق ط ب ج د — при сукуне или при остановке на них.',
          'Five echoing letters: ق ط ب ج د — with sukun or when stopping on them.',
          'حروف القلقلة الخمسة: ق ط ب ج د.',
          'Cinco letras: ق ط ب ج د.',
        ],
        'قُطْبُ جَدٍّ — ق ط ب ج د'
      ),
      rule(
        'qalqalah_sughra',
        ['Калькаля сугра', 'Qalqalah Sughra', 'القلقلة الصغرى', 'Qalqalah sughra'],
        [
          'Малая калькаля: сукун в середине слова — лёгкое эхо без остановки.',
          'Minor qalqalah: sukun in the middle of a word — light echo without stopping.',
          'قلقلة صغرى: السكون في وسط الكلمة.',
          'Qalqalah menor en medio de palabra.',
        ],
        'يَجْعَلُونَ — قلقلة صغرى'
      ),
      rule(
        'qalqalah_kubra',
        ['Калькаля кубра', 'Qalqalah Kubra', 'القلقلة الكبرى', 'Qalqalah kubra'],
        [
          'Большая калькаля: остановка (вакф) на букве калькали — сильное эхо.',
          'Major qalqalah: stopping (waqf) on a qalqalah letter — strong echo.',
          'قلقلة كبرى: الوقف على حرف القلقلة.',
          'Qalqalah mayor al detenerse en la letra.',
        ],
        'الْحَقُّۚ — قلقلة كبرى'
      ),
      rule(
        'qalqalah_akbar',
        ['Калькаля акбар', 'Qalqalah Akbar', 'القلقلة الكبرى البالغة', 'Qalqalah akbar'],
        [
          'Наибольшая калькаля: остановка на шадде калькали — самое сильное эхо (по мнению некоторых учёных).',
          'Greatest qalqalah: stopping on shaddah of qalqalah letter (per some scholars).',
          'أقوى القلقلة عند الوقف على الشدة من حروف القلقلة.',
          'La qalqalah más fuerte al parar en shaddah.',
        ],
        'أَحَدٌ — عند الوقف: قلقلة'
      ),
    ],
  },
  {
    id: 'ghunnah',
    color: '#2a9d8f',
    title: L(
      'Гунна',
      'Ghunnah',
      'الغنة',
      'Ghunnah'
    ),
    rules: [
      rule(
        'ghunnah_shaddah',
        ['Гунна от шадды', 'Ghunnah from Shaddah', 'غنة الشدة', 'Ghunnah de shaddah'],
        [
          'Носовой звук при нун или мим с шаддой — 2 счёта (хараката).',
          'Nasal sound on noon or meem with shaddah — 2 counts.',
          'الغنة من النون والميم المشددتين: حركتان.',
          'Sonido nasal en nun o mim con shaddah — 2 tiempos.',
        ],
        'إِنَّ — غنة (٢)'
      ),
      rule(
        'ghunnah_idgham',
        ['Гунна в идгаме и ихфа', 'Ghunnah in Idgham & Ikhfa', 'غنة الإدغام والإخفاء', 'Ghunnah en idgham e ikhfa'],
        [
          '2 счёта гунны в: идгам с гунной, икляб, ихфа, идгам/ихфа шафави.',
          '2 counts of ghunnah in: idgham with ghunnah, iqlab, ikhfa, shafawi rules.',
          'الغنة في الإدغام بغنة والإقلاب والإخفاء والأحكام الشفوية.',
          '2 tiempos en idgham con ghunnah, iqlab, ikhfa y shafawi.',
        ],
        'مِنْ وَلِيٍّ / مِنْ بَعْدِ / مِنْ قَبْلُ'
      ),
      rule(
        'ghunnah_duration',
        ['Длительность гунны', 'Ghunnah Duration', 'مقدار الغنة', 'Duración de la ghunnah'],
        [
          'Гунна не должна быть слишком короткой или слишком длинной — ровно 2 счёта, как два ударения пальцем.',
          'Ghunnah should be exactly 2 counts — not too short or too long.',
          'مقدار الغنة حركتان لا زيادة ولا نقصان.',
          'Exactamente 2 tiempos, ni más ni menos.',
        ],
        'غُنَّةٌ بِمِقْدَارِ حَرَكَتَيْنِ'
      ),
    ],
  },
  {
    id: 'lam',
    color: '#6d597a',
    title: L(
      'Правила лям',
      'Rules of Lam',
      'أحكام اللام',
      'Reglas de la lam'
    ),
    rules: [
      rule(
        'lam_shamsiyyah',
        ['Лям шамсия', 'Lam Shamsiyyah', 'اللام الشمسية', 'Lam shamsiyyah'],
        [
          'Солнечная лям в «аль-»: не читается, следующая буква удваивается (шадда). 14 букв: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
          'Solar lam in "al-": silent, next letter doubled. 14 letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
          'اللام الشمسية تُدغم في الحرف الذي بعدها من أربعة عشر حرفاً.',
          'Lam solar: silenciosa, letra siguiente con shaddah.',
        ],
        'الشَّمْسُ / النُّورُ'
      ),
      rule(
        'lam_qamariyyah',
        ['Лям камария', 'Lam Qamariyyah', 'اللام القمرية', 'Lam qamariyyah'],
        [
          'Лунная лям: читается ясно. 14 букв: أ ب ج ح خ ع غ ف ق ك م هـ و ي.',
          'Lunar lam: pronounced clearly. 14 letters: أ ب ج ح خ ع غ ف ق ك م هـ و ي.',
          'اللام القمرية تُنطق ظاهرةً.',
          'Lam lunar: pronunciada claramente.',
        ],
        'الْقَمَرُ / الْكِتَابُ'
      ),
      rule(
        'lam_jalalah',
        ['Лям в «Аллах»', 'Lam in Allah', 'لام الجلالة', 'Lam de Allah'],
        [
          'Тафхим (тяжёлая): если перед лям фатха или дамма, или лям с фатхой/даммой. Таркик (лёгкая): если перед лям касра или лям с касрой.',
          'Tafkheem: fatha/damma before lam or on lam. Tarqeeq: kasrah before lam or on lam.',
          'تفخيم لام الجلالة إذا فُتِح ما قبلها أو كُسِر، وترقيقها إذا كُسِر ما قبلها.',
          'Tafkheem o tarqeeq según la vocal anterior o en la lam.',
        ],
        'قَالَ اللَّهُ / بِسْمِ اللَّهِ'
      ),
    ],
  },
  {
    id: 'ra',
    color: '#5c4d7d',
    title: L(
      'Правила Ра (ر)',
      'Rules of Ra',
      'أحكام الراء',
      'Reglas de la ra'
    ),
    rules: [
      rule(
        'ra_tafkheem',
        ['Тафхим Ра', 'Tafkheem of Ra', 'تفخيم الراء', 'Tafkheem de ra'],
        [
          'Тяжёлая ر: с фатхой/даммой, с сукуном после фатхи/даммы, с сукуном после тяжёлой буквы, с шаддой.',
          'Heavy ra: with fatha/damma, sukun after fatha/damma, sukun after heavy letter, or with shaddah.',
          'تفخيم الراء في حالات الفتح والضم والسكون بعد فتح أو ضم أو بعد حرف مفخم.',
          'Ra pesada con fatha, damma o sukun tras vocal pesada.',
        ],
        'رَبِّ / الْقُرْآنُ'
      ),
      rule(
        'ra_tarqeeq',
        ['Таркик Ра', 'Tarqeeq of Ra', 'ترقيق الراء', 'Tarqeeq de ra'],
        [
          'Лёгкая ر: с касрой, с сукуном после касры, с сукуном после лёгкой буквы (йа с касрой).',
          'Light ra: with kasrah, sukun after kasrah, sukun after light letter.',
          'ترقيق الراء مع الكسرة أو السكون بعد كسرة.',
          'Ra ligera con kasrah o sukun tras kasrah.',
        ],
        'رَحِيمٍ / فِرْعَوْنَ'
      ),
      rule(
        'ra_special',
        ['Особые случаи Ра', 'Special Cases of Ra', 'الراء المختلف فيها', 'Casos especiales'],
        [
          'Некоторые слова имеют разные чтения (варианты кыраат): тяжёлая или лёгкая ر по риваяту имама.',
          'Some words have different qira\'at: heavy or light ra per the imam\'s recitation.',
          'بعض الكلمات يُقرأ فيها الراء بالتفخيم أو الترقيق على اختلاف القراءات.',
          'Algunas palabras admiten ra pesada o ligera según la qira\'ah.',
        ],
        'يَسْرِ / مِصْرَ'
      ),
    ],
  },
  {
    id: 'tafkheem_tarqeeq',
    color: '#3d405b',
    title: L(
      'Тафхим и таркик',
      'Tafkheem & Tarqeeq',
      'التفخيم والترقيق',
      'Tafkheem y tarqeeq'
    ),
    rules: [
      rule(
        'tafkheem_letters',
        ['Буквы тафхима', 'Letters of Tafkheem', 'حروف الاستعلاء', 'Letras de tafkheem'],
        [
          'Всегда тяжёлые (7): خ ص ض غ ط ق ظ. Запоминание: خُصَّ ضَغْطٍ قِظْ.',
          'Always heavy (7): خ ص ض غ ط ق ظ. Mnemonic: khusṣ ḍaghṭ qīẓ.',
          'الحروف المستعلية سبعة: خ ص ض غ ط ق ظ.',
          'Siete letras siempre pesadas: خ ص ض غ ط ق ظ.',
        ],
        'خُصَّ ضَغْطٍ قِظْ'
      ),
      rule(
        'tarqeeq_letters',
        ['Буквы таркика', 'Letters of Tarqeeq', 'الحروف المرققة', 'Letras de tarqeeq'],
        [
          'Остальные буквы по умолчанию лёгкие, кроме случаев тафхима по правилу (например, ل в «Аллах»).',
          'Remaining letters are light by default, except when rules apply tafkheem.',
          'باقي الحروف مرققة إلا ما تدعو إليه أحكام التفخيم.',
          'El resto son ligeras salvo reglas específicas.',
        ],
        'بَرِيقٌ — راء مرققة'
      ),
      rule(
        'alif_tafkheem',
        ['Тафхим алифа', 'Tafkheem of Alif', 'تفخيم الألف', 'Tafkheem del alif'],
        [
          'Алиф следует за тяжёлой буквой — произносится тяжело (как в слове «صَاد»).',
          'Alif follows a heavy letter — pronounced heavily.',
          'الألف تتبع الحرف المفخم فيُفخَّم صوتها.',
          'El alif sigue a letra pesada.',
        ],
        'الصَّادِقُونَ'
      ),
    ],
  },
  {
    id: 'hamzah',
    color: '#588157',
    title: L(
      'Хамза аль-васль',
      'Hamzat al-Wasl',
      'همزة الوصل',
      'Hamzat al-wasl'
    ),
    rules: [
      rule(
        'hamzah_qat',
        ['Хамза аль-катъ', 'Hamzat al-Qat\'', 'همزة القطع', 'Hamzat al-qat\''],
        [
          'Хамза аль-катъ (قطع) — всегда читается, не опускается при соединении. Встречается в начале слов: أَ, إِ, أُ, ؤ, ئ. Отличается от хамзы аль-васль, которая опускается при васль.',
          'Hamzat al-qat\' is always pronounced and never dropped when continuing. Found in: أَ, إِ, أُ. Unlike hamzat al-wasl.',
          'همزة القطع تُنطق دائماً ولا تسقط عند الوصل.',
          'Hamzat al-qat\' siempre se pronuncia.',
        ],
        'أَنَا — همزة قطع'
      ),
      rule(
        'hamzah_wasl_continue',
        ['При продолжении чтения', 'When Continuing', 'همزة الوصل عند الوصل', 'Al continuar'],
        [
          'При соединении со словом перед ней хамза аль-васль не читается — начинают со следующей буквы.',
          'When joining to the previous word, hamzat al-wasl is dropped — start from the next letter.',
          'تسقط همزة الوصل عند الوصل بالكلمة السابقة.',
          'Se omite al unir con la palabra anterior.',
        ],
        'بِاسْمِ — من {ٱبْدَأْ} بِاسْمِ'
      ),
      rule(
        'hamzah_wasl_start',
        ['При начале с неё', 'When Starting', 'همزة الوصل عند البدء', 'Al iniciar'],
        [
          'Если начинают чтение с слова, содержащего хамзу аль-васль — её произносят (часто с касрой).',
          'When starting recitation with a word containing hamzat al-wasl — it is pronounced.',
          'تُنطق همزة الوصل عند البدء بها.',
          'Se pronuncia al comenzar con esa palabra.',
        ],
        'ٱقْرَأْ — تُنطق الهمزة عند البدء'
      ),
      rule(
        'hamzah_wasl_lam',
        ['После لام определённости', 'After Definite Lam', 'همزة الوصل بعد لام التعريف', 'Tras lam definida'],
        [
          'После «ال» хамза аль-васль читается при начале с этого слова.',
          'After "al-", hamzat al-wasl is read when starting from that word.',
          'تُقرأ همزة الوصل بعد ال التعريف عند البدء.',
          'Se lee tras al- al iniciar.',
        ],
        'الرَّحْمَٰنِ — ٱلرَّحْمَٰن'
      ),
    ],
  },
  {
    id: 'waqf',
    color: '#bc6c25',
    title: L(
      'Вакф и ибтида',
      'Waqf & Ibtida',
      'الوقف والابتداء',
      'Waqf e ibtida'
    ),
    rules: [
      rule(
        'waqf_tamm',
        ['Вакф тамм', 'Waqf Tamm', 'الوقف التام', 'Waqf tamm'],
        [
          'Полная остановка: смысл завершён, можно начать с нового места без связи.',
          'Complete stop: meaning is complete; may restart without connection.',
          'وقف تام: اكتمل المعنى ولا يُوصل بما بعده.',
          'Parada completa: el sentido está cerrado.',
        ],
        '۩ — وقف تام'
      ),
      rule(
        'waqf_kafi',
        ['Вакф кафи', 'Waqf Kafi', 'الوقف الكافي', 'Waqf kafi'],
        [
          'Достаточная остановка: смысл понятен, но связь с следующим фрагментом возможна.',
          'Sufficient stop: meaning clear, but connection to next part is possible.',
          'وقف كافٍ: أفاد المعنى ولو جاز الوصل.',
          'Parada suficiente: sentido claro.',
        ],
        'ۖ — وقف كافٍ'
      ),
      rule(
        'waqf_hassan',
        ['Вакф хасан', 'Waqf Hassan', 'الوقف الحسن', 'Waqf hassan'],
        [
          'Хорошая остановка: предпочтительное место остановки без разрыва смысла.',
          'Good stop: preferred stopping place without breaking meaning.',
          'وقف حسن: موضع حسن للوقف.',
          'Buena parada preferida.',
        ],
        'ۗ — وقف حسن'
      ),
      rule(
        'waqf_qabih',
        ['Вакф кабих', 'Waqf Qabih', 'الوقف القبيح', 'Waqf qabih'],
        [
          'Плохая остановка: смысл обрывается, останавливаться здесь нежелательно.',
          'Bad stop: meaning is cut off; stopping here is discouraged.',
          'وقف قبيح: يقطع المعنى ويُكره الوقف عليه.',
          'Mala parada: corta el sentido.',
        ],
        'ۘ — لا يوقف (وقف قبيح)'
      ),
      rule(
        'waqf_la',
        ['Запрет остановки', 'Do Not Stop', 'الوقف الممنوع', 'Prohibido parar'],
        [
          'Места, где останавливаться нельзя — знак ۚ (لا) или связанный смысл требует продолжения.',
          'Places where stopping is forbidden — sign ۚ (la) or meaning requires continuation.',
          'مواضع يُمنع الوقف فيها لقطع المعنى.',
          'Lugares donde no se debe parar.',
        ],
        'ۚ — لا يوقف'
      ),
      rule(
        'ibtida',
        ['Ибтида (начало)', 'Ibtida', 'الابتداء', 'Ibtida'],
        [
          'Начало чтения с середины аята или после остановки — с учётом грамматики и смысла, иногда с возвратом буквы.',
          'Starting mid-verse or after a stop — considering grammar; sometimes repeating a letter.',
          'الابتداء: البدء من موضع الوقف مع مراعاة الإعراب.',
          'Iniciar tras una parada respetando la gramática.',
        ],
        'وَٱلْعَصْرِ — ابتداء بعد وقف'
      ),
      rule(
        'saktah',
        ['Сакта', 'Saktah', 'السكتة', 'Saktah'],
        [
          'Краткая пауза без дыхания (1–2 счёта) без остановки — в особых местах по хафсу и другим риваятам.',
          'Brief pause without breathing (1–2 counts) without full stop — in special places per Hafs.',
          'سكتة بلا تنفس في مواضع خاصة في رواية حفص.',
          'Pausa breve sin respirar en lugares específicos.',
        ],
        'ۜ — سكتة'
      ),
    ],
  },
  {
    id: 'advanced',
    color: '#7b2cbf',
    title: L(
      'Дополнительные правила',
      'Advanced Rules',
      'أحكام إضافية',
      'Reglas avanzadas'
    ),
    rules: [
      rule(
        'idgham_mutajanisayn',
        ['Идгам мутаджанисайн', 'Idgham Mutajanisayn', 'الإدغام المتجانسين', 'Idgham mutajanisayn'],
        [
          'Слияние двух соседних однородных букв: первая с сукуном, вторая с движением — вторая остаётся без шадды (по хафсу в некоторых местах).',
          'Merging two similar adjacent letters: first with sukun, second voweled.',
          'إدغام متجانسين: حرفان متجانسان الأول ساكن والثاني متحرك.',
          'Fusión de dos letras similares adyacentes.',
        ],
        'لَقَدْ جَاءَ — إدغام متجانسين'
      ),
      rule(
        'idgham_mutaqaribayn',
        ['Идгам мутақарибайн', 'Idgham Mutaqaribayn', 'الإدغام المتقاربين', 'Idgham mutaqaribayn'],
        [
          'Слияние двух близких по махраджу букв при сукуне первой.',
          'Merging two letters close in articulation when the first has sukun.',
          'إدغام متقاربين: حرفان متقاربان في المخرج.',
          'Fusión de letras cercanas en articulación.',
        ],
        'قُلْ رَبِّ — إدغام متقاربين'
      ),
      rule(
        'rawm',
        ['Раум', 'Rawm', 'الروم', 'Rawm'],
        [
          'Тихое, неполное произнесение буквы при остановке — допускается в некоторых риваятах.',
          'Soft, incomplete pronunciation of a letter when stopping — allowed in some qira\'at.',
          'الروم: إمالة الصوت عند الوقف دون إتمام الحركة.',
          'Pronunciación suave al detenerse.',
        ],
        'إِيمَانًا — روم عند الوقف'
      ),
      rule(
        'ishmam',
        ['Ишмам', 'Ishmam', 'الإشمام', 'Ishmam'],
        [
          'Слегка округлить губы при дамме при остановке, не произнося полную дамму.',
          'Slightly round lips for damma when stopping without full damma sound.',
          'الإشمام: تكوير الشفتين عند الوقف على الضمة.',
          'Redondear labios en damma al parar.',
        ],
        'عَلِيمٌۚ — إشمام'
      ),
      rule(
        'ikhtilas',
        ['Ихтиляс', 'Ikhtilas', 'الاختلاس', 'Ikhtilas'],
        [
          'Быстрое «красть» гунну при ихфа — не растягивать, а кратко скрыть (тонкое правило).',
          'Quickly "stealing" the ghunnah in ikhfa — brief concealment.',
          'الاختلاس: أخذ الغنة بسرعة في الإخفاء.',
          'Ghunnah breve en ikhfa.',
        ],
        'مِنْ شَرِّ — إخفاء باختلاس'
      ),
      rule(
        'hams_jahr',
        ['Хамс и джahr', 'Hams & Jahr', 'الهمس والجهر', 'Hams y jahr'],
        [
          'Хамс — шёпотный звук (дыхание слышно): ح ث هـ ف خ. Джahr — звонкий (без придыхания): остальные.',
          'Hams — whispered (breath audible). Jahr — voiced without aspiration.',
          'الهمس: يجري النفس. الجهر: يمنع خروج النفس.',
          'Hams con aliento; jahr sin aspiración audible.',
        ],
        'هَادِي — هاء مهموسة'
      ),
      rule(
        'ikhfaa_shafawi_note',
        ['Ихфа буквы', 'Letter Concealment', 'إخفاء الحروف', 'Ocultación'],
        [
          'Общий принцип ихфа: буква присутствует в артикуляции, но скрыта от полного изхара — с сохранением гунны где положено.',
          'General ikhfa: letter present in articulation but hidden from full clarity — with ghunnah where required.',
          'الإخفاء: إبقاء الحرف بين الإظهار والإدغام.',
          'La letra entre pronunciación clara y fusión.',
        ],
        'أَنتُم — إخفاء في الأحكام'
      ),
    ],
  },
];

export const TAJWEED_CATEGORIES = [
  ALPHABET_CATEGORY,
  HARAKAT_CATEGORY,
  MAKHARIJ_CATEGORY,
  SIFAT_CATEGORY,
  ...CLASSIC_CATEGORIES,
];

export const TAJWEED_SECTION_COUNT = TAJWEED_CATEGORIES.length;

// Плоский список для обратной совместимости
export const TAJWEED_RULES = TAJWEED_CATEGORIES.flatMap((cat) =>
  cat.rules.map((r) => ({ ...r, color: cat.color, categoryId: cat.id }))
);

export const TAJWEED_RULE_COUNT = TAJWEED_RULES.length;
