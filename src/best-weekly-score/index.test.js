import bestWeeklyScore from '.';
import getCurrentScoringPeriodResults from '../utilities/current-scoring-period-results';
import getTeamScoringPeriodResult from '../utilities/team-scoring-period-result';
import bestLineupScore from './best-lineup-score';

jest.mock('../utilities/current-scoring-period-results');
jest.mock('../utilities/team-scoring-period-result');
jest.mock('./best-lineup-score');

const scoringPeriodId = 1;
const schedule = {};
const settings = {};

const mockAllTeamsResults = [];
const mockTeamResult = {
    rosterForCurrentScoringPeriod: {
        entries: [],
    },
};

describe('Best Weekly Score', () => {
    beforeAll(() => {
        getCurrentScoringPeriodResults.mockReturnValue(mockAllTeamsResults);
        getTeamScoringPeriodResult.mockReturnValue(mockTeamResult);
        bestLineupScore.mockReturnValue(200);
    });

    it('should get current scoring period results', () => {
        bestWeeklyScore(scoringPeriodId, 0, schedule, settings);
        expect(getCurrentScoringPeriodResults).toHaveBeenCalledWith(scoringPeriodId, schedule);
    });

    it('should get single team results', () => {
        bestWeeklyScore(scoringPeriodId, 0, schedule, settings);
        expect(getTeamScoringPeriodResult).toHaveBeenCalledWith(0, mockAllTeamsResults);
    });

    it('should get best lineup score with team results', () => {
        bestWeeklyScore(scoringPeriodId, 0, schedule, settings);
        expect(bestLineupScore).toHaveBeenCalledWith(
            settings,
            mockTeamResult.rosterForCurrentScoringPeriod.entries,
        );
    });

    it('should return best lineup score', () => {
        expect(bestLineupScore(scoringPeriodId, 0, schedule, settings)).toBe(200);
    });
});
