import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(identifier: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const where = paginationDto.search
      ? {
          OR: [
            { email: { contains: paginationDto.search, mode: 'insensitive' } },
            { name: { contains: paginationDto.search, mode: 'insensitive' } },
          ],
        }
      : {};

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    const { password, ...rest } = user;
    return rest;
  }

  async create(email: string, name: string, password: string): Promise<User> {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });

    if (existing)
      throw new ConflictException('E-mail ou nome de usuário já está em uso');

    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { email, name, password: hashed, role: 'CLIENT' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async update(
    id: string,
    email?: string,
    name?: string,
    password?: string,
    avatar?: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (email && email !== user.email) {
      const emailTaken = await this.prisma.user.findUnique({
        where: { email },
      });
      if (emailTaken) throw new ConflictException('E-mail já está em uso');
    }

    if (name && name !== user.name) {
      const nameTaken = await this.prisma.user.findFirst({ where: { name } });
      if (nameTaken) throw new ConflictException('Nome já está em uso');
    }

    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (avatar) updateData.avatar = avatar;

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    await this.prisma.user.delete({ where: { id } });
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
