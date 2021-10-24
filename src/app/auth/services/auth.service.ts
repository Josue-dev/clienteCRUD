import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import { UserResponse, Usuario, Car, Vehiculos,insert } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl :string = environment.baseUrl;
  private _usuario! :Usuario;
  public resultados:Car[]=[];

  get usuario (){
    return {...this._usuario};
  }



  constructor(private http:HttpClient) {
    this.resultados = JSON.parse(localStorage.getItem('cars')!) || [];
  }


  login(email :string, password:string){
    //recibimos los datos del formulario
    const url = `${this.baseUrl}auth/login`;
    const body = {email, password};
    return  this.http.post<UserResponse>(url, body)
      .pipe(
        tap( resp=>{
          if(resp.ok){
            localStorage.setItem('token', resp.access_token);
            localStorage.setItem('nombre',resp.user.name);

            this._usuario={
              id:resp.user.id,
              name:resp.user.name
            }
          }
        }),
        map(resp=>resp.ok),
        catchError(err=>of(err.error.password))
      )
  }
  insertarVehiculo(placa:string, tipo:string, marca:string,linea:string, modelo:string ){
    const url = `${this.baseUrl}vehiculo`;
    const body = {placa, tipo, marca, linea, modelo};
    return this.http.post<insert>(url,body)
    .pipe(
      map(resp=>resp.message)
    )
  }
  cargarVehiculos(){
    const url = `${this.baseUrl}vehiculo`;
    this.http.get<Vehiculos>(url)
      .subscribe(resp=>{
        if(resp){
          this.resultados = resp.cars;
          localStorage.setItem('cars',JSON.stringify(this.resultados));
        }


      })
  }

}
