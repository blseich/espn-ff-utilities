import recordVersus from '.';
import validMatchups from './valid-matchups';

jest.mock('./valid-matchups');

const schedule = {};
const teamId = 1;
const opposingIds = [];

const team = {
    teamId: 1,
    totalPoints: 100,
};
const losingOpponent = {
    teamId: 2,
    totalPoints: 95,
};
const winningOpponent = {
    teamId: 2,
    totalPoints: 105,
};

const teamWonAsHomeTeam = {
    home: team,
    away: losingOpponent,
};
const teamWonAsAwayTeam = {
    home: losingOpponent,
    away: team,
};
const teamLostAsHomeTeam = {
    home: team,
    away: winningOpponent,
};
const teamLostAsAwayTeam = {
    home: winningOpponent,
    away: team,
};

describe('Record Versus', () => {
    beforeAll(() => {
        validMatchups.mockReturnValue([]);
    });

    it('should be a function', () => {
        expect(typeof recordVersus).toBe('function');
    });

    it('should get all valid matchups', () => {
        recordVersus(teamId, opposingIds, schedule);
        expect(validMatchups).toHaveBeenCalledWith(teamId, opposingIds, schedule);
    });

    it('should return record of 0 wins and 0 losses when there are no valid matchups', () => {
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 0, losses: 0 });
    });

    it('should add up games in which team Id won as home team', () => {
        validMatchups.mockReturnValue([teamWonAsHomeTeam]);
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 1, losses: 0 });
    });

    it('should add up games in whichh team Id lost as home team', () => {
        validMatchups.mockReturnValue([teamLostAsHomeTeam]);
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 0, losses: 1 });
    });

    it('should add up games in whichh team Id won as away team', () => {
        validMatchups.mockReturnValue([teamWonAsAwayTeam]);
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 1, losses: 0 });
    });

    it('should add up games in which team Id lost as away team', () => {
        validMatchups.mockReturnValue([teamLostAsAwayTeam]);
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 0, losses: 1 });
    });

    it('should add up several games together', () => {
        validMatchups.mockReturnValue([
            teamLostAsAwayTeam, teamWonAsHomeTeam, teamLostAsHomeTeam, teamWonAsAwayTeam,
        ]);
        expect(recordVersus(teamId, opposingIds, schedule)).toStrictEqual({ wins: 2, losses: 2 });
    });
});
