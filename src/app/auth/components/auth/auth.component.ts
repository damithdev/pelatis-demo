import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Colors } from 'src/constants/colors.constants';
import { SubSink } from 'subsink';
import { AuthResponse, AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterContentInit,OnDestroy {

  private subs = new SubSink();

  
  pelatisBottomLogoAboslute = true;
  isLoginMode = true;
  isLoading = false;
  error!: string | null;
  showPassword = false;

  constructor(private elementRef: ElementRef,private authService: AuthService) { }


  ngAfterContentInit(): void {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = Colors.backgroundBlueGray;
  }

  ngOnInit(): void {
    this.heightChangeAction();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.showPassword = false;
  }

  onShowPassword(event:any) {
    this.showPassword = true;
  }

  onHidePassword(event:any) {
    this.showPassword = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.heightChangeAction();
  }

  heightChangeAction(){
    var height = window.innerHeight;

    if(height > 720) {
      this.pelatisBottomLogoAboslute = true;
    }else{
      this.pelatisBottomLogoAboslute = false;
    }
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      
      return;
    }

    const email = form.value.email;
    const pass = form.value.password;

    this.isLoading = true;

    let authObs : Observable<AuthResponse>;

    if(this.isLoginMode){
      authObs = this.authService.login(email,pass)
    }else{
      authObs = this.authService.signUp(email,pass);
    }

    

    this.subs.sink = authObs.subscribe(
      data => {
        this.isLoading = false;
      },
      error => {
        console.warn(error.constructor.name);
        


        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
