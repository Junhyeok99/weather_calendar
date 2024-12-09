"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  MenuItem,
} from "@mui/material";

import { Select } from "component";
import { getMonthlyDates, getWeatherDataByRegion } from "utils";

import styles from "./page.module.scss";

export default function Home() {
  const [region, setRegion] = useState(1);
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());
  const [month, setMonth] = useState(new Date(Date.now()).getMonth()); // January: 0 - December: 11
  const [monthData, setMonthData] = useState<
    { date: string; dayOfWeek: string }[]
  >([]);
  const [isWeekStartsWithSunday, setIsWeekStartsWithSunday] = useState(true);

  const onClickPrevMonth = useCallback(() => {
    if (month === 0 && year === 2024) return;
    const chk = month === 0;
    setMonth(chk ? 11 : month - 1);
    setYear(chk ? year - 1 : year);
  }, [month, year]);
  const onClickThisMonth = useCallback(() => {
    setMonth(new Date(Date.now()).getMonth());
    setYear(new Date(Date.now()).getFullYear());
  }, []);
  const onClickNextMonth = useCallback(() => {
    if (month === 11 && year === 2025) return;
    const chk = month === 11;
    setMonth(chk ? 0 : month + 1);
    setYear(chk ? year + 1 : year);
  }, [month, year]);

  // Get selected month data
  useEffect(() => {
    // TODO: caching this data to global storage like react-query.
    const daysOfWeekMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    } as { [key: string]: number };
    const currentMonthData = getMonthlyDates(year, month);

    const prevMonthData = getMonthlyDates(
      month === 0 ? year - 1 : year,
      (month + 11) % 12,
      isWeekStartsWithSunday
        ? -daysOfWeekMap[currentMonthData[0].dayOfWeek]
        : -((daysOfWeekMap[currentMonthData[0].dayOfWeek] + 6) % 7),
    );
    const nextMonthData = getMonthlyDates(
      month === 11 ? year + 1 : year,
      (month + 1) % 12,
      isWeekStartsWithSunday
        ? 6 -
            daysOfWeekMap[
              currentMonthData[currentMonthData.length - 1].dayOfWeek
            ]
        : 6 -
            ((daysOfWeekMap[
              currentMonthData[currentMonthData.length - 1].dayOfWeek
            ] +
              6) %
              7),
    );

    setMonthData(prevMonthData.concat(currentMonthData, nextMonthData));
  }, [year, month, isWeekStartsWithSunday]);

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
      <main className={styles.main}>
        <div className={styles.buttonGroup}>
          <Button variant="contained" onClick={onClickPrevMonth}>
            Previous
          </Button>
          {!(
            year === new Date(Date.now()).getFullYear() &&
            month === new Date(Date.now()).getMonth()
          ) && (
            <Button variant="contained" onClick={onClickThisMonth}>
              This Month
            </Button>
          )}
          <Button variant="contained" onClick={onClickNextMonth}>
            Next
          </Button>
        </div>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {monthData.map((item, index) => (
            <Grid size={12 / 7} key={index} style={{ textAlign: "center" }}>
              {item.date.split("-")[0] + "/" + item.date.split("-")[1]}
            </Grid>
          ))}
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={isWeekStartsWithSunday}
              onChange={() =>
                setIsWeekStartsWithSunday(!isWeekStartsWithSunday)
              }
            />
          }
          label="Start with Sunday"
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
