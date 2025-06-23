import { ILabourRepository } from "../../domain/repositories/ILabourRepository";
import { Labour } from "../../domain/types/labour";
import LabourModel from "../../models/LabourModel";

export class LabourmongooseRepository implements ILabourRepository {
   async findAllLabour(): Promise<Labour[] | []> {
      const result = await LabourModel.find()
      return result ? (result as Labour[]) : []
   }
   async findLabourByType(labour_type: string): Promise<Labour | null> {
      const existLabour = await LabourModel.findOne({ labour_type })
      return existLabour ? (existLabour as Labour) : null
   }
   async saveLabour(labour_type: string, daily_wage: number): Promise<void> {
      const newLabour = new LabourModel({
         labour_type,
         daily_wage
      })
      await newLabour.save()
   }
   async deleteLabourById(_id: string): Promise<void> {
      await LabourModel.findByIdAndDelete(_id)
   }
   async findLabourInEdit(_id: string, labour_type: string): Promise<Labour | null> {
      const existLabour = await LabourModel.findOne({ _id: { $ne: _id }, labour_type })
      return existLabour ? (existLabour as Labour) : null
   }
   async updateLabourById(_id: string, labour_type: string, daily_wage: number): Promise<void> {
      await LabourModel.findByIdAndUpdate(_id, {
         labour_type, daily_wage
      })
   }
}