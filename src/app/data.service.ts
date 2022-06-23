import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPrijava() : Observable<Prijave[]> {
    return this.http.get<Prijave[]>("/prijave")
  }
  getKartice() : Observable<Kartice[]> {
    return this.http.get<Kartice[]>("/kartice")
  }
  savePrijava(prijava: Prijava): Observable<any> {
    return this.http.post("/registracija", prijava)
  }
}

export class Prijava {
  OCJ01_Id: string;
  OCJ01_Prihod: string;

  constructor()
  {
    this.OCJ01_Id='';
    this.OCJ01_Prihod='';
  }
}

export class Prijave
{
    OCJ02_Ime: string;
    OCJ02_Priimek: string;
    OCJ02_Prihod: string;
    OCJ02_Odhod: string;

    constructor()
    {
      this.OCJ02_Ime='';
      this.OCJ02_Priimek='';
      this.OCJ02_Prihod='';
      this.OCJ02_Odhod='';
    }
}
export class Kartice
{
    OCJ03_Id: string;
    OCJ03_Ime: string;

    constructor()
    {
      this.OCJ03_Id='';
      this.OCJ03_Ime='';
    }
}