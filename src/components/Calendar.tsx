import { FC, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableContainer,
  Paper,
  Grid,
} from "@mui/material";

import { format } from "date-fns";

import { TableHeader } from "./TableHeader"
import { TableGames } from "./TableGames"

import { Day, Game } from "./types";
import { getDays } from "../utils/getDays";
import { TEAMS } from "../utils/constants";

const Calendar: FC<{
  start: Date | null;
  end: Date | null;
  pickedPeriod: string;
}> = ({ start, end, pickedPeriod }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    if (start !== null && end !== null) {
      setDays(getDays(start, end));
    }
  }, [start, end]);

  useEffect(() => {
    if (start !== null && end !== null) {
      let mounted: boolean = true;
      getSchedule(
        format(start || new Date(), "yyyy-MM-dd"),
        format(end || new Date(), "yyyy-MM-dd")
      ).then((items) => {
        if (mounted) {
          let fetchedGames: Game[] = [];
          items.dates.forEach((date: Day) => {
            date.games.forEach((game: Game) => {
              fetchedGames.push(game);
            });
          });
          setGames(fetchedGames);
        }
        return () => (mounted = false);
      });
    }
  }, [start, end]);

  const getSchedule = (start: string, end: string) => {
    return fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${start}&endDate=${end}`
    ).then((data) => data.json());
  };

  if (games.length < 1) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: "200px" }}>
        <Typography>No games on selected date period</Typography>
      </Grid>
    );
  }

  return (
    <Card sx={{ minWidth: "100%" }}>
      <CardHeader subheader={pickedPeriod}></CardHeader>
      <CardContent>
        <TableContainer component={Paper} sx={{ height: '915px' }}>
          <Table stickyHeader>
            <TableHeader days={days} />
            <TableGames days={days} games={games} teams={TEAMS} />
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Calendar;
