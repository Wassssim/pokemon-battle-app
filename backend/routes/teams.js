const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.rpc("get_all_pokemon_teams");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { user_id, team_name, pokemon_ids } = req.body;

  if (!Array.isArray(pokemon_ids) || pokemon_ids.length !== 6) {
    return res
      .status(400)
      .json({ error: "A team must consist of exactly 6 Pokémon." });
  }

  console.log({
    user_id,
    team_name,
    pokemon_ids,
  });

  try {
    const { data, error } = await supabase.rpc("insert_team", {
      user_id,
      team_name,
      pokemon_ids,
    });

    if (error) throw error;

    res.json({ message: "Team inserted successfully", data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

router.get("/team/:id/pokemons", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("team_pokemon")
      .select(
        `
        pokemon: pokemon_id (id, name, type, life, power, image)
      `
      )
      .eq("team_id", id);

    if (error) {
      throw new Error("Error fetching team Pokémon: " + error.message);
    }

    const result = data.map((entry) => entry.pokemon);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
