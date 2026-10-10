export interface ILogin{
    userName: string;
    password: string
}

export interface IForgotPass{
    email_id?: string;
    password?: string;
    otp?:any;

}