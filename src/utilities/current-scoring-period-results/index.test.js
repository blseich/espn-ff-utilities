import getCurrentScoringPeriodResults from '.';

const mockSchedule = [
    {
        away: {
            teamId: 0,
        },
        home: {
            teamId: 1,
        },
        matchupPeriodId: 1,
    },
    {
        away: {
            teamId: 2,
        },
        home: {
            teamId: 3,
        },
        matchupPeriodId: 1,
    },
    {
        away: {
            teamId: 0,
        },
        home: {
            teamId: 1,
        },
        matchupPeriodId: 2,
    },
];

describe('Adjusted Victories', () => {
    it('should be a function', () => {
        expect(typeof getCurrentScoringPeriodResults).toBe('function');
    });

    it('should return current array of current period schedule items', () => {
        expect(getCurrentScoringPeriodResults(1, mockSchedule)).toBeArrayOfSize(4);
    });

    it('should return team result obj within array', () => {
        expect(getCurrentScoringPeriodResults(1, mockSchedule)).toBeArray([
            { teadId: 0 },
            { teamId: 1 },
            { teamId: 2 },
            { teamId: 3 },
        ]);
    });
});
