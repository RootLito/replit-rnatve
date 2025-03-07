import { surveys, type Survey, type InsertSurvey } from "@shared/schema";

export interface IStorage {
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  getSurvey(id: number): Promise<Survey | undefined>;
  getAllSurveys(): Promise<Survey[]>;
}

export class MemStorage implements IStorage {
  private surveys: Map<number, Survey>;
  private currentId: number;

  constructor() {
    this.surveys = new Map();
    this.currentId = 1;
  }

  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = this.currentId++;
    const survey: Survey = { ...insertSurvey, id };
    this.surveys.set(id, survey);
    return survey;
  }

  async getSurvey(id: number): Promise<Survey | undefined> {
    return this.surveys.get(id);
  }

  async getAllSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values());
  }
}

export const storage = new MemStorage();
