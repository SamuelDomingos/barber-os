import { Injectable, BadRequestException } from '@nestjs/common';
import {
  CreateBarbershopCompletedDto,
  UpdateBarbershopCompletedDto,
} from './dto/barbershop.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BarbershopService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBarbershopCompletedDto) {
    try {
      const barbershop = await this.prisma.barbershop.create({
        data: {
          name: dto.name,
          slug: dto.slug,
          phone: dto.phone,
          themeConfigs: {
            create: {
              style: dto.style,
              baseColor: dto.baseColor,
              theme: dto.theme,
              font: dto.font,
              radius: dto.radius,
            },
          },
          locations: {
            create: {
              country: dto.country,
              state: dto.state,
              city: dto.city,
              address: dto.address,
              postalCode: dto.postalCode,
              maxDistancia: dto.maxDistancia || 100,
            },
          },
        },
        include: {
          themeConfigs: true,
          locations: true,
        },
      });

      return {
        success: true,
        data: barbershop,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar barbershop';
      throw new BadRequestException(message);
    }
  }

  async findAll() {
    return this.prisma.barbershop.findMany({
      include: {
        themeConfigs: true,
        locations: true,
      },
    });
  }

  async findOne(id: string) {
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id },
      include: {
        themeConfigs: true,
        locations: true,
      },
    });

    if (!barbershop) {
      throw new BadRequestException('Barbershop não encontrado');
    }

    return barbershop;
  }

  async update(id: string, dto: UpdateBarbershopCompletedDto) {
    try {
      const barbershop = await this.prisma.barbershop.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          phone: dto.phone,
        },
        include: {
          themeConfigs: true,
          locations: true,
        },
      });

      return barbershop;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar barbershop';
      throw new BadRequestException(message);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.barbershop.delete({
        where: { id },
      });

      return { success: true, message: 'Barbershop removido com sucesso' };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao remover barbershop';
      throw new BadRequestException(message);
    }
  }
}
