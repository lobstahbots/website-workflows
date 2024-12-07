import { Manifest } from "deno-slack-sdk/mod.ts";
import RebuildNewsletterDefinition from "./functions/rebuild_newsletter/definition.ts";
import RebuildNewsletterWorkflow from "./workflows/rebuild_newsletter.ts";
import RevalidateWebsiteDefinition from "./functions/revalidate_website/definition.ts";
import RevalidateWebsiteWorkflow from "./workflows/revalidate_website.ts";

export default Manifest({
  name: "Lobstah Bots",
  description: "Lobstah Bots internal workflows",
  icon: "assets/icon.png",
  functions: [RebuildNewsletterDefinition, RevalidateWebsiteDefinition],
  workflows: [
    RebuildNewsletterWorkflow,
    RevalidateWebsiteWorkflow,
  ],
  outgoingDomains: ["api.github.com", "lobstahbots.com"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "users:read",
    "users:read.email",
  ],
});
