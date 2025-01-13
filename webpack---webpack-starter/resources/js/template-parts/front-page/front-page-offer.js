$(document).ready(function() {
    if ($('.offer').length) {
        var transforms = function transforms(x, y, el, num, elID) {
            var box = el.getBoundingClientRect();
            var calcY = (x - box.x - box.width / 2) / 100 - num;
            calcY = calcY.toFixed(3);
            if (calcY >= 20) {
                calcY = 20;
            } else if (calcY <= -20) {
                calcY = -20;
            }
            if (elID == 0) {
                if (x >= halfWindow) {
                    return "perspective(350px) rotateY(" + calcY * 1.8 + "deg)";
                } else {
                    return "perspective(350px) rotateY(" + calcY * 0.4 + "deg)";
                }
            } else if (elID == 1) {
                return "perspective(350px) rotateY(" + calcY + "deg)";
            } else if (elID == 2) {
                if (x <= halfWindow) {
                    return "perspective(350px) rotateY(" + calcY * 1.8 + "deg)";
                } else {
                    return "perspective(350px) rotateY(" + calcY * 0.4 + "deg)";
                }
            }
        };
        var showBorder = function showBorder(x, y, el, num, elID) {
            var box = el.getBoundingClientRect();
            var calcY = (x - box.x - box.width / 2) / 100 - num;
            calcY = calcY.toFixed(3);
            if (elID == 0) {
                if (x >= halfWindow) {
                    calcY = calcY * 1.8;
                } else {
                    calcY = calcY * 0.4;
                }
            } else if (elID == 1) {
                calcY = calcY;
            } else if (elID == 2) {
                if (x <= halfWindow) {
                    calcY = calcY * 1.8;
                } else {
                    calcY = calcY * 0.4;
                }
            }
            if (calcY > 3 && calcY < 9) {
                return "0px 0px 0px 2px";
            } else if (calcY >= 9 && calcY <= 21) {
                return "0px 0px 0px 3px";
            } else if (calcY > 21) {
                return "0px 0px 0px 4px";
            } else if (calcY < -3 && calcY >= -9) {
                return "0px 2px 0px 0px";
            } else if (calcY < -9 && calcY >= -21) {
                return "0px 3px 0px 0px";
            } else if (calcY < -21) {
                return "0px 4px 0px 0px";
            } else {
                return "0px 0px 0px 0px";
            }
        };
        var element_1 = document.getElementById("offer__offerBox--1");
        var element_2 = document.getElementById("offer__offerBox--2");
        var element_3 = document.getElementById("offer__offerBox--3");
        var inner_1 = $('.offer__offerBox--1 .offer__offerBox__inner');
        var inner_2 = $('.offer__offerBox--2 .offer__offerBox__inner');
        var inner_3 = $('.offer__offerBox--3 .offer__offerBox__inner');
        var halfWindow = window.innerWidth / 2;;
        if ($(window).width() > 991) {
            window.onmousemove = function(e) {
                var xy = [e.clientX, e.clientY];
                var position_1 = xy.concat([element_1]);
                position_1.push(4.14, 0);
                var position_2 = xy.concat([element_2]);
                position_2.push(0, 1);
                var position_3 = xy.concat([element_3]);
                position_3.push(-4.14, 2);
                window.requestAnimationFrame(function() {
                    element_1.style.transform = transforms.apply(null, position_1);
                    element_2.style.transform = transforms.apply(null, position_2);
                    element_3.style.transform = transforms.apply(null, position_3);
                    inner_1.css('border-width', showBorder.apply(null, position_1));
                    inner_2.css('border-width', showBorder.apply(null, position_2));
                    inner_3.css('border-width', showBorder.apply(null, position_3));
                });
            };
        } else {
            var touchMove = function touchMove(e) {
                var box = this.getBoundingClientRect();
                var x = e.touches[0].clientX - box.left;
                var calcY = (x - box.width / 2) / 50 * 5;
                calcY = calcY.toFixed(3);
                var rotate = 'perspective(800px) rotateY(' + calcY + 'deg)';
                this.style.transform = rotate;
                if (calcY > 2 && calcY < 4) {
                    var border = "0px 0px 0px 1px";
                } else if (calcY > 3) {
                    var border = "0px 0px 0px 2px";
                } else if (calcY < -2 && calcY > -4) {
                    var border = "0px 1px 0px 0px";
                } else if (calcY < -3) {
                    var border = "0px 2px 0px 0px";
                } else {
                    var border = '0px 0px 0px 0px';
                }
                this.getElementsByClassName("offer__offerBox__inner")[0].style.borderWidth = border;
            };
            var touchEnd = function touchEnd(e) {
                this.style.transform = 'perspective(800px) rotateY(0deg)';
                this.getElementsByClassName("offer__offerBox__inner")[0].style.borderWidth = '0px 0px 0px 0px';
            };;;
            [element_1, element_2, element_3].forEach(function(element) {
                element.addEventListener('touchstart', touchMove);
                element.addEventListener('touchmove', touchMove);
                element.addEventListener('touchend', touchEnd);
            });
        }
    }
});

//# sourceURL=webpack://webpack-starter/./resources/js/template-parts/front-page/front-page-offer.js?