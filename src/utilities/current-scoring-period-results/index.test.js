import getCurrentScoringPeriodResults from '.';
import getCurrentScoringPeriodMatchups from '../current-scoring-period-matchups';

jest.mock('../current-scoring-period-matchups');

const scoringPeriodId = 1;
const schedule = [];

const mockMatchups = [
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
];

describe('Adjusted Victories', () => {
    beforeAll(() => {
        getCurrentScoringPeriodMatchups.mockReturnValue(mockMatchups);
    });

    it('should be a function', () => {
        expect(typeof getCurrentScoringPeriodResults).toBe('function');
    });

    it('should return current array of current period schedule items', () => {
        expect(getCurrentScoringPeriodResults(scoringPeriodId, schedule)).toBeArrayOfSize(4);
    });

    it('should return team result obj within array', () => {
        expect(getCurrentScoringPeriodResults(scoringPeriodId, schedule)).toBeArray([
            { teadId: 0 },
            { teamId: 1 },
            { teamId: 2 },
            { teamId: 3 },
        ]);
    });
});
