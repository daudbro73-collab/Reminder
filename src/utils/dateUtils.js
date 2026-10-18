export function toDateKey(date = new Date()) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(dateKey, days) {
  const d = new Date(dateKey + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

export function getDateRange(endKey, days) {
  const range = [];
  for (let i = days - 1; i >= 0; i--) {
    range.push(addDays(endKey, -i));
  }
  return range;
}

export function daysBetween(startKey, endKey) {
  const start = new Date(startKey + 'T00:00:00');
  const end = new Date(endKey + 'T00:00:00');
  return Math.round((end - start) / 86400000);
}

export function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = last.getDate();

  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, dateKey: key });
  }
  return cells;
}

export function isTimeMatch(timeStr, windowMinutes = 2) {
  if (!timeStr) return false;
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  return Math.abs(now - target) / 60000 <= windowMinutes;
}
