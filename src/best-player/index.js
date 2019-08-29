// @flow
type PlayerType = {
    playerPoolEntry: {
    appliedStatTotal: number,
    player: {
      eligibleSlots: Array<number>
    }
  }
};

const playerIsElligibleForSlot = (slotId: number): ((p: PlayerType) => boolean) => (
  (p: PlayerType): boolean => p.playerPoolEntry.player.eligibleSlots.includes(slotId)
);

const pointsScored = (playerObj1: PlayerType, playerObj2: PlayerType): number => (
  playerObj1.playerPoolEntry.appliedStatTotal > playerObj2.playerPoolEntry.appliedStatTotal ? 1 : -1
);

const bestPlayer = (slotId: number, players: Array<PlayerType>): PlayerType => players
  .filter(playerIsElligibleForSlot(slotId))
  .sort(pointsScored)
  .reverse()[0];

export default bestPlayer;
