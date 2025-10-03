import { IsString, IsOptional, IsMongoId, IsIn, IsDateString } from "class-validator";

export class CreateTaskDto {
  @IsMongoId()
  categoryId: string;

  @IsString()
  title: string;

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
