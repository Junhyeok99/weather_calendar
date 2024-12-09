import React from "react";
import { FormControl, InputLabel, Select as MSelect } from "@mui/material";

import styles from "./index.module.scss";

interface SelectProps {
  id: string;
  placeholder: string;
  children: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
}

export function Select({
  id,
  placeholder,
  children,
  value,
  onChange,
}: SelectProps) {
  return (
    <FormControl id={id + "-select-form"} className={styles.form}>
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
