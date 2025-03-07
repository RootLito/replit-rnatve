import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/surveys", async (req, res) => {
    try {
      const surveyData = insertSurveySchema.parse(req.body);
      const survey = await storage.createSurvey(surveyData);
      res.json(survey);
    } catch (error) {
      res.status(400).json({ error: "Invalid survey data" });
    }
  });

  app.get("/api/surveys", async (_req, res) => {
    const surveys = await storage.getAllSurveys();
    res.json(surveys);
  });

  app.get("/api/surveys/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const survey = await storage.getSurvey(id);
    
    if (!survey) {
      res.status(404).json({ error: "Survey not found" });
      return;
    }
    
    res.json(survey);
  });

  const httpServer = createServer(app);
  return httpServer;
}
