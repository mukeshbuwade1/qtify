import React, { useCallback, useEffect, useState } from "react";
import type { Album } from "../../types/album";
import AlbumCard, { albumToCardProps } from "../Card/AlbumCard";
import Carousel from "../Carousel/Carousel";
import Section from "./Section";
import styles from "./AlbumsSection.module.css";

export type AlbumsSectionProps = {
  title: string;
  loadAlbums: () => Promise<Album[]>;
  /** `true` = grid + "Collapse"; `false` = carousel + "Show All" on first paint. */
  initialShowGrid?: boolean;
};

export default function AlbumsSection({
  title,
  loadAlbums,
  initialShowGrid = true,
}: AlbumsSectionProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(initialShowGrid);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadAlbums()
      .then((data) => {
        if (!cancelled) setAlbums(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load albums. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [loadAlbums]);

  const toggleView = useCallback(() => {
    setShowGrid((v) => !v);
  }, []);

  const actionLabel = showGrid ? "Collapse" : "Show All";

  return (
    <Section
      title={title}
      actionLabel={actionLabel}
      onActionClick={toggleView}
    >
      {loading && (
        <p className={styles.statusMessage}>Loading albums…</p>
      )}
      {error && <p className={styles.statusMessage}>{error}</p>}
      {!loading && !error && showGrid && (
        <div className={styles.grid}>
          {albums.map((album) => (
            <AlbumCard key={album.id} {...albumToCardProps(album)} />
          ))}
        </div>
      )}
      {!loading && !error && !showGrid && (
        <Carousel>
          {albums.map((album) => (
            <AlbumCard key={album.id} {...albumToCardProps(album)} />
          ))}
        </Carousel>
      )}
    </Section>
  );
}
