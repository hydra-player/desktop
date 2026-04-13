import React, { useEffect, useState, useRef, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import {
  HardDriveUpload, FolderOpen, Loader2,
  ListMusic, Disc3, Users, CheckCircle2, AlertCircle, SkipForward, Trash2,
  ChevronRight, ChevronDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDeviceSyncStore, DeviceSyncSource } from '../store/deviceSyncStore';
import {
  getPlaylists, getAlbumList, getArtists, getAlbum, getPlaylist, getArtist,
  buildDownloadUrl, SubsonicSong, SubsonicAlbum, SubsonicPlaylist, SubsonicArtist,
} from '../api/subsonic';
import { showToast } from '../utils/toast';

type SourceTab = 'playlists' | 'albums' | 'artists';

// ─── helpers ─────────────────────────────────────────────────────────────────

function uuid(): string { return crypto.randomUUID(); }

async function fetchTracksForSource(source: DeviceSyncSource): Promise<SubsonicSong[]> {
  if (source.type === 'playlist') { const { songs } = await getPlaylist(source.id); return songs; }
  if (source.type === 'album')    { const { songs } = await getAlbum(source.id);    return songs; }
  const { albums } = await getArtist(source.id);
  const all: SubsonicSong[] = [];
  for (const album of albums) { const { songs } = await getAlbum(album.id); all.push(...songs); }
  return all;
}

function trackToSyncInfo(track: SubsonicSong, url: string) {
  return {
    id: track.id, url,
    suffix: track.suffix ?? 'mp3',
    artist: track.artist ?? '',
    album: track.album ?? '',
    title: track.title ?? '',
    trackNumber: track.track,
    discNumber: track.discNumber,
    year: track.year,
  };
}

// ─── component ───────────────────────────────────────────────────────────────

export default function DeviceSync() {
  const { t } = useTranslation();

  const targetDir        = useDeviceSyncStore(s => s.targetDir);
  const filenameTemplate = useDeviceSyncStore(s => s.filenameTemplate);
  const sources          = useDeviceSyncStore(s => s.sources);
  const checkedIds       = useDeviceSyncStore(s => s.checkedIds);
  const activeJob        = useDeviceSyncStore(s => s.activeJob);
  const { setTargetDir, setFilenameTemplate, addSource, removeSource,
    clearSources, toggleChecked, setCheckedIds, setActiveJob, updateJob } =
    useDeviceSyncStore.getState();

  const [activeTab, setActiveTab]           = useState<SourceTab>('albums');
  const [search, setSearch]                 = useState('');
  const [playlists, setPlaylists]           = useState<SubsonicPlaylist[]>([]);
  const [albums, setAlbums]                 = useState<SubsonicAlbum[]>([]);
  const [artists, setArtists]               = useState<SubsonicArtist[]>([]);
  const [loadingBrowser, setLoadingBrowser]     = useState(false);
  const [deleting, setDeleting]                 = useState(false);
  const [expandedArtistIds, setExpandedArtistIds] = useState<Set<string>>(new Set());
  const [artistAlbumsMap, setArtistAlbumsMap]   = useState<Map<string, SubsonicAlbum[]>>(new Map());
  const [loadingArtistIds, setLoadingArtistIds] = useState<Set<string>>(new Set());

  const cancelRef = useRef(false);

  // Load browser data when tab switches
  useEffect(() => {
    setSearch('');
    if (activeTab === 'playlists' && playlists.length === 0) loadPlaylists();
    if (activeTab === 'albums'    && albums.length === 0)    loadAlbums();
    if (activeTab === 'artists'   && artists.length === 0)   loadArtists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadPlaylists = useCallback(async () => {
    setLoadingBrowser(true);
    try { setPlaylists(await getPlaylists()); } catch { /* ignore */ }
    finally { setLoadingBrowser(false); }
  }, []);
  const loadAlbums = useCallback(async () => {
    setLoadingBrowser(true);
    try { setAlbums(await getAlbumList('alphabeticalByName', 500, 0)); } catch { /* ignore */ }
    finally { setLoadingBrowser(false); }
  }, []);
  const loadArtists = useCallback(async () => {
    setLoadingBrowser(true);
    try { setArtists(await getArtists()); } catch { /* ignore */ }
    finally { setLoadingBrowser(false); }
  }, []);

  const toggleArtistExpand = useCallback(async (artistId: string) => {
    setExpandedArtistIds(prev => {
      const next = new Set(prev);
      if (next.has(artistId)) { next.delete(artistId); return next; }
      next.add(artistId);
      return next;
    });
    if (!artistAlbumsMap.has(artistId)) {
      setLoadingArtistIds(prev => new Set(prev).add(artistId));
      try {
        const { albums } = await getArtist(artistId);
        setArtistAlbumsMap(prev => new Map(prev).set(artistId, albums));
      } finally {
        setLoadingArtistIds(prev => { const n = new Set(prev); n.delete(artistId); return n; });
      }
    }
  }, [artistAlbumsMap]);

  const q                 = search.toLowerCase();
  const filteredPlaylists = playlists.filter(p => p.name.toLowerCase().includes(q));
  const filteredAlbums    = albums.filter(a =>
    a.name.toLowerCase().includes(q) || (a.artist ?? '').toLowerCase().includes(q));
  const filteredArtists   = artists.filter(a => a.name.toLowerCase().includes(q));

  const handleChooseFolder = async () => {
    const sel = await openDialog({ directory: true, multiple: false, title: t('deviceSync.chooseFolder') });
    if (sel) setTargetDir(sel as string);
  };

  // ─── Sync ────────────────────────────────────────────────────────────────

  const handleSync = async () => {
    if (!targetDir)          { showToast(t('deviceSync.noTargetDir'), 3000, 'error'); return; }
    if (sources.length === 0){ showToast(t('deviceSync.noSources'),   3000, 'error'); return; }

    cancelRef.current = false;
    const jobId = uuid();
    setActiveJob({ id: jobId, total: 0, done: 0, skipped: 0, failed: 0, status: 'running' });

    let allTracks: SubsonicSong[] = [];
    try {
      for (const source of sources) {
        if (cancelRef.current) break;
        allTracks.push(...await fetchTracksForSource(source));
      }
    } catch {
      showToast(t('deviceSync.fetchError'), 3000, 'error');
      setActiveJob(null);
      return;
    }

    const seen = new Set<string>();
    allTracks = allTracks.filter(t => { if (seen.has(t.id)) return false; seen.add(t.id); return true; });

    if (allTracks.length === 0) {
      showToast(t('deviceSync.noTracks'), 3000, 'error');
      setActiveJob(null);
      return;
    }

    updateJob({ total: allTracks.length });

    const unlisten = await listen<{ jobId: string; status: string }>(
      'device:sync:progress',
      ({ payload }) => {
        if (payload.jobId !== jobId) return;
        const st = useDeviceSyncStore.getState().activeJob!;
        if      (payload.status === 'done')    updateJob({ done:    st.done    + 1 });
        else if (payload.status === 'skipped') updateJob({ skipped: st.skipped + 1 });
        else if (payload.status === 'error')   updateJob({ failed:  st.failed  + 1 });
      }
    );

    const CONCURRENCY = 4;
    let idx = 0;
    const worker = async () => {
      while (idx < allTracks.length && !cancelRef.current) {
        const track = allTracks[idx++];
        try {
          await invoke('sync_track_to_device', {
            track: trackToSyncInfo(track, buildDownloadUrl(track.id)),
            destDir: targetDir,
            template: filenameTemplate,
            jobId,
          });
        } catch { /* emitted via event */ }
      }
    };

    try {
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    } finally {
      unlisten();
    }

    updateJob({ status: cancelRef.current ? 'cancelled' : 'done' });
  };

  // ─── Delete checked items from device ────────────────────────────────────

  const handleDeleteChecked = async () => {
    if (!targetDir || checkedIds.length === 0) return;

    const toDelete = sources.filter(s => checkedIds.includes(s.id));
    const confirmed = window.confirm(
      t('deviceSync.confirmDelete', { count: toDelete.length, names: toDelete.map(s => s.name).join(', ') })
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      // Collect all tracks for the checked sources
      let tracks: SubsonicSong[] = [];
      for (const source of toDelete) {
        tracks.push(...await fetchTracksForSource(source));
      }
      const seen = new Set<string>();
      tracks = tracks.filter(t => { if (seen.has(t.id)) return false; seen.add(t.id); return true; });

      // Compute expected device paths via Rust (same sanitizer as sync)
      const paths = await invoke<string[]>('compute_sync_paths', {
        tracks: tracks.map(t => trackToSyncInfo(t, '')),
        destDir: targetDir,
        template: filenameTemplate,
      });

      for (const path of paths) {
        await invoke('delete_device_file', { path }).catch(() => {});
      }

      // Remove from the list
      for (const s of toDelete) removeSource(s.id);
      showToast(t('deviceSync.deleteComplete', { count: toDelete.length }), 3000, 'info');
    } catch {
      showToast(t('deviceSync.fetchError'), 3000, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => { cancelRef.current = true; };
  const isRunning = activeJob?.status === 'running';
  const isDone    = activeJob?.status === 'done';

  const allChecked = sources.length > 0 && sources.every(s => checkedIds.includes(s.id));
  const toggleAll  = () => setCheckedIds(allChecked ? [] : sources.map(s => s.id));

  const tabs: { key: SourceTab; icon: React.ReactNode; label: string }[] = [
    { key: 'playlists', icon: <ListMusic size={14} />, label: t('deviceSync.tabPlaylists') },
    { key: 'albums',    icon: <Disc3 size={14} />,     label: t('deviceSync.tabAlbums') },
    { key: 'artists',   icon: <Users size={14} />,     label: t('deviceSync.tabArtists') },
  ];

  return (
    <div className="device-sync-page">

      {/* ── Header ── */}
      <div className="device-sync-header">
        <HardDriveUpload size={20} />
        <h1>{t('deviceSync.title')}</h1>
        <div className="device-sync-header-config">
          <span className="device-sync-folder-path" data-tooltip={targetDir ?? ''}>
            {targetDir ?? t('deviceSync.noFolderChosen')}
          </span>
          <button className="btn btn-surface" onClick={handleChooseFolder}>
            <FolderOpen size={13} />{t('deviceSync.chooseFolder')}
          </button>
        </div>
      </div>

      {/* ── Template (collapsed row) ── */}
      <div className="device-sync-template-row">
        <span className="device-sync-label-inline">{t('deviceSync.filenameTemplate')}</span>
        <input
          className="input device-sync-template-input"
          value={filenameTemplate}
          onChange={e => setFilenameTemplate(e.target.value)}
          spellCheck={false}
          data-tooltip={t('deviceSync.templateHint')}
          data-tooltip-pos="bottom"
        />
      </div>

      {/* ── Main ── */}
      <div className="device-sync-main">

        {/* ── Browser (left) ── */}
        <div className="device-sync-browser">
            <div className="device-sync-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`device-sync-tab${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon}{tab.label}
                </button>
              ))}
            </div>
            <div className="device-sync-search-wrap">
              <input
                className="input"
                placeholder={t('deviceSync.searchPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="device-sync-list">
              {loadingBrowser && (
                <div className="device-sync-loading"><Loader2 size={16} className="spin" /></div>
              )}
              {activeTab === 'playlists' && filteredPlaylists.map(pl => (
                <BrowserRow key={pl.id} name={pl.name} meta={`${pl.songCount} tracks`}
                  selected={sources.some(s => s.id === pl.id)}
                  onToggle={() => sources.some(s => s.id === pl.id)
                    ? removeSource(pl.id)
                    : addSource({ type: 'playlist', id: pl.id, name: pl.name })} />
              ))}
              {activeTab === 'albums' && filteredAlbums.map(al => (
                <BrowserRow key={al.id} name={al.name} meta={al.artist}
                  selected={sources.some(s => s.id === al.id)}
                  onToggle={() => sources.some(s => s.id === al.id)
                    ? removeSource(al.id)
                    : addSource({ type: 'album', id: al.id, name: al.name })} />
              ))}
              {activeTab === 'artists' && filteredArtists.map(ar => (
                <React.Fragment key={ar.id}>
                  <div className="device-sync-artist-row">
                    <button
                      className="device-sync-expand-btn"
                      onClick={() => toggleArtistExpand(ar.id)}
                    >
                      {loadingArtistIds.has(ar.id)
                        ? <Loader2 size={13} className="spin" />
                        : expandedArtistIds.has(ar.id)
                          ? <ChevronDown size={13} />
                          : <ChevronRight size={13} />}
                    </button>
                    <span className="device-sync-row-name">{ar.name}</span>
                    {ar.albumCount != null &&
                      <span className="device-sync-row-meta">{ar.albumCount} Alben</span>}
                  </div>
                  {expandedArtistIds.has(ar.id) && artistAlbumsMap.has(ar.id) &&
                    artistAlbumsMap.get(ar.id)!.map(al => (
                      <BrowserRow key={al.id} name={al.name} meta={al.year?.toString()}
                        selected={sources.some(s => s.id === al.id)}
                        indent
                        onToggle={() => sources.some(s => s.id === al.id)
                          ? removeSource(al.id)
                          : addSource({ type: 'album', id: al.id, name: al.name })} />
                    ))
                  }
                </React.Fragment>
              ))}
            </div>
          </div>

        {/* ── Device list (right) ── */}
        <div className="device-sync-device-panel">
          <div className="device-sync-panel-header">
            <span className="device-sync-panel-title">{t('deviceSync.onDevice')}</span>
            <div className="device-sync-panel-actions">
              {!activeJob && (
                <button
                  className="btn btn-surface"
                  onClick={handleSync}
                  disabled={!targetDir || sources.length === 0}
                >
                  <HardDriveUpload size={13} />
                  {t('deviceSync.syncButton')}
                </button>
              )}
              {checkedIds.length > 0 && !isRunning && (
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteChecked}
                  disabled={deleting}
                >
                  {deleting ? <Loader2 size={13} className="spin" /> : <Trash2 size={13} />}
                  {t('deviceSync.deleteFromDevice', { count: checkedIds.length })}
                </button>
              )}
            </div>
          </div>

          {sources.length === 0 ? (
            <p className="device-sync-empty">{t('deviceSync.noSourcesSelected')}</p>
          ) : (
            <>
              <div className="device-sync-list-header">
                <label className="device-sync-check-label">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                </label>
                <span className="device-sync-list-col-name">{t('deviceSync.colName')}</span>
                <span className="device-sync-list-col-type">{t('deviceSync.colType')}</span>
              </div>
              <div className="device-sync-device-list">
                {sources.map(s => (
                  <label key={s.id} className={`device-sync-device-row${checkedIds.includes(s.id) ? ' checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(s.id)}
                      onChange={() => toggleChecked(s.id)}
                    />
                    <span className="device-sync-row-name">{s.name}</span>
                    <span className="device-sync-source-type">{s.type}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Progress / sync result */}
          {activeJob && (
            <div className="device-sync-progress">
              <div className="device-sync-progress-bar-wrap">
                <div
                  className="device-sync-progress-bar"
                  style={{ width: activeJob.total > 0
                    ? `${((activeJob.done + activeJob.skipped + activeJob.failed) / activeJob.total) * 100}%`
                    : '0%' }}
                />
              </div>
              <div className="device-sync-progress-stats">
                {isRunning && <Loader2 size={13} className="spin" />}
                {isDone    && <CheckCircle2 size={13} className="color-success" />}
                <span>
                  {isDone
                    ? t('deviceSync.syncResult', { done: activeJob.done, skipped: activeJob.skipped, total: activeJob.total })
                    : `${activeJob.done + activeJob.skipped + activeJob.failed} / ${activeJob.total}`}
                </span>
                {activeJob.failed > 0 && (
                  <span className="device-sync-stat-error"><AlertCircle size={12} /> {activeJob.failed}</span>
                )}
                {activeJob.skipped > 0 && (
                  <span className="device-sync-stat-muted"><SkipForward size={12} /> {activeJob.skipped}</span>
                )}
                {isRunning
                  ? <button className="btn btn-ghost" onClick={handleCancel}>{t('deviceSync.cancel')}</button>
                  : <button className="btn btn-ghost" onClick={() => setActiveJob(null)}>{t('deviceSync.dismiss')}</button>
                }
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// ─── BrowserRow ──────────────────────────────────────────────────────────────

function BrowserRow({ name, meta, selected, onToggle, indent }: {
  name: string; meta?: string; selected: boolean; onToggle: () => void; indent?: boolean;
}) {
  return (
    <button className={`device-sync-browser-row${selected ? ' selected' : ''}${indent ? ' indent' : ''}`} onClick={onToggle}>
      <span className="device-sync-row-check">
        {selected ? <CheckCircle2 size={14} /> : <span className="device-sync-row-circle" />}
      </span>
      <span className="device-sync-row-name">{name}</span>
      {meta && <span className="device-sync-row-meta">{meta}</span>}
    </button>
  );
}
