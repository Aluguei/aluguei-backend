import { ApiBearerAuth, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import {
  Controller,
  UseGuards,
  Delete,
  Param,
  Body,
  Post,
  Put,
  Get,
  Query
} from '@nestjs/common'

import { CurrentUser } from '@modules/common/decorators'
import { Product } from '@modules/products'
import { User } from '@modules/users'

import {
  CreateProductPayload,
  RentProductPayload,
  UpdateProductPayload
} from './payloads'
import { ProductsService } from './products.service'
import { Pagination } from 'nestjs-typeorm-paginate'
import { GetAvailableToRentQueryDTO } from './dto'
import { PaginationDTO } from '@modules/common/dto'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/available')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getAvailableToRent(
    @CurrentUser() user: User,
    @Query() query: GetAvailableToRentQueryDTO
  ): Promise<Pagination<Product>> {
    return await this.productsService.getAvailableToRent(query, user)
  }

  @Get('/my')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getMyProducts(@CurrentUser() user: User): Promise<Product[]> {
    return await this.productsService.getMyProducts(user)
  }

  @Get('/rented')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getRentedProducts(@CurrentUser() user: User): Promise<Product[]> {
    return await this.productsService.getRentedProducts(user)
  }

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async create(
    @Body() payload: CreateProductPayload,
    @CurrentUser() user: User
  ): Promise<any> {
    return await this.productsService.create(payload, user)
  }

  @Put('/:productId')
  @ApiParam({ name: 'productId' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async update(
    @Body() payload: UpdateProductPayload,
    @Param('productId') productId: string,
    @CurrentUser() user: User
  ): Promise<any> {
    return await this.productsService.update(+productId, payload, user)
  }

  @Delete('/:productId')
  @ApiParam({ name: 'productId' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async destroy(
    @Param('productId') productId: string,
    @CurrentUser() user: User
  ): Promise<any> {
    return await this.productsService.destroy(+productId, user)
  }

  @Post('/:productId/rent')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async rentProduct(
    @Body() payload: RentProductPayload,
    @CurrentUser() user: User
  ): Promise<any> {
    return await this.productsService.rentProduct(payload, user)
  }
}
