import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/material/styles";
import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

export type SearchAlbum = {
  title: string;
  slug: string;
  songs: { artists: string[] }[];
};

export type SearchProps = {
  searchData?: SearchAlbum[];
  placeholder: string;
};

const Listbox = styled("ul")(() => ({
  width: "100%",
  margin: 0,
  padding: 0,
  position: "absolute",
  borderRadius: "0px 0px 10px 10px",
  border: "1px solid var(--color-primary)",
  top: 60,
  height: "max-content",
  maxHeight: "500px",
  zIndex: 10,
  overflowY: "scroll",
  left: 0,
  bottom: 0,
  right: 0,
  listStyle: "none",
  backgroundColor: "var(--color-black)",
  overflow: "auto",
  "& li.Mui-focused": {
    backgroundColor: "var(--color-interactive-hover)",
    color: "var(--color-white)",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "var(--color-interactive-pressed)",
    color: "var(--color-white)",
  },
}));

function Search({ searchData, placeholder }: SearchProps) {
  const {
    getRootProps,
    value,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: searchData || [],
    getOptionLabel: (option) => option.title,
  });

  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent, selected: SearchAlbum | null) => {
    e.preventDefault();
    if (!selected) return;
    navigate(`/album/${selected.slug}`);
    //Process form data, call API, set state etc.
  };

  return (
    <div style={{ position: "relative" }}>
      <form
        className={styles.wrapper}
        onSubmit={(e) => {
          onSubmit(e, value);
        }}
      >
        <div {...getRootProps()}>
          <input
            name="album"
            className={styles.search}
            placeholder={placeholder}
            required
            {...getInputProps()}
          />
        </div>
        <div>
          <button className={styles.searchButton} type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            // console.log(option);
            const artists = option.songs.reduce<string[]>((accumulator, currentValue) => {
              accumulator.push(...currentValue.artists);
              return accumulator;
            }, []);

            return (
              <li
                className={styles.listElement}
                {...getOptionProps({ option, index })}
              >
                <div>
                  <p className={styles.albumTitle}>{option.title}</p>

                  <p className={styles.albumArtists}>
                    {truncate(artists.join(", "), 40)}
                  </p>
                </div>
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </div>
  );
}

export default Search;
