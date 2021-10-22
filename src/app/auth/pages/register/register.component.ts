import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent  {
  miFormulario :FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });


  constructor(private fb:FormBuilder, private router:Router) { }

  registro(){
    console.log(this.miFormulario.value);

    this.router.navigateByUrl('/dashboard');
  }

}
