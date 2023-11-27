import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    SpinnerComponent,
  ],
  exports: [
    Error404PageComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class SharedModule { }
