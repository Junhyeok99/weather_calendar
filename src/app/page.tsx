'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid2 as Grid, MenuItem } from '@mui/material';

import { Select } from 'component';
import { getMonthlyDates, getWeatherDataByRegion } from 'utils';

import styles from './page.module.scss';

export default function Home() {
  const [region, setRegion] = useState(1);
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());
  const [month, setMonth] = useState(new Date(Date.now()).getMonth()); // January: 0 - December: 11
  const [monthData, setMonthData] = useState<{ date: string; dayOfWeek: string; thisMonth: boolean }[]>([]);
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

  const GridItems = React.Children.toArray(
    monthData.map((item, index) => (
      <Grid className={`${styles.gridItemDate} ${!item.thisMonth && styles.inactive}`} size={12 / 7} key={index}>
        {item.date}
      </Grid>
    )),
  );

  // 선택된 달의 날짜들을 계산하는 useEffect
  useEffect(() => {
    // TODO: react-query 같은 global storage를 사용할 경우 caching 하여 매번 계산하지 않도록 변경할 필요
    const daysOfWeekMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    } as { [key: string]: number };
    const currentMonthData = getMonthlyDates(year, month).map((v) => ({ ...v, thisMonth: true }));

    const prevMonthData = getMonthlyDates(
      month === 0 ? year - 1 : year,
      (month + 11) % 12,
      isWeekStartsWithSunday ? -daysOfWeekMap[currentMonthData[0].dayOfWeek] : -((daysOfWeekMap[currentMonthData[0].dayOfWeek] + 6) % 7),
    ).map((v) => ({ ...v, thisMonth: false }));
    const nextMonthData = getMonthlyDates(
      month === 11 ? year + 1 : year,
      (month + 1) % 12,
      isWeekStartsWithSunday
        ? 6 - daysOfWeekMap[currentMonthData[currentMonthData.length - 1].dayOfWeek]
        : 6 - ((daysOfWeekMap[currentMonthData[currentMonthData.length - 1].dayOfWeek] + 6) % 7),
    ).map((v) => ({ ...v, thisMonth: false }));

    setMonthData(prevMonthData.concat(currentMonthData, nextMonthData));
  }, [year, month, isWeekStartsWithSunday]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Select id="year" placeholder="Year" value={year} onChange={setYear} width="100px">
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2025}>2025</MenuItem>
        </Select>
        <Select id="month" placeholder="Month" value={month} onChange={setMonth} width="100px">
          {React.Children.toArray(Array.from(Array(12)).map((_, i) => <MenuItem value={i}>{i + 1}</MenuItem>))}
        </Select>
        <Select id="region" placeholder="Region" value={region} onChange={setRegion} width="100px">
          {React.Children.toArray(Array.from(Array(16)).map((_, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>))}
        </Select>
        <div className={styles.title}>Weather Calendar</div>
      </header>
      <main className={styles.main}>
        <div className={styles.buttonGroup}>
          <Button variant="contained" onClick={onClickPrevMonth}>
            Previous
          </Button>
          {!(year === new Date(Date.now()).getFullYear() && month === new Date(Date.now()).getMonth()) && (
            <Button variant="contained" onClick={onClickThisMonth}>
              This Month
            </Button>
          )}
          <Button variant="contained" onClick={onClickNextMonth}>
            Next
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={1} className={styles.grid}>
          {React.Children.toArray(
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((item, index) => (
              <Grid className={styles.gridItemIdx} size={12 / 7} key={index}>
                {item}
              </Grid>
            )),
          )}
          {GridItems}
        </Grid>
      </main>
      <footer className={styles.footer}>
        <div className={styles.optionWrapper}>
          <div>Options</div>
          <FormControlLabel control={<Checkbox checked={isWeekStartsWithSunday} onChange={() => setIsWeekStartsWithSunday(!isWeekStartsWithSunday)} />} label="Start with Sunday" />
        </div>
      </footer>
    </div>
  );
}
