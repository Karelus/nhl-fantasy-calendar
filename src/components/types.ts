export type Period = {
  name: string;
  startDate: Date;
  endDate: Date;
};

export type Schedule = {
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  metaData: {
    timeStamp: string;
  };
  dates: Day[];
};

export type Day = {
  date: Date;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  games: Game[];
};

export type Game = {
  gamePk: number;
  gameType: string;
  season: string;
  gameDate: Date;
  teams: {
    away: {
      score: number;
      team: {
        id: number;
        name: string;
      };
    };
    home: {
      score: number;
      team: {
        id: number;
        name: string;
      };
    };
  };
  venue: {
    id: number;
    name: string;
  };
};

export type Team = {
  id: number;
  name: string;
  primary: string;
  secondary: string;
  text: string;
  link: string;
  venue: {
    id?: number;
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: number;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: true;
};
