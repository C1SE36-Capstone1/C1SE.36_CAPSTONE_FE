import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../service/Product/category.service';
import { Category } from '../../../../model/Product/category';
import { ProductService } from 'src/app/service/Product/product.service';
import { Product } from 'src/app/model/Product/product';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/service/Cart/cart.service';
import { CartDetail } from 'src/app/model/Cart/cart-detail';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  selectedCategoryId: number;

  productList: Product[];
  categoryList: Category[];
  displayedProducts: Product[];
  showAll = false;
  show = true;
  totalProducts: number = 0;
  productsPerPage: number = 16;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';

  constructor( private router: Router,
               private activatedRoute : ActivatedRoute,
               private category : CategoryService,
               private cartService : CartService,
               private product : ProductService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((result) =>{
      this.categoryList = result;
    });

    this.product.getAll().subscribe((data)=> {
      this.productList = data
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    })

  }

  showAllCategories(): void {
    this.showAll =! this.showAll;
    this.show =! this.show;
  }

  onCategoryClick(categoryName: string): void {
    const category = this.categoryList.find(c => c.categoryName === categoryName);
    if (category) {
      this.selectedCategoryId = category.categoryId;
  
      // Gọi phương thức getByCategory và cập nhật danh sách sản phẩm
      if (this.selectedCategoryId) {
        this.product.getByCategory(this.selectedCategoryId).subscribe(
          (data) => {
            this.productList = data;
            this.totalProducts = this.productList.length;
            this.displayedProducts = this.getProductSlice();
          },
          (error) => {
            console.error('Error fetching products by category:', error);
          }
        );
      } 
      // Thay đổi URL
      this.router.navigate(['/shop', categoryName]);
      this.currentPage = 1;
    } else{
      this.product.getAll().subscribe((data) => {
        this.productList = data
        this.totalProducts = this.productList.length;
        this.displayedProducts = this.getProductSlice();
      });
      this.router.navigate(['/shop', 'All']);
      this.currentPage = 1;
    }
  }
  

  getProductSlice(): Product[] {
    const startIndex = (this.currentPage - 1 ) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedProducts = this.getProductSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalProducts / this.productsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  sortProducts() {
    this.productList.sort((a, b) => {
      if (this.sortType === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    this.currentPage = 1
  }

  toggleSort(sort: string) {
    if(sort === 'asc'){
      this.sortType = 'asc';
      this.sortProducts();
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    }else{
      this.sortType = 'desc';
      this.sortProducts();
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    }
  }

  getSortButtonText(): string {
    if(this.sortType=== 'asc')
      return 'Giá từ thấp đến cao'
    else if(this.sortType=== 'desc')
      return 'Giá từ cao xuống thấp'
    else 
      return 'Sắp xếp sản phẩm'
  }

  // addToCart(item: any): void {
  //   this.cartService.addToCart(item).subscribe(
  //     () => {
  //       console.log('Item added to cart successfully.');
  //       // Có thể thêm logic hiển thị thông báo thành công nếu cần
  //     },
  //     (error) => {
  //       console.error('Error adding item to cart:', error);
  //       // Có thể thêm logic hiển thị thông báo lỗi nếu cần
  //     }
  //   );
  // }

  addCartDetail(): void {
    const cartDetail: CartDetail = {
      // Khởi tạo đối tượng CartDetail theo cấu trúc của bạn
    };

    this.cartService.addToCart(cartDetail).subscribe(
      (response) => {
        // Xử lý khi request thành công
        console.log('Cart Detail added successfully:', response);
      },
      (error) => {
        // Xử lý khi request thất bại
        console.error('Error adding Cart Detail:', error);
      }
    );
  }
}


