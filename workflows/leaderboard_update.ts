import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import LeaderboardUpdateDefinition from "../functions/leaderboard_update/definition.ts";

const LeaderboardUpdateWorkflow = DefineWorkflow({
  callback_id: "leaderboard_update_workflow",
  title: "Get 246 leaderboard",
  description: "Get 2:46 leaderboard",
  input_parameters: {
    properties: {
      user_id: {
        type: Schema.slack.types.user_id,
        description: "User ID who sent the message",
      },
      timestamp: {
        type: Schema.types.number,
      },
    },
    required: ["user_id", "timestamp"],
  },
});

LeaderboardUpdateWorkflow.addStep(
  LeaderboardUpdateDefinition,
  LeaderboardUpdateWorkflow.inputs,
);

export default LeaderboardUpdateWorkflow;
