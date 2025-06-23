import { IUnitRepository } from "../../domain/repositories/IUnitRepository";
import { Unit } from "../../domain/types/unit";
import UnitModel from "../../models/UnitModel";

export class UnitMongooseRepository implements IUnitRepository {
   async findUnit(): Promise<Unit[] | []> {
      const existUnit = await UnitModel.find({})
      return existUnit ? (existUnit as Unit[]) : []
   }
   async findUnitByunit_name(unit_name:string):Promise<Unit | null>{
      const ExistData = await UnitModel.findOne({ unit_name })
      return ExistData ? (ExistData as Unit) : null
   }
   async saveUnit(unit_name:string,short_name:string):Promise<void>{
       const newUnit = new UnitModel({
         unit_name,
         short_name
      })
      await newUnit.save()
   }
   async findUnitInEdit(_id:string,unit_name:string):Promise<Unit | null>{
      const existData = await UnitModel.findOne({ _id: { $ne: _id }, unit_name: unit_name })
      return existData ? (existData as Unit) : null
   }
   async updateUnitById(_id:string,unit_name:string,short_name:string):Promise<void>{
      await UnitModel.findByIdAndUpdate(_id, { unit_name, short_name })
   }
   async deleteUnitById(_id:string):Promise<void>{
       await UnitModel.findByIdAndDelete(_id)
   }
}