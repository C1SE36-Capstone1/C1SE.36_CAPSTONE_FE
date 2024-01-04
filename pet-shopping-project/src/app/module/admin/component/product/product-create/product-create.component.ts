import { formatDate  } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/model/Product/category";

import { CategoryService } from "src/app/service/Product/category.service";
import { ProductService } from "src/app/service/Product/product.service";
import { AngularFireStorage} from "@angular/fire/storage";


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


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private fireStorage : AngularFireStorage,
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

  

  async onFileSelected(event : any) {
    this.uploadedAvatar = event.target.files[0];
    // return this.uploadedAvatar;
    try {
      const path = `IMG_PRODUCT/${this.uploadedAvatar.name}`;
      const uploadTask = await this.fireStorage.upload(path, this.uploadedAvatar);
      const url = await uploadTask.ref.getDownloadURL();
      this.addProduct.get('image').setValue(url);
      console.log('Tải ảnh lên thành công. URL:', url);
    } catch (error) {
      console.error('Lỗi tải ảnh lên:', error);
    }
  }

  reset() {
    this.addProduct.reset();
  }

  async submitProduct() {    
    console.log(this.addProduct.value)
    this.productService.addProduct(this.addProduct.value).subscribe(() => {
      console.log("successful:");
      this.reset();
    })}

  onCategoryChange(event: any) {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const selectedCategoryId = event.target.value;
    console.log('Selected Category ID:', selectedCategoryId);
    this.addProduct.patchValue({
      category: {
        categoryId: selectedCategoryId
      },
       enteredDate: currentDate
    });
  
    console.log('Form Value After Update:', this.addProduct.value);
  }
}
