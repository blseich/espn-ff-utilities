// @flow
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';
import getTeamScoringPeriodResult from '../utilities/team-scoring-period-result';
import { type Matchup } from '../types';

const realWeeklyScore = (
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>,
): number => {
    const allTeamResults = getCurrentScoringPeriodResults(scoringPeriodId, schedule);
    return getTeamScoringPeriodResult(teamId, allTeamResults).totalPoints;
};

export default realWeeklyScore;
