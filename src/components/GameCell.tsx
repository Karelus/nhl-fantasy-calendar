import { FC } from "react";

import { TableCell, Typography, Box } from "@mui/material";

import {
    getDayOfYear,
    getDay,
    addDays
} from "date-fns";

import { Game, Team } from "./types";
import { TEAMS } from "../utils/constants";

export const GameCell: FC<{
    team: Team;
    day: Date;
    games: Game[];
}> = ({ team, day, games }) => {
    let isGameDay = false;

    if (games.length >= 1) {
        isGameDay = games.some(
            (game) =>
                getDayOfYear(new Date(game.gameDate)) === getDayOfYear(addDays(day, 1))
        );
    }

    const game = games.find(game => getDayOfYear(new Date(game.gameDate)) === getDayOfYear(addDays(day, 1)));
    const isSunday = getDay(day) === 0;

    let homeTeamId = game?.teams.home.team.id
    let awayTeamId = game?.teams.away.team.id

    let opponent: Team | undefined

    if (awayTeamId === team.id) {
        opponent = TEAMS.find(team => team.id === homeTeamId)
    } else {
        opponent = TEAMS.find(team => team.id === awayTeamId)
    }

    return (
        <TableCell
            size="small"
            sx={{
                borderRight: isSunday
                    ? "2px solid black"
                    : "1px solid rgba(224, 224, 224, 1)",
                backgroundColor: isGameDay ? team.primary : "",
                color: team.secondary,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Typography variant="caption">{opponent?.abbreviation}</Typography>
            </Box>
        </TableCell>
    );
};