import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: '1',
      title: 'apple',
      price: 20,
    },
    {
      id: '2',
      title: 'melon',
      price: 110,
    },
    {
      id: '3',
      title: 'banana',
      price: 5,
    },
    {
      id: '4',
      title: 'mango',
      price: 50,
    },
  ];

  getAll() {
    return this.products;
  }

  getOne(id: string) {
    return this.products.find((p) => p.id === id);
  }

  create(product: CreateProductDto) {
    return this.products.push({
      id: Date.now().toString(),
      ...product,
    });
  }

  update(id: string, product: UpdateProductDTO) {
    const index = this.products.findIndex((p) => p.id === id);

    index >= 0
      ? (this.products[index] = { id: this.products[index].id, ...product })
      : this.products.push({
          id: Date.now().toString(),
          ...product,
        });

    return index
      ? this.products[index]
      : this.products[this.products.length - 1];
  }

  remove(id: string) {
    this.products.filter((p) => p.id !== id);
  }
}
