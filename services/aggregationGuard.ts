import { NON_SUM_METRICS } from "./gaParityConfig"

export function safeAggregate(metric: string, current: number, incoming: number) {

  if (NON_SUM_METRICS.includes(metric)) {

    return Math.max(current, incoming)

  }

  return current + incoming

}