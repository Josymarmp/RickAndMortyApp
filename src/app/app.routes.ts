import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditcharactersComponent } from './components/editcharacters/editcharacters.component';
import { NotfoundPageComponent } from './components/NotfoundPage/notfound-page.component';
export const routes: Routes = [
   {'path':'', 'title': 'Home',component:HomeComponent},
   {'path':'editcharacters/:id', 'title': 'Edit Characters',component:EditcharactersComponent},
   {'path':'**',component:NotfoundPageComponent}
];
