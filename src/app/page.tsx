'use client'

import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {getMonthlyDates, getWeatherDataByRegion} from "utils";

import styles from "./page.module.css";

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
        <Button variant="contained" onClick={() => setRegion("1")}>Test</Button>
      </main>
    </div>
  );
}
