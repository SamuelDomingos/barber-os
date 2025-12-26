import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import {
  UpdateBarbershopCompletedDto,
  CreateBarbershopCompletedDto,
} from './dto/barbershop.dto';

@Controller('barbershop')
export class BarbershopController {
  constructor(private readonly barbershopService: BarbershopService) {}

  @Post()
  create(@Body() createBarbershopDto: CreateBarbershopCompletedDto) {
    return this.barbershopService.create(createBarbershopDto);
  }

  @Get()
  findAll() {
    return this.barbershopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbershopService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateBarbershopCompletedDto: UpdateBarbershopCompletedDto,
  ) {
    return this.barbershopService.update(id, UpdateBarbershopCompletedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barbershopService.remove(id);
  }
}
