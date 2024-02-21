export class CreateArticleDto {
  author: string;
  content: string;
  slug: string;
  createdAt: Date;
  deletedAt?: Date;
}
