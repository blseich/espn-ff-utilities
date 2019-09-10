// @flow
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';
import getTeamScoringPeriodResult from '../utilities/team-scoring-period-result';
import { type TeamScoringPeriodResult, type Matchup } from '../types';

type TotalPointsCompareCb = (m: TeamScoringPeriodResult) => boolean;

const teamsScoringLowerThan = (
    playerTotalPoints: number,
): TotalPointsCompareCb => (
    (m: TeamScoringPeriodResult): boolean => m.totalPoints < playerTotalPoints
);

const adjustedVictories = (
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>,
): number => {
    const allPlayerMatch = getCurrentScoringPeriodResults(scoringPeriodId, schedule);
    const playerMatch = getTeamScoringPeriodResult(teamId, allPlayerMatch);
    return allPlayerMatch.filter(teamsScoringLowerThan(playerMatch.totalPoints)).length;
};

export default adjustedVictories;
