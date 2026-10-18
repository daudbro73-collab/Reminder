const spiritual = {
  ru: {
    quran: 'Чтение Корана',
    morning_dhikr: 'Утренний зикр',
    evening_dhikr: 'Вечерний зикр',
    tahajjud: 'Тахаджуд / киям',
    duha: 'Молитва духа',
    witr: 'Витр',
    sunnah_fajr: '2 раката до фаджра',
    sunnah_dhuhr: 'Ракаты зухра (до/после)',
    sunnah_maghrib: '2 раката после магриба',
    sunnah_isha: '2 раката после иша',
    salawat: 'Салават на Пророка ﷺ',
    istighfar: 'Истигфар',
    fast_mon_thu: 'Пост в понедельник и четверг',
    fast_white_days: 'Пост 3 дня полнолуния',
    fast_dawud: 'Пост Дауда',
  },
  en: {
    quran: 'Read Quran',
    morning_dhikr: 'Morning dhikr',
    evening_dhikr: 'Evening dhikr',
    tahajjud: 'Tahajjud / Qiyam',
    duha: 'Duha prayer',
    witr: 'Witr',
    sunnah_fajr: '2 rakats before Fajr',
    sunnah_dhuhr: 'Dhuhr rakats (before/after)',
    sunnah_maghrib: '2 rakats after Maghrib',
    sunnah_isha: '2 rakats after Isha',
    salawat: 'Salawat upon the Prophet ﷺ',
    istighfar: 'Istighfar',
    fast_mon_thu: 'Monday & Thursday fast',
    fast_white_days: 'White days fast (13–15)',
    fast_dawud: "Dawud's fast (alternate days)",
  },
  ar: {
    quran: 'قراءة القرآن',
    morning_dhikr: 'أذكار الصباح',
    evening_dhikr: 'أذكار المساء',
    tahajjud: 'التهجد / قيام الليل',
    duha: 'صلاة الضحى',
    witr: 'الوتر',
    sunnah_fajr: 'ركعتا الفجر',
    sunnah_dhuhr: 'ركعات الظهر (قبل/بعد)',
    sunnah_maghrib: 'ركعتان بعد المغرب',
    sunnah_isha: 'ركعتان بعد العشاء',
    salawat: 'الصلاة على النبي ﷺ',
    istighfar: 'الاستغفار',
    fast_mon_thu: 'صيام الاثنين والخميس',
    fast_white_days: 'صيام الأيام البيض',
    fast_dawud: 'صيام داود',
  },
  es: {
    quran: 'Leer el Corán',
    morning_dhikr: 'Dhikr matutino',
    evening_dhikr: 'Dhikr vespertino',
    tahajjud: 'Tahajjud / Qiyam',
    duha: 'Oración Duha',
    witr: 'Witr',
    sunnah_fajr: '2 rakats antes del Fajr',
    sunnah_dhuhr: 'Rakats del Dhuhr (antes/después)',
    sunnah_maghrib: '2 rakats tras Maghrib',
    sunnah_isha: '2 rakats tras Isha',
    salawat: 'Salawat al Profeta ﷺ',
    istighfar: 'Istighfar',
    fast_mon_thu: 'Ayuno lunes y jueves',
    fast_white_days: 'Ayuno de los días blancos',
    fast_dawud: 'Ayuno de Dawud',
  },
};

const prayers = {
  ru: { fajr: 'Фаджр', dhuhr: 'Зухр', asr: 'Аср', maghrib: 'Магриб', isha: 'Иша' },
  en: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  ar: { fajr: 'الفجر', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' },
  es: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
};

const physical = {
  ru: { morning_exercise: 'Утренняя зарядка', water: 'Пить 2л воды', walk: 'Прогулка 30 мин', sleep: 'Сон 7–8 часов', healthy_food: 'Здоровое питание', stretching: 'Растяжка', steps_10k: '10 000 шагов', no_sugar: 'Без сахара', vitamins: 'Витамины', ice_bath: 'Ледяные ванны', strength_training: 'Силовые тренировки', cardio: 'Кардио', intermittent_fasting: 'Интервальное голодание', keto_diet: 'Кето-диета' },
  en: { morning_exercise: 'Morning workout', water: 'Drink 2L water', walk: '30 min walk', sleep: 'Sleep 7–8 hours', healthy_food: 'Healthy meal', stretching: 'Stretching', steps_10k: '10,000 steps', no_sugar: 'No sugar', vitamins: 'Vitamins', ice_bath: 'Ice baths', strength_training: 'Strength training', cardio: 'Cardio', intermittent_fasting: 'Intermittent fasting', keto_diet: 'Keto diet' },
  ar: { morning_exercise: 'تمارين الصباح', water: 'شرب 2 لتر ماء', walk: 'مشي 30 دقيقة', sleep: 'نوم 7–8 ساعات', healthy_food: 'تغذية صحية', stretching: 'تمدد', steps_10k: '10,000 خطوة', no_sugar: 'بدون سكر', vitamins: 'فيتامينات', ice_bath: 'حمامات باردة', strength_training: 'تدريب القوة', cardio: 'تمارين القلب', intermittent_fasting: 'صيام متقطع', keto_diet: 'نظام الكيتو' },
  es: { morning_exercise: 'Ejercicio matutino', water: 'Beber 2L de agua', walk: 'Caminar 30 min', sleep: 'Dormir 7–8 horas', healthy_food: 'Comida saludable', stretching: 'Estiramientos', steps_10k: '10.000 pasos', no_sugar: 'Sin azúcar', vitamins: 'Vitaminas', ice_bath: 'Baños de hielo', strength_training: 'Entrenamiento de fuerza', cardio: 'Cardio', intermittent_fasting: 'Ayuno intermitente', keto_diet: 'Dieta keto' },
};

const intellectual = {
  ru: { read: 'Чтение', learn: 'Изучить новое', lecture: 'Посмотреть лекцию', memorize: 'Заучивание', hadith_study: 'Изучение хадисов', arabic: 'Арабский язык', tafsir: 'Тафсир', write_notes: 'Конспект', podcast: 'Полезный подкаст', revise: 'Повторение', teach: 'Передача знаний', reflect: 'Размышление (тафаккур)' },
  en: { read: 'Reading', learn: 'Learn something new', lecture: 'Watch a lecture', memorize: 'Memorization', hadith_study: 'Study hadith', arabic: 'Arabic language', tafsir: 'Tafsir', write_notes: 'Take notes', podcast: 'Educational podcast', revise: 'Revision', teach: 'Sharing knowledge', reflect: 'Reflection (tafakkur)' },
  ar: { read: 'القراءة', learn: 'تعلم شيئًا جديدًا', lecture: 'مشاهدة محاضرة', memorize: 'حفظ', hadith_study: 'دراسة الحديث', arabic: 'اللغة العربية', tafsir: 'التفسير', write_notes: 'كتابة ملاحظات', podcast: 'بودكاست مفيد', revise: 'مراجعة', teach: 'نقل المعرفة', reflect: 'تفكر' },
  es: { read: 'Lectura', learn: 'Aprender algo nuevo', lecture: 'Ver una conferencia', memorize: 'Memorización', hadith_study: 'Estudiar hadices', arabic: 'Idioma árabe', tafsir: 'Tafsir', write_notes: 'Tomar apuntes', podcast: 'Podcast educativo', revise: 'Repaso', teach: 'Transmisión del conocimiento', reflect: 'Reflexión (tafakkur)' },
};

const financial = {
  ru: { save: 'Отложить 10%', sadaqah: 'Садака', budget: 'Вести бюджет', investing: 'Инвестирование', halal_income: 'Халяльный доход', track_expenses: 'Учёт расходов', emergency_fund: 'Резервный фонд', family_support: 'Поддержка семьи', charity_box: 'Копилка садаки', diversification: 'Диверсификация', gratitude_wealth: 'Благодарность за ризк', sadaqah_jariyah: 'Садака джария' },
  en: { save: 'Save 10%', sadaqah: 'Give sadaqah', budget: 'Track budget', investing: 'Investing', halal_income: 'Halal income', track_expenses: 'Track expenses', emergency_fund: 'Emergency fund', family_support: 'Support family', charity_box: 'Charity box', diversification: 'Diversification', gratitude_wealth: 'Gratitude for rizq', sadaqah_jariyah: 'Ongoing charity (sadaqah jariyah)' },
  ar: { save: 'ادخار 10%', sadaqah: 'صدقة', budget: 'تتبع الميزانية', investing: 'الاستثمار', halal_income: 'دخل حلال', track_expenses: 'تسجيل المصروفات', emergency_fund: 'صندوق طوارئ', family_support: 'دعم الأسرة', charity_box: 'حصالة الصدقة', diversification: 'التنويع', gratitude_wealth: 'شكر على الرزق', sadaqah_jariyah: 'صدقة جارية' },
  es: { save: 'Ahorrar 10%', sadaqah: 'Sadaqah', budget: 'Controlar presupuesto', investing: 'Inversión', halal_income: 'Ingresos halal', track_expenses: 'Registrar gastos', emergency_fund: 'Fondo de emergencia', family_support: 'Apoyar a la familia', charity_box: 'Alcancía de caridad', diversification: 'Diversificación', gratitude_wealth: 'Gratitud por el rizq', sadaqah_jariyah: 'Sadaqah continua (jariyah)' },
};

const habitPhysical = {
  ru: { smoking: 'Курение', junk_food: 'Вредная еда', sedentary: 'Малоподвижность', late_sleep: 'Поздний сон', skip_exercise: 'Пропуск тренировок', no_water: 'Мало воды' },
  en: { smoking: 'Smoking', junk_food: 'Junk food', sedentary: 'Sedentary lifestyle', late_sleep: 'Late sleep', skip_exercise: 'Skipping exercise', no_water: 'Not drinking water' },
  ar: { smoking: 'التدخين', junk_food: 'طعام ضار', sedentary: 'قلة الحركة', late_sleep: 'النوم المتأخر', skip_exercise: 'تخطي الرياضة', no_water: 'قلة شرب الماء' },
  es: { smoking: 'Fumar', junk_food: 'Comida chatarra', sedentary: 'Sedentarismo', late_sleep: 'Dormir tarde', skip_exercise: 'Saltar ejercicio', no_water: 'Poca agua' },
};

const habitIntellectual = {
  ru: { social_media: 'Соцсети', gossip: 'Сплетни', wasting_time: 'Пустая трата времени', pointless_debates: 'Бесполезные споры', procrastination: 'Прокрастинация' },
  en: { social_media: 'Social media', gossip: 'Gossip', wasting_time: 'Wasting time', pointless_debates: 'Pointless debates', procrastination: 'Procrastination' },
  ar: { social_media: 'وسائل التواصل', gossip: 'الغيبة', wasting_time: 'إضاعة الوقت', pointless_debates: 'جدال باطل', procrastination: 'التسويف' },
  es: { social_media: 'Redes sociales', gossip: 'Chismes', wasting_time: 'Perder el tiempo', pointless_debates: 'Debates inútiles', procrastination: 'Procrastinación' },
};

const habitSpiritual = {
  ru: { miss_fajr: 'Пропуск фаджра', miss_prayer: 'Пропуск намаза', neglect_quran: 'Забывать Коран', skip_dhikr: 'Пропуск зикра', anger: 'Гнев', backbiting: 'Пересуды' },
  en: { miss_fajr: 'Missing Fajr', miss_prayer: 'Missing prayer', neglect_quran: 'Neglecting Quran', skip_dhikr: 'Skipping dhikr', anger: 'Anger', backbiting: 'Backbiting' },
  ar: { miss_fajr: 'تفويت الفجر', miss_prayer: 'تفويت الصلاة', neglect_quran: 'إهمال القرآن', skip_dhikr: 'تفويت الذكر', anger: 'الغضب', backbiting: 'الغيبة' },
  es: { miss_fajr: 'Perder el Fajr', miss_prayer: 'Perder oración', neglect_quran: 'Descuidar el Corán', skip_dhikr: 'Omitir dhikr', anger: 'Ira', backbiting: 'Murmuración' },
};

const habitFinancial = {
  ru: { impulse_buy: 'Импульсивные покупки', overspending: 'Перерасход', riba_debt: 'Долг с рибой', neglect_zakat: 'Забывать закят', hide_income: 'Скрывать доход', waste_money: 'Расточительство' },
  en: { impulse_buy: 'Impulse buying', overspending: 'Overspending', riba_debt: 'Riba debt', neglect_zakat: 'Neglecting zakat', hide_income: 'Hiding income', waste_money: 'Extravagance' },
  ar: { impulse_buy: 'شراء اندفاعي', overspending: 'إسراف', riba_debt: 'دين بالربا', neglect_zakat: 'إهمال الزكاة', hide_income: 'إخفاء الدخل', waste_money: 'الإسراف والتبذير' },
  es: { impulse_buy: 'Compras impulsivas', overspending: 'Gasto excesivo', riba_debt: 'Deuda con riba', neglect_zakat: 'Descuidar zakat', hide_income: 'Ocultar ingresos', waste_money: 'Derroche' },
};

export function getPrayerTranslations(lang) {
  return prayers[lang] || prayers.ru;
}

export function getPresetTranslations(lang) {
  return {
    spiritual: spiritual[lang],
    physical: physical[lang],
    intellectual: intellectual[lang],
    financial: financial[lang],
  };
}

export function getHabitPresetTranslations(lang) {
  return {
    physical: habitPhysical[lang],
    intellectual: habitIntellectual[lang],
    spiritual: habitSpiritual[lang],
    financial: habitFinancial[lang],
  };
}
