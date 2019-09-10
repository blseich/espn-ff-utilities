import adjustedVictories from '.';
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';

jest.mock('../utilities/current-scoring-period-results');

const mockSchedule = {};
const scoringPeriodId = 1;
const mockScoringPeriodResults = [
    {
        teamId: 0,
        totalPoints: 100,
    },
    {
        teamId: 1,
        totalPoints: 101,
    },
    {
        teamId: 2,
        totalPoints: 99,
    },
    {
        teamId: 3,
        totalPoints: 102,
    }];

describe('Adjusted Victories', () => {
    beforeAll(() => {
        getCurrentScoringPeriodResults.mockReturnValue(mockScoringPeriodResults);
    });

    it('should be a function', () => {
        expect(typeof adjustedVictories).toBe('function');
    });

    it('should get matchup results for current scoring period id', () => {
        adjustedVictories(scoringPeriodId, 0, mockSchedule);
        expect(getCurrentScoringPeriodResults).toHaveBeenCalledWith(scoringPeriodId, mockSchedule);
    });

    it('should return number of adjusted victories for given player and matchup id', () => {
        expect(adjustedVictories(1, 0, mockSchedule)).toBe(1);
        expect(adjustedVictories(1, 1, mockSchedule)).toBe(2);
        expect(adjustedVictories(1, 2, mockSchedule)).toBe(0);
        expect(adjustedVictories(1, 3, mockSchedule)).toBe(3);
    });
});
