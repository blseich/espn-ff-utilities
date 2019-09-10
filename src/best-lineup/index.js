// @flow
import bestPlayer from '../best-player';
import startingPositions from '../starting-positions';

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

const removeBestPlayerFromPool = (
    players: Array<PlayerType>,
    player: PlayerType,
): Array<PlayerType> => {
    const playerIndex = players.indexOf(player);
    return playerIndex > -1 ? players.splice(playerIndex, 1) : [];
};

const bestLineup = (settings: SettingsType, players: Array<PlayerType>): Array<PlayerType> => {
    const playersCopy = [].concat(players);
    return startingPositions(settings)
        .map((slotId: number): PlayerType => {
            const bestAvailablePlayer = bestPlayer(slotId, playersCopy);
            removeBestPlayerFromPool(playersCopy, bestAvailablePlayer);
            return bestAvailablePlayer;
        });
};

export default bestLineup;
