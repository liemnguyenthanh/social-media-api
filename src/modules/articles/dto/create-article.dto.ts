import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'author is not empty' })
  readonly content: string;

  @IsOptional()
  @IsArray()
  readonly attachments: string[];
}
