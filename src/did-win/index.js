// @flow
import { type Matchup } from '../types';

const didWin = (
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>,
): boolean => {
    const matchup = (schedule.find(({ matchupPeriodId, away, home }: Matchup): boolean => (
        scoringPeriodId === matchupPeriodId && (away.teamId === teamId || home.teamId === teamId)
    )) || {});
    return (matchup.away.teamId === teamId && matchup.winner === 'AWAY')
        || (matchup.home.teamId === teamId && matchup.winner === 'HOME');
};

export default didWin;
