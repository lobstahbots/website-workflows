import { Trigger } from "deno-slack-sdk/types.ts";
import LeaderboardUpdateDefinition from "../functions/leaderboard_update/definition.ts";
import { TriggerContextData, TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";

const LeaderboardUpdateTrigger: Trigger<
  typeof LeaderboardUpdateDefinition.definition
> = {
  type: TriggerTypes.Event,
  name: "leaderboard update",
  description: "Update the leaderboard for 2:46 messages",
  workflow: "#/workflows/leaderboard_update_workflow",
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: ["C046CFN4AJ0"],
    filter: {
      version: 1,
      root: {
        operator: "OR",
        inputs: [
          { statement: "{{data.text}} == '246'"},
          { statement: "{{data.text}} CONTAINS '2:46'"},
        ]
      }
    }
  },
  inputs: {
    user_id: {
      value: TriggerContextData.Event.MessagePosted.user_id,
    },
    timestamp: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },
  }
};

export default LeaderboardUpdateTrigger;
