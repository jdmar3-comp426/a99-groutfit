function timer(m) {
    var sex = 60;
    var mins = m;

    function increment() {
        var count = document.getElementById("count");
        var minute = mins - 1;
        sex = sex - 1;
        count.innerHTML = minute.toString() + ":" + (sex < 10 ? "0" : "") + String(seconds);

        if(sex > 0) {
            setTimeout(increment, 1000);
        } else {
            if(minute > 1) {
                timer(minute-1);
            }
        }
    }
    increment();
}