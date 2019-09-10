// @flow
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';
import getTeamScoringPeriodResult from '../utilities/team-scoring-period-result';
import bestLineupScore from './best-lineup-score';

import { type Matchup, type Settings } from '../types';

const bestWeeklyScore = (
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>,
    settings: Settings,
): number => {
    const allPlayerResults = getCurrentScoringPeriodResults(scoringPeriodId, schedule);
    const resultForScoringPeriod = getTeamScoringPeriodResult(teamId, allPlayerResults);
    return bestLineupScore(settings, resultForScoringPeriod.rosterForCurrentScoringPeriod.entries);
};

export default bestWeeklyScore;
