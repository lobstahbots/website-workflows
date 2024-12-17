import { SlackFunction } from "deno-slack-sdk/mod.ts";
import LeaderboardUpdateDefinition from "./definition.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";

export default SlackFunction(
  LeaderboardUpdateDefinition,
  async ({ client, inputs }) => {
    const time = new Date(inputs.timestamp * 1000);
    if (
      time.toLocaleTimeString("en-US", { timeZone: "America/New_York" })
        .startsWith("2:46")
    ) {
      const getResponse = await client.apps.datastore.get<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        id: inputs.user_id,
      });
      if (!getResponse.ok) {
        return { error: getResponse.error ?? "unknown get error" };
      }
      const messageCount: number = getResponse.item?.message_count ?? 0;
      const updateResponse = await client.apps.datastore.put<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        item: { user_id: inputs.user_id, message_count: messageCount + 1 },
      });
      if (!updateResponse.ok) {
        return { error: updateResponse.error ?? "uknown put error" };
      }
    }
    return { outputs: {} };
  },
);
