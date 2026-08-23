import { Component, Input } from '@angular/core';
import { Player } from '../../data/models/player.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() player!: Player;
}