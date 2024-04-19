import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    getAll() {
        return this.userService.getAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.removeUser(id)
    }
}