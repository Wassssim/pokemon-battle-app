const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

router.post("/", async (req, res) => {
  const { team1Id, team2Id } = req.body;

  try {
    const team1 = await getPokemonsForTeam(team1Id);
    const team2 = await getPokemonsForTeam(team2Id);

    const battleLog = await simulateBattle(team1, team2);
    res.json(battleLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function simulateBattle(team1, team2) {
  let round = 0;
  const battleLog = [];

  while (team1.length && team2.length) {
    round++;
    const pokemon1 = team1[0];
    const pokemon2 = team2[0];

    const factor1 = await getWeaknessFactor(pokemon1.type, pokemon2.type);
    const factor2 = await getWeaknessFactor(pokemon2.type, pokemon1.type);

    pokemon1.life -= pokemon2.power * factor2;
    pokemon2.life -= pokemon1.power * factor1;

    battleLog.push({
      round,
      pokemon1: {
        name: pokemon1.name,
        life: pokemon1.life,
        image: pokemon1.image,
      },
      pokemon2: {
        name: pokemon2.name,
        life: pokemon2.life,
        image: pokemon2.image,
      },
    });

    // Remove Pokemon with life <= 0
    if (pokemon1.life <= 0) team1.shift();
    if (pokemon2.life <= 0) team2.shift();
  }

  const winner = team1.length ? "Team 1" : "Team 2";
  battleLog.push({ winner });
  return battleLog;
}

async function getPokemonsForTeam(teamId) {
  const { data, error } = await supabase
    .from("team_pokemon")
    .select(
      `
      pokemon: pokemon_id (id, name, type, life, power, image)
    `
    )
    .eq("team_id", teamId);

  if (error) throw new Error("Error fetching team Pokémon: " + error.message);

  return data.map((entry) => entry.pokemon);
}

async function getWeaknessFactor(type1, type2) {
  const { data, error } = await supabase
    .from("weakness")
    .select("factor")
    .eq("type1", type1)
    .eq("type2", type2)
    .single();

  if (error) {
    throw new Error("Error fetching weakness factor: " + error.message);
  }

  return data ? data.factor : 1;
}

module.exports = router;
