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
  Grid,
} from "@mui/material";

import {
  format,
  getDayOfYear,
  getDay,
  getWeek,
  addDays,
  isToday,
} from "date-fns";
import { Day, Game, Team } from "./types";
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

const TableHeader: FC<{ days: Date[] }> = ({ days }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            position: "sticky",
            left: 0,
            minWidth: "100px",
            borderRight: "1px solid black",
          }}
        >
          Joukkue
        </TableCell>
        {days.map((day) => (
          <TableCell
            key={day.toISOString()}
            sx={{
              borderRight: getDay(day) === 0 ? "2px solid black" : "",
              border: isToday(day) ? "2px solid blue" : null,
            }}
          >
            {format(day, "dd.MM")}
          </TableCell>
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
        <TeamRow
          key={team.id}
          days={days}
          games={
            games.filter(
              (game) =>
                game.teams.home.team.id === team.id ||
                game.teams.away.team.id === team.id
            ) || []
          }
          team={team}
        />
      ))}
    </TableBody>
  );
};

const TeamRow: FC<{ days: Date[]; games: Game[] | []; team: Team }> = ({
  days,
  games,
  team,
}) => {
  return (
    <TableRow>
      <TableCell
        size="small"
        sx={{
          minWidth: "100px",
          backgroundColor: team.primary,
          color: team.secondary,
          position: "sticky",
          left: 0,
          borderRight: "1px solid #FFFFFF",
        }}
      >
        {team.teamName}
      </TableCell>
      {days.map((day) => (
        <RenderGameCell
          key={day.toString()}
          team={team}
          day={day}
          games={games}
        />
      ))}
    </TableRow>
  );
};

const RenderGameCell: FC<{
  team: Team;
  day: Date;
  games: Game[];
  gamesPerWeek?: number[];
}> = ({ team, day, games, gamesPerWeek }) => {
  let isGameDay = false;

  if (games.length >= 1) {
    isGameDay = games.some(
      (game) =>
        getDayOfYear(new Date(game.gameDate)) === getDayOfYear(addDays(day, 1))
    );
  }

  const isSunday = getDay(day) === 0;

  return (
    <TableCell
      size="small"
      sx={{
        borderRight: isSunday
          ? "2px solid black"
          : "1px solid rgba(224, 224, 224, 1)",
        backgroundColor: isGameDay ? team.primary : "",
      }}
    >
      {gamesPerWeek ? gamesPerWeek[getWeek(day)] : null}
    </TableCell>
  );
};

export default Calendar;
