import Phaser from 'phaser';

export default class StreetScene extends Phaser.Scene {

    private carBlue: any;
    private carPurple: any;
    private carPink: any;
    private carWhite: any;
    private trafficLigthNorth: any;
    private trafficLigthSouth: any;
    private trafficLigthEast: any;
    private trafficLigthWest: any;
    private timer: any;
    private timeLabel: any;
    private startTime: any;
    private totalTime: any;
    private timeElapsed: any;
    private x: any;
    private y: any;
    private z: any;
    private countX: number = 0;
    private countY: number = 0;
    private countZ: number = 0;
    private labelX: any;
    private labelY: any;
    private labelZ: any;

    private xSecond: any;
    private ySecond: any;
    private zSecond: any;
    private countXSecond: number = 0;
    private countYSecond: number = 0;
    private countZSecond: number = 0;
    private labelXSecond: any;
    private labelYSecond: any;
    private labelZSecond: any;

    private timeDelay = 1000;

    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('street', 'assets/background.png');
        this.load.image('car-blue', 'assets/car-blue.png');
        this.load.image('car-pink', 'assets/car-pink.png');
        this.load.image('car-purple', 'assets/car-purplue.png');
        this.load.image('car-white', 'assets/car-white.png');
        this.load.image('traffic-north', 'assets/traffic-ligth.png');
        this.load.image('traffic-south', 'assets/traffic-ligth.png');
        this.load.image('traffic-east', 'assets/traffic-ligth.png');
        this.load.image('traffic-west', 'assets/traffic-ligth.png');
        this.load.image('traffic-north-green', 'assets/traffic-ligth-green.png');
        this.load.image('traffic-north-yellow', 'assets/traffic-ligth-yellow.png');
        this.load.image('traffic-north-red', 'assets/traffic-ligth-red.png');
        this.load.image('traffic-south-green', 'assets/traffic-ligth-green.png');
        this.load.image('traffic-south-yellow', 'assets/traffic-ligth-yellow.png');
        this.load.image('traffic-south-red', 'assets/traffic-ligth-red.png');
        this.load.image('traffic-west-green', 'assets/traffic-ligth-green.png');
        this.load.image('traffic-west-yellow', 'assets/traffic-ligth-yellow.png');
        this.load.image('traffic-west-red', 'assets/traffic-ligth-red.png');
        this.load.image('traffic-east-green', 'assets/traffic-ligth-green.png');
        this.load.image('traffic-east-yellow', 'assets/traffic-ligth-yellow.png');
        this.load.image('traffic-east-red', 'assets/traffic-ligth-red.png');
    }

    create() {
        // Background
        let bg = this.add.sprite(0, 0, 'street');
        bg.setOrigin(0, 0);
        // Car
        this.carBlue = this.add.sprite(-100, 420, 'car-blue');
        this.carBlue.setScale(0.4);
        this.carPurple = this.add.sprite(-100, 420, 'car-purple');
        this.carPurple.setScale(0.4);
        this.carPink = this.add.sprite(-100, 420, 'car-pink');
        this.carPink.setScale(0.4);
        this.carWhite = this.add.sprite(-100, 420, 'car-white');
        this.carWhite.setScale(0.4);

        // Traffic lights
        this.trafficLigthWest = this.add.sprite(483, 492, 'traffic-west');
        this.trafficLigthWest.setScale(0.2);

        this.trafficLigthEast = this.add.sprite(803, 240, 'traffic-east');
        this.trafficLigthEast.setScale(0.2);

        this.trafficLigthNorth = this.add.sprite(535, 190, 'traffic-north');
        this.trafficLigthNorth.setScale(0.2);

        this.trafficLigthSouth = this.add.sprite(750, 540, 'traffic-south');
        this.trafficLigthSouth.setScale(0.2);

        // this.routeTwo(this.carPurple);

        // Timer
        this.startTime = new Date();
        this.totalTime = 0;
        this.timeElapsed = 0;

        this.timeLabel = this.add.text(100, 100, "00:00", {font: "100px Arial", fill: "#fff"});
        this.timeLabel.align = 'center';
        this.add.text(980, 20, "X", {font: "50px Arial", fill: "#fff"});
        this.labelX = this.add.text(980, 100, "0", {font: "50px Arial", fill: "#fff"});
        this.labelX.align = 'center';
        this.add.text(1100, 20, "Y", {font: "50px Arial", fill: "#fff"});
        this.labelY = this.add.text(1100, 100, "0", {font: "50px Arial", fill: "#fff"});
        this.labelY.align = 'center';
        this.add.text(1220, 20, "Z", {font: "50px Arial", fill: "#fff"});
        this.labelZ = this.add.text(1220, 100, "0", {font: "50px Arial", fill: "#fff"});
        this.labelZ.align = 'center';

        
        this.labelXSecond = this.add.text(980, 150, "0", {font: "50px Arial", fill: "#fff"});
        this.labelXSecond.align = 'center';
        this.labelYSecond = this.add.text(1100, 150, "0", {font: "50px Arial", fill: "#fff"});
        this.labelYSecond.align = 'center';
        this.labelZSecond = this.add.text(1220, 150, "0", {font: "50px Arial", fill: "#fff"});
        this.labelZSecond.align = 'center';

        this.timer = this.time.addEvent({ delay: this.timeDelay, callback: this.updateTimer, callbackScope: this, loop: true });

    }

    update() {
        if (this.carPurple.x >= 575) {
            this.turnLeft(this.carPurple);
        }
        if (this.carPurple.y < -300) {
            this.carPurple.x = -1000;
            this.carPurple.y = 420;
            this.carPurple.angle = 0;
            this.routeTwo(this.carPurple);
        }
        
    }

    updateTimer() {

        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);
        //Time remaining in seconds
        var timeRemaining = this.timeElapsed; 
        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        this.timeLabel.text = result;

        this.changeLigthNorthSouth();
        this.changeLigthWestEast();

    }

    routeOne(car) {
        this.tweens.timeline({

            targets: car,
            ease: 'Route1',
            duration: 1000,
    
            tweens: [
            {
                x: 600
            },
            {
                angle: 90,
                y: 500,
                
            },
            {
                y: 1000,
            }]
    
        });
    }

    turnLeft(car) {
        this.tweens.timeline({
            targets: car,
            ease: 'Route2',
            duration: 2000,
            
            tweens: [
                {
                    angle: -180,
                    y: -400,
                    
                },    
            ]
        });
    }
    routeTwo(car) {
        this.tweens.timeline({

            targets: car,
            ease: 'Route2',
            duration: 4000,
            
    
            tweens: [
            {
                x: 700,
            }]
    
        });
    }

    routeThree(car) {
        this.tweens.add({
            targets: car,
            ease: 'Route3',
            duration: 4000,
            props: {
                x: { value: 1700 },
                y: { value: 420 },
            },
            repeat: -1
        });
    }

    karnaugh(x, y, z) {
        if ((!x && !z) || (!x && !y)) {
            return 'green';
        }
        if (!x && y && z) {
            return 'yellow';
        }
        if (x) {
            return 'red';
        }
        return '';
    }

    changeLigthWestEast() {
        if (this.countX < 4) {
            this.x = false;
            this.labelX.text = "0";
        } else {
            this.x = true;
            this.labelX.text = "1";
        }

        if (this.countY < 2) {
            this.y = false;
            this.labelY.text = "0";
        } else {
            this.y = true;
            this.labelY.text = "1";
        }

        if (this.countZ < 1) {
            this.z = false;
            this.labelZ.text = "0";
        } else {
            this.z = true;
            this.labelZ.text = "1";
        }

        this.countX++;
        this.countY++;
        this.countZ++;

        if (this.countX > 7) {
            this.countX = 0;
        }

        if (this.countY > 3) {
            this.countY = 0;
        }

        if (this.countZ > 1) {
            this.countZ = 0;
        }

        var ligth = this.karnaugh(this.x, this.y, this.z);
        this.trafficLigthWest = this.add.sprite(483, 492, 'traffic-west-' + ligth);
        this.trafficLigthWest.setScale(0.2);
        this.trafficLigthEast = this.add.sprite(803, 240, 'traffic-east-' + ligth);
        this.trafficLigthEast.setScale(0.2);
    }

    changeLigthNorthSouth() {
        if (this.countXSecond < 4) {
            this.xSecond = true;
            this.labelXSecond.text = "1";
        } else {
            this.xSecond = false;
            this.labelXSecond.text = "0";
        }

        if (this.countYSecond < 2) {
            this.ySecond = true;
            this.labelYSecond.text = "1";
        } else {
            this.ySecond = false;
            this.labelYSecond.text = "0";
        }

        if (this.countZSecond < 1) {
            this.zSecond = true;
            this.labelZSecond.text = "1";
        } else {
            this.zSecond = false;
            this.labelZSecond.text = "0";
        }

        this.countXSecond++;
        this.countYSecond++;
        this.countZSecond++;

        if (this.countXSecond > 7) {
            this.countXSecond = 0;
        }

        if (this.countYSecond > 3) {
            this.countYSecond = 0;
        }

        if (this.countZSecond > 1) {
            this.countZSecond = 0;
        }

        var ligth = this.karnaugh(this.xSecond, this.ySecond, this.zSecond);
        this.trafficLigthNorth = this.add.sprite(535, 190, 'traffic-north-' + ligth);
        this.trafficLigthNorth.setScale(0.2);
        this.trafficLigthSouth = this.add.sprite(750, 540, 'traffic-south-' + ligth);
        this.trafficLigthSouth.setScale(0.2);
    }

}