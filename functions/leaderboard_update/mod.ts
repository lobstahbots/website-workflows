import { SlackFunction } from "deno-slack-sdk/mod.ts";
import LeaderboardUpdateDefinition from "./definition.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";

export default SlackFunction(
  LeaderboardUpdateDefinition,
  async ({ client, inputs }) => {
    const time = new Temporal.Instant(
      BigInt(inputs.timestamp.toFixed()) * 1000000000n,
    ).toZonedDateTimeISO("America/New_York");
    const text = inputs.message_content;
    if (
      time.hour % 12 === 2 && time.minute === 46 && (text.includes("2:46") || text.includes("246"))
    ) {
      const putResponse = await client.apps.datastore.put<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        item: {
          id: crypto.randomUUID(),
          user_id: inputs.user_id,
          message_content: inputs.message_content,
          timestamp: inputs.timestamp,
          date: time.toPlainDate().toString(),
        },
      });
      if (!putResponse.ok) {
        return { error: putResponse.error ?? "uknown put error" };
      }
    }
    return { outputs: {} };
  },
);
