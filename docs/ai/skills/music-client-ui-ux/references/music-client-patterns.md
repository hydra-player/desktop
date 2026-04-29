# Music Client Patterns

## Primary Surfaces

- Home: recently played, new albums, frequent playlists, resume queue.
- Library: tracks, albums, artists, genres, folders, local/offline sources.
- Album: artwork, album metadata, track list, play/shuffle, favorite/rating.
- Artist: top tracks, albums, similar/discovery where supported.
- Queue: current item, upcoming tracks, reorder, remove, clear with confirmation.
- Now Playing: large artwork, metadata, lyrics, queue entry point, output state.
- Search: grouped results, recent search, no-results state, clear query.

## Common States

- Empty library: explain next action, keep copy short.
- Missing metadata: show filename-derived title and unknown artist/album fallback.
- Missing artwork: use a stable placeholder that does not look broken.
- Offline: show cached/local availability and disabled remote actions.
- Scan in progress: show counts, current folder/file when safe, cancel if feasible.
- Error: state what failed and offer retry or settings route.

## Review Checklist

- Current playback remains visible or one action away.
- Long names do not break rows, cards, or controls.
- Keyboard users can search, select, queue, and play.
- Dense views still show the most important metadata.
- Destructive actions are confirmed or undoable.
