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
  Query,
  Body,
  Post,
  Put,
  Get
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'

import { CurrentUser } from '@common/decorators'
import { User } from '@modules/users'

import { CreateProductPayload, UpdateProductPayload } from './payloads'

import { ProductsTransformer } from './products.transformer'
import { ProductsService } from './products.service'
import { ProductsFilter } from './products.filter'
import { ProductQuery } from './dto'

@Controller('/api/products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productTransformer: ProductsTransformer,
    private readonly productsFilter: ProductsFilter
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
    @Query() query: ProductQuery
  ) {
    const [filter, pagination] = this.productsFilter.getFilters(query)

    const products = await this.productsService.getAvailableToRent(
      { filter, pagination },
      user
    )

    return await this.productTransformer.paginate(products)
  }

  @Get('/owned')
  @ApiBearerAuth()
  @ApiQuery({ name: 'productName', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'isLent', required: false, type: 'boolean' })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getOwnedProducts(
    @CurrentUser() user: User,
    @Query() query: ProductQuery
  ) {
    const [filter, pagination] = this.productsFilter.getFilters(query)

    const products = await this.productsService.getOwnedProducts(
      { filter, pagination },
      user
    )

    return await this.productTransformer.paginate(products)
  }

  @Get('/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async getProduct(@Param('productId') productId: string) {
    const product = await this.productsService.findOneByQuery({
      id: productId
    })

    return await this.productTransformer.item(product)
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
  ) {
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
  ) {
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
  ) {
    return await this.productsService.destroy(+productId, user)
  }

  @Post('/:productId/rent')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async rentProduct(
    @Param('productId') productId: string,
    @CurrentUser() user: User
  ) {
    return await this.productsService.rentProduct(
      { productId: +productId },
      user
    )
  }
}
