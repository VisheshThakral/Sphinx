import {
    Directive,
    Input,
    ElementRef,
    Renderer2,
    AfterViewInit,
  } from '@angular/core';
  
  @Directive({
    selector: '[appNumberFormat]',
  })
  export class NumberFormatDirective implements AfterViewInit {
    @Input('appNumberFormat') value: number = 0;
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    ngAfterViewInit() {
      this.formatNumber();
    }
  
    private formatNumber() {
      const formattedNumber = this.getFormattedNumber(this.value);
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        formattedNumber
      );
    }
  
    private getFormattedNumber(num: number): string {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      } else {
        return num.toString();
      }
    }
  }
  