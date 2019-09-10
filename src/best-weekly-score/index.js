// @flow
import bestLineup from '../best-lineup';

type PlayerType = {
    playerPoolEntry: {
    appliedStatTotal: number,
    player: {
      eligibleSlots: Array<number>
    }
  }
};
type SettingsType = {
  rosterSettings: {
    lineupSlotCounts: {}
  }
};

const sumAppliedStatTotal = (acc: number, player: PlayerType): number => (
    acc + player.playerPoolEntry.appliedStatTotal
);


const bestWeeklyScore = (settings: SettingsType, players: Array<PlayerType>): number => {
    const highestScoreingLineup = bestLineup(settings, players);
    return highestScoreingLineup.reduce(sumAppliedStatTotal, 0);
};

export default bestWeeklyScore;
