import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000, { message: 'Message is too long' })
  message: string;
}