import React, { useState } from "react";
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
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="category"
        name="category"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="electronics"
          control={<Radio />}
          label="Electronics"
        />
        <FormControlLabel value="home" control={<Radio />} label="Home" />
        <FormControlLabel value="fashion" control={<Radio />} label="Fashion" />
        <FormControlLabel value="sports" control={<Radio />} label="Sports" />
      </RadioGroup>
    </FormControl>
  );
};
