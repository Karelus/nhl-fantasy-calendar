import { FC, useState } from "react";

import { Grid, TextField, Button } from "@mui/material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { format } from "date-fns";

import Calendar from "./Calendar";
import { PERIODS } from "../utils/constants";

const Dashboard: FC = () => {
  const [pickedPeriod, setPickedPeriod] = useState<string>(PERIODS[0].name);
  const [startDate, setStartDate] = useState<Date | null>(PERIODS[0].startDate);
  const [endDate, setEndDate] = useState<Date | null>(PERIODS[0].endDate);

  const handlePeriodClick = (period: string, start: Date, end: Date) => {
    setPickedPeriod(period);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Grid container sx={{ paddingTop: "20px" }}>
      <Grid container item lg={6} spacing={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item>
            <DesktopDatePicker
              label="Start Date"
              value={startDate}
              maxDate={endDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <DesktopDatePicker
              label="End Date"
              minDate={startDate}
              value={endDate}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      <Grid container item lg={6} spacing={1} justifyContent="flex-end">
        {PERIODS.map((period) => (
          <Grid item key={period.name}>
            <Button
              variant="contained"
              color="success"
              title={`${format(period.startDate, "dd.MM.yyyy")} - ${format(
                period.endDate,
                "dd.MM.yyyy"
              )}`}
              onClick={() =>
                handlePeriodClick(period.name, period.startDate, period.endDate)
              }
            >
              {period.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item xs={12}>
        <Calendar start={startDate} end={endDate} pickedPeriod={pickedPeriod} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
