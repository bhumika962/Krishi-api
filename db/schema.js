import {pgTable,serial,text,timestamp,integer} from "drizzle-orm/pg-core";
export const favoritesTable= pgTable("favorites",{
    id:serial("id").primaryKey(),
    userid:text("user_id").notNull(),
    title:text("title").notNull(),
})

export const userTable= pgTable("userdata",{
    id:serial("id").primaryKey(),
    username:text("uname").notNull(),
    usercontact:text("unum").notNull(),
    userbirth:text("udob").notNull(),   
})

