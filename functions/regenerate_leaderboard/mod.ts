import { SlackFunction } from "deno-slack-sdk/mod.ts";
import RegenerateLeaderboardDefinition from "./definition.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";
import { CHANNEL_ID } from "../../constants.ts";

export default SlackFunction(
  RegenerateLeaderboardDefinition,
  async ({ client }) => {
    let cursor: string | undefined = undefined;
    const toPut = [];
    do {
      const result = await client.conversations.history({
        channel: CHANNEL_ID,
        cursor,
        limit: 200,
      });
      if (!result.ok) {
        return { error: result.error ?? "unknown history error" };
      }
      cursor = result.response_metadata?.next_cursor;
      for (const message of result.messages) {
        const time = new Date(message.ts * 1000);
        const localeTimeString = time.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
        });
        const text = message.text;
        if (
          localeTimeString.startsWith("2:46") &&
          (text.includes("2:46") || text.includes("246"))
        ) {
          toPut.push({
            id: crypto.randomUUID(),
            user_id: message.user,
            message_content: text,
            timestamp: message.ts,
            date: time.toISOString().split("T")[0],
            pm: localeTimeString.endsWith("PM"),
          });
        }
      }
    } while (cursor);
    while (toPut.length > 0) {
      const putResponse = await client.apps.datastore.bulkPut({
        datastore: LeaderboardDatastore.name,
        items: toPut.splice(0, 25),
      });
      if (!putResponse.ok) {
        return { error: putResponse.error ?? "unknown put error" };
      }
    }
    return { outputs: {} };
  },
);
