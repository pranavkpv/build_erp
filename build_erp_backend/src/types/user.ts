export interface signupUser{
   username:string,
   email:string,
   phone:string,
   password:string
}

export interface OTP{
   otp:string,
   email:string
}

export interface Email{
   otpEmail:string
}

//login
export interface LoginData{
   email:string,
   password:string
}