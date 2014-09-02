function WorkTimer(options){
    this._elem = options.elem;
    this._intervalIndication;
    this._intervalTime;  
    
    var indication = this._elem.getElementsByClassName("indication")[0];
    var t = this._elem.getElementsByClassName("time")[0];
    
    this._ind = {
        secs: indication.getElementsByClassName("secs")[0],
        mins: indication.getElementsByClassName("mins")[0],
        hours: indication.getElementsByClassName("hours")[0]
    };
    
    this._time = {
        secs: t.getElementsByClassName("secs")[0],
        mins: t.getElementsByClassName("mins")[0],
        hours: t.getElementsByClassName("hours")[0]
    };
}

WorkTimer.prototype._formatting = function(timeElem, timeValues){
    for(var key in timeElem){
        timeElem[key].innerHTML = timeValues[key] < 10 ? "0"+timeValues[key] : timeValues[key];
    }
};

WorkTimer.prototype._showInd = function(){
    var secs = parseInt(this._ind.secs.innerHTML, 10);
    var mins = parseInt(this._ind.mins.innerHTML, 10);
    var hours = parseInt(this._ind.hours.innerHTML, 10);
    
    secs = secs < 60 ? secs+1 : 0;
    
};

WorkTimer.prototype._showTime = function(){
    var date = new Date();
    
    this._formatting(this._time, {
        secs: date.getSeconds(),
        mins: date.getMinutes(),
        hours: date.getHours()
    });
};

WorkTimer.prototype.start = function(){
    var self = this;
    //this.reset();
    //this._intervalIndication = setInterval();
    this._showTime();
    this._intervalTime = setInterval(function(){self._showTime();}, 1000);
};

WorkTimer.prototype.reset = function(){
    this._ind.secs.innerHTML = "00";
    this._ind.mins.innerHTML = "00";
    this._ind.hours.innerHTML = "00";
};

WorkTimer.prototype.stop = function(){
    clearInterval(this._intervalIndication);
    clearInterval(this._intervalTime);
};

var t = new WorkTimer({
    elem: document.getElementById('timer')
});
t.start();