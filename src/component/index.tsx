import React from "react";
import { FormControl, InputLabel, Select as MSelect } from "@mui/material";

import styles from "./index.module.scss";

interface SelectProps {
  id?: string;
  placeholder: string;
  children: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  width?: string | number;
}

export function Select({
  id,
  placeholder,
  children,
  value,
  onChange,
  width,
}: SelectProps) {
  return (
    <FormControl
      id={id + "-select-form"}
      className={styles.form}
      style={{ width: width }}
    >
      <InputLabel id={id + "-select-label"}>{placeholder}</InputLabel>
      <MSelect
        labelId={id + "-select-label"}
        value={value}
        label={placeholder}
        onChange={(v) => onChange(v.target.value as number)}
      >
        {children}
      </MSelect>
    </FormControl>
  );
}
