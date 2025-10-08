import { IsDateString, IsIn, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(["pending", "done", "pause"])
  status?: string;

  @IsOptional()
  @IsIn(["low", "medium", "high"])
  priority?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsIn(["inbox", "board"])
  type?: string;

  @IsOptional()
  @IsMongoId()
  boardId?: string;

  @IsOptional()
  @IsMongoId()
  listId?: string;

  @IsMongoId()
  userId: string; // کاربر صاحب تسک
}