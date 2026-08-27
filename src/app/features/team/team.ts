import { Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { starters, reserves } from '../../data/models/players.mock';
import { CommonModule } from '@angular/common';

@Component({
  imports: [Card, CommonModule],
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  protected readonly starters = starters;
  protected readonly reserves = reserves;
}