import adjustedVictories from '.';

const mockSchedule = [
    {
        away: {
            teamId: 0,
            totalPoints: 100,
        },
        home: {
            teamId: 1,
            totalPoints: 101,
        },
        matchupPeriodId: 1,
    },
    {
        away: {
            teamId: 2,
            totalPoints: 99,
        },
        home: {
            teamId: 3,
            totalPoints: 102,
        },
        matchupPeriodId: 1,
    },
    {
        away: {
            teamId: 0,
            totalPoints: 120,
        },
        home: {
            teamId: 1,
            totalPoints: 130,
        },
        matchupPeriodId: 2,
    },
];

describe('Adjusted Victories', () => {
    it('should be a function', () => {
        expect(typeof adjustedVictories).toBe('function');
    });

    xit('should return current array of current period schedule items', () => {
        expect(adjustedVictories(1, 0, mockSchedule)).toBeArrayOfSize(2);
    });

    xit('should return matchup score for provided player id', () => {
        expect(adjustedVictories(1, 0, mockSchedule)).toBe(100);
    });

    xit('should throw an error if player id is not found in matchup results', () => {
        expect(() => {
            adjustedVictories(1, 99, mockSchedule);
        }).toThrow('ERROR: Player Id not found in current scoring period');
    });

    it('should return number of adjusted victories for given player and matchup id', () => {
        expect(adjustedVictories(1, 0, mockSchedule)).toBe(1);
        expect(adjustedVictories(1, 1, mockSchedule)).toBe(2);
        expect(adjustedVictories(1, 2, mockSchedule)).toBe(0);
        expect(adjustedVictories(1, 3, mockSchedule)).toBe(3);
    });
});
