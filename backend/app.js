const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const teamsRouter = require("./routes/teams");
app.use("/api/teams", teamsRouter);

const pokemonRouter = require("./routes/pokemons");
app.use("/api/pokemons", pokemonRouter);

const battleRouter = require("./routes/battle");
app.use("/api/battle", battleRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
