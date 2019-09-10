// @flow
import bestLineup from '../best-lineup';
import twoDigitRound from '../../utilities/two-digit-round';
import { type Player, type Settings } from '../../types';

const sumAppliedStatTotal = (acc: number, player: Player): number => (
    acc + twoDigitRound(player.playerPoolEntry.appliedStatTotal)
);


const bestLineupScore = (settings: Settings, players: Array<Player>): number => {
    const highestScoreingLineup = bestLineup(settings, players);
    return highestScoreingLineup.reduce(sumAppliedStatTotal, 0);
};

export default bestLineupScore;
