import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { cardRouter } from "./routers/card";
import { deckRouter } from "./routers/deck";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  card: cardRouter,
  deck: deckRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
