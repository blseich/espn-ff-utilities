// @flow

import { type Matchup } from '../../types';

const getCurrentScoringPeriodMatchups = (
    scoringPeriodId: number,
    schedule: Array<Matchup>,
): Array<Matchup> => (
    schedule.filter(({ matchupPeriodId }: Matchup): boolean => (
        matchupPeriodId === scoringPeriodId
    ))
);

export default getCurrentScoringPeriodMatchups;
