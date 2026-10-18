function toDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Morning checklist text for web push (server-only, no client imports). */
export function buildMorningChecklistForPush(tasks, habits, tr) {
  const today = toDateKey();
  const activeTasks = (tasks || [])
    .filter((task) => !task.completed)
    .filter((task) => !task.deadline || task.deadline <= today)
    .slice(0, 12);

  const pendingHabits = (habits || [])
    .filter((habit) => !habit.logs?.[today])
    .slice(0, 6);

  const lines = [];
  if (activeTasks.length > 0) {
    lines.push(`${tr('checklistTasks')} (${activeTasks.length}):`);
    activeTasks.forEach((task) => {
      lines.push(`• ${task.title || tr('deadline')}`);
    });
    if ((tasks || []).filter((t) => !t.completed && (!t.deadline || t.deadline <= today)).length > 12) {
      const rest =
        (tasks || []).filter((t) => !t.completed && (!t.deadline || t.deadline <= today)).length - 12;
      lines.push(`… +${rest}`);
    }
  }

  if (pendingHabits.length > 0) {
    if (lines.length) lines.push('');
    lines.push(`${tr('checklistHabits')} (${pendingHabits.length}):`);
    pendingHabits.forEach((habit) => {
      lines.push(`• ${habit.title || ''}`);
    });
    const totalPending = (habits || []).filter((h) => !h.logs?.[today]).length;
    if (totalPending > 6) {
      lines.push(`… +${totalPending - 6}`);
    }
  }

  if (lines.length === 0) {
    return tr('checklistEmpty');
  }

  return lines.join('\n');
}
