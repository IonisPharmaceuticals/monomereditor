(function () {
    getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    median = function (values) {
        values.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }


    concat = function (arraylist) {
        var res = '';
        arraylist.forEach(function (x, i) {
            {
                res += x + ' ';
            }
        });
        return res.trim();
    }

    sum = function sum(arraylist) {
        var i = 0
        for (i = 0, total = 0; i < arraylist.length; i++) {
            total += arraylist[i];
        }
        return total;
    }

    mean = function mean(arraylist)
    {
        return sum ( arraylist )/arraylist.length;
    }


})();
