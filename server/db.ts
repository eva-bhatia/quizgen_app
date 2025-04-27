// This file is a stub to maintain compatibility
// We're using in-memory storage instead of a database

import * as schema from "@shared/schema";

// Dummy db implementation - not actually used
export const db = {
  select: () => ({
    from: () => ({
      where: () => []
    })
  }),
  insert: () => ({
    values: () => ({
      returning: () => []
    })
  })
};