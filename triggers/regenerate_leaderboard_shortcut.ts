import { Trigger } from "deno-slack-api/types.ts";
import RegenerateLeaderboardWorkflow from "../workflows/regenerate_leaderboard.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";

const regenerateLeaderboardShortcut: Trigger<
  typeof RegenerateLeaderboardWorkflow.definition
> = {
  type: TriggerTypes.Shortcut,
  name: "Regenerate Leaderboard",
  description: "Regenerate the 2:46 leaderboard",
  workflow: "#/workflows/regenerate_leaderboard_workflow",
};
export default regenerateLeaderboardShortcut;
