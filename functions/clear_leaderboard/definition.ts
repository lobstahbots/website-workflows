import { DefineFunction } from "deno-slack-sdk/mod.ts";

const ClearLeaderboardDefinition = DefineFunction({
  callback_id: "clear_leaderboard",
  title: "Clear Leaderboard",
  description: "Clear the leaderboard",
  source_file: "functions/clear_leaderboard/mod.ts",
});

export default ClearLeaderboardDefinition;
