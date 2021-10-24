import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `* {
      margin:25px;
    }
    `
  ]
})
export class DashboardComponent  {

  miForm :FormGroup = this.fb.group({
    placa:['',[Validators.required,Validators.minLength(2)]],
    tipo:['',[Validators.required, Validators.minLength(2)]],
    marca:['',[Validators.required, Validators.minLength(2)]],
    linea:['',[Validators.required, Validators.minLength(2)]],
    modelo:['',[Validators.required, Validators.minLength(2)]]
  });



  get resultado(){
    return this.authService.resultados;
  }

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private fb:FormBuilder, private router : Router, private authService:AuthService) { }
  guardar(){
    console.log(this.miForm.value);
   const {placa, tipo, marca, linea, modelo} = this.miForm.value;

   this.authService.insertarVehiculo(placa,tipo, marca, linea, modelo)
     .subscribe(ok=>{
      Swal.fire('Good job!',ok,'success');
      this.miForm.reset();
      this.authService.cargarVehiculos();
     })
  }

  logout(){
    this.router.navigateByUrl('/auth/login');
  }

}
