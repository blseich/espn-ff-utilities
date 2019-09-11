import validMatchups from '.';

const matchup1 = {
    away: {
        teamId: 1,
    },
    home: {
        teamId: 2,
    },
};
const matchup2 = {
    away: {
        teamId: 3,
    },
    home: {
        teamId: 4,
    },
};
const matchup3 = {
    away: {
        teamId: 4,
    },
    home: {
        teamId: 1,
    },
};

const schedule = [
    matchup1,
    matchup2,
    matchup3,
];


describe('Valid Matchups', () => {
    it('should be a function', () => {
        expect(typeof validMatchups).toBe('function');
    });

    it('should return return matchups where the team was the away team', () => {
        expect(validMatchups(1, [], schedule)).toContain(matchup1);
    });

    it('should return matchups where the team was the home team', () => {
        expect(validMatchups(1, [], schedule)).toContain(matchup3);
    });

    it('should return mathchups where the opposing team was involved', () => {
        const result = validMatchups(1, [2], schedule);
        expect(result).toContain(matchup1);
        expect(result).not.toContain(matchup3);
    });

    it('should return matchups for multiple opposing teams', () => {
        expect(validMatchups(4, [3, 1], schedule)).toContain(matchup2, matchup3);
    });

    it('should return empty array if team never faced opponents', () => {
        expect(validMatchups(1, [3], schedule)).toHaveLength(0);
    });
});
