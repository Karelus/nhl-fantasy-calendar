import { FC, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format, getDate } from "date-fns";

import { Day, Game, Team } from "./types";
import { getDays } from "../utils/getDays";
import { TEAMS } from "../utils/constants";

const Calendar: FC<{
  selectedTeam: number;
  start: Date | null;
  end: Date | null;
}> = ({ selectedTeam, start, end }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    if (start !== null && end !== null) {
      setDays(getDays(start, end));
    }
  }, [start, end]);

  const offSet = new Date().getTimezoneOffset();

  useEffect(() => {
    let mounted: boolean = true;
    getSchedule(
      selectedTeam,
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
  }, [selectedTeam, start, end]);

  const getSchedule = (teamId: number, start: string, end: string) => {
    return fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamId}&startDate=${start}&endDate=${end}`
    ).then((data) => data.json());
  };

  if (games.length < 1) {
    return <Typography>No games on selected date</Typography>;
  }

  const jaksoStart = format(new Date(), "dd.MM.yyyy");
  const jaksoEnd = format(new Date(), "dd.MM.yyyy");

  return (
    <Card sx={{ minWidth: "100%" }}>
      <CardHeader title={`Jakso 1:  ${jaksoStart} - ${jaksoEnd}`}></CardHeader>
      <CardContent>
        <TableContainer component={Paper} sx={{ maxHeight: "800px" }}>
          <Table stickyHeader>
            <TableHeader days={days} />
            <TableGames days={days} games={games} teams={TEAMS} />
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const TableHeader: FC<{ days: Date[] }> = ({ days }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ position: "sticky", left: 0 }}>Joukkue</TableCell>
        {days.map((day) => (
          <TableCell>{format(day, "dd.MM")}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableGames: FC<{ days: Date[]; games: Game[]; teams: Team[] }> = ({
  days,
  games,
  teams,
}) => {
  return (
    <TableBody>
      {teams.map((team) => (
        <TableRow>
          <TableCell
            sx={{
              position: "sticky",
              left: 0,
              background: team.primary,
              color: team.secondary,
            }}
          >
            {team.teamName}
          </TableCell>
          {days.map((day) => (
            <TableCell
              style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
            >
              Peli
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default Calendar;
