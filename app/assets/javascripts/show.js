class Timer {
    constructor(seconds, sound_path) {
        this.user_seconds = parseInt(seconds);
        this.seconds = parseInt(seconds);
        this.clear = true;
        this.audio = new Audio(sound_path);
    }
    

    // The interval that tuns the timer.
    countdown() {
        var self = this;
        var running_timer = setInterval(function() {
            self.print_junk();
            $("#pom-time").replaceWith('<div id="pom-time">' + self.time_string() + '</div>');
            if(self.seconds <= 0) {
                clearInterval(running_timer);
                self.make_a_sound();
                self.work_break_toggle();
            }else if(self.clear) {
                clearInterval(running_timer);
            }
            else 
                self.seconds -= 1;
        }
            ,1000);
    }
    
    // Convert the seconds into a clock form. 
    
    //**** We actually need only the minutes and the seconds *****
    time_string() {
        var timeFormat = ["00", "00", "00"];
        var hours = parseInt(this.seconds / 3600);
        var minutes = parseInt((this.seconds % 3600) / 60);
        var seconds = parseInt(this.seconds % 60)

        timeFormat[0] = Timer.numberChanger(hours);
        timeFormat[1] = Timer.numberChanger(minutes);
        timeFormat[2] = Timer.numberChanger(seconds);

        return timeFormat[0] + ":" + timeFormat[1] + ":" + timeFormat[2];
    }

    // Sets new secons into the timer object.
    set_seconds(new_seconds) {
        this.seconds = new_seconds;
    }

    // Keep the format of the clock like "01" instead of jus "1"
    static numberChanger(number) {
        if(String(number).length > 1)
            return number;
        else
            return "0" + number;
    } 

    // An Eastern Egg
    print_junk() {
        console.log("Alex & Dor are the BEST!")
    }

    // ##### Need to be implemented #####
    // Supose to change the view of the page from Work to Brake and vis versa.
    work_break_toggle() {
        // Check if we finished "work" or a "break"

        // switch the seconds from break to work

        if( $("#pom-top").hasClass("work") ) {
            $("#pom-top").replaceWith('<div id="pom-top" class="break"><h1>Break Time Remaining</h1></div>');
            $("#play").replaceWith('<button id="play" onclick="breakTimer.start_timer()">Play</button>');
            $("#pause").replaceWith('<button id="pause" onclick="breakTimer.start_timer()">Pause</button>');
            $("#reset").replaceWith('<button id="reset" onclick="breakTimer.start_timer()">Reset</button>');
            
            this.seconds = this.user_seconds;
            this.clear = true;
            $("#play").trigger("click");
        } else {
            $("#pom-top").replaceWith('<div id="pom-top" class="work"><h1>Work Time Remaining</h1></div>');
            $("#play").replaceWith('<button id="play" onclick="workTimer.start_timer()">Play</button>');
            $("#pause").replaceWith('<button id="pause" onclick="workTimer.start_timer()">Pause</button>');
            $("#reset").replaceWith('<button id="reset" onclick="workTimer.start_timer()">Reset</button>');
            
            this.seconds = this.user_seconds;
            this.clear = true;
            $("#play").trigger("click");
        };
    }

    // After the timer runs up this is the sign that it ended.
    make_a_sound() {
        this.audio.play();
    }

    // The buttons functions.
    start_timer() {
        if(this.clear == true) {
            console.log("clear == true");
            this.pause = false;
            this.clear = false;
            this.countdown();
        } else {
            console.log("clear == false");
            this.pause = false;
            this.clear = true;
        }
    }

    pause_timer() {
        this.pause = true;
    }

    reset_timer() {
        this.set_seconds(10);
        this.pause = true;
    }   
}