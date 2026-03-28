import React from "react";
import Chip from "@mui/material/Chip";
import type { Album } from "../../types/album";
import styles from "./AlbumCard.module.css";

export type AlbumCardProps = {
  title: string;
  follows: number;
  image: string;
  imageAlt?: string;
};

export function albumToCardProps(album: Album): AlbumCardProps {
  return {
    title: album.title,
    follows: album.follows,
    image: album.image,
    imageAlt: `${album.title} cover`,
  };
}

const defaultDummy: AlbumCardProps = {
  title: "New English Songs",
  follows: 13279,
  image:
    "https://images.pexels.com/photos/122244/pexels-photo-122244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  imageAlt: "Album cover",
};

function formatFollows(n: number): string {
  return `${n.toLocaleString()} Follows`;
}

/**
 * Album card: cover art (~80%), white strip with follows chip (~20%), title below.
 * Pass props from API (`Album`) when wiring data.
 */
export default function AlbumCard(props: Partial<AlbumCardProps>) {
  const { title, follows, image, imageAlt } = { ...defaultDummy, ...props };

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
        <div className={styles.infoBar}>
          <Chip
            label={formatFollows(follows)}
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
