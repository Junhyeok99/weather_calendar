"use client";

import React, { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";

import { Select } from "component";
import { getMonthlyDates, getWeatherDataByRegion } from "utils";

import styles from "./page.module.scss";

export default function Home() {
  const [region, setRegion] = useState(1);
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());
  const [month, setMonth] = useState(new Date(Date.now()).getMonth()); // January: 0 - December: 11

  useEffect(() => {
    const prevMonth = getMonthlyDates(
      month === 0 ? year - 1 : year,
      (month + 11) % 12,
    );
    const currentMonth = getMonthlyDates(year, month);
    const nextMonth = getMonthlyDates(
      month === 11 ? year + 1 : year,
      (month + 1) % 12,
    );

    console.log({ prevMonth, currentMonth, nextMonth });
  }, [year, month]);

  useEffect(() => {
    console.log(getWeatherDataByRegion(region.toString()));
  }, [region]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Select
          id="year"
          placeholder="Year"
          value={year}
          onChange={setYear}
          width="100px"
        >
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2025}>2025</MenuItem>
        </Select>
        <Select
          id="month"
          placeholder="Month"
          value={month}
          onChange={setMonth}
          width="100px"
        >
          {React.Children.toArray(
            Array.from(Array(12)).map((_, i) => (
              <MenuItem value={i}>{i + 1}</MenuItem>
            )),
          )}
        </Select>
        <Select
          id="region"
          placeholder="Region"
          value={region}
          onChange={setRegion}
          width="100px"
        >
          {React.Children.toArray(
            Array.from(Array(16)).map((_, i) => (
              <MenuItem value={i + 1}>{i + 1}</MenuItem>
            )),
          )}
        </Select>
        <div className={styles.title}>Weather Calendar</div>
      </header>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
