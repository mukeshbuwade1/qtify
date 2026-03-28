import React, { useEffect, useMemo, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AlbumCard, { songToCardProps } from "../Card/AlbumCard";
import Carousel from "../Carousel/Carousel";
import Section from "./Section";
import { fetchGenres, fetchSongs } from "../../api/songs";
import type { Genre } from "../../types/genre";
import type { Song } from "../../types/song";
import styles from "./SongsSection.module.css";

/** Tab order aligned with product design (All first, then Rock → Pop → Jazz → Blues). */
const GENRE_TAB_ORDER = ["rock", "pop", "jazz", "blues"];

function sortGenresForTabs(genres: Genre[]): Genre[] {
  return [...genres].sort(
    (a, b) =>
      GENRE_TAB_ORDER.indexOf(a.key) - GENRE_TAB_ORDER.indexOf(b.key)
  );
}

const ALL_KEY = "all";

export default function SongsSection() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchSongs(), fetchGenres()])
      .then(([songsData, genresData]) => {
        if (!cancelled) {
          setSongs(songsData);
          setGenres(sortGenresForTabs(genresData));
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not load songs. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tabDefs = useMemo(
    () => [{ key: ALL_KEY, label: "All" }, ...genres],
    [genres]
  );

  const selectedKey = tabDefs[tabIndex]?.key ?? ALL_KEY;

  const filteredSongs = useMemo(() => {
    if (selectedKey === ALL_KEY) return songs;
    return songs.filter((s) => s.genre.key === selectedKey);
  }, [songs, selectedKey]);

  const handleTabsChange = (_: React.SyntheticEvent, next: number) => {
    setTabIndex(next);
  };

  return (
    <Section title="Songs">
      {loading && (
        <p className={styles.statusMessage}>Loading songs…</p>
      )}
      {error && <p className={styles.statusMessage}>{error}</p>}
      {!loading && !error && (
        <>
          <Tabs
            className={styles.tabs}
            value={tabIndex}
            onChange={handleTabsChange}
            variant="standard"
            aria-label="Filter songs by genre"
            sx={{
              minHeight: 52,
              marginBottom: "24px",
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--color-primary)",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "1rem",
                minHeight: 48,
                paddingLeft: "20px",
                paddingRight: "20px",
                marginRight: "4px",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "var(--color-white)",
                fontWeight: 600,
              },
              "& .MuiTab-root.Mui-focusVisible": {
                backgroundColor: "rgba(52, 201, 75, 0.12)",
              },
            }}
          >
            {tabDefs.map((def) => (
              <Tab key={def.key} label={def.label} disableRipple />
            ))}
          </Tabs>

          <Carousel key={selectedKey}>
            {filteredSongs.map((song) => (
              <AlbumCard key={song.id} {...songToCardProps(song)} />
            ))}
          </Carousel>
        </>
      )}
    </Section>
  );
}
