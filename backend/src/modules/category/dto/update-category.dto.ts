import { IsNotEmpty, IsDefined, MaxLength } from "class-validator";

export class UpdateCategoryDto {
    @IsDefined()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string;
}
