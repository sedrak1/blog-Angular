import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class StructuralDirDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef

  ) { }
  // @ts-ignore
  @Input() set appIf(condition = Boolean(condition) ): void {
    if (condition){
      console.log(this.templateRef.elementRef.nativeElement, this.viewContainerRef.createEmbeddedView
      )
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else {
      this.viewContainerRef.clear()
    }
  }

}
