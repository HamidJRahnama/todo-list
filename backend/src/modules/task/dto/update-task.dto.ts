import { IsString, IsOptional, IsMongoId, IsIn, IsDateString } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

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

  @IsOptional()
  @IsMongoId()
  userId?: string; // برای تغییر مالکیت تسک در آپدیت (اختیاری)
}
