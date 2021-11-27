import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationToggleComponent } from './components/navigation-toggle/navigation-toggle.component';
import { NavigationMenuService } from './services/NavigationMenu.service';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationToggleComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    NavigationMenuService
  ],
  exports : [
    NavigationComponent,
    NavigationToggleComponent,
    FooterComponent
  ]
})
export class SharedModule { }
