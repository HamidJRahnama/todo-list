import { IsNotEmpty, IsDefined, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsDefined()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string;
}
