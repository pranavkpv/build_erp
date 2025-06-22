//core User Entity
export interface User {
  _id: string; 
  username: string;
  email: string;
  phone: string;
  password: string; 
  otp: string; 
  otpCreatedAt: Date; 
  createdAt: Date;
  updatedAt: Date;
}

//user signup use case
export interface userSignupInput{
   username:string,
   email:string,
   phone:string,
   password:string  // plain password
}

//output of signup useCase
export interface userSignupOutput{
   success:boolean,
   message:string
}

//verify otp useCase
export interface OTPInput{
   otp:string,
   email:string
}

//output of verify otp
export interface OTPOutput{
   success:boolean,
   message:string
}

//input of resendOTP
export interface ResendOTPInput{
   otpEmail:string
}

//output of resendOTP
export interface ResendOTP{
   success:boolean,
   message:string
}

//login input
export interface loginInput{
   email:string,
   password:string // plain password
}


//login output
export interface loginOutput{
   success:boolean,
   message:string
}


export interface generalError{
   code:string,
   message:string,
   statusCode:number
}