import { SlackFunction } from "deno-slack-sdk/mod.ts";
import ClearLeaderboardDefinition from "./definition.ts";
import LeaderboardDatastore from "../../datastores/leaderboard.ts";
import { DatastoreQueryResponse } from "deno-slack-api/typed-method-types/apps.ts";

export default SlackFunction(
  ClearLeaderboardDefinition,
  async ({ client }) => {
    const allIds: string[] = [];
    let cursor: string | undefined = undefined;
    do {
      const result: DatastoreQueryResponse<
        typeof LeaderboardDatastore.definition
      > = await client.apps.datastore.query<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        cursor,
      });
      if (!result.ok) {
        return { error: result.error ?? "unknown query error" };
      }
      cursor = result.response_metadata?.next_cursor;
      allIds.push(...result.items.map((item) => item.id));
    } while (cursor);
    while (allIds.length > 0) {
      const deleteResponse = await client.apps.datastore.bulkDelete<
        typeof LeaderboardDatastore.definition
      >({
        datastore: LeaderboardDatastore.name,
        ids: allIds.splice(0, 25),
      });
      if (!deleteResponse.ok) {
        return { error: deleteResponse.error ?? "unknown delete error" };
      }
    }
    return { outputs: {} };
  },
);
