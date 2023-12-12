import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/Product/category";
import { CategoryService } from "src/app/service/Product/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  
  showDeletePopup = false;
  deleteCategoryId: number;

  newCategory: Category = {categoryId : 0 , categoryName: ''};
  show = false;
  categoryId: number = 0;
  categoryList: Category[];
  category: Category;

  totalCategory: number = 0;
  categoriesPerPage: number = 10;
  currentPage: number = 1;
  displayedCategories : Category[];

  searchTerm : string ='';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categoryList = categories;
      //Sắp xếp category theo id giảm dần
      this.categoryList.sort((a, b) => b.categoryId - a.categoryId);
      this.totalCategory = this.categoryList.length;
      this.displayedCategories = this.getProductSlice();
    });
  }

  toggleForm(){
    this.show = true;
  }

  closepopup(){
    this.show = false;
  }

  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe(
      (category) => {
        this.loadCategories();
        this.show = false
        console.log('Category added successfully:', category);
        // Thêm logic xử lý thành công ở đây nếu cần
      },
      (error) => {
        console.error('Error adding category:', error);
        // Thêm logic xử lý lỗi ở đây nếu cần
      }
    );
  }

confirmDelete(id: number): void {
  this.showDeletePopup = true;
  this.deleteCategoryId = id;
}

closeDeletePopup(): void {
  this.showDeletePopup = false;
  this.deleteCategoryId = null;
}

  deleteCategoryAtId(): void {
    this.categoryService.deleteCategoryAtId(this.deleteCategoryId)
      .subscribe(() => {
        // Handle successful deletion
        console.log('Category deleted successfully');
        this.loadCategories();
        this.closeDeletePopup();
      }, error => {
        // Handle errors
        console.error('Error deleting Category:', error);
      });
  }

  getProductSlice(): Category[] {
    const startIndex = (this.currentPage - 1 ) * this.categoriesPerPage;
    const endIndex = startIndex + this.categoriesPerPage;
    return this.categoryList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedCategories = this.getProductSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalCategory / this.categoriesPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  search(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.categoryList = data
      this.categoryList.sort((a, b) => b.categoryId - a.categoryId);
    })
    // Filter products based on the searchTerm
    // You can customize the filter logic based on your requirements
    // For example, you might want to make the search case-insensitive
    this.categoryList = this.categoryList.filter(category => 
      category.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalCategory = this.categoryList.length;
    this.displayedCategories = this.getProductSlice();
  }

  onEnter(){
    this.search();
  }
}
