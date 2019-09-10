import realWeeklyScore from '.';
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';
import getTeamScoringPeriodResult from '../utilities/team-scoring-period-result';

jest.mock('../utilities/current-scoring-period-results');
jest.mock('../utilities/team-scoring-period-result');

const scoringPeriodId = 1;
const teamId = 1;
const schedule = {};

const mockScoringPeriodResults = [];
const mockTeamScoringResult = {
    totalPoints: 150,
};

describe('Real Weekly Score', () => {
    beforeAll(() => {
        getCurrentScoringPeriodResults.mockReturnValue(mockScoringPeriodResults);
        getTeamScoringPeriodResult.mockReturnValue(mockTeamScoringResult);
    });

    it('should get current scoring period results', () => {
        realWeeklyScore(scoringPeriodId, teamId, schedule);
        expect(getCurrentScoringPeriodResults).toHaveBeenCalledWith(scoringPeriodId, schedule);
    });

    it('should get team scoring period result', () => {
        realWeeklyScore(scoringPeriodId, teamId, schedule);
        expect(getTeamScoringPeriodResult).toHaveBeenCalledWith(teamId, mockScoringPeriodResults);
    });

    it('should return team scoring period result total points', () => {
        expect(realWeeklyScore(scoringPeriodId, teamId, schedule)).toBe(150);
    });
});
