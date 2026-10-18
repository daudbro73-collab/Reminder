const L = (ru, en, ar, es) => ({ ru, en, ar, es });
const T = (ru, en, es) => ({ ru, en, es });

function ayah(surah, number, textAr, trans, reference) {
  return { surah, number, textAr, translation: T(...trans), reference: L(...reference) };
}

function hadith(grade, source, number, narrator, isnad, textAr, trans) {
  return { grade, source, number, narrator: L(...narrator), isnad: L(...isnad), textAr, translation: T(...trans) };
}

export const SUNNAH_EVIDENCE = {
  quran: {
    ayah: ayah(
      39,
      23,
      "اللَّهُ نَزَّلَ أَحْسَنَ الْحَدِيثِ كِتَابًا مُتَشَابِهًا مَثَانِيَ",
      [
        "Аллах ниспослал наилучшее повествование - Писание, сходное по смыслу и повторяемое.",
        "Allah has sent down the best statement: a Book, consistent and oft-repeated.",
        "Allah ha revelado el mejor discurso: un Libro armonioso y reiterado.",
      ],
      ["Сура аз-Зумар, 39:23", "Surah Az-Zumar, 39:23", "سورة الزمر ٣٩:٢٣", "Sura Az-Zumar, 39:23"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "5027",
        ["Абу Муса аль-Ашари", "Abu Musa al-Ash'ari", "أبو موسى الأشعري", "Abu Musa al-Ash'ari"],
        [
          "Абу Муса аль-Ашари ← Пророк ﷺ (аль-Бухари)",
          "Abu Musa al-Ash'ari ← Prophet ﷺ (al-Bukhari)",
          "أبو موسى الأشعري ← النبي ﷺ (البخاري)",
          "Abu Musa al-Ash'ari ← Profeta ﷺ (al-Bukhari)",
        ],
        "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        [
          "Лучший из вас тот, кто изучает Коран и обучает ему других.",
          "The best among you are those who learn the Quran and teach it.",
          "El mejor de vosotros es quien aprende el Coran y lo ensena.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih Muslim",
        "804",
        ["Абу Умама аль-Бахили", "Abu Umamah al-Bahili", "أبو أمامة الباهلي", "Abu Umamah al-Bahili"],
        [
          "Абу Умама аль-Бахили ← Пророк ﷺ (Муслим)",
          "Abu Umamah al-Bahili ← Prophet ﷺ (Muslim)",
          "أبو أمامة الباهلي ← النبي ﷺ (مسلم)",
          "Abu Umamah al-Bahili ← Profeta ﷺ (Muslim)",
        ],
        "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
        [
          "Читайте Коран, ибо в День воскресения он придет заступником за своих спутников.",
          "Recite the Quran, for it will come on the Day of Resurrection as an intercessor for its companions.",
          "Recitad el Coran, pues vendra el Dia de la Resurreccion como intercesor por sus companeros.",
        ],
      ),
    ],
  },

  morning_dhikr: {
    ayah: ayah(
      33,
      41,
      "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
      [
        "О те, которые уверовали! Поминайте Аллаха многократным поминанием.",
        "O you who believe, remember Allah with much remembrance.",
        "Oh creyentes, recordad a Allah con mucho recuerdo.",
      ],
      ["Сура аль-Ахзаб, 33:41", "Surah Al-Ahzab, 33:41", "سورة الأحزاب ٣٣:٤١", "Sura Al-Ahzab, 33:41"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "6405",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (аль-Бухари)",
          "Abu Huraira ← Prophet ﷺ (al-Bukhari)",
          "أبو هريرة ← النبي ﷺ (البخاري)",
          "Abu Huraira ← Profeta ﷺ (al-Bukhari)",
        ],
        "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ... سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
        [
          "Два слова легки на языке, тяжелы на весах и любимы Милостивым: Субханаллахи ва бихамдихи, Субханаллахиль-Азым.",
          "Two words are light on the tongue, heavy on the scale, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.",
          "Dos palabras son ligeras en la lengua, pesadas en la balanza y amadas por el Misericordioso: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih Muslim",
        "2691",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (Муслим)",
          "Abu Huraira ← Prophet ﷺ (Muslim)",
          "أبو هريرة ← النبي ﷺ (مسلم)",
          "Abu Huraira ← Profeta ﷺ (Muslim)",
        ],
        "مَنْ قَالَ سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ حُطَّتْ خَطَايَاهُ",
        [
          "Кто скажет сто раз в день: Субханаллахи ва бихамдихи, тому будут прощены грехи, даже если они как морская пена.",
          "Whoever says SubhanAllahi wa bihamdihi one hundred times a day will have his sins forgiven, even if they are like the foam of the sea.",
          "Quien diga cien veces al dia SubhanAllahi wa bihamdihi, se le perdonaran sus pecados aunque sean como la espuma del mar.",
        ],
      ),
    ],
  },

  evening_dhikr: {
    ayah: ayah(
      33,
      42,
      "وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا",
      [
        "И прославляйте Его утром и вечером.",
        "And glorify Him morning and evening.",
        "Y glorificadle por la manana y por la tarde.",
      ],
      ["Сура аль-Ахзаб, 33:42", "Surah Al-Ahzab, 33:42", "سورة الأحزاب ٣٣:٤٢", "Sura Al-Ahzab, 33:42"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sunan Abu Dawud",
        "5074",
        ["Абан ибн Усман", "Aban ibn Uthman", "أبان بن عثمان", "Aban ibn Uthman"],
        [
          "Абан ибн Усман ← Усман ибн Аффан ← Пророк ﷺ (Абу Дауд)",
          "Aban ibn Uthman ← Uthman ibn Affan ← Prophet ﷺ (Abu Dawud)",
          "أبان بن عثمان ← عثمان بن عفان ← النبي ﷺ (أبو داود)",
          "Aban ibn Uthman ← Uthman ibn Affan ← Profeta ﷺ (Abu Dawud)",
        ],
        "مَنْ قَالَ: بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ... ثَلَاثَ مَرَّاتٍ لَمْ يَضُرَّهُ شَيْءٌ",
        [
          "Кто утром и вечером трижды скажет: С именем Аллаха, с именем Которого ничто не причинит вреда..., тому ничто не навредит.",
          "Whoever says three times in the morning and evening: In the name of Allah, with whose name nothing can harm..., nothing will harm him.",
          "Quien diga tres veces por la manana y por la tarde: En el nombre de Allah, con cuyo nombre nada puede perjudicar..., nada le danara.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih Muslim",
        "2723",
        ["Джувайрия бинт аль-Харис", "Juwairiyah bint al-Harith", "جويرية بنت الحارث", "Yuwairiya bint al-Harith"],
        [
          "Джувайрия бинт аль-Харис ← Пророк ﷺ (Муслим)",
          "Juwairiyah bint al-Harith ← Prophet ﷺ (Muslim)",
          "جويرية بنت الحارث ← النبي ﷺ (مسلم)",
          "Yuwairiya bint al-Harith ← Profeta ﷺ (Muslim)",
        ],
        "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ... مِدَادَ كَلِمَاتِهِ",
        [
          "Слова, которые Пророк ﷺ научил читать после утра: Слава Аллаху и хвала Ему числом Его творений... и чернилами Его слов.",
          "Words taught by the Prophet ﷺ after dawn: Glory and praise be to Allah by the number of His creation... and by the ink of His words.",
          "Palabras ensenadas por el Profeta ﷺ tras la manana: Gloria y alabanza a Allah por el numero de Su creacion... y por la tinta de Sus palabras.",
        ],
      ),
    ],
  },

  tahajjud: {
    ayah: ayah(
      17,
      79,
      "وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَكَ",
      [
        "И часть ночи проводи в дополнительной молитве.",
        "And in part of the night, pray with it as additional worship for you.",
        "Y durante parte de la noche, reza con ello como oracion voluntaria para ti.",
      ],
      ["Сура аль-Исра, 17:79", "Surah Al-Isra, 17:79", "سورة الإسراء ١٧:٧٩", "Sura Al-Isra, 17:79"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih Muslim",
        "1163",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (Муслим)",
          "Abu Huraira ← Prophet ﷺ (Muslim)",
          "أبو هريرة ← النبي ﷺ (مسلم)",
          "Abu Huraira ← Profeta ﷺ (Muslim)",
        ],
        "أَفْضَلُ الصَّلَاةِ بَعْدَ الْفَرِيضَةِ صَلَاةُ اللَّيْلِ",
        [
          "Лучшая молитва после обязательной - ночная молитва.",
          "The best prayer after the obligatory prayers is the night prayer.",
          "La mejor oracion despues de la obligatoria es la oracion nocturna.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "1147",
        ["Абдуллах ибн Салам", "Abdullah ibn Salam", "عبد الله بن سلام", "Abdullah ibn Salam"],
        [
          "Абдуллах ибн Салам ← Пророк ﷺ (аль-Бухари)",
          "Abdullah ibn Salam ← Prophet ﷺ (al-Bukhari)",
          "عبد الله بن سلام ← النبي ﷺ (البخاري)",
          "Abdullah ibn Salam ← Profeta ﷺ (al-Bukhari)",
        ],
        "أَفْشُوا السَّلَامَ... وَصَلُّوا بِاللَّيْلِ وَالنَّاسُ نِيَامٌ تَدْخُلُوا الْجَنَّةَ بِسَلَامٍ",
        [
          "Распространяйте салам... и молитесь ночью, когда люди спят, и войдете в Рай с миром.",
          "Spread peace... and pray at night while people sleep, and you will enter Paradise in peace.",
          "Propagad el saludo... y rezad de noche mientras la gente duerme, y entrareis al Paraiso en paz.",
        ],
      ),
    ],
  },

  duha: {
    ayah: ayah(
      93,
      1,
      "وَالضُّحَى",
      [
        "Клянусь утром.",
        "By the morning brightness.",
        "Por la claridad de la manana.",
      ],
      ["Сура ад-Духа, 93:1", "Surah Ad-Duha, 93:1", "سورة الضحى ٩٣:١", "Sura Ad-Duha, 93:1"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih Muslim",
        "720",
        ["Абу Зарр", "Abu Dharr", "أبو ذر", "Abu Dharr"],
        [
          "Абу Зарр ← Пророк ﷺ (Муслим)",
          "Abu Dharr ← Prophet ﷺ (Muslim)",
          "أبو ذر ← النبي ﷺ (مسلم)",
          "Abu Dharr ← Profeta ﷺ (Muslim)",
        ],
        "وَيُجْزِئُ مِنْ ذَلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى",
        [
          "За все это достаточно двух ракаатов духа.",
          "Two rakahs of Duha suffice for all of that.",
          "Dos rakas de Duha bastan para todo ello.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "1178",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (аль-Бухари)",
          "Abu Huraira ← Prophet ﷺ (al-Bukhari)",
          "أبو هريرة ← النبي ﷺ (البخاري)",
          "Abu Huraira ← Profeta ﷺ (al-Bukhari)",
        ],
        "أَوْصَانِي خَلِيلِي... وَرَكْعَتَيِ الضُّحَى",
        [
          "Мой любимый друг ﷺ завещал мне три вещи... и два ракаата духа.",
          "My beloved ﷺ advised me to do three things... and to pray two rakahs of Duha.",
          "Mi amado ﷺ me recomendo tres cosas... y rezar dos rakas de Duha.",
        ],
      ),
    ],
  },

  witr: {
    ayah: ayah(
      2,
      238,
      "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى",
      [
        "Оберегайте молитвы и особенно среднюю молитву.",
        "Guard strictly the prayers, especially the middle prayer.",
        "Observad las oraciones, especialmente la oracion intermedia.",
      ],
      ["Сура аль-Бакара, 2:238", "Surah Al-Baqarah, 2:238", "سورة البقرة ٢:٢٣٨", "Sura Al-Baqarah, 2:238"],
    ),
    hadiths: [
      hadith(
        "Hasan Sahih",
        "Jami at-Tirmidhi",
        "453",
        ["Али ибн Абу Талиб", "Ali ibn Abi Talib", "علي بن أبي طالب", "Ali ibn Abi Talib"],
        [
          "Али ибн Абу Талиб ← Пророк ﷺ (ат-Тирмизи)",
          "Ali ibn Abi Talib ← Prophet ﷺ (at-Tirmidhi)",
          "علي بن أبي طالب ← النبي ﷺ (الترمذي)",
          "Ali ibn Abi Talib ← Profeta ﷺ (at-Tirmidhi)",
        ],
        "إِنَّ اللَّهَ وِتْرٌ يُحِبُّ الْوِتْرَ فَأَوْتِرُوا يَا أَهْلَ الْقُرْآنِ",
        [
          "Поистине, Аллах Нечетный и любит нечетное, так совершайте витр, о люди Корана.",
          "Allah is Witr and He loves witr, so perform witr, O people of the Quran.",
          "Allah es Uno y ama lo impar; haced el witr, oh gente del Coran.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "990",
        ["Аиша", "Aisha", "عائشة", "Aisha"],
        [
          "Аиша ← Пророк ﷺ (аль-Бухари)",
          "Aisha ← Prophet ﷺ (al-Bukhari)",
          "عائشة ← النبي ﷺ (البخاري)",
          "Aisha ← Profeta ﷺ (al-Bukhari)",
        ],
        "كَانَ النَّبِيُّ ﷺ يُصَلِّي مِنَ اللَّيْلِ ثَلَاثَ عَشْرَةَ رَكْعَةً يُوتِرُ مِنْهَا بِخَمْسٍ",
        [
          "Пророк ﷺ совершал ночью тринадцать ракаатов, завершая их витром из пяти.",
          "The Prophet ﷺ used to pray thirteen rakahs at night, ending with five as witr.",
          "El Profeta ﷺ solia rezar trece rakas por la noche, terminando con cinco de witr.",
        ],
      ),
    ],
  },

  sunnah_fajr: {
    ayah: ayah(
      2,
      238,
      "حَافِظُوا عَلَى الصَّلَوَاتِ",
      [
        "Оберегайте молитвы.",
        "Guard the prayers.",
        "Observad las oraciones.",
      ],
      ["Сура аль-Бакара, 2:238", "Surah Al-Baqarah, 2:238", "سورة البقرة ٢:٢٣٨", "Sura Al-Baqarah, 2:238"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih Muslim",
        "725",
        ["Аиша", "Aisha", "عائشة", "Aisha"],
        [
          "Аиша ← Пророк ﷺ (Муслим)",
          "Aisha ← Prophet ﷺ (Muslim)",
          "عائشة ← النبي ﷺ (مسلم)",
          "Aisha ← Profeta ﷺ (Muslim)",
        ],
        "رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا",
        [
          "Два ракаата перед фаджром лучше мира и всего, что в нем.",
          "The two rakahs before Fajr are better than this world and all that it contains.",
          "Las dos rakas antes del Fayr son mejores que el mundo y lo que contiene.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "1169",
        ["Аиша", "Aisha", "عائشة", "Aisha"],
        [
          "Аиша ← Пророк ﷺ (аль-Бухари)",
          "Aisha ← Prophet ﷺ (al-Bukhari)",
          "عائشة ← النبي ﷺ (البخاري)",
          "Aisha ← Profeta ﷺ (al-Bukhari)",
        ],
        "لَمْ يَكُنِ النَّبِيُّ ﷺ عَلَى شَيْءٍ مِنَ النَّوَافِلِ أَشَدَّ تَعَاهُدًا مِنْهُ عَلَى رَكْعَتَيِ الْفَجْرِ",
        [
          "Ни к одной добровольной молитве Пророк ﷺ не был так постоянен, как к двум ракаатам фаджра.",
          "The Prophet ﷺ was never more regular in any voluntary prayer than the two rakahs before Fajr.",
          "El Profeta ﷺ no fue tan constante en ninguna oracion voluntaria como en las dos rakas antes del Fayr.",
        ],
      ),
    ],
  },

  sunnah_dhuhr: {
    ayah: ayah(
      17,
      78,
      "أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ",
      [
        "Совершай молитву с отклонения солнца.",
        "Establish prayer at the decline of the sun.",
        "Establece la oracion desde la inclinacion del sol.",
      ],
      ["Сура аль-Исра, 17:78", "Surah Al-Isra, 17:78", "سورة الإسراء ١٧:٧٨", "Sura Al-Isra, 17:78"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih Muslim",
        "728",
        ["Умм Хабиба", "Umm Habibah", "أم حبيبة", "Umm Habibah"],
        [
          "Умм Хабиба ← Пророк ﷺ (Муслим)",
          "Umm Habibah ← Prophet ﷺ (Muslim)",
          "أم حبيبة ← النبي ﷺ (مسلم)",
          "Umm Habibah ← Profeta ﷺ (Muslim)",
        ],
        "مَنْ صَلَّى اثْنَتَيْ عَشْرَةَ رَكْعَةً... أَرْبَعًا قَبْلَ الظُّهْرِ وَرَكْعَتَيْنِ بَعْدَهَا",
        [
          "Кто совершает двенадцать ракаатов в день и ночь... четыре до зухра и два после него.",
          "Whoever prays twelve rakahs in a day and night... four before Dhuhr and two after it.",
          "Quien rece doce rakas al dia y la noche... cuatro antes del Dhuhr y dos despues.",
        ],
      ),
      hadith(
        "Sahih",
        "Sunan Abu Dawud",
        "1271",
        ["Умм Хабиба", "Umm Habibah", "أم حبيبة", "Umm Habibah"],
        [
          "Умм Хабиба ← Пророк ﷺ (Абу Дауд)",
          "Umm Habibah ← Prophet ﷺ (Abu Dawud)",
          "أم حبيبة ← النبي ﷺ (أبو داود)",
          "Umm Habibah ← Profeta ﷺ (Abu Dawud)",
        ],
        "مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ وَأَرْبَعٍ بَعْدَهَا حَرَّمَهُ اللَّهُ عَلَى النَّارِ",
        [
          "Кого постоянство в четырех ракаатах до зухра и четырех после него, того Аллах убережет от Огня.",
          "Whoever consistently prays four before Dhuhr and four after it, Allah will forbid the Fire for him.",
          "Quien preserve cuatro rakas antes del Dhuhr y cuatro despues, Allah le vedara el Fuego.",
        ],
      ),
    ],
  },

  sunnah_maghrib: {
    ayah: ayah(
      11,
      114,
      "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِنَ اللَّيْلِ",
      [
        "Совершай молитву в обоих концах дня и в часы ночи.",
        "Establish prayer at the two ends of the day and in early hours of the night.",
        "Establece la oracion en los dos extremos del dia y en las primeras horas de la noche.",
      ],
      ["Сура Худ, 11:114", "Surah Hud, 11:114", "سورة هود ١١:١١٤", "Sura Hud, 11:114"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "1180",
        ["Абдуллах ибн Умар", "Abdullah ibn Umar", "عبد الله بن عمر", "Abdullah ibn Umar"],
        [
          "Абдуллах ибн Умар ← Пророк ﷺ (аль-Бухари)",
          "Abdullah ibn Umar ← Prophet ﷺ (al-Bukhari)",
          "عبد الله بن عمر ← النبي ﷺ (البخاري)",
          "Abdullah ibn Umar ← Profeta ﷺ (al-Bukhari)",
        ],
        "حَفِظْتُ مِنَ النَّبِيِّ ﷺ ... وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ",
        [
          "Я запомнил от Пророка ﷺ ... два ракаата после магриба.",
          "I memorized from the Prophet ﷺ ... two rakahs after Maghrib.",
          "Memorice del Profeta ﷺ ... dos rakas despues del Maghrib.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih Muslim",
        "729",
        ["Умм Хабиба", "Umm Habibah", "أم حبيبة", "Umm Habibah"],
        [
          "Умм Хабиба ← Пророк ﷺ (Муслим)",
          "Umm Habibah ← Prophet ﷺ (Muslim)",
          "أم حبيبة ← النبي ﷺ (مسلم)",
          "Umm Habibah ← Profeta ﷺ (Muslim)",
        ],
        "وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ",
        [
          "И два ракаата после магриба (в числе постоянных сунн).",
          "And two rakahs after Maghrib (among the regular sunnah prayers).",
          "Y dos rakas despues del Maghrib (entre las sunnas regulares).",
        ],
      ),
    ],
  },

  sunnah_isha: {
    ayah: ayah(
      24,
      58,
      "وَمِنْ بَعْدِ صَلَاةِ الْعِشَاءِ",
      [
        "И после ночной молитвы.",
        "And after the night prayer.",
        "Y despues de la oracion de la noche.",
      ],
      ["Сура ан-Нур, 24:58", "Surah An-Nur, 24:58", "سورة النور ٢٤:٥٨", "Sura An-Nur, 24:58"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "1172",
        ["Абдуллах ибн Умар", "Abdullah ibn Umar", "عبد الله بن عمر", "Abdullah ibn Umar"],
        [
          "Абдуллах ибн Умар ← Пророк ﷺ (аль-Бухари)",
          "Abdullah ibn Umar ← Prophet ﷺ (al-Bukhari)",
          "عبد الله بن عمر ← النبي ﷺ (البخاري)",
          "Abdullah ibn Umar ← Profeta ﷺ (al-Bukhari)",
        ],
        "وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ فِي بَيْتِهِ",
        [
          "И два ракаата после иша в его доме.",
          "And two rakahs after Isha in his house.",
          "Y dos rakas despues del Isha en su casa.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih Muslim",
        "730",
        ["Умм Хабиба", "Umm Habibah", "أم حبيبة", "Umm Habibah"],
        [
          "Умм Хабиба ← Пророк ﷺ (Муслим)",
          "Umm Habibah ← Prophet ﷺ (Muslim)",
          "أم حبيبة ← النبي ﷺ (مسلم)",
          "Umm Habibah ← Profeta ﷺ (Muslim)",
        ],
        "وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ",
        [
          "И два ракаата после иша (в числе сунн-раватиб).",
          "And two rakahs after Isha (among the regular sunnah prayers).",
          "Y dos rakas despues del Isha (entre las sunnas regulares).",
        ],
      ),
    ],
  },

  salawat: {
    ayah: ayah(
      33,
      56,
      "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ",
      [
        "Поистине, Аллах и Его ангелы благословляют Пророка.",
        "Indeed, Allah and His angels send blessings upon the Prophet.",
        "Ciertamente Allah y Sus angeles bendicen al Profeta.",
      ],
      ["Сура аль-Ахзаб, 33:56", "Surah Al-Ahzab, 33:56", "سورة الأحزاب ٣٣:٥٦", "Sura Al-Ahzab, 33:56"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih Muslim",
        "408",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (Муслим)",
          "Abu Huraira ← Prophet ﷺ (Muslim)",
          "أبو هريرة ← النبي ﷺ (مسلم)",
          "Abu Huraira ← Profeta ﷺ (Muslim)",
        ],
        "مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا",
        [
          "Кто благословит меня один раз, того Аллах благословит десять раз.",
          "Whoever sends one blessing upon me, Allah sends ten blessings upon him.",
          "Quien envie una bendicion sobre mi, Allah le concede diez bendiciones.",
        ],
      ),
      hadith(
        "Sahih",
        "Sunan an-Nasai",
        "1374",
        ["Аус ибн Аус", "Aws ibn Aws", "أوس بن أوس", "Aws ibn Aws"],
        [
          "Аус ибн Аус ← Пророк ﷺ (ан-Насаи)",
          "Aws ibn Aws ← Prophet ﷺ (an-Nasai)",
          "أوس بن أوس ← النبي ﷺ (النسائي)",
          "Aws ibn Aws ← Profeta ﷺ (an-Nasai)",
        ],
        "إِنَّ مِنْ أَفْضَلِ أَيَّامِكُمْ يَوْمَ الْجُمُعَةِ... فَأَكْثِرُوا عَلَيَّ مِنَ الصَّلَاةِ",
        [
          "Поистине, лучший из ваших дней - пятница... так умножайте салават на меня.",
          "Indeed, one of your best days is Friday... so increase sending blessings upon me.",
          "Ciertamente, uno de vuestros mejores dias es el viernes... aumentad las bendiciones sobre mi.",
        ],
      ),
    ],
  },

  istighfar: {
    ayah: ayah(
      47,
      19,
      "وَاسْتَغْفِرْ لِذَنْبِكَ",
      [
        "Проси прощения за свой грех.",
        "Seek forgiveness for your sin.",
        "Pide perdon por tu falta.",
      ],
      ["Сура Мухаммад, 47:19", "Surah Muhammad, 47:19", "سورة محمد ٤٧:١٩", "Sura Muhammad, 47:19"],
    ),
    hadiths: [
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "6307",
        ["Абу Хурайра", "Abu Huraira", "أبو هريرة", "Abu Huraira"],
        [
          "Абу Хурайра ← Пророк ﷺ (аль-Бухари)",
          "Abu Huraira ← Prophet ﷺ (al-Bukhari)",
          "أبو هريرة ← النبي ﷺ (البخاري)",
          "Abu Huraira ← Profeta ﷺ (al-Bukhari)",
        ],
        "وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً",
        [
          "Клянусь Аллахом, я прошу у Аллаха прощения и каюсь Ему более семидесяти раз в день.",
          "By Allah, I seek Allah's forgiveness and repent to Him more than seventy times a day.",
          "Por Allah, pido perdon a Allah y me arrepiento ante El mas de setenta veces al dia.",
        ],
      ),
      hadith(
        "Sahih",
        "Sahih al-Bukhari",
        "6306",
        ["Шаддад ибн Аус", "Shaddad ibn Aws", "شداد بن أوس", "Shaddad ibn Aws"],
        [
          "Шаддад ибн Аус ← Пророк ﷺ (аль-Бухари)",
          "Shaddad ibn Aws ← Prophet ﷺ (al-Bukhari)",
          "شداد بن أوس ← النبي ﷺ (البخاري)",
          "Shaddad ibn Aws ← Profeta ﷺ (al-Bukhari)",
        ],
        "سَيِّدُ الِاسْتِغْفَارِ أَنْ يَقُولَ: اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ...",
        [
          "Лучшая форма истигфара: О Аллах, Ты мой Господь, нет божества кроме Тебя...",
          "The master supplication for forgiveness is: O Allah, You are my Lord, none has the right to be worshipped but You...",
          "La formula suprema del perdon es: Allahumma anta rabbi la ilaha illa anta...",
        ],
      ),
    ],
  },
};

export function getSunnahIds() {
  return Object.keys(SUNNAH_EVIDENCE);
}
