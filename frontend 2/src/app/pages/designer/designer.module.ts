import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignerComponent } from './designer.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DesignerComponent,
    HttpClientModule,
  ],
  //providers: [DesignerService]
})
export class DesignerModule {

}
