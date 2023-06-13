// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';

export default async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the player exists
    const player = await Player.findOne({ where: { id } });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Delete the player skills associated with the player
    await PlayerSkill.destroy({ where: { playerId: id } });

    // Delete the player
    await Player.destroy({ where: { id } });

    res.status(200).json({ message: 'Player and associated player skills deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
