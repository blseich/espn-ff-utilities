// @flow
import { type Player } from '../../types';

type PlayerIsElligibleForSlotCb = (p: Player) => boolean;

const playerIsElligibleForSlot = (slotId: number): PlayerIsElligibleForSlotCb => (
    (p: Player): boolean => p.playerPoolEntry.player.eligibleSlots.includes(slotId)
);

const pointsScored = (playerObj1: Player, playerObj2: Player): number => {
    const p1Score = playerObj1.playerPoolEntry.appliedStatTotal;
    const p2Score = playerObj2.playerPoolEntry.appliedStatTotal;
    return p1Score > p2Score ? 1 : -1;
};

const bestPlayer = (slotId: number, players: Array<Player>): Player => players
    .filter(playerIsElligibleForSlot(slotId))
    .sort(pointsScored)
    .reverse()[0];

export default bestPlayer;
