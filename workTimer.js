window.onload = function(){
    var timer = function(){

        var timer = document.getElementById('timer'),
            indicat = timer.getElementsByClassName('indication')[0],
            time = timer.getElementsByClassName('time')[0],
            intervalIndicat,
            intervalTime;

        var indObj = createDateObj(indicat),
            timeObj = createDateObj(time);


        var countingTime = (function(){
            var methodsList = {
                hours: 'getHours',
                mins: 'getMinutes',
                secs: 'getSeconds',
                millisecs: 'getMilliseconds'
            };

            return function(dateObj, date){
                date = date || new Date();

                for(var key in methodsList){
                    if(dateObj[key] !== undefined){
                        dateObj[key] = date[methodsList[key]]();
                    }
                }
            }
        })();

        function createDateObj(elem, dateObj){
            var that = dateObj || {
                hours: 0,
                mins: 0,
                secs: 0
            };

            function toString(){
                var str = '';

                for(var key in that){
                    if(typeof that[key] !== 'number') continue;

                    str += (that[key] >= 10 ? that[key] : '0'+that[key]) + ':';
                }

                str = str.substring(0, str.length-1);

                return str;
            }

            function getHtmlElems(htmlElem){
                var elemsArr = [];

                for(var key in that){
                    if(typeof that[key] !== 'number') continue;
                    //alert(key);
                    elemsArr.push(htmlElem.getElementsByClassName(key)[0]);
                }

                return elemsArr;
            }

            that.toString = toString;
            that.getHTMLElems = getHtmlElems(elem);

            return that;
        }

        function print(dateObj){
            var dateArr = dateObj.toString().split(':');
            var elemsArr = dateObj.getHTMLElems;

            for(var i = 0; i < dateArr.length; ++i){
                elemsArr[i].innerHTML = dateArr[i];
            }
        }

        function updateTime(dateObj, date){
            countingTime(dateObj, date);
            print(dateObj);
        }

        function start(){
            updateTime(timeObj);
            intervalTime = setInterval(function(){updateTime(timeObj);}, 1000);
        }

        function stop(){
            clearInterval(intervalTime);
        }

        return {
            start: start,
            //reset: ,
            stop: stop
        };
    };

    var t = timer();
    t.start();
};