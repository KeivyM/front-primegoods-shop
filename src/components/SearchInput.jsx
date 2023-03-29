import { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export const SearchInput = ({
  options,
  setSearchByTitle,
  setSearchByPrice,
  setSearchByCategory,
  setEmptyInput,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    setSearchValue(value);
    setSearchByTitle(
      options.filter((option) =>
        option.title.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSearchByPrice(
      options.filter((option) =>
        option.price.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setSearchByCategory(
      options.filter((option) =>
        option.category.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
  }, [searchValue, setEmptyInput]);

  return (
    <TextField
      sx={{
        width: { xs: "90%", md: "50%" },
        margin: "10px auto",
        display: "flex",
      }}
      label="Search"
      variant="outlined"
      value={searchValue}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchInput;
