// @flow
import validMatchups from './valid-matchups';
import { type Matchup, type Record } from '../types';

const wasHomeTeamAndWon = (teamId: number, m: Matchup): boolean => (
    m.home.teamId === teamId && m.home.totalPoints > m.away.totalPoints
);

const wasAwayTeamAndWon = (teamId: number, m: Matchup): boolean => (
    m.away.teamId === teamId && m.away.totalPoints > m.home.totalPoints
);

const recordVersus = (
    teamId: number,
    opposingIds: Array<number>,
    schedule: Array<Matchup>,
): Record => (
    validMatchups(teamId, opposingIds, schedule)
        .reduce((acc: Record, m: Matchup): Record => {
            const { losses, wins } = acc;
            return wasHomeTeamAndWon(teamId, m) || wasAwayTeamAndWon(teamId, m)
                ? { losses, wins: acc.wins + 1 } : { wins, losses: losses + 1 };
        }, { wins: 0, losses: 0 })
);

export default recordVersus;
