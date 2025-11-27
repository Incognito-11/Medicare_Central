import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[mcCardHover]',
})
export class CardHoverDirective {
  @Input() hoverScale = 1.02;

  constructor(private el: ElementRef, private r: Renderer2) {
    this.r.setStyle(this.el.nativeElement, 'transition', 'all .2s ease');
  }

  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(
      this.el.nativeElement,
      'transform',
      `scale(${this.hoverScale})`
    );
    this.r.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 4px 12px rgba(0,0,0,0.12)'
    );
  }

  @HostListener('mouseleave') onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'transform');
    this.r.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}
