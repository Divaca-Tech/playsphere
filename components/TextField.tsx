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
  hidden = false,
  handleChange,
}: FormTypes) {
  return (
    <ThemeProvider theme={theme}>
      <FormControl error={error} hidden={hidden}>
        <InputLabel
          sx={{
            color: "#666666",
            fontSize: 15,
            background: "#202023",
            px: 1,
            py: 0.2,
            ml: -0.5,
            borderRadius: 50,
          }}
          htmlFor={id}>
          {placeholder}
        </InputLabel>
        <OutlinedInput
          sx={{
            color: "white",
            borderRadius: "15px",
            background: "#202023",
            "&.Mui-focused": {
              border: "none",
            },
          }}
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
