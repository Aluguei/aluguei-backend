import {
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiQuery
} from '@nestjs/swagger'

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

import { AuthGuard } from '@nestjs/passport'

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

import { ProductTransformer } from './products.transformer'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productTransformer: ProductTransformer
  ) {}

  @Get('/available')
  @ApiBearerAuth()
  @ApiQuery({ name: 'productName', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getAvailableToRent(
    @CurrentUser() user: User,
    @Query() query: GetAvailableToRentQueryDTO
  ) {
    const products = await this.productsService.getAvailableToRent(query, user)

    return await this.productTransformer.paginate(products)
  }

  @Get('/my')
  @ApiBearerAuth()
  @ApiQuery({ name: 'productName', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getMyProducts(
    @CurrentUser() user: User,
    @Query() query: GetAvailableToRentQueryDTO
  ) {
    return await this.productsService.getMyProducts(query, user)
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
