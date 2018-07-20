class Calc {

    constructor(){
        this.total = 0;
        this.totalScore = [];
    }
    
    calcScore(attempts) {
        for (let i = 0; i < attempts.length; i++) {
            if (this.isStrike(attempts[i])) {
                this.total += this.getStrikeBonus(attempts, i);
            } else if (this.isSpare(attempts[i])) {
                this.total += this.getSpareBonus(attempts, i);
            } else {
                this.total += attempts[i][0] + attempts[i][1];
            }
            this.totalScore.push(this.total);
        }
        return this.totalScore;
    }

    isStrike(attempt) {
        return attempt[0] === 10;
    }

    isSpare(attempt) {
        return attempt[0] < 10 && attempt[0] + attempt[1] === 10;
    }

    getStrikeBonus(attempts, i) {
        let total = 10; //base bonus
        if (attempts[i + 1] != null) {
            if (this.isStrike(attempts[i + 1])) {
                total += 10;
                if (attempts[i + 2] != null) {
                    total += attempts[i + 2][0];
                } else {
                    total += attempts[i + 1][1]; //in final frame add second arg
                }
            } else {
                total += (attempts[i + 1][0] + attempts[i + 1][1]);
            }
        } else {
            total += (attempts[i][1] + attempts[i][2]); //in final frame add second and third args
        }
        return total;
    }

    getSpareBonus(attempts, i) {
        let total = 10; //base bonus
        if (attempts[i + 1] != null) {
            total += attempts[i + 1][0];
        }
        return total;
    }
}

module.exports = Calc;