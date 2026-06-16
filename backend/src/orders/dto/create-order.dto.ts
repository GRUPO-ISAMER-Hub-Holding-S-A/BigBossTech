import {
    IsString,
    IsEmail,
    IsArray,
    IsOptional
} from 'class-validator';


export class CreateOrderDto {

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    telefono: string;

    @IsString()
    provincia: string;

    @IsString()
    localidad: string;

    @IsString()
    codigoPostal: string;

    @IsString()
    calle: string;

    @IsString()
    altura: string;

    @IsOptional()
    @IsString()
    piso?: string;

    @IsOptional()
    @IsString()
    departamento?: string;

    @IsOptional()
    @IsString()
    referencia?: string;

    @IsArray()
    productos: any[];
}