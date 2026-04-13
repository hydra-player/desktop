import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DeviceSyncSource {
  type: 'album' | 'playlist' | 'artist';
  id: string;
  name: string;
}

export interface DeviceSyncJob {
  id: string;
  total: number;
  done: number;
  skipped: number;
  failed: number;
  status: 'running' | 'done' | 'cancelled';
}

interface DeviceSyncState {
  targetDir: string | null;
  filenameTemplate: string;
  sources: DeviceSyncSource[];        // persistent device content list
  checkedIds: string[];               // currently checked for deletion (not persisted)
  activeJob: DeviceSyncJob | null;

  setTargetDir: (dir: string | null) => void;
  setFilenameTemplate: (t: string) => void;
  addSource: (source: DeviceSyncSource) => void;
  removeSource: (id: string) => void;
  clearSources: () => void;
  toggleChecked: (id: string) => void;
  setCheckedIds: (ids: string[]) => void;
  setActiveJob: (job: DeviceSyncJob | null) => void;
  updateJob: (update: Partial<DeviceSyncJob>) => void;
}

export const useDeviceSyncStore = create<DeviceSyncState>()(
  persist(
    (set) => ({
      targetDir: null,
      filenameTemplate: '{artist}/{album}/{track_number} - {title}',
      sources: [],
      checkedIds: [],
      activeJob: null,

      setTargetDir: (dir) => set({ targetDir: dir }),
      setFilenameTemplate: (t) => set({ filenameTemplate: t }),

      addSource: (source) =>
        set((s) => ({
          sources: s.sources.some((x) => x.id === source.id)
            ? s.sources
            : [...s.sources, source],
        })),

      removeSource: (id) =>
        set((s) => ({
          sources: s.sources.filter((x) => x.id !== id),
          checkedIds: s.checkedIds.filter((x) => x !== id),
        })),

      clearSources: () => set({ sources: [], checkedIds: [] }),

      toggleChecked: (id) =>
        set((s) => ({
          checkedIds: s.checkedIds.includes(id)
            ? s.checkedIds.filter((x) => x !== id)
            : [...s.checkedIds, id],
        })),

      setCheckedIds: (ids) => set({ checkedIds: ids }),

      setActiveJob: (job) => set({ activeJob: job }),

      updateJob: (update) =>
        set((s) => ({
          activeJob: s.activeJob ? { ...s.activeJob, ...update } : null,
        })),
    }),
    {
      name: 'psysonic_device_sync',
      partialize: (s) => ({
        targetDir: s.targetDir,
        filenameTemplate: s.filenameTemplate,
        sources: s.sources,
      }),
    }
  )
);
