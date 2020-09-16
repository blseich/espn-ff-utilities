// @flow
import adjustedVictories from './adjusted-victories';
import bestWeeklyScore from './best-weekly-score';
import realWeeklyScore from './real-weekly-score';
import recordVersus from './record-versus';
import didWin from './did-win';
import { type Matchup, type Settings, type Record } from './types';

type InitializedAdjustedVictoriesFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedBestWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedRealWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedRecordVersusFn = (
    scoringPeriodId: number, teamId: number, opposingIds: Array<number>) => Record;
type InitializedDidWinFn = (scoringPeriodId: number, teamId: number) => boolean;
type InitializedFunctions = {
    adjustedVictories: InitializedAdjustedVictoriesFn,
    bestWeeklyScore: InitializedBestWeeklyScoreFn,
    realWeeklyScore: InitializedRealWeeklyScoreFn,
    recordVersus: InitializedRecordVersusFn,
    didWin: InitializedDidWinFn
};

type InitializedAdjustedVictoriesWithSpiFn = (teamId: number) => number;
type InitializedBestWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedRealWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedRecordVersusWithSpiFn = (teamId: number, opposingIds: Array<number>) => Record;
type InitializedDidWinWithSpiFn = (teamId: number) => boolean;
type InitializedFunctionsWithSpi = {
    adjustedVictories: InitializedAdjustedVictoriesWithSpiFn,
    bestWeeklyScore: InitializedBestWeeklyScoreWithSpiFn,
    realWeeklyScore: InitializedRealWeeklyScoreWithSpiFn,
    recordVersus: InitializedRecordVersusWithSpiFn,
    didWin: InitializedDidWinWithSpiFn
};

export const init = (schedule: Array<Matchup>, settings: Settings): InitializedFunctions => {
    const adjVictoriesInit: InitializedAdjustedVictoriesFn = (scoringPeriodId, teamId) => (
        adjustedVictories(scoringPeriodId, teamId, schedule)
    );
    const bestWeeklyInit: InitializedBestWeeklyScoreFn = (scoringPeriodId, teamId) => (
        bestWeeklyScore(scoringPeriodId, teamId, schedule, settings)
    );
    const realWeeklyInit: InitializedRealWeeklyScoreFn = (scoringPeriodId, teamId) => (
        realWeeklyScore(scoringPeriodId, teamId, schedule)
    );
    const recordVersusInit: InitializedRecordVersusFn = (scoringPeriodId, teamId, opposingIds) => (
        recordVersus(scoringPeriodId, teamId, opposingIds, schedule)
    );
    const didWinInit: InitializedDidWinFn = (scoringPeriodId, teamId) => (
        didWin(scoringPeriodId, teamId, schedule)
    );
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
        recordVersus: recordVersusInit,
        didWin: didWinInit,
    };
};

export const initForScoringPeriod = (
    scoringPeriodId: number,
    schedule: Array<Matchup>,
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
    const recordVersusInit: InitializedRecordVersusWithSpiFn = (teamId, opposingIds) => (
        recordVersus(scoringPeriodId, teamId, opposingIds, schedule)
    );
    const didWinInit: InitializedDidWinWithSpiFn = (teamId) => (
        didWin(scoringPeriodId, teamId, schedule)
    );
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
        recordVersus: recordVersusInit,
        didWin: didWinInit,
    };
};

export default {
    adjustedVictories,
    bestWeeklyScore,
    realWeeklyScore,
    recordVersus,
    didWin,
    init,
    initForScoringPeriod,
};
