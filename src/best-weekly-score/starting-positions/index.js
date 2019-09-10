// @flow
import { type Settings } from '../../types';

type FillStartingPosIdsCb = (s: Array<number>, p: number) => Array<number>;

const isStartingPositionId = (slotId: number): boolean => ![20, 21].includes(slotId);

const fillStartingPosIds = (startingLimits: {}): FillStartingPosIdsCb => (
    (startingPositionIds: Array<number>, positionId: number): Array<number> => {
        const numOfAllowedSlots = startingLimits[`${positionId}`];
        const numericalPositionId = positionId;
        const arrOfPositionIds = Array(numOfAllowedSlots).fill(numericalPositionId);
        return startingPositionIds.concat(arrOfPositionIds);
    }
);

const startingPositions = (settings: Settings): Array<number> => {
    const startingLimits = settings.rosterSettings.lineupSlotCounts;
    return Object.keys(startingLimits)
        .map((key: string): number => Number.parseInt(key))
        .filter(isStartingPositionId)
        .reduce(fillStartingPosIds(startingLimits), []);
};

export default startingPositions;
