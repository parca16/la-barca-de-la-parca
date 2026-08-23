import { Component } from '@angular/core';
import { cs2Maps } from '../../data/models/maps.mock';

@Component({
  imports: [],
  selector: 'app-maps',
  templateUrl: './maps.html',
  styleUrl: './maps.css',
})
export class Maps {
  protected readonly maps = cs2Maps;
}