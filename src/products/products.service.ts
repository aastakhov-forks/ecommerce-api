import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

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

  async getAll(): Promise<Array<Product>> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(product: CreateProductDto): Promise<Product> {
    const created = new this.productModel(product);
    return created.save();
  }

  async update(id: string, product: UpdateProductDTO): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
