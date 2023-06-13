// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

export default async (req, res) => {
  try {
    const filters = req.body;
    const players = await Player.findAll({
      where: filters,
      include: PlayerSkill,
      limit: filters.reduce((total, filter) => total + filter.numberOfPlayers, 0),
    });

    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
