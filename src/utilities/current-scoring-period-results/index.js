// @flow
import getCurrentScoringPeriodMatchups from '../current-scoring-period-matchups';
import { type TeamScoringPeriodResult, type Matchup } from '../../types';

const extractIndividualMatchupResults = (
    acc: Array<TeamScoringPeriodResult>,
    matchup: Matchup,
): Array<TeamScoringPeriodResult> => acc.concat([matchup.home, matchup.away]);


const getCurrentScoringPeriodResults = (
    scoringPeriodId: number,
    schedule: Array<Matchup>,
): Array<TeamScoringPeriodResult> => (
    getCurrentScoringPeriodMatchups(scoringPeriodId, schedule)
        .reduce(extractIndividualMatchupResults, [])
);

export default getCurrentScoringPeriodResults;
