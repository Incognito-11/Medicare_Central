import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover.directive';
import { SpecializationPipe } from './pipes/specialization.pipe';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [CardHoverDirective, SpecializationPipe, PageHeaderComponent],
  imports: [CommonModule],
  exports: [CardHoverDirective, SpecializationPipe, PageHeaderComponent],
})
export class SharedModule {}
