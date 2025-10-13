import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;
}

// برای آپدیت کردن، همه فیلدها اختیاری هستن
export class UpdateBoardDto extends CreateBoardDto {}