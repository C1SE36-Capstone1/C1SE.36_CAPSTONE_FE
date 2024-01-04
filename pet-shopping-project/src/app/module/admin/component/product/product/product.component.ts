import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model/Product/category';
import { Product } from 'src/app/model/Product/product';
import { CategoryService } from 'src/app/service/Product/category.service';
import { ProductService } from 'src/app/service/Product/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  showDeletePopup = false;
  deleteProductId: number;

  filterProduct: Product[];
  originalProductList: Product[];
  productList: Product[];
  categoryList: Category[];
  displayedProducts: Product[];
  showAll = false;
  show = true;
  totalProducts: number = 0;
  productsPerPage: number = 10;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';
  selectedCategory: number;
  searchTerm : string ='';
  
  constructor( private product : ProductService,
               private category : CategoryService,
               private modalService: NgbModal) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((data) => {
      this.categoryList = data
    })
    this.loadProduct();
  }

  loadProduct(): void {
    this.product.getAll().subscribe((data) => {
      this.originalProductList = data; // Lưu trữ danh sách sản phẩm gốc
      this.productList = [...this.originalProductList]; // Clone danh sách để không ảnh hưởng đến danh sách gốc
      this.productList.sort((a, b) => b.productId - a.productId);
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
      this.currentPage = 1;
    });
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.product.getByCategory(this.selectedCategory).subscribe((data) => {
        this.originalProductList = data; // Lưu trữ danh sách sản phẩm gốc
      this.productList = [...this.originalProductList]; // Clone danh sách để không ảnh hưởng đến danh sách gốc
      this.productList.sort((a, b) => b.productId - a.productId);
        this.totalProducts = this.productList.length;
        this.displayedProducts = this.getProductSlice();
        this.currentPage = 1;
      });
    }
    else {
      this.loadProduct();
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

  confirmDelete(id: number): void {
    this.showDeletePopup = true;
    this.deleteProductId = id;
  }
  
  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.deleteProductId = null;
  }

  deleteProductAtId(): void {
    this.product.deleteProductAtId(this.deleteProductId)
      .subscribe(() => {
        // Handle successful deletion
        console.log('Product deleted successfully');
        this.loadProduct();
        this.closeDeletePopup();
      }, error => {
        // Handle errors
        console.error('Error deleting Product:', error);
      });
  }

  search(): void {
    this.productList = [...this.originalProductList]; // Khôi phục danh sách gốc trước khi tìm kiếm
    this.productList.sort((a, b) => b.productId - a.productId);
    this.productList = this.productList.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalProducts = this.productList.length;
    this.displayedProducts = this.getProductSlice();
    this.currentPage = 1;
  }

  onEnter(){
    this.search();
  }

  openProductDetailModal(product: Product): void {
    const modalRef = this.modalService.open(ProductDetailComponent, {
      size: 'lg', 
    });
    modalRef.componentInstance.product = product; 
  }

  openProductEditModal(product: Product): void {
    const modalRef = this.modalService.open(ProductEditComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    modalRef.result.then((result) => {
      console.log('Edit successful:', result);
    }, (reason) => {
      console.log('Fail to edit:', reason);
    });
  }
}
