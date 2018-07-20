const Calc = require('./calc.js');

class Game {

    constructor() {
        this.rolls = [];
        this.roll_number = 1;
        this.current_frame = 1;
        this.current_frame_result = [];
        this.last_frame_roll = 1;
        this.last_frame_size = 2;
    }

    roll(pins) {
        if(this.current_frame !== 10) { //if is not last frame
            if (this.roll_number % 2 !== 0) {
                this.checkStrike(pins);
            } else {
                this.writeRoll(pins);
            }
            this.roll_number++;
        } else{ //last frame
            this.isLastStrike(pins);
            this.isLastSpare(pins);
            this.writeLastRoll(pins);
        }
    }
    
    checkStrike(pins) {
        if (pins === 10) { //strike
            this.writeRoll(pins, true);
        } else { //not strike
            this.current_frame_result.push(pins);
        }
    }

    isLastSpare(pins) {
        if (this.current_frame_result[0] + pins === 10) { //strike
            this.last_frame_size = 3;
        }
    }

    isLastStrike(pins) {
        if (pins === 10) { //strike
            this.last_frame_size = 3;
        }
    }
    
    writeLastRoll(pins) {
        if (this.last_frame_roll <= this.last_frame_size) {
            this.current_frame_result.push(pins);
            this.last_frame_roll++;
        }
        this.roll_number++;
        
        if (this.roll_number === 18 + this.last_frame_size + 1) {
            this.updateFrames();
        } 
        if (this.roll_number > 18 + this.last_frame_size + 1){
            throw 'End of game';
        }
        
    }
    
    writeRoll(pins, strike) {
        if(!strike) {
            this.current_frame_result.push(pins);
        } else{
            this.current_frame_result.push(pins, 0);
            this.roll_number++;
        }
        this.updateFrames();
        this.current_frame++; //start new frame
    }
    
    updateFrames() {
        if(this.current_frame_result.length > 0) {
            this.rolls.push(this.current_frame_result);
            this.current_frame_result = [];
            this.score();
        }
    }
    
    score() {
        let length = this.rolls.length;
        const calc = new Calc();
        let resultFrames = calc.calcScore(this.rolls);
        let result = resultFrames[length - 1];
        return result;
    }
}

module.exports = Game;