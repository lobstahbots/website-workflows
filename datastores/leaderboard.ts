import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export default DefineDatastore({
  name: "leaderboard",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
    user_id: {
      type: Schema.slack.types.user_id,
    },
    date: {
      type: Schema.slack.types.date,
    },
    timestamp: {
      type: Schema.types.number,
    },
    message_content: {
      type: Schema.types.string,
    },
    pm: {
      type: Schema.types.boolean,
    },
  },
});
