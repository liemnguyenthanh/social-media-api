import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'username is not empty' })
  @IsString({ message: 'username has to string' })
  @Length(8, 20)
  @Matches(/^[a-z\d]{8,}$/, {
    message:
      'Username must be at least 8 characters long and contain only lowercase letters.',
  })
  username: string;

  @IsNotEmpty({ message: 'password is not empty' })
  @Length(8, 20)
  @Matches(/^[a-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain only lowercase letters.',
  })
  password: string;

  @IsNotEmpty({ message: 'full_name is not empty' })
  full_name: string;
}
