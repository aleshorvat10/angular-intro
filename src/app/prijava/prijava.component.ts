import { Component, OnInit } from '@angular/core';
import { DataService, Kartice, Prijava, Prijave } from '../data.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';

export interface Response{Status:string;}
@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})

export class PrijavaComponent implements OnInit {
  prijave:Prijave[]=[]
  kartice:Kartice[]=[]
  p:Prijava = new Prijava
  myControl = new FormControl<string | Kartice>('');
  filteredOptions: Observable<Kartice[]>;
  selectedUser: string;
  response: string;

  constructor(private dataService: DataService, private router: Router) {
    this.selectedUser='';
    this.response='';
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.OCJ03_Ime)),
      map(name => (name ? this._filter(name) : this.kartice.slice())),
    );
  }

  ngOnInit() {
    this.dataService.getKartice().subscribe(karticeList =>{this.kartice=karticeList})
    this.dataService.getPrijava().subscribe(prijavaList => {this.prijave = prijavaList})

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.OCJ03_Ime)),
      map(name => (name ? this._filter(name) : this.kartice.slice())),
      );
  }

    displayFn(user: Kartice): string {
      return user && user.OCJ03_Ime ? user.OCJ03_Ime : '';
    }
    getPosts(evt: MatOptionSelectionChange,kartice:Kartice) {
      if(evt.source.selected)
      {
    this.selectedUser=kartice.OCJ03_Id;
    console.log("SELECTED: "+kartice.OCJ03_Id);
      }
    }

  async Registracija(){ 
    var l_Response = "";
    this.p.OCJ01_Id=this.selectedUser.toString();
    this.p.OCJ01_Prihod='2022-06-22 08:01:50';
    console.log(this.selectedUser);
    this.dataService.savePrijava(this.p).subscribe((val) => 
    {
      console.log(val);     
      let r: Response = <Response>val;
      if(r.Status=="1")
        this.response="Prijava";
      else if(r.Status=="2")
        this.response="Odjava";
      else
        this.response="Napaka";
    });
    await new Promise(f => setTimeout(f, 1000));
    console.log(l_Response);

    this.Reload();
  }
  Reload()
  {
    this.prijave=[];
    this.dataService.getPrijava().subscribe(prijavaList => {this.prijave = prijavaList});
  }
  getDate(d: string):string
  {
    return d.split("T")[0];
  }
  getTime(d: string):string
  {
    return d.split("T")[1];
  }
  private _filter(name: string): Kartice[] {
    const filterValue = name.toLowerCase();
    return this.kartice.filter(option => option.OCJ03_Ime.toLowerCase().includes(filterValue));
  }

}
