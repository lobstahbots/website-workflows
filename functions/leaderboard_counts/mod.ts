import { Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import LeaderboardCountsDefinition from "./definition.ts";
import { CHANNEL_ID } from "../../constants.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";

export default SlackFunction(
  LeaderboardCountsDefinition,
  async ({ client, inputs }) => {
    const users: (typeof Schema.slack.types.user_id)[] = [];
    let cursor: string | undefined = undefined;
    do {
      const result = await client.conversations.members({
        channel: CHANNEL_ID,
        cursor,
        limit: 100,
      });
      if (!result.ok) {
        return { error: result.error ?? "unknown members error" };
      }
      cursor = result.response_metadata?.next_cursor;
      users.push(...result.members);
    } while (cursor);
    const userCounts: {
      userID: typeof Schema.slack.types.user_id;
      count: number;
    }[] = [];
    for (const userID of users) {
      const result = await client.apps.datastore.count<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        expression: "#user_id = :userID",
        expression_values: { ":userID": userID },
        expression_attributes: { "#user_id": "user_id" },
      });
      if (!result.ok) {
        return { error: result.error ?? "unknown count error" };
      }
      userCounts.push({ userID, count: result.count });
    }
    userCounts.sort((a, b) => b.count - a.count);
    client.chat.postMessage({
      channel: inputs.channel_id,
      text: "2:46 Leaderboard All-Time:\n" + userCounts.slice(0, 5)
        .map((userCount, index) => `${index + 1}. <@${userCount.userID}>: ${userCount.count}`)
        .join("\n"),
    });
    return { outputs: { userCounts } };
  },
);
