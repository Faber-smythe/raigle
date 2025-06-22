

import { create } from 'zustand';
import { PeriodEntry } from '@/misc/Types';

interface PeriodState {
  entries: PeriodEntry[];
  addEntry: (entry: PeriodEntry) => void;
  removeEntry: (date: string) => void;
  loadFromStorage: () => void;
}



export const usePeriodStore = create<PeriodState>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => {
      console.log("adding entry : ", entry)
      const updated = state.entries.filter(e => e.date !== entry.date).concat(entry);
      localStorage.setItem('periodEntries', JSON.stringify(updated));
      return { entries: updated };
    }),
  removeEntry: (date) =>
    set((state) => {
      console.log("removing entry : ", date)
      const updated = state.entries.filter(e => e.date !== date);
      localStorage.setItem('periodEntries', JSON.stringify(updated));
      return { entries: updated };
    }),
  loadFromStorage: () =>
    set(() => {
      const stored = localStorage.getItem('periodEntries');
      return { entries: stored ? JSON.parse(stored) : [] };
    }),
}));