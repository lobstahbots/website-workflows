import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

const LeaderboardUpdateDefinition = DefineFunction({
  callback_id: "leaderboard_update",
  title: "Leaderboard Update",
  description: "Update the leaderboard for 2:46 messages",
  source_file: "functions/leaderboard_update/mod.ts",
  input_parameters: {
    properties: {
      user_id: {
        type: Schema.slack.types.user_id,
        description: "User ID who sent the message",
      },
      timestamp: {
        type: Schema.types.number,
      }
    },
    required: ["user_id", "timestamp"]
  }
});

export default LeaderboardUpdateDefinition;