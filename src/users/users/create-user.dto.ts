export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    createdDate: Date;
    removedAt: Date | null;
    updatedAt: Date
}