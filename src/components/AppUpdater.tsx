import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { open } from '@tauri-apps/plugin-shell';
import { RefreshCw, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { version as currentVersion } from '../../package.json';

// Semver comparison: returns true if `a` is newer than `b`
function isNewer(a: string, b: string): boolean {
  const pa = a.replace(/^[^0-9]*/, '').split('.').map(Number);
  const pb = b.replace(/^[^0-9]*/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
  }
  return false;
}

export default function AppUpdater() {
  const { t } = useTranslation();
  const [newVersion, setNewVersion] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled) return;
      try {
        const res = await fetch('https://api.github.com/repos/Psychotoxical/psysonic/releases/latest');
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const tag: string = data.tag_name ?? '';
        if (!cancelled && tag && isNewer(tag, currentVersion)) {
          setNewVersion(tag.replace(/^[^0-9]*/, ''));
        }
      } catch {
        // No network or rate-limited — stay idle
      }
    }, 4000);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  if (!newVersion || dismissed) return null;

  return createPortal(
    <div className="app-updater-toast">
      <div className="app-updater-header">
        <RefreshCw size={13} />
        <span className="app-updater-label">{t('common.updaterAvailable')}</span>
        <button className="app-updater-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss">
          <X size={12} />
        </button>
      </div>
      <div className="app-updater-version">{t('common.updaterVersion', { version: newVersion })}</div>
      <div className="app-updater-actions">
        <button
          className="app-updater-btn-primary"
          onClick={() => open('https://github.com/Psychotoxical/psysonic/releases/latest')}
        >
          GitHub
        </button>
        <button
          className="app-updater-btn-secondary"
          onClick={() => open('https://psysonic.psychotoxic.eu/#downloads')}
        >
          {t('common.updaterWebsite')}
        </button>
      </div>
    </div>,
    document.body
  );
}
