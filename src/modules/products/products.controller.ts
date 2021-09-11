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
  Get
} from '@nestjs/common'

import { CurrentUser } from '@modules/common/decorators'
import { Product } from '@modules/products'
import { User } from '@modules/users'

import { CreateProductPayload, UpdateProductPayload } from './payloads'
import { ProductsService } from './products.service'

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
  async getAvailableToRent(@CurrentUser() user: User): Promise<Product[]> {
    return await this.productsService.getAvailableToRent(user)
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
    @Param('productId') productId: string
  ): Promise<any> {
    return await this.productsService.update(+productId, payload)
  }

  @Delete('/:productId')
  @ApiParam({ name: 'productId' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async destroy(@Param('productId') productId: string): Promise<any> {
    return await this.productsService.destroy(+productId)
  }
}