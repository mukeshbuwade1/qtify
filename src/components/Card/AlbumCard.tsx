import React from "react";
import Chip from "@mui/material/Chip";
import type { Album } from "../../types/album";
import type { Song } from "../../types/song";
import styles from "./AlbumCard.module.css";

export type AlbumCardProps = {
  title: string;
  image: string;
  imageAlt?: string;
  /** Album listings — chip shows “Follows”. */
  follows?: number;
  /** Song listings — chip shows “Likes” and bar centers the chip (Songs section). */
  likes?: number;
};

export function albumToCardProps(album: Album): AlbumCardProps {
  return {
    title: album.title,
    follows: album.follows,
    image: album.image,
    imageAlt: `${album.title} cover`,
  };
}

export function songToCardProps(song: Song): AlbumCardProps {
  return {
    title: song.title,
    likes: song.likes,
    image: song.image,
    imageAlt: `${song.title} artwork`,
  };
}

const defaultDummy: AlbumCardProps = {
  title: "New English Songs",
  follows: 13279,
  image:
    "https://images.pexels.com/photos/122244/pexels-photo-122244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  imageAlt: "Album cover",
};

function chipLabelForProps(props: Partial<AlbumCardProps>): string {
  const useLikes = props.likes !== undefined;
  const merged = { ...defaultDummy, ...props };
  const value = useLikes ? Number(merged.likes) : Number(merged.follows ?? 0);
  return useLikes
    ? `${value.toLocaleString()} Likes`
    : `${value.toLocaleString()} Follows`;
}

/**
 * Shared card surface for albums (Follows) and songs (Likes).
 */
export default function AlbumCard(props: Partial<AlbumCardProps>) {
  const merged = { ...defaultDummy, ...props };
  const { title, image, imageAlt } = merged;
  const useLikes = props.likes !== undefined;
  const chipLabel = chipLabelForProps(props);

  return (
    <article className={styles.root}>
      <div className={styles.card}>
        <div className={styles.media}>
          <img
            className={styles.image}
            src={image}
            alt={imageAlt ?? `${title} cover`}
            loading="lazy"
          />
        </div>
        <div
          className={
            useLikes
              ? `${styles.infoBar} ${styles.infoBarCentered}`
              : styles.infoBar
          }
        >
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              backgroundColor: "var(--color-black)",
              color: "var(--color-white)",
              fontWeight: 500,
              fontSize: "0.6875rem",
              height: 24,
              maxWidth: "100%",
              "& .MuiChip-label": {
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: 0,
                paddingBottom: 0,
                lineHeight: 1.2,
              },
            }}
          />
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </article>
  );
}
