// @flow
export type Player = {
  playerPoolEntry: {
    appliedStatTotal: number,
    player: {
      eligibleSlots: Array<number>
    }
  }
};

export type TeamScoringPeriodResult = {
    teamId: number,
    totalPoints: number,
    rosterForCurrentScoringPeriod: {
        entries: [Player]
    }
};

export type Matchup = {
    away: TeamScoringPeriodResult,
    home: TeamScoringPeriodResult,
    matchupPeriodId: number
};
