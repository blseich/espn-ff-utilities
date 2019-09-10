// @flow
import bestPlayer from '../best-player';
import startingPositions from '../starting-positions';
import { type Player, type Settings } from '../../types';

const removeBestPlayerFromPool = (
    players: Array<Player>,
    player: Player,
): Array<Player> => {
    const playerIndex = players.indexOf(player);
    return playerIndex > -1 ? players.splice(playerIndex, 1) : [];
};

const bestLineup = (settings: Settings, players: Array<Player>): Array<Player> => {
    const playersCopy = [].concat(players);
    return startingPositions(settings)
        .map((slotId: number): Player => {
            const bestAvailablePlayer = bestPlayer(slotId, playersCopy);
            removeBestPlayerFromPool(playersCopy, bestAvailablePlayer);
            return bestAvailablePlayer;
        });
};

export default bestLineup;
