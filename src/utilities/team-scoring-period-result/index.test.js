import getTeamScoringPeriodResult from '.';

const mockTeamScoringResults = [
    { teamId: 1 },
    { teamId: 2 },
    { teamId: 3 },
];

describe('Get Team Scoring Period Result', () => {
    it('should retrieve team result', () => {
        expect(getTeamScoringPeriodResult(1, mockTeamScoringResults)).toStrictEqual({ teamId: 1 });
        expect(getTeamScoringPeriodResult(2, mockTeamScoringResults)).toStrictEqual({ teamId: 2 });
        expect(getTeamScoringPeriodResult(3, mockTeamScoringResults)).toStrictEqual({ teamId: 3 });
    });

    it('should throw an error if no team with matching id is found', () => {
        expect(() => {
            getTeamScoringPeriodResult(99, mockTeamScoringResults);
        }).toThrow('ERROR: Player Id not found in current scoring period');
    });
});
