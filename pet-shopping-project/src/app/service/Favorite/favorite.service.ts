import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/Product/product';
import { ThongBaoService } from '../Thongbao/thongbao.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteProducts: Product[] = [];

  constructor(private thongBaoService: ThongBaoService){}

  getFavoriteProducts(): Product[] {
    return this.favoriteProducts;
  }

  addToFavorites(product: Product): void {
    if (!this.favoriteProducts.some((p) => p.productId === product.productId)) {
      this.favoriteProducts.push(product);
      this.thongBaoService.hienThongBao('Đã thêm vào danh mục yêu thích');

    }
  }

  removeFromFavorites(productId: number): void {
    const index = this.favoriteProducts.findIndex((p) => p.productId === productId);
    if (index !== -1) {
      this.favoriteProducts.splice(index, 1);
    }
  }
  getFavoriteProductById(productId: number): Product | undefined {
    return this.favoriteProducts.find((p) => p.productId === productId);
  }

  // Thêm phương thức để cập nhật thông tin sản phẩm yêu thích
  updateFavoriteProduct(product: Product): void {
    const index = this.favoriteProducts.findIndex((p) => p.productId === product.productId);
    if (index !== -1) {
      this.favoriteProducts[index] = product;
    }
  }
}
