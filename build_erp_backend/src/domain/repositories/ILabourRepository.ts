import { Labour } from "../types/labour";

export interface ILabourRepository{
   findAllLabour():Promise<Labour[] | []>;
   findLabourByType(labour_type:string):Promise<Labour | null>
   saveLabour(labour_type:string,daily_wage:number):Promise<void>
   deleteLabourById(_id:string):Promise<void>
   findLabourInEdit(_id:string,labour_type:string):Promise<Labour | null>
   updateLabourById(_id:string,labour_type:string,daily_wage:number):Promise<void>
}