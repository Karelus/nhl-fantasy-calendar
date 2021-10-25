import { FC } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { GameCell } from "./GameCell";
import { Game, Team } from "./types";

export const TeamRow: FC<{ days: Date[]; games: Game[] | []; team: Team }> = ({
    days,
    games,
    team,
}) => {

    const totalGames = games.length

    return (
        <TableRow>
            <TableCell
                size="small"
                sx={{
                    minWidth: "135px",
                    backgroundColor: team.primary,
                    color: team.secondary,
                    position: "sticky",
                    left: 0,
                    borderRight: "1px solid #FFFFFF",
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography>{team.teamName}</Typography>
                <Typography>{totalGames}</Typography>
            </TableCell>
            {days.map((day) => (
                <GameCell
                    key={day.toString()}
                    team={team}
                    day={day}
                    games={games}
                />
            ))}
        </TableRow>
    );
};