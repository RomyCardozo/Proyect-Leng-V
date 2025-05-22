import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPageRoutingModule } from './citas-routing.module';

import { CitasPage } from './citas.page';
import { CitaFormComponent } from 'src/app/components/cita-form/cita-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [CitasPage, CitaFormComponent]
})
export class CitasPageModule {}
