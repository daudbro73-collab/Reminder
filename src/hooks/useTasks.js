import { useState, useEffect, useCallback, useRef } from 'react';
import { loadArray, saveJson } from '../utils/userStorage';
import { createId } from '../utils/id';

const STORAGE_BASE = 'reminder-tasks';

function loadTasks(userId) {
  return loadArray(userId, STORAGE_BASE);
}

function saveTasks(userId, tasks) {
  saveJson(userId, STORAGE_BASE, tasks);
}

export function useTasks(userId) {
  const [tasks, setTasks] = useState(() => (userId ? loadTasks(userId) : []));
  const skipSaveRef = useRef(true);

  useEffect(() => {
    skipSaveRef.current = true;
    if (!userId) {
      setTasks([]);
      return;
    }
    setTasks(loadTasks(userId));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }
    saveTasks(userId, tasks);
  }, [userId, tasks]);

  const addTask = useCallback(({ title, category, deadline, note, presetId }) => {
    const task = {
      id: createId(),
      title: title.trim(),
      category,
      deadline: deadline || null,
      note: note?.trim() || '',
      presetId: presetId || null,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    return task;
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  return { tasks, addTask, toggleTask, deleteTask, updateTask };
}

export function getTaskStatus(task) {
  if (task.completed) return 'completed';
  if (!task.deadline) return 'active';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(task.deadline + 'T00:00:00');
  if (deadline < today) return 'overdue';
  if (deadline.getTime() === today.getTime()) return 'today';
  return 'active';
}

export function getCategoryProgress(tasks, categoryId) {
  if (!Array.isArray(tasks)) return { total: 0, completed: 0, percent: 0 };
  const categoryTasks = tasks.filter((t) => t.category === categoryId);
  if (categoryTasks.length === 0) return { total: 0, completed: 0, percent: 0 };
  const completed = categoryTasks.filter((t) => t.completed).length;
  return {
    total: categoryTasks.length,
    completed,
    percent: Math.round((completed / categoryTasks.length) * 100),
  };
}

export function getOverallProgress(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return { total: 0, completed: 0, percent: 0 };
  }
  const completed = tasks.filter((t) => t.completed).length;
  return {
    total: tasks.length,
    completed,
    percent: Math.round((completed / tasks.length) * 100),
  };
}
