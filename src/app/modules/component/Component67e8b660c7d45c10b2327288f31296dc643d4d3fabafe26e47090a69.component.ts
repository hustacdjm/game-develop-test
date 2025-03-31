import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';
import { GameComponentServiceClient } from '../clients/game.component.client';
import {MatDialog} from '@angular/material/dialog';
import { LearningComponentDialog } from '../clients/learning-component-dialog/learning-component.dialog';

@Component({
    selector     : 'Component67e8b660c7d45c10b2327288f31296dc643d4d3fabafe26e47090a69',
    standalone   : true,
    templateUrl  : './Component67e8b660c7d45c10b2327288f31296dc643d4d3fabafe26e47090a69.component.html',
    encapsulation: ViewEncapsulation.None,
    imports:[
       CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,MatRadioModule, MatRadioModule
    ]
    
})
export class Component67e8b660c7d45c10b2327288f31296dc643d4d3fabafe26e47090a69 implements OnInit, OnDestroy , AfterViewInit
{

    @Input() data:any;
    @Input() env:any;
    
    @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
        
    private game!: Phaser.Game;
    /**
     * Constructor
     */
     constructor(
       public gameComponentServiceClient: GameComponentServiceClient ,
       public sanitizer:DomSanitizer,     
       private elementRef: ElementRef){

       }




     ngOnInit(): void {
      console.log(this.gameContainer);
      }

      ngAfterViewInit(): void {

        console.log(this.gameContainer);

        this.gameComponentServiceClient.env = this.env;

        if (this.gameContainer) {
          this.initGame(this.gameContainer.nativeElement);
        }
      }
    
      ngOnDestroy(): void {
        if (this.game) {
          this.game.destroy(true);
        }
      }
    
      private initGame(container: HTMLElement) {

        console.log("init:" + container);
        console.log("input data");
        console.log(this.data);

        if (this.game) return;

        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          parent: container,
          width: 400,
          height: 300,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: this.data.component.content.x0, y: this.data.component.content.y0},  //set the data from input data
              debug: false
            }
          },
          scene: {
            preload: this.preload,
            create: this.create,
            update: this.update
          },         
           // Important for Angular compatibility:
          callbacks: {
            postBoot: () => {
              console.log("post boot");
              this.game.canvas.style.width = '100%';
              this.game.canvas.style.height = '100%';
            }
          }          
        };
    
        this.game = new Phaser.Game(config);
        this.game.registry.set('gameData', this.data);
        this.game.registry.set("scoreComponentServiceClient", this.gameComponentServiceClient);
      }
    
      private preload(this: Phaser.Scene) {
        this.load.image('ball', 'https://raw.githubusercontent.com/hustacdjm/images/main/All-backward_nav.png');
        
      }
    
      private create(this: Phaser.Scene) {

        let currentGameData;
    
        const gameData = this.registry.get('gameData');
        console.log('Registry data:', gameData);

        const gameComponentServiceClient: GameComponentServiceClient = this.registry.get("scoreComponentServiceClient") as GameComponentServiceClient;
        console.log("Register Service:" + gameComponentServiceClient);

        console.log(gameComponentServiceClient.env);
      
        this.add.text(100, 100,gameData.component.content.title, { 
          fontSize: '12px', 
          color: '#ffffff' 
        });

        const ball = this.physics.add.sprite( gameData.component.content.x0, gameData.component.content.y0, 'ball');
        ball.setBounce(0.8);
        ball.setCollideWorldBounds(true);

         // Create a button in Phaser
        const button = this.add.text(300, 250, 'Open Learning', {
          fontSize: '12px',
          color: '#ffffff',
          backgroundColor: '#4a4a4a',
          padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Button styling for hover effects
        button.on('pointerover', () => {
          button.setStyle({ backgroundColor: '#6a6a6a' });
        });

        button.on('pointerout', () => {
          button.setStyle({ backgroundColor: '#4a4a6a' });
        });

        // When button is clicked, emit event to Angular
        button.on('pointerdown', () => {
         
          gameComponentServiceClient.openDialog().subscribe(result => {


            gameData.runtime.data={
              ...gameData.runtime.data,
              ...result
            }

            console.log('Dialog closed with result:', result);
            // Continue your logic here
            console.log("continue after close dialog");
          });
          
        });

        //get the game data
        gameComponentServiceClient.gameData().subscribe(
          d=>{
            console.log(d);
            currentGameData = d[0];
            this.add.text(200, 100, d[0].component.content.title, { 
              fontSize: '12px', 
              color: '#ffffff' 
            });
            

          }
        )

      }
    
      private update(this: Phaser.Scene) {
        // Game logic updates can go here.
     
      }



}
