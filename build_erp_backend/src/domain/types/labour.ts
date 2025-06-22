export interface Labour {
   _id: string,
   labour_type: string,
   daily_wage: number,
   createdAt: Date,
   updatedAt: Date
}

//input of labour add

export interface addLabourInput {
   labour_type: string,
   daily_wage: number
}

//output of labour add
export interface addLabourOutput {
   success: boolean,
   message: string
}

//input of delete labour
export interface deleteLabourInput {
   _id: string
}

//output of delete labour
export interface deleteLabourOutput {
   success: boolean,
   message: string
}

//input of editlabour
export interface editLabourInput {
   _id: string,
   labour_type: string,
   daily_wage: number
}

//output of edit labour

export interface editLabourOutput {
   success: boolean,
   message: string
}


//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}