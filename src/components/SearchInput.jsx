// import { useState } from "react";
// import { Autocomplete, TextField } from "@mui/material";

// export const SearchInput = ({ options }) => {
//   console.log(options);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearchChange = (event, newValue) => {
//     setSearchValue(newValue);
//     setSearchResults(
//       options.filter((option) =>
//         option.title.toLowerCase().includes(newValue.toLowerCase())
//       )
//     );
//     console.log(searchResults);
//   };

//   return (
//     <Autocomplete
//       freeSolo
//       disableClearable
//       options={searchResults}
//       inputValue={searchValue}
//       onInputChange={handleSearchChange}
//       renderInput={(params) => (
//         <TextField {...params} label="Search" variant="outlined" />
//       )}
//     />
//   );
// };

import { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function SearchInput({
  options,
  setSearchByTitle,
  setSearchByPrice,
  setSearchByCategory,
  setEmptyInput,
}) {
  console.log(options);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setEmptyInput(true);
      console.log(true);
    } else {
      setEmptyInput(false);
      console.log(false);
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
    // console.log(searchByTitle);
    // console.log(searchByPrice);
  };
  useEffect(() => {
    if (searchValue.length === 0) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
      console.log(false);
    }
  }, [searchValue]);

  return (
    <TextField
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
}
export default SearchInput;
