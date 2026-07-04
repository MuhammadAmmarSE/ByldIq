/**
 * Extensible map of analytics events to their payload shape. Each future
 * feature milestone augments this via declaration merging instead of
 * widening a shared union, e.g.:
 *
 *   declare module "@/types/analytics" {
 *     interface AnalyticsEventMap {
 *       journey_selected: { journey: Journey };
 *     }
 *   }
 *
 * No milestone-4+ event names are declared yet — inventing them now would
 * be guessing at features this milestone isn't building.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- extended via declaration merging by later milestones
export interface AnalyticsEventMap {}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export interface AnalyticsClient {
  track<K extends AnalyticsEventName>(event: K, payload: AnalyticsEventMap[K]): void;
}
