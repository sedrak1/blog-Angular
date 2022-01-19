import {Directive, Input, HostListener, ElementRef, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import {first, Subscription} from 'rxjs';
import { ValidationMessagesService} from "./validation-messages.service";


@Directive({
  selector: '[appValidationLabel]'
})
export class ValidationLabelDirective implements OnInit {

  errMsgDiv = this.renderer.createElement('div')

  constructor(private elRef: ElementRef,
              private control: NgControl,
              private validationMsgService: ValidationMessagesService,
              private renderer: Renderer2
  ) { }


  @Input('formControlName') formControlName: string | undefined;
  errorSpanId = '';


  statusChangeSubscription: Subscription | undefined;


  ngOnInit(): void {
    console.log(typeof this.formControlName)
    // this.removeError()
    console.log("gfd", this.elRef.nativeElement.parentNode)
    this.renderer.appendChild(this.elRef.nativeElement.parentNode, this.errMsgDiv)
    console.log("asdasdas", this.elRef.nativeElement.parentNode)
    // this.errorSpanId = this.formControlName + '-error';
    // @ts-ignore
    // this.statusChangeSubscription = this.control.statusChanges.subscribe(
    //
    //
    //   (status) => {
    //     console.log(status)
    //     if (status === 'INVALID') {
    //       this.showError();
    //     } else {
    //       this.removeError();
    //     }
    //   }
    // );
  }


  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    console.log(this.control)
    if (this.control.errors) {
      console.log(this.control.errors)
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

    const text = this.renderer.createText(errorMsg)
    //
    // const newLine = this.renderer.createElement('br')
    // const errSpan = this.renderer.createElement('small')
    // errSpan.style="color: red"
    this.renderer.appendChild(this.errMsgDiv, text)
    // this.renderer.appendChild(this.errMsgDiv, newLine)
    // this.renderer.appendChild(this.errMsgDiv, errSpan)
    this.renderer.appendChild(this.elRef.nativeElement.parentNode, this.errMsgDiv)
    // this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errorMsg);
    // this.elRef.nativeElement.classList.add('is-invalid');
  }

  removeError(): void {

    if (this.errMsgDiv ) {
      this.errMsgDiv.remove()
    }
  }
}
