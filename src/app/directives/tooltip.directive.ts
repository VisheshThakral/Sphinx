// tooltip.directive.ts
import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private createTooltipElement(): HTMLElement {
    const tooltip = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'tooltip');
    this.renderer.appendChild(
      tooltip,
      this.renderer.createText(this.tooltipText)
    );
    this.renderer.appendChild(document.body, tooltip);
    return tooltip;
  }

  private positionTooltip() {
    const elRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    const top = elRect.top - tooltipRect.height + 20;
    const left = elRect.left + elRect.width / 2 - tooltipRect.width / 2 - 40;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.createTooltipElement();
    }

    this.positionTooltip();
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  private hideTooltip() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }
}
