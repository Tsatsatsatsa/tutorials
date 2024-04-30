import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUpDto {
  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  createdDate: Date;

  updatedAt: Date;

  removedAt: Date;
}
