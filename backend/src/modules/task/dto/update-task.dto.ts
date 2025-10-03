import { IsString, IsOptional, IsMongoId, IsIn, IsDateString } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(["todo", "in-progress", "done", "paused"])
  status?: string;

  @IsOptional()
  @IsIn(["low", "medium", "high"])
  priority?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
