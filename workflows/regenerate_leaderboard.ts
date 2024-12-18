import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import ClearLeaderboardDefinition from "../functions/clear_leaderboard/definition.ts";
import RegenerateLeaderboardDefinition from "../functions/regenerate_leaderboard/definition.ts";

const RegenerateLeaderboardWorkflow = DefineWorkflow({
  callback_id: "regenerate_leaderboard_workflow",
  title: "Regenerate Leaderboard",
  description: "Regenerate the 2:46 leaderboard",
});

RegenerateLeaderboardWorkflow.addStep(ClearLeaderboardDefinition, {});
RegenerateLeaderboardWorkflow.addStep(RegenerateLeaderboardDefinition, {});

export default RegenerateLeaderboardWorkflow;
