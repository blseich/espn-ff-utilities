// @flow
type PlayerMatchupResultType = {
    teamId: number,
    totalPoints: number
};

type MatchupType = {
    away: PlayerMatchupResultType,
    home: PlayerMatchupResultType,
    matchupPeriodId: number
};

const getCurrentScoringPeriodMatchups = (
    scoringPeriodId: number,
    schedule: Array<MatchupType>,
): Array<MatchupType> => (
    schedule.filter((matchup: MatchupType): boolean => matchup.matchupPeriodId === scoringPeriodId)
);

const extractIndividualMatchupResults = (
    acc: Array<PlayerMatchupResultType>,
    matchup: MatchupType,
): Array<PlayerMatchupResultType> => acc.concat([matchup.home, matchup.away]);

const teamsScoringLowerThan = (
    playerTotalPoints: number,
): (m: PlayerMatchupResultType
) => boolean => (
    (m: PlayerMatchupResultType): boolean => m.totalPoints < playerTotalPoints
);

const adjustedVictories = (
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<MatchupType>,
): number => {
    const allPlayerMatch = getCurrentScoringPeriodMatchups(scoringPeriodId, schedule)
        .reduce(extractIndividualMatchupResults, []);
    const playerMatch = allPlayerMatch.find((pmr: PlayerMatchupResultType): boolean => (
        pmr.teamId === teamId
    ));
    if (playerMatch === undefined) {
        throw Error('ERROR: Player Id not found in current scoring period');
    }
    return allPlayerMatch.filter(teamsScoringLowerThan(playerMatch.totalPoints)).length;
};

export default adjustedVictories;
