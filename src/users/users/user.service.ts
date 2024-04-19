import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


import { User } from "./user.entity";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,) { }

    getAll() {
        console.log(new Date)
        return this.usersRepository.find()
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id: id })
    }

    createUser(user: CreateUserDto) {
        return this.usersRepository.save(user)
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.usersRepository.update(id, user)
    }

    removeUser(id: number) {
        return this.usersRepository.delete(id)
    }

}