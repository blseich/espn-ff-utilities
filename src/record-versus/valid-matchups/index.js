// @flow
import { type Matchup } from '../../types';

type ScheduleFilterCb = (m: Matchup) => boolean;

const isAwayTeam = (m: Matchup, ...ids: Array<number>): boolean => (
    ids.length === 0 || ids.includes(m.away.teamId)
);
const isHomeTeam = (m: Matchup, ...ids: Array<number>): boolean => (
    ids.length === 0 || ids.includes(m.home.teamId)
);

const isValidMatchup = (
    scoringPeriodId: number,
    teamId: number,
    opposingIds: Array<number>,
): ScheduleFilterCb => (
    (m: Matchup): boolean => (
        m.scoringPeriodId <= scoringPeriodId && (
            (isAwayTeam(m, teamId) && isHomeTeam(m, ...opposingIds))
                || (isHomeTeam(m, teamId) && isAwayTeam(m, ...opposingIds))
        )
    )
);

const validMatchups = (
    scoringPeriodId: number,
    teamId: number,
    opposingIds: Array<number>,
    schedule: Array<Matchup>,
): Array<Matchup> => (
    schedule.filter(isValidMatchup(scoringPeriodId, teamId, opposingIds)) || []
);

export default validMatchups;
