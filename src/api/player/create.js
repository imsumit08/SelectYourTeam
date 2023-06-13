import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';


export default async (req, res) => {
  try {
    const { name, position, playerSkills } = req.body;

    const player = await Player.create({ name, position }); //this will create players in Players table 

    // Creating the player skills and associaing them with the player
    const createdPlayerSkills = await Promise.all(playerSkills.map(skill => {
      return PlayerSkill.create({
        skill: skill.skill,
        value: skill.value,
        playerId: player.id // Associating the player skill with the created player
      });
    }));

    res.status(201).json({
      player,
      playerSkills: createdPlayerSkills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
