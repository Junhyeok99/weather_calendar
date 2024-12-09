'use client'

import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {getMonthlyDates, getWeatherDataByRegion} from "utils";

import styles from "./page.module.css";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function Home() {
  const [region, setRegion] = useState<string>("1");
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());
  const [month, setMonth] = useState(new Date(Date.now()).getMonth()); // January: 0 - December: 11
  const result = getMonthlyDates(year, month);

  useEffect(
    () => {
      console.log({result});
      console.log(getWeatherDataByRegion(region));
    },
    [region, result]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FormControl>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={year}
            label="Year"
            onChange={(value) => setYear(value.target.value as number)}
            >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>
        </FormControl>
      </main>
    </div>
  );
}
