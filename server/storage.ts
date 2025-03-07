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
    const survey: Survey = {
      ...insertSurvey,
      id,
      // Handle optional fields by setting them to null if undefined
      specProject: insertSurvey.specProject ?? null,
      otherIncome: insertSurvey.otherIncome ?? null,
      quantityReason: insertSurvey.quantityReason ?? null,
      qualityReason: insertSurvey.qualityReason ?? null,
      q2Reason: insertSurvey.q2Reason ?? null,
      q3Reason: insertSurvey.q3Reason ?? null,
      q4Reason: insertSurvey.q4Reason ?? null,
      q5Reason: insertSurvey.q5Reason ?? null,
      q6Reason: insertSurvey.q6Reason ?? null
    };
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