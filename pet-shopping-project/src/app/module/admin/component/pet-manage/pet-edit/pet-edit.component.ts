import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Breed } from 'src/app/model/Pet/breed';
import { Pet } from 'src/app/model/Pet/pet';
import { BreedService } from 'src/app/service/Pet/breed.service';
import { PetService } from 'src/app/service/Pet/pet.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  @Input() pet: Pet;
  editedPet: Pet;
  breedList: Breed[];

  constructor(public activeModal: NgbActiveModal,
              private breedService: BreedService,
              private petService: PetService) {}

  ngOnInit(): void {
    this.editedPet = { ...this.pet };
    this.breedService.getAllBreed().subscribe(data =>{
      this.breedList = data;
    })
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.petService.updatePetAtId(this.editedPet.petId, this.editedPet)
      .subscribe(updatedPet => {
        console.log('Product updated:', updatedPet);
        this.activeModal.close(this.editedPet);
      });
  }

}
