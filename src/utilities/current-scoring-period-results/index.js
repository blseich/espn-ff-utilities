// @flow
import { type TeamScoringPeriodResult, type Matchup } from '../../types';

const extractIndividualMatchupResults = (
    acc: Array<TeamScoringPeriodResult>,
    matchup: Matchup,
): Array<TeamScoringPeriodResult> => acc.concat([matchup.home, matchup.away]);


const getCurrentScoringPeriodResults = (
    scoringPeriodId: number,
    schedule: Array<Matchup>,
): Array<TeamScoringPeriodResult> => (
    schedule.filter((matchup: Matchup): boolean => matchup.matchupPeriodId === scoringPeriodId)
        .reduce(extractIndividualMatchupResults, [])
);

export default getCurrentScoringPeriodResults;
