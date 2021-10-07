import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Autocomplete,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { TEAMS } from "../utils/constants";
import { Team } from "./types";

const TeamButtons: FC<{
  pickedTeam: Team;
  setPickedTeam: Dispatch<SetStateAction<Team>>;
}> = ({ pickedTeam, setPickedTeam }) => {
  const [teams, setTeams] = useState<Team[]>(TEAMS);

  const handleTeamChange = (team: Team) => {
    setPickedTeam(team);
  };

  return (
    <Autocomplete
      id="team-selector"
      options={teams}
      value={pickedTeam}
      disableClearable={true}
      onChange={(event: ChangeEvent<unknown>, newValue: Team) => {
        handleTeamChange(newValue);
      }}
      getOptionLabel={(option) => option.teamName}
      renderInput={(params) => <TextField {...params} label="Select Team" />}
    />
    // <FormControl style={{ minWidth: "200px" }}>
    //   <InputLabel id="teams-select-label">Teams</InputLabel>
    //   <AutoComplete />
    //   <Select
    //     labelId="teams-select-label"
    //     id="teams-select"
    //     label="Teams"
    //     onChange={handleChange}
    //   >
    //     {teams?.map((team) => {
    //       return (
    //         <MenuItem key={team.id} value={team.id}>
    //           {team.teamName}
    //         </MenuItem>
    //       );
    //     })}
    //   </Select>
    // </FormControl>
  );
};

const getTeams = () => {
  return fetch(`https://statsapi.web.nhl.com/api/v1/teams`).then((data) =>
    data.json()
  );
};

export default TeamButtons;
