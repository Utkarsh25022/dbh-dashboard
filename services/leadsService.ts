// services/leadsService.ts

/**
 * Temporary Leads Service
 * (Replace later with MySQL query)
 */

// services/leadsService.ts

export async function fetchLeads(models: string[]) {
  console.log("Fetching leads for:", models);

  return Math.floor(Math.random() * 500) + 200;
}