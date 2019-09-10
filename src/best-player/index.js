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

const pointsScored = (playerObj1: PlayerType, playerObj2: PlayerType): number => {
    const p1Score = playerObj1.playerPoolEntry.appliedStatTotal;
    const p2Score = playerObj2.playerPoolEntry.appliedStatTotal;
    return p1Score > p2Score ? 1 : -1;
};

const bestPlayer = (slotId: number, players: Array<PlayerType>): PlayerType => players
    .filter(playerIsElligibleForSlot(slotId))
    .sort(pointsScored)
    .reverse()[0];

export default bestPlayer;
