import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateBarbershopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class CreateThemeConfigDto {
  @IsUUID()
  @IsNotEmpty()
  barbershopId: string;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsString()
  @IsNotEmpty()
  baseColor: string;

  @IsString()
  @IsNotEmpty()
  theme: string;

  @IsString()
  @IsNotEmpty()
  font: string;

  @IsString()
  @IsNotEmpty()
  radius: string;
}

export class CreateBarbershopLocationDto {
  @IsUUID()
  @IsNotEmpty()
  barbershopId: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxDistancia?: number;
}

export class CreateBarbershopCompletedDto extends IntersectionType(
  CreateBarbershopDto,
  CreateThemeConfigDto,
  CreateBarbershopLocationDto,
) {}

export class UpdateBarbershopCompletedDto extends PartialType(
  CreateBarbershopCompletedDto,
) {}
