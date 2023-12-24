import { formatDate  } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/model/Product/category";
import { CategoryService } from "src/app/service/Product/category.service";
import { ProductService } from "src/app/service/Product/product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {

  selectedCategoryId :number;

  addProduct: FormGroup;
  categoryList: Category[] = [];
  category: Category;
  uploadedAvatar: any = null;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.categoryService.getAll().subscribe((data) => {
      this.categoryList = data;
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addProduct = this.formBuilder.group({
      productId: [0],
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(45)]],
      quantity: [0, [Validators.required, Validators.min(1), Validators.max(1000000000)]],
      price: [0, [Validators.required]],
      discount: [0, [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(1000000000)]],
      enteredDate: ['', [Validators.required]],
      status: [true, [Validators.required]],
      sold: [0, [Validators.required]],
      category: this.formBuilder.group({
        categoryId: [0, [Validators.required]]
      })
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
    // const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // this.addProduct.patchValue({
    //   enterDate: currentDate,
    // });
    
    console.log(this.addProduct.value)
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

  onCategoryChange(event: any) {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const selectedCategoryId = event.target.value;
    console.log('Selected Category ID:', selectedCategoryId);
  
    // Cập nhật categoryId trong form
    this.addProduct.patchValue({
      category: {
        categoryId: selectedCategoryId
      },
       enteredDate: currentDate
    });
  
    console.log('Form Value After Update:', this.addProduct.value);
  }
}
