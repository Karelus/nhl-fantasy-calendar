import { FC } from "react";
import { TableBody } from "@mui/material";
import { Game, Team } from "./types";
import { TeamRow } from "./TeamRow";

export const TableGames: FC<{ days: Date[]; games: Game[]; teams: Team[] }> = ({
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