import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/Product/category.service';
import { Category } from '../../../../../model/Product/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  newCategory: Category = {categoryId : 0 , categoryName: ''};

  constructor(private categoryService: CategoryService) {}

  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe(
      (category) => {
        console.log('Category added successfully:', category);
        // Thêm logic xử lý thành công ở đây nếu cần
      },
      (error) => {
        console.error('Error adding category:', error);
        // Thêm logic xử lý lỗi ở đây nếu cần
      }
    );
  }
  ngOnInit(): void {
  }

}
