import { pgTable, text, serial, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  civilStatus: text("civil_status").notNull(),
  sex: text("sex").notNull(),
  age: text("age").notNull(),
  hhMember: text("hh_member").notNull(),
  fishR: text("fish_r").notNull(),
  boatR: text("boat_r").notNull(),
  nameAssoc: text("name_assoc").notNull(),
  totalMember: text("total_member").notNull(),
  province: text("province").notNull(),
  municipality: text("municipality").notNull(),
  baranggay: text("baranggay").notNull(),
  projectReceived: text("project_received").notNull(),
  specProject: text("spec_project"),
  noUnitsReceived: text("no_units_received").notNull(),
  dateReceived: text("date_received").notNull(),
  mainIncome: text("main_income").notNull(),
  otherIncome: text("other_income"),
  
  // Efficiency metrics
  quantity: text("quantity").notNull(),
  quantityReason: text("quantity_reason"),
  quantityRating: text("quantity_rating").notNull(),
  quality: text("quality").notNull(),
  qualityReason: text("quality_reason"),
  qualityRating: text("quality_rating").notNull(),
  
  // Timeliness
  q2: text("q2").notNull(),
  q2Reason: text("q2_reason"),
  timelinessRating: text("timeliness_rating").notNull(),
  uponRequest: text("upon_request").notNull(),
  
  // Relevance 
  q3: text("q3").notNull(),
  q3Reason: text("q3_reason"),
  challenges: text("challenges").notNull(),
  relevanceRating: text("relevance_rating").notNull(),
  q4: text("q4").notNull(),
  q4Reason: text("q4_reason"),
  
  // Coherence
  q5: text("q5").notNull(),
  q5Reason: text("q5_reason"),
  coherenceRating: text("coherence_rating").notNull(),
  q6: text("q6").notNull(),
  q6Reason: text("q6_reason")
});

export const insertSurveySchema = createInsertSchema(surveys);

export type InsertSurvey = z.infer<typeof insertSurveySchema>;
export type Survey = typeof surveys.$inferSelect;
