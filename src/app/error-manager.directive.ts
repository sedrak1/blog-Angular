import {Directive, Input, HostListener, ElementRef, OnInit, Renderer2} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription} from 'rxjs';
import { ValidationMessagesService} from "./validation-messages.service";


@Directive({
  selector: '[appValidationLabel]'
})
export class ValidationLabelDirective implements OnInit {

  errMsgDiv = this.renderer.createElement('div')
  clicker: boolean = false

  constructor(private elRef: ElementRef,
              private control: NgControl,
              private validationMsgService: ValidationMessagesService,
              private renderer: Renderer2
  ) { }


  @Input('formControlName') formControlName: string | undefined;

  statusChangeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.renderer.appendChild(this.elRef.nativeElement.parentNode, this.errMsgDiv)
    // @ts-ignore
    this.statusChangeSubscription = this.control.statusChanges.subscribe(


      (status) => {
        if (status === 'INVALID') {
          this.showError()
        } else {
          this.removeError();
        }
      }
    );
  }


  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    if (this.control.status === 'INVALID') {
      this.removeError();
      this.showError();
    } else {
      this.removeError();
    }
  }

  showError() {
    this.removeError();

    // @ts-ignore
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    const errorMsgKey = this.formControlName + '-' + firstKey + '-msg';
    const errorMsg = this.validationMsgService.getValidationMsg(errorMsgKey);
    this.errMsgDiv.style="color: red"

    const text = this.renderer.createText(errorMsg)
    this.renderer.appendChild(this.errMsgDiv, text)
    this.renderer.appendChild(this.elRef.nativeElement.parentNode, this.errMsgDiv)
  }

  removeError(): void {

    if (this.errMsgDiv ) {
      this.errMsgDiv.remove()
      this.errMsgDiv= this.renderer.createElement('div')
    }
  }
}
