import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: PaginationDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
  async update(
    @Param('id') id: string,
    @Body()
    body: { email?: string; name?: string; password?: string; avatar?: string },
  ) {
    return this.usersService.update(
      id,
      body.email,
      body.name,
      body.password,
      body.avatar,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
  async remove(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'Usuário removido com sucesso' };
  }
}
