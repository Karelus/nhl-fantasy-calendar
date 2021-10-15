import { FC, useState, ChangeEvent, Dispatch, SetStateAction } from "react";

import { TextField, Autocomplete } from "@mui/material";

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
  );
};

// const getTeams = () => {
//   return fetch(`https://statsapi.web.nhl.com/api/v1/teams`).then((data) =>
//     data.json()
//   );
// };

export default TeamButtons;
