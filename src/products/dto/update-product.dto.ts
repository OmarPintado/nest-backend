import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { BeforeUpdate } from "typeorm";

export class UpdateProductDto extends PartialType(CreateProductDto) {}

