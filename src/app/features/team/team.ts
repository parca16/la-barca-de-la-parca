import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { players } from '../../data/models/players.mock';

@Component({
  imports: [Card],
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  protected readonly players = players;
}