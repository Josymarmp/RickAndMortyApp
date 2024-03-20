import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
interface Echaracters{
  name?: string,
  gender?: string,
  status?: string,
  species?: string,
  image?: string
  
}

@Component({
  selector: 'app-editcharacters',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './editcharacters.component.html',
  styleUrl: './editcharacters.component.css'
})
export class EditcharactersComponent implements OnInit {
  characterId!: number;
  characters: Echaracters[] = [];
  selectedCharacter: Echaracters = {};
  editedCharacter: Echaracters = {};
  eventclick:boolean= false;
  eventclicktoast:boolean= false;
  eventclicktoastBd:boolean= false;

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.characterId = +params['id']|| 0; 
      this.loadCharacter();
    });

    
  }

  loadCharacter() {
    this.apollo.watchQuery<any>({
      query: gql`
        query GetCharacterById($id: ID!) {
          character(id: $id) {
            name
            gender
            status
            species
            image
          }
        }
      `,
      variables: {
        id: this.characterId
      }
    }).valueChanges.pipe(
      map(result => result.data.character)
    ).subscribe({
      next: (characterData: Echaracters) => {
        this.characters = [characterData];
       // this.selectedCharacter=characterData;
        this.selectedCharacter = { ...characterData};

      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del personaje:', error);
      }
    });
  }  

  isDataInvalid(): boolean {
    // Verificar si selectedCharacter tiene datos cargados
    const hasDataLoaded = this.selectedCharacter.name == undefined 
                        && this.selectedCharacter.gender == undefined 
                        && this.selectedCharacter.status == undefined 
                        && this.selectedCharacter.species == undefined;
  
    // Si los datos aún no han cargado aún, no renderizar el span de campos obligatorios
    if (hasDataLoaded) {
      return false;
    }
    return !this.selectedCharacter.name || !this.selectedCharacter.gender || !this.selectedCharacter.status || !this.selectedCharacter.species;
  }


hideToast() {
  this.eventclicktoast = false;
}

showComingSoon() {
  this.eventclicktoastBd = true;
  // Después de un tiempo (por ejemplo, 3 segundos), ocultar el span
  setTimeout(() => {
    this.eventclicktoastBd = false;
  }, 4000); // 3000 milisegundos = 3 segundos
}

  onCorrectData() {
     this.eventclick= true;
     this.eventclicktoast= true;
      this.editedCharacter = {
      name: this.selectedCharacter.name,
      gender: this.selectedCharacter.gender,
      status: this.selectedCharacter.status,
      species: this.selectedCharacter.species,
      image:this.selectedCharacter.image
    };
    setTimeout(() => {
      this.hideToast();
    }, 3000)

  }
  
  

}
