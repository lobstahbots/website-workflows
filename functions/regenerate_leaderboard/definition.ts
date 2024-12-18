import { DefineFunction } from "deno-slack-sdk/mod.ts";

const RegenerateLeaderboardDefinition = DefineFunction({
  callback_id: "regenerate_leaderboard",
  title: "Regenerate Leaderboard",
  description: "Regenerate the leaderboard",
  source_file: "functions/regenerate_leaderboard/mod.ts",
});

export default RegenerateLeaderboardDefinition;
