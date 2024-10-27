const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("pokemon").select("*");

    if (error) {
      throw new Error(error.message);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("pokemon")
      .select()
      .eq("id", req.params.id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, life, power } = req.body;

  try {
    const { data, error } = await supabase
      .from("pokemon")
      .update({ type, life, power })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    res.json({ message: `Pokemon ${id} updated.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
