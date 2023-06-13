// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';

export default async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, playerSkills } = req.body;

    // Update the player
    const [updatedRows] = await Player.update(
      { name, position },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Delete the existing player skills associated with the player
    await PlayerSkill.destroy({ where: { playerId: id } });

    // Create the new player skills and associate them with the player
    const createdPlayerSkills = await Promise.all(playerSkills.map(skill => {
      return PlayerSkill.create({
        skill: skill.skill,
        value: skill.value,
        playerId: id // Associate the player skill with the updated player
      });
    }));

    res.status(200).json({
      message: 'Player updated successfully',
      player: { id, name, position },
      playerSkills: createdPlayerSkills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
