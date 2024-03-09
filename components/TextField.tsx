import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { FormTypes } from "./Types";

const theme = createTheme({ palette: { primary: { main: "#B05CE9" } } });

function TextField({
  id,
  type,
  name,
  value,
  placeholder,
  error,
  errorText,
  handleChange,
}: FormTypes) {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ mx: 3 }} error={error}>
        <InputLabel
          sx={{
            color: "#666666",
            background: "#130320",
            fontSize: 15,
            px: 1.2,
            py: 0.2,
            ml: -0.5,
            borderRadius: 50,
          }}
          htmlFor={id}>
          {placeholder}
        </InputLabel>
        <OutlinedInput
          sx={[
            {
              color: "white",
              borderRadius: "15px",
              outline: "1px solid #DB546E",
            },
          ]}
          fullWidth
          id={id}
          type={type}
          name={name}
          value={value}
          label={placeholder}
          onChange={handleChange}
        />
        <FormHelperText sx={{ color: "red" }}>{errorText}</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
}

export default TextField;
