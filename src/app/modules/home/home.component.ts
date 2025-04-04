import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { LearningComponentDialog } from '../clients/learning-component-dialog/learning-component.dialog';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, MatIconModule,
        MatIconModule,  CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatRadioModule],
})
export class LandingHomeComponent implements AfterContentInit
{

    /**
     * Constructor
     */
    constructor(private componentFactoryResolver: ComponentFactoryResolver)
    {



    }
  

    @ViewChild('test', {read:ViewContainerRef}) testContainer!: ViewContainerRef;
   
    template = {
      "name": "GamePackTest",
      "version": "3.0",
      "description": "game with learning pack"
    }
                              
    gameComponent = {
      "component": {
        "componentTemplateId": "67e7070a659bbd6b9c344ecb",
        "templateDeployId": null,
        "content": {
          "title": "Pharse Game",
          "x0": 100,
          "y0": 300
        },
        "ui": {},
        "scores": []
      },
      "runtime": {
        "data": {}
      },
      "constants": {}
    };

    env = {

      ScoreUrl: 'http://localhost:8081/v3/edu/ReactiveComponentRuntime/score',
      GameDataUrl: 'http://localhost:8081/v3/edu/ComponentTemplateDevelop/gameData/67e7070a659bbd6b9c344ecb',       //this just for test
      GameLearning: LearningComponentDialog,  //check the type pass
      Authorized: null

  
    };

    
    async ngAfterContentInit() {
      
      this.StartTest();

    }

   
    async StartTest(){
      
        const componentModule = await import('../component/Component67e8b660c7d45c10b2327288f31296dc643d4d3fabafe26e47090a69.component');
        const TemplateComponent = componentModule['Component67e8b660c7d45c10b2327288f31296dc643d4d3fabafe26e47090a69'];

        this.testContainer.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TemplateComponent);

        console.log('container:' + this.testContainer);
        const fmComponentRef  = this.testContainer!.createComponent(componentFactory);
        (fmComponentRef as any).instance.data = this.gameComponent;
        (fmComponentRef as any).instance.env = this.env;
        fmComponentRef.changeDetectorRef.markForCheck();

    }

}
