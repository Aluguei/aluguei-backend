interface IPaginateData {
  items: any[]
  meta: any
}

export abstract class Bumblebee {
  async transform(item: any): Promise<any> {
    throw new Error('Transformer extends should implements transform method')
  }

  public async item(item: any, transformationMethod: any = this.transform) {
    return item && Object.keys(item).length > 0
      ? await transformationMethod(item)
      : undefined
  }

  public async collection(
    items: any[],
    transformationMethod: any = this.transform
  ): Promise<any[]> {
    return items && items.length
      ? await Promise.all(
          items.map((item) => this.item(item, transformationMethod))
        )
      : []
  }

  public async paginate(
    data: IPaginateData,
    transformationMethod: any = this.transform
  ) {
    const transformedData = await this.collection(
      data.items,
      transformationMethod
    )

    return {
      data: transformedData,
      meta: data.meta
    }
  }
}
