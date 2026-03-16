import React, { useEffect, useState, useCallback, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { getAlbumList, SubsonicAlbum } from '../api/subsonic';
import AlbumCard from '../components/AlbumCard';
import { useTranslation } from 'react-i18next';

const ALBUM_COUNT = 30;

export default function RandomAlbums() {
  const { t } = useTranslation();
  const [albums, setAlbums] = useState<SubsonicAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const data = await getAlbumList('random', ALBUM_COUNT);
      setAlbums(data);
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="content-body animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>{t('randomAlbums.title')}</h1>
        <button
          className="btn btn-ghost"
          onClick={load}
          disabled={loading}
          data-tooltip={t('randomAlbums.refresh')}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {t('randomAlbums.refresh')}
        </button>
      </div>

      {loading && albums.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" />
        </div>
      ) : (
        <div className="album-grid-wrap">
          {albums.map(a => <AlbumCard key={a.id} album={a} />)}
        </div>
      )}
    </div>
  );
}
