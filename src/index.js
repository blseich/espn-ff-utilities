// @flow
import adjustedVictories from './adjusted-victories';
import bestWeeklyScore from './best-weekly-score';
import realWeeklyScore from './real-weekly-score';
import recordVersus from './record-versus';
import { type Matchup, type Settings, type Record } from './types';

type InitializedAdjustedVictoriesFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedBestWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedRealWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedRecordVersusFn = (teamId: number, opposingIds: Array<number>) => Record;
type InitializedFunctions = {
    adjustedVictories: InitializedAdjustedVictoriesFn,
    bestWeeklyScore: InitializedBestWeeklyScoreFn,
    realWeeklyScore: InitializedRealWeeklyScoreFn,
    recordVersus: InitializedRecordVersusFn
};

type InitializedAdjustedVictoriesWithSpiFn = (teamId: number) => number;
type InitializedBestWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedRealWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedFunctionsWithSpi = {
    adjustedVictories: InitializedAdjustedVictoriesWithSpiFn,
    bestWeeklyScore: InitializedBestWeeklyScoreWithSpiFn,
    realWeeklyScore: InitializedRealWeeklyScoreWithSpiFn,
    recordVersus: InitializedRecordVersusFn
};

const init = (schedule: Matchup, settings: Settings): InitializedFunctions => {
    const adjVictoriesInit: InitializedAdjustedVictoriesFn = (scoringPeriodId, teamId) => (
        adjustedVictories(scoringPeriodId, teamId, schedule)
    );
    const bestWeeklyInit: InitializedBestWeeklyScoreFn = (scoringPeriodId, teamId) => (
        bestWeeklyScore(scoringPeriodId, teamId, schedule, settings)
    );
    const realWeeklyInit: InitializedRealWeeklyScoreFn = (scoringPeriodId, teamId) => (
        realWeeklyScore(scoringPeriodId, teamId, schedule)
    );
    const recordVersusInit: InitializedRecordVersusFn = (teamId, opposingIds) => (
        recordVersus(teamId, opposingIds, schedule)
    );
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
        recordVersus: recordVersusInit,
    };
};

const initForScoringPeriod = (
    scoringPeriodId: number,
    schedule: Matchup,
    settings: Settings,
): InitializedFunctionsWithSpi => {
    const adjVictoriesInit: InitializedAdjustedVictoriesWithSpiFn = (teamId) => (
        adjustedVictories(scoringPeriodId, teamId, schedule)
    );
    const bestWeeklyInit: InitializedBestWeeklyScoreWithSpiFn = (teamId) => (
        bestWeeklyScore(scoringPeriodId, teamId, schedule, settings)
    );
    const realWeeklyInit: InitializedRealWeeklyScoreWithSpiFn = (teamId) => (
        realWeeklyScore(scoringPeriodId, teamId, schedule)
    );
    const recordVersusInit: InitializedRecordVersusFn = (teamId, opposingIds) => (
        recordVersus(teamId, opposingIds, schedule)
    );
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
        recordVersus: recordVersusInit,
    };
};

export default {
    adjustedVictories,
    bestWeeklyScore,
    realWeeklyScore,
    recordVersus,
    init,
    initForScoringPeriod,
};
