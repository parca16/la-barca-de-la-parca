import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { starters, reserves } from '../../data/models/players.mock';

@Component({
  imports: [Card],
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  protected readonly starters = starters;
  protected readonly reserves = reserves;
}