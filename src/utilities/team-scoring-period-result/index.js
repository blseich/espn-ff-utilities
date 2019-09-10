// @flow
import { type TeamScoringPeriodResult } from '../../types';

const getTeamScoringPeriodResult = (
    teamId: number,
    scoringPeriodResults: Array<TeamScoringPeriodResult>,
): TeamScoringPeriodResult => {
    const teamResult = scoringPeriodResults.find((tsr: TeamScoringPeriodResult): boolean => (
        tsr.teamId === teamId
    ));
    if (teamResult === undefined) {
        throw Error('ERROR: Player Id not found in current scoring period');
    }
    return teamResult;
};

export default getTeamScoringPeriodResult;
