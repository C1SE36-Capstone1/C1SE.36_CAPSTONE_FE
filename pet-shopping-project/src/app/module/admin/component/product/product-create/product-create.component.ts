import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/model/Product/category";
import { CategoryService } from "src/app/service/Product/category.service";
import { ProductService } from "src/app/service/Product/product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  addProduct: FormGroup;
  categoryList: Category[] = [];
  category: Category;
  uploadedAvatar: any = null;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAll().subscribe((data) => {
      this.categoryList = data;
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addProduct = new FormGroup({
      productId: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(1000000000)]),
      price: new FormControl(0, [Validators.required]),
      discount: new FormControl(0, [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000000000)]),
      status: new FormControl(true, [Validators.required]),
      sold: new FormControl(0, [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
       
      })
    
  }

  changeFile(event: any) {
    this.uploadedAvatar = event.target.files[0];
    if (this.uploadedAvatar) {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedAvatar);
    }
    console.log("file0", this.uploadedAvatar);
  }

  reset() {
    this.addProduct.reset();
  }

  submitProduct() {
    this.productService.addProduct(this.addProduct.value).subscribe(
      () => {
        console.log("successful:");
        this.reset();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
