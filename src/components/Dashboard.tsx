import { FC, useState } from "react";

import { Grid, TextField, Button, Typography, Box } from "@mui/material";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";

import TeamButtons from "./TeamButtons";
import Calendar from "./Calendar";

import { Team, Period } from "./types";
import { TEAMS, PERIODS } from "../utils/constants";

const Dashboard: FC = () => {
  const [pickedTeam, setPickedTeam] = useState<Team>(TEAMS[0]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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
        <Grid item sx={{ minWidth: "200px" }}>
          <TeamButtons pickedTeam={pickedTeam} setPickedTeam={setPickedTeam} />
        </Grid>
      </Grid>
      <Grid container item lg={6} spacing={1} justifyContent="flex-end">
        {PERIODS.map((period) => (
          <Grid item>
            <Button
              variant="contained"
              color="success"
              title={`${format(period.startDate, "dd.MM.yyyy")} - ${format(
                period.endDate,
                "dd.MM.yyyy"
              )}`}
            >
              {period.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item xs={12}>
        <Calendar
          selectedTeam={pickedTeam.id}
          start={startDate}
          end={endDate}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
