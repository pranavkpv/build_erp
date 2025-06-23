export interface Brand {
   _id: string,
   brand_name: string,
   createdAt: Date,
   updatedAt: Date
}


export interface addBrandInput {
   brand_name: string
}

export interface editBrandInput {
   _id: string,
   brand_name: string
}



export interface deleteBrandInput {
   _id: string
}

export interface outputBrand{
    success:boolean,
   message:string
}

