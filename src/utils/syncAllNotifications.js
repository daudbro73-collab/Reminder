import { syncMuzakkirSchedule } from './muzakkirScheduler.js';
import { syncPrayerSchedule } from './prayerScheduler.js';
import { syncTaskSchedule } from './taskScheduler.js';

export async function syncAllNotifications({
  settings,
  lang,
  t,
  tasks,
  habits,
  prayerList,
  getMorningExtra,
}) {
  const [muzakkirOk, prayerOk, taskOk] = await Promise.all([
    syncMuzakkirSchedule(settings, lang, getMorningExtra),
    syncPrayerSchedule(settings, prayerList, t),
    syncTaskSchedule(settings, tasks, t),
  ]);

  return {
    muzakkir: muzakkirOk,
    prayer: prayerOk,
    task: taskOk,
    nativeActive: muzakkirOk || prayerOk || taskOk,
  };
}
