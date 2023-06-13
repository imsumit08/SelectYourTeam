// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

const Player = require('../../db/model/player'); 

export default async (req, res) => {
  try {
    const players = await Player.findAll();

    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error occured' });
  }
}