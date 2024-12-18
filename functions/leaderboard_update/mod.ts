import { SlackFunction } from "deno-slack-sdk/mod.ts";
import LeaderboardUpdateDefinition from "./definition.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";
import { CHANNEL_ID } from "../../constants.ts";

export default SlackFunction(
  LeaderboardUpdateDefinition,
  async ({ client, inputs }) => {
    const time = new Date(inputs.timestamp * 1000);
    const localeTimeString = time.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });
    const text = inputs.message_content;
    if (
      localeTimeString.startsWith("2:46") &&
      (text.includes("2:46") || text.includes("246"))
    ) {
      const putResponse = await client.apps.datastore.put<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        item: {
          id: crypto.randomUUID(),
          user_id: inputs.user_id,
          message_content: text,
          timestamp: inputs.timestamp,
          date: time.toISOString().split("T")[0],
          pm: localeTimeString.endsWith("PM"),
        },
      });
      if (!putResponse.ok) {
        return { error: putResponse.error ?? "uknown put error" };
      }
      if (localeTimeString.endsWith("AM")) {
        client.reactions.add({
          channel: CHANNEL_ID,
          timestamp: inputs.timestamp,
          name: "bed",
        });
      }
    }
    return { outputs: {} };
  },
);
