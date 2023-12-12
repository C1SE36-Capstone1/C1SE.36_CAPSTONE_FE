import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Breed } from 'src/app/model/Pet/breed';
import { BreedService } from 'src/app/service/Pet/breed.service';
import { PetService } from 'src/app/service/Pet/pet.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  
  selectedBreedId :number;

  addPet: FormGroup;
  breedList: Breed[] = [];
  breed: Breed;
  uploadedAvatar: any = null;


  constructor(
    private petService: PetService,
    private breedService: BreedService,
    private formBuilder: FormBuilder
  ) {
    this.breedService.getAllBreed().subscribe((data) => {
      this.breedList = data;
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addPet = this.formBuilder.group({
      productId: [0],
      code: [''],
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
    this.addPet.reset();
  }

  submitPet() {
    // const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // this.addProduct.patchValue({
    //   enterDate: currentDate,
    // });
    
    console.log(this.addPet.value)
    this.petService.addPet(this.addPet.value).subscribe(
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
    const selectedBreedId = event.target.value;
    console.log('Selected Category ID:', selectedBreedId);
  
    // Cập nhật categoryId trong form
    this.addPet.patchValue({
      category: {
        categoryId: selectedBreedId
      },
       enteredDate: currentDate
    });
  
    console.log('Form Value After Update:', this.addPet.value);
  }
}
