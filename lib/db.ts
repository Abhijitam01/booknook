// Mock database implementation
// This replaces the Prisma client with in-memory storage for the preview

// In-memory storage
const db = {
  users: new Map(),
  books: new Map(),
  categories: new Map(),
  discussions: new Map(),
  messages: new Map(),
  blogPosts: new Map(),
  comments: new Map(),
}

// Initialize with some data
export function seedDatabase() {
  // This would normally be done in a database migration
  // For the preview, we'll just initialize some data in memory
}

export { db }

