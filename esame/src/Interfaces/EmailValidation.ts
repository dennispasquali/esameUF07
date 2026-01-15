export interface IEmailValidation {
    email: string;
    invalidEmailMessage: string;
    onChange: (value: string) => void;
}