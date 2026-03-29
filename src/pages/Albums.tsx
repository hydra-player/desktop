import React, { useEffect, useState, useCallback, useRef } from 'react';
import AlbumCard from '../components/AlbumCard';
import GenreFilterBar from '../components/GenreFilterBar';
import { getAlbumList, getAlbumsByGenre, SubsonicAlbum } from '../api/subsonic';
import { useTranslation } from 'react-i18next';

type SortType = 'alphabeticalByName' | 'alphabeticalByArtist';

const PAGE_SIZE = 30;

async function fetchByGenres(genres: string[]): Promise<SubsonicAlbum[]> {
  const results = await Promise.all(genres.map(g => getAlbumsByGenre(g, 500, 0)));
  const seen = new Set<string>();
  return results.flat().filter(a => { if (seen.has(a.id)) return false; seen.add(a.id); return true; });
}

export default function Albums() {
  const { t } = useTranslation();
  const [albums, setAlbums] = useState<SubsonicAlbum[]>([]);
  const [sort, setSort] = useState<SortType>('alphabeticalByName');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);
  const filtered = selectedGenres.length > 0;

  const load = useCallback(async (sortType: SortType, offset: number, append = false) => {
    setLoading(true);
    try {
      const data = await getAlbumList(sortType, PAGE_SIZE, offset);
      if (append) setAlbums(prev => [...prev, ...data]);
      else setAlbums(data);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFiltered = useCallback(async (genres: string[], sortType: SortType) => {
    setLoading(true);
    try {
      const data = await fetchByGenres(genres);
      const sorted = [...data].sort((a, b) =>
        sortType === 'alphabeticalByArtist'
          ? a.artist.localeCompare(b.artist)
          : a.name.localeCompare(b.name)
      );
      setAlbums(sorted);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (filtered) loadFiltered(selectedGenres, sort);
    else { setPage(0); load(sort, 0); }
  }, [sort, filtered, selectedGenres, load, loadFiltered]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore || filtered) return;
    const next = page + 1;
    setPage(next);
    load(sort, next * PAGE_SIZE, true);
  }, [loading, hasMore, page, sort, load, filtered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'alphabeticalByName', label: t('albums.sortByName') },
    { value: 'alphabeticalByArtist', label: t('albums.sortByArtist') },
  ];

  return (
    <div className="content-body animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>{t('albums.title')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {sortOptions.map(o => (
            <button
              key={o.value}
              className={`btn btn-surface ${sort === o.value ? 'btn-sort-active' : ''}`}
              onClick={() => setSort(o.value)}
              style={sort === o.value ? { background: 'var(--accent)', color: 'var(--ctp-crust)' } : {}}
            >
              {o.label}
            </button>
          ))}
          <GenreFilterBar selected={selectedGenres} onSelectionChange={setSelectedGenres} />
        </div>
      </div>

      {loading && albums.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="album-grid-wrap">
            {albums.map(a => <AlbumCard key={a.id} album={a} />)}
          </div>
          {!filtered && (
            <div ref={observerTarget} style={{ height: '20px', margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
              {loading && hasMore && <div className="spinner" style={{ width: 20, height: 20 }} />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
