import { DefineType } from "deno-slack-sdk/types/mod.ts";
import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const UserCountType = DefineType(
  {
    title: "User Count",
    name: "user_count",
    description: "An object that stores a user ID and a count",
    type: Schema.types.object,
    properties: {
      userID: {
        type: Schema.slack.types.user_id,
      },
      count: {
        type: Schema.types.integer,
      },
    },
    required: ["userID", "count"],
  },
);

const LeaderboardCountsDefinition = DefineFunction({
  callback_id: "leaderboard_counts",
  title: "Leaderboard Counts",
  description: "Get the counts of each user in the leaderboard",
  source_file: "functions/leaderboard_counts/mod.ts",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel_id"],
  },
  output_parameters: {
    properties: {
      userCounts: {
        type: Schema.types.array,
        items: {
          type: UserCountType,
        },
      },
    },
    required: ["userCounts"],
  },
});

export default LeaderboardCountsDefinition;
