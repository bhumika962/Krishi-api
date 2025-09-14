import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable, userTable} from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

// CORS setup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"]
}));

app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API running fine 🚀" });
});

/* -------- FAVORITES -------- */

// Add favorite crop
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, title } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({ userid: userId, title })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get all favorites by user
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userid, userId));

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete a specific favorite by ID
app.delete("/api/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(favoritesTable)
      .where(eq(favoritesTable.id, Number(id)))
      .execute();

    res.status(200).json({ message: "Favorite deleted", result });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/* -------- USERS -------- */

// Add user
app.post("/api/users", async (req, res) => {
  try {
    const { username, usercontact, userbirth } = req.body;

    if (!username || !usercontact || !userbirth) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await db
      .insert(userTable)
      .values({ username, usercontact, userbirth })
      .returning();

    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, Number(id)));

    if (!user.length) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, usercontact, userbirth } = req.body;

    const updatedUser = await db
      .update(userTable)
      .set({ username, usercontact, userbirth })
      .where(eq(userTable.id, Number(id)))
      .returning();

    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db
      .delete(userTable)
      .where(eq(userTable.id, Number(id)))
      .execute();

    res.status(200).json({ message: "User deleted", result });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`API running on PORT: ${PORT}`);
});
