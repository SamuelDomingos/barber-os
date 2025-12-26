import { PartialType } from '@nestjs/mapped-types';
export class CreateServiceDto {}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
