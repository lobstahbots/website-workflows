import { Trigger } from "deno-slack-sdk/types.ts";
import LeaderboardUpdateDefinition from "../functions/leaderboard_update/definition.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import { CHANNEL_ID } from "../constants.ts";

const LeaderboardUpdateTrigger: Trigger<
  typeof LeaderboardUpdateDefinition.definition
> = {
  type: TriggerTypes.Event,
  name: "leaderboard update",
  description: "Update the leaderboard for 2:46 messages",
  workflow: "#/workflows/leaderboard_update_workflow",
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: [CHANNEL_ID],
    filter: {
      version: 1,
      root: {
        statement: "{{data.text}} == {{data.text}}",
      },
    },
  },
  inputs: {
    user_id: {
      value: TriggerContextData.Event.MessagePosted.user_id,
    },
    timestamp: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },
    message_content: {
      value: TriggerContextData.Event.MessagePosted.text,
    },
  },
};

export default LeaderboardUpdateTrigger;
