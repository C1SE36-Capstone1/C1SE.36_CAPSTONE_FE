import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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


  constructor(private petService: PetService,
              private breedService: BreedService,
              private formBuilder: FormBuilder,
              private fireStorage : AngularFireStorage) 
  {
    this.breedService.getAllBreed().subscribe((data) => {
      this.breedList = data;
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addPet = this.formBuilder.group({
      petId: [0],
      code: [''],
      name: ['', [Validators.required, Validators.maxLength(45)]],
      price: [0, [Validators.required]],//
      images: ['', [Validators.required]],//
      description: ['', [Validators.required, Validators.maxLength(1000000000)]],
      enteredDate: ['', [Validators.required]],//
      status: [true, [Validators.required]],
      petAge: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      breed: this.formBuilder.group({
        breedId: [0, [Validators.required]]
      }),
      petInfo: this.formBuilder.group({
        petInfoId: [],
        color: ['', [Validators.required]],
        size: ['', [Validators.required]],
        health: ['', [Validators.required]],
        training: ['', [Validators.required]],
        personality: ['', [Validators.required]],
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

  async onFileSelected(event : any) {
    this.uploadedAvatar = event.target.files[0];
    try {
      const path = `IMG_PET/${this.uploadedAvatar.name}`;
      const uploadTask = await this.fireStorage.upload(path, this.uploadedAvatar);
      const url = await uploadTask.ref.getDownloadURL();
      this.addPet.get('images').setValue(url);
      console.log('Tải ảnh lên thành công. URL:', url);
    } catch (error) {
      console.error('Lỗi tải ảnh lên:', error);
    }
  }

  async submitPet() {   
    console.log(this.addPet.value)
    this.petService.addPet(this.addPet.value).subscribe(() => {
      console.log("successful:");
      this.reset();
    })}

  onCategoryChange(event: any) {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const selectedBreedId = event.target.value;
    console.log('Selected Category ID:', selectedBreedId);
    this.addPet.patchValue({
      category: {
        categoryId: selectedBreedId
      },
      enteredDate: currentDate
    });
  
    console.log('Form Value After Update:', this.addPet.value);
  }
}
