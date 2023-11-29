import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/Product/category";
import { CategoryService } from "src/app/service/Product/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categoryId: number = 0;
  categoryList: Category[];
  category: Category;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // this.loadCategories();

    this.categoryService.getCategoryById(1).subscribe((data) => {
      this.category = data
    })
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

}
