import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import LeaderboardCountsDefinition from "../functions/leaderboard_counts/definition.ts";

const LeaderboardCountsWorkflow = DefineWorkflow({
  callback_id: "leaderboard_counts_workflow",
  title: "Show leaderboard counts",
  description: "Show 2:46 leaderboard counts",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel_id"],
  },
});

LeaderboardCountsWorkflow.addStep(
  LeaderboardCountsDefinition,
  { channel_id: LeaderboardCountsWorkflow.inputs.channel_id },
);

export default LeaderboardCountsWorkflow;
