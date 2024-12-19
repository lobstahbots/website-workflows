import { Trigger } from "deno-slack-api/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import LeaderboardCountsWorkflow from "../workflows/leaderboard_counts.ts";

const leaderboardCountsShortcut: Trigger<
  typeof LeaderboardCountsWorkflow.definition
> = {
  type: TriggerTypes.Shortcut,
  name: "Leaderboard Counts",
  description: "Show 2:46 leaderboard counts",
  workflow: "#/workflows/leaderboard_counts_workflow",
  inputs: {
    channel_id: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default leaderboardCountsShortcut;
