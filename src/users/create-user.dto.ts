import { PartialType } from "@nestjs/mapped-types";
import { User } from "./user.entity";

export class CreateUserDto extends PartialType(User) {}