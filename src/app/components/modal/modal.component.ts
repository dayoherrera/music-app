import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Howl } from 'howler';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalBasic {
    closeResult: string;
    @Input() image: any;
    @Input() numSong: number;

    public musicPlay = 0;
    public intervalId: any;

    public soundsV = [
        new Howl({
          src: ['https://www.kozco.com/tech/piano2-CoolEdit.mp3'],
          autoplay: false,
          loop: false,
          volume: 0.5,
          onend: function() {
            console.log('Finished!')
          }
          }),
          new Howl({
            src: ['https://freesound.org/data/previews/381/381353_1676145-hq.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.5,
            onend: function() {
              console.log('Finished!');
            }
          })
       ];

    constructor(private modalService: NgbModal) {    }

    open(content, type, modalDimension) {

        this.playSong();

        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini modal-sound', size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension == undefined && type === 'Login') {
          this.modalService.open(content, { windowClass: 'modal-login modal-sound' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    playSong(): void{

        this.soundsV.forEach((sound)=>sound.stop());

        if(this.numSong % 2 === 0){
          
          this.soundsV[0].play();

        }else{
          
          this.soundsV[1].play();
        }
            
        this.intervalId = setInterval(()=>{  

            this.musicPlay++;
            
            if(this.musicPlay === 8){

                clearInterval(this.intervalId);
                this.musicPlay = 0;
            }

            
        }, 600);
    }

    closeModal(): void{

        this.soundsV.forEach((sound)=>sound.stop());
        
        clearInterval(this.intervalId);
                this.musicPlay = 0;
        this.modalService.dismissAll();
    }
}
