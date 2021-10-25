import { FC } from "react";

import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import {
    format,
    getDay,
    isToday,
} from "date-fns";

export const TableHeader: FC<{ days: Date[] }> = ({ days }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    sx={{
                        position: "sticky",
                        left: 0,
                        minWidth: "135px",
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