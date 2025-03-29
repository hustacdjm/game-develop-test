import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';

@Component({
    selector     : 'Component94626c0e4bf54c15a804b3ddcbb8cce2',
    standalone   : true,
    templateUrl  : './Component94626c0e4bf54c15a804b3ddcbb8cce2.component.html',
    encapsulation: ViewEncapsulation.None,
    imports:[
       CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,MatRadioModule
    ]
    
})
export class Component94626c0e4bf54c15a804b3ddcbb8cce2 implements OnInit, OnDestroy 
{

    @Input() data:any;

    private game!: Phaser.Game;
    /**
     * Constructor
     */
     constructor(public sanitizer:DomSanitizer,private elementRef: ElementRef){}

     ngOnInit(): void {
        this.initGame();
      }
    
      ngOnDestroy(): void {
        if (this.game) {
          this.game.destroy(true);
        }
      }
    
      private initGame() {
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          parent: 'game-container',
          width: 800,
          height: 600,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 150, y: 300 },
              debug: false
            }
          },
          scene: {
            preload: this.preload,
            create: this.create,
            update: this.update
          }
        };
    
        this.game = new Phaser.Game(config);
      }
    
      private preload(this: Phaser.Scene) {
        this.load.image('ball', 'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/part7/assets/sprites/pangball.png');
      }
    
      private create(this: Phaser.Scene) {
        const ball = this.physics.add.sprite(400, 100, 'ball');
        ball.setBounce(0.8);
        ball.setCollideWorldBounds(true);
      }
    
      private update(this: Phaser.Scene) {
        // Game logic updates can go here.
      }

}
