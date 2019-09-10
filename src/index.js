// @flow
import adjustedVictories from './adjusted-victories';
import bestWeeklyScore from './best-weekly-score';
import realWeeklyScore from './real-weekly-score';
import { type Matchup, type Settings } from './types';

type InitializedAdjustedVictoriesFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedBestWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedRealWeeklyScoreFn = (scoringPeriodId: number, teamId: number) => number;
type InitializedFunctions = {
    adjustedVictories: InitializedAdjustedVictoriesFn,
    bestWeeklyScore: InitializedBestWeeklyScoreFn,
    realWeeklyScore: InitializedRealWeeklyScoreFn
};

type InitializedAdjustedVictoriesWithSpiFn = (teamId: number) => number;
type InitializedBestWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedRealWeeklyScoreWithSpiFn = (teamId: number) => number;
type InitializedFunctionsWithSpi = {
    adjustedVictories: InitializedAdjustedVictoriesWithSpiFn,
    bestWeeklyScore: InitializedBestWeeklyScoreWithSpiFn,
    realWeeklyScore: InitializedRealWeeklyScoreWithSpiFn
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
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
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
    return {
        adjustedVictories: adjVictoriesInit,
        bestWeeklyScore: bestWeeklyInit,
        realWeeklyScore: realWeeklyInit,
    };
};

export default {
    adjustedVictories,
    bestWeeklyScore,
    realWeeklyScore,
    init,
    initForScoringPeriod,
};