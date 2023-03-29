import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export const SelectCategory = ({ selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl
      component="fieldset"
      sx={{ m: 1, width: "30ch" }}
      variant="outlined"
    >
      <RadioGroup
        aria-label="category"
        name="category"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Automotive"
          control={<Radio />}
          label="Automotive"
        />
        <FormControlLabel value="Beauty" control={<Radio />} label="Beauty" />
        <FormControlLabel
          value="Clothing"
          control={<Radio />}
          label="Clothing"
        />
        <FormControlLabel
          value="Electronics"
          control={<Radio />}
          label="Electronics"
        />
        <FormControlLabel value="Fashion" control={<Radio />} label="Fashion" />
        <FormControlLabel value="Grocery" control={<Radio />} label="Grocery" />
        <FormControlLabel value="Home" control={<Radio />} label="Home" />
        <FormControlLabel
          value="Pet Supplies"
          control={<Radio />}
          label="Pet Supplies"
        />
        <FormControlLabel value="Sports" control={<Radio />} label="Sports" />
      </RadioGroup>
    </FormControl>
  );
};
