// $( document ).ready(function() {
//
//
//   function getVals() {
//       // Get slider values
//       let parent = this.parentNode;
//       let slides = parent.getElementsByTagName("input");
//       let slide1 = parseFloat(slides[0].value);
//       let slide2 = parseFloat(slides[1].value);
//       // Neither slider will clip the other, so make sure we determine which is larger
//       if (slide1 > slide2) {
//           let tmp = slide2;
//           slide2 = slide1;
//           slide1 = tmp;
//       }
//
//       let displayElement = parent.getElementsByClassName("rangeValues")[0];
//       displayElement.innerHTML = "Price Search:"  + "$" + slide1 + " - $" + slide2;
//   }
//
//   window.onload = function () {
//       // Initialize Sliders
//       let sliderSections = document.getElementsByClassName("range-slider");
//       for (let x = 0; x < sliderSections.length; x++) {
//           let sliders = sliderSections[x].getElementsByTagName("input");
//           for (let y = 0; y < sliders.length; y++) {
//               if (sliders[y].type === "range") {
//                   sliders[y].oninput = getVals;
//                   // Manually trigger event first time to display values
//                   sliders[y].oninput();
//               }
//           }
//       }
//   }
//   class SikDropdown {
//       ele = null;
//       dropdown = null;
//       el = {
//           input: null,
//           toggle: null,
//           list: null
//       };
//
//       items = {};
//       count = 0;
//       _cbs = [];
//       defaults = {
//           name: "sik-input",
//           value: "",
//           placeholder: "Select Item"
//       };
//       options = {};
//       constructor(identifier, opt = {}) {
//           this.ele = document.querySelector(identifier);
//           if (this.ele) {
//               //Set options:
//               this.setOptions(opt);
//               //Create hidden input:
//               this.el.input = document.createElement("input");
//               this.el.input.setAttribute("type", "hidden");
//               this.el.input.setAttribute("name", this.options.name);
//               this.el.input.setAttribute("value", "");
//               this.ele.prepend(this.el.input);
//
//               //Select list:
//               this.el.list = this.ele.querySelector(".dropdown-menu");
//               this._fillItems();
//               //Set toggler:
//               this.el.toggle = this.ele.querySelector(".dropdown-toggle");
//               this.dropdown = new bootstrap.Dropdown(this.el.toggle);
//               //Set initial value & placeholder:
//               this.setValue(this.options.value);
//               //Set core handlers:
//               this._attachCoreHandlers();
//               this.trigger("init");
//           } else {
//               console.warn("Cant create a Sik Dropdown - selector is invalid");
//           }
//       }
//       setOptions(opt) {
//           this._extend(this.options, this.defaults, opt);
//       }
//       addItem(value, label) {
//           if (!this.items.hasOwnProperty(value)) {
//               let itemContainer = document.createElement('li');
//               itemContainer.innerHTML = `<span class="dropdown-item" data-value="${value}">${label}</span>`;
//               this.el.list.appendChild(itemContainer);
//               let item = itemContainer.querySelector(".dropdown-item");
//               this.count++;
//               this.items[value] = {
//                   el: item,
//                   value: value,
//                   label: item.innerHTML.trim()
//               };
//               item.addEventListener("click", this.trigger.bind(this, "select"));
//           }
//       }
//       removeItem(value) {
//           if (this.items.hasOwnProperty(value)) {
//               this.items[value].el.closest("li").remove();
//               this.count--;
//               delete this.items[value];
//               if (this.value() === value) {
//                   this.setValue(null);
//               }
//           }
//       }
//       setValue(value, close = true) {
//           if (this.items.hasOwnProperty(value)) {
//               this.el.input.setAttribute("value", value);
//               this.el.toggle.innerHTML = this.items[value].label;
//           } else {
//               this.el.input.setAttribute("value", "");
//               if (this.options.placeholder) {
//                   this.el.toggle.innerHTML = this.options.placeholder;
//               }
//           }
//           if (close) this.dropdown.hide();
//       }
//       value() {
//           return this.el.input ? this.el.input.value : null;
//       }
//       text() {
//           let value = this.value();
//           if (this.items.hasOwnProperty(value)) {
//               return this.items[value].label.trim();
//           }
//           return "";
//       }
//       open() {
//           if (this.dropdown) {
//               this.dropdown.show();
//           }
//       }
//       close() {
//           if (this.dropdown) {
//               this.dropdown.hide();
//           }
//       }
//       toggle() {
//           if (this.dropdown) {
//               this.dropdown.toggle();
//           }
//       }
//       attachHandler(ev, cb) {
//           this._cbs.push({
//               ev: ev,
//               fn: cb
//           });
//       }
//       detachHandler(ev) {
//           for (let i = 0; i < this._cbs.length; i++) {
//               if (this._cbs[i].ev === ev) {
//                   this._cbs.splice(i, 1);
//               }
//           }
//       }
//       trigger(ev) {
//           //console.log(this, ev, el);
//           for (let cb of this._cbs) {
//               let event = cb.ev.split(".");
//               if (event.length > 1 && event[1] === ev) {
//                   let [, ...args] = arguments;
//                   cb.fn.call(this, ...args);
//               }
//           }
//       }
//       _fillItems() {
//           if (this.el.list) {
//               let items = this.el.list.querySelectorAll(".dropdown-item");
//               let i = items.length;
//               this.count = items.length;
//               while (i--) {
//                   const value = items[i].getAttribute("data-value");
//                   this.items[value] = {
//                       el: items[i],
//                       value: value,
//                       label: items[i].innerHTML.trim()
//                   };
//                   items[i].addEventListener("click", this.trigger.bind(this, "select"));
//               }
//           }
//           console.log(this.items);
//       }
//       _attachCoreHandlers() {
//           this.attachHandler("core.select", function (item = null) {
//               if (typeof item === 'object' && 'target' in item) {
//                   let selected = item.target.hasAttribute("data-value") ?
//                       item.target :
//                       item.target.closest("[data-value]");
//                   let value = selected ? selected.getAttribute("data-value") : null;
//                   this.setValue(value);
//               }
//           });
//           this.attachHandler("core.open", function () {
//               console.log("open", arguments);
//           });
//           this.attachHandler("core.close", function () {
//               console.log("close", arguments);
//           });
//           this.attachHandler("core.init", function () {});
//           //Bind to dropdown:
//           this.el.toggle.addEventListener('show.bs.dropdown', this.trigger.bind(this, "open"));
//           this.el.toggle.addEventListener('hide.bs.dropdown', this.trigger.bind(this, "close"));
//       }
//       _extend() {
//           for (var i = 1; i < arguments.length; i++)
//               for (var key in arguments[i])
//                   if (arguments[i].hasOwnProperty(key))
//                       arguments[0][key] = arguments[i][key];
//           return arguments[0];
//       }
//   }
//
//   //This how we intiate it and extend the bs funcionality:
//   var dropdown = new SikDropdown("#sik-select", {
//       name: "select-example", // the input field name
//       placeholder: "Default",
//       value: null
//   });
//
//   //adding a callback just for demo:
//   dropdown.attachHandler("myhandler.select", function () {
//       console.log("select", this);
//       let tag = document.getElementById("selected-example");
//       tag.innerText = this.value();
//   });
// //zoom js
//     $('.xzoom, .xzoom-gallery').xzoom({
//         zoomWidth: 500,
//         title: true,
//         tint: '#333',
//         Xoffset: 15
//     });
//     $('.xzoom2, .xzoom-gallery2').xzoom({
//         position: '#xzoom2-id',
//         tint: '#ffa200'
//     });
//     $('.xzoom3, .xzoom-gallery3').xzoom({
//         position: 'lens',
//         lensShape: 'circle',
//         sourceClass: 'xzoom-hidden'
//     });
//     $('.xzoom4, .xzoom-gallery4').xzoom({
//         tint: '#006699',
//         Xoffset: 15
//     });
//     $('.xzoom5, .xzoom-gallery5').xzoom({
//         tint: '#006699',
//         Xoffset: 15
//     });
//
//     //Integration with hammer.js
//     var isTouchSupported = 'ontouchstart' in window;
//
//     if (isTouchSupported) {
//         //If touch device
//         $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function () {
//             var xzoom = $(this).data('xzoom');
//             xzoom.eventunbind();
//         });
//
//         $('.xzoom, .xzoom2, .xzoom3').each(function () {
//             var xzoom = $(this).data('xzoom');
//             $(this).hammer().on("tap", function (event) {
//                 event.pageX = event.gesture.center.pageX;
//                 event.pageY = event.gesture.center.pageY;
//                 var s = 1,
//                     ls;
//
//                 xzoom.eventmove = function (element) {
//                     element.hammer().on('drag', function (event) {
//                         event.pageX = event.gesture.center.pageX;
//                         event.pageY = event.gesture.center.pageY;
//                         xzoom.movezoom(event);
//                         event.gesture.preventDefault();
//                     });
//                 }
//
//                 xzoom.eventleave = function (element) {
//                     element.hammer().on('tap', function (event) {
//                         xzoom.closezoom();
//                     });
//                 }
//                 xzoom.openzoom(event);
//             });
//         });
//
//         $('.xzoom4').each(function () {
//             var xzoom = $(this).data('xzoom');
//             $(this).hammer().on("tap", function (event) {
//                 event.pageX = event.gesture.center.pageX;
//                 event.pageY = event.gesture.center.pageY;
//                 var s = 1,
//                     ls;
//
//                 xzoom.eventmove = function (element) {
//                     element.hammer().on('drag', function (event) {
//                         event.pageX = event.gesture.center.pageX;
//                         event.pageY = event.gesture.center.pageY;
//                         xzoom.movezoom(event);
//                         event.gesture.preventDefault();
//                     });
//                 }
//
//                 var counter = 0;
//                 xzoom.eventclick = function (element) {
//                     element.hammer().on('tap', function () {
//                         counter++;
//                         if (counter == 1) setTimeout(openfancy,
//                             300);
//                         event.gesture.preventDefault();
//                     });
//                 }
//
//                 function openfancy() {
//                     if (counter == 2) {
//                         xzoom.closezoom();
//                         $.fancybox.open(xzoom.gallery().cgallery);
//                     } else {
//                         xzoom.closezoom();
//                     }
//                     counter = 0;
//                 }
//                 xzoom.openzoom(event);
//             });
//         });
//
//         $('.xzoom5').each(function () {
//             var xzoom = $(this).data('xzoom');
//             $(this).hammer().on("tap", function (event) {
//                 event.pageX = event.gesture.center.pageX;
//                 event.pageY = event.gesture.center.pageY;
//                 var s = 1,
//                     ls;
//
//                 xzoom.eventmove = function (element) {
//                     element.hammer().on('drag', function (event) {
//                         event.pageX = event.gesture.center.pageX;
//                         event.pageY = event.gesture.center.pageY;
//                         xzoom.movezoom(event);
//                         event.gesture.preventDefault();
//                     });
//                 }
//
//                 var counter = 0;
//                 xzoom.eventclick = function (element) {
//                     element.hammer().on('tap', function () {
//                         counter++;
//                         if (counter == 1) setTimeout(openmagnific,
//                             300);
//                         event.gesture.preventDefault();
//                     });
//                 }
//
//                 function openmagnific() {
//                     if (counter == 2) {
//                         xzoom.closezoom();
//                         var gallery = xzoom.gallery().cgallery;
//                         var i, images = new Array();
//                         for (i in gallery) {
//                             images[i] = {
//                                 src: gallery[i]
//                             };
//                         }
//                         $.magnificPopup.open({
//                             items: images,
//                             type: 'image',
//                             gallery: {
//                                 enabled: true
//                             }
//                         });
//                     } else {
//                         xzoom.closezoom();
//                     }
//                     counter = 0;
//                 }
//                 xzoom.openzoom(event);
//             });
//         });
//
//     } else {
//         //If not touch device
//
//         //Integration with fancybox plugin
//         $('#xzoom-fancy').bind('click', function (event) {
//             var xzoom = $(this).data('xzoom');
//             xzoom.closezoom();
//             $.fancybox.open(xzoom.gallery().cgallery, {
//                 padding: 0,
//                 helpers: {
//                     overlay: {
//                         locked: false
//                     }
//                 }
//             });
//             event.preventDefault();
//         });
//
//         //Integration with magnific popup plugin
//         $('#xzoom-magnific').bind('click', function (event) {
//             var xzoom = $(this).data('xzoom');
//             xzoom.closezoom();
//             var gallery = xzoom.gallery().cgallery;
//             var i, images = new Array();
//             for (i in gallery) {
//                 images[i] = {
//                     src: gallery[i]
//                 };
//             }
//             $.magnificPopup.open({
//                 items: images,
//                 type: 'image',
//                 gallery: {
//                     enabled: true
//                 }
//             });
//             event.preventDefault();
//         });
//     }
// });
// })(jQuery);
// });
// //zoom js ends
// });
//

// JavaScript Document
(function ($) {
    $(document).ready(function () {
        $('.xzoom, .xzoom-gallery').xzoom({
            zoomWidth: 500,
            title: true,
            tint: '#333',
            Xoffset: 15
        });
        $('.xzoom2, .xzoom-gallery2').xzoom({
            position: '#xzoom2-id',
            tint: '#ffa200'
        });
        $('.xzoom3, .xzoom-gallery3').xzoom({
            position: 'lens',
            lensShape: 'circle',
            sourceClass: 'xzoom-hidden'
        });
        $('.xzoom4, .xzoom-gallery4').xzoom({
            tint: '#006699',
            Xoffset: 15
        });
        $('.xzoom5, .xzoom-gallery5').xzoom({
            tint: '#006699',
            Xoffset: 15
        });

        //Integration with hammer.js
        var isTouchSupported = 'ontouchstart' in window;

        if (isTouchSupported) {
            //If touch device
            $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function () {
                var xzoom = $(this).data('xzoom');
                xzoom.eventunbind();
            });

            $('.xzoom, .xzoom2, .xzoom3').each(function () {
                var xzoom = $(this).data('xzoom');
                $(this).hammer().on("tap", function (event) {
                    event.pageX = event.gesture.center.pageX;
                    event.pageY = event.gesture.center.pageY;
                    var s = 1,
                        ls;

                    xzoom.eventmove = function (element) {
                        element.hammer().on('drag', function (event) {
                            event.pageX = event.gesture.center.pageX;
                            event.pageY = event.gesture.center.pageY;
                            xzoom.movezoom(event);
                            event.gesture.preventDefault();
                        });
                    }

                    xzoom.eventleave = function (element) {
                        element.hammer().on('tap', function (event) {
                            xzoom.closezoom();
                        });
                    }
                    xzoom.openzoom(event);
                });
            });

            $('.xzoom4').each(function () {
                var xzoom = $(this).data('xzoom');
                $(this).hammer().on("tap", function (event) {
                    event.pageX = event.gesture.center.pageX;
                    event.pageY = event.gesture.center.pageY;
                    var s = 1,
                        ls;

                    xzoom.eventmove = function (element) {
                        element.hammer().on('drag', function (event) {
                            event.pageX = event.gesture.center.pageX;
                            event.pageY = event.gesture.center.pageY;
                            xzoom.movezoom(event);
                            event.gesture.preventDefault();
                        });
                    }

                    var counter = 0;
                    xzoom.eventclick = function (element) {
                        element.hammer().on('tap', function () {
                            counter++;
                            if (counter == 1) setTimeout(openfancy,
                                300);
                            event.gesture.preventDefault();
                        });
                    }

                    function openfancy() {
                        if (counter == 2) {
                            xzoom.closezoom();
                            $.fancybox.open(xzoom.gallery().cgallery);
                        } else {
                            xzoom.closezoom();
                        }
                        counter = 0;
                    }
                    xzoom.openzoom(event);
                });
            });

            $('.xzoom5').each(function () {
                var xzoom = $(this).data('xzoom');
                $(this).hammer().on("tap", function (event) {
                    event.pageX = event.gesture.center.pageX;
                    event.pageY = event.gesture.center.pageY;
                    var s = 1,
                        ls;

                    xzoom.eventmove = function (element) {
                        element.hammer().on('drag', function (event) {
                            event.pageX = event.gesture.center.pageX;
                            event.pageY = event.gesture.center.pageY;
                            xzoom.movezoom(event);
                            event.gesture.preventDefault();
                        });
                    }

                    var counter = 0;
                    xzoom.eventclick = function (element) {
                        element.hammer().on('tap', function () {
                            counter++;
                            if (counter == 1) setTimeout(openmagnific,
                                300);
                            event.gesture.preventDefault();
                        });
                    }

                    function openmagnific() {
                        if (counter == 2) {
                            xzoom.closezoom();
                            var gallery = xzoom.gallery().cgallery;
                            var i, images = new Array();
                            for (i in gallery) {
                                images[i] = {
                                    src: gallery[i]
                                };
                            }
                            $.magnificPopup.open({
                                items: images,
                                type: 'image',
                                gallery: {
                                    enabled: true
                                }
                            });
                        } else {
                            xzoom.closezoom();
                        }
                        counter = 0;
                    }
                    xzoom.openzoom(event);
                });
            });

        } else {
            //If not touch device

            //Integration with fancybox plugin
            $('#xzoom-fancy').bind('click', function (event) {
                var xzoom = $(this).data('xzoom');
                xzoom.closezoom();
                $.fancybox.open(xzoom.gallery().cgallery, {
                    padding: 0,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                });
                event.preventDefault();
            });

            //Integration with magnific popup plugin
            $('#xzoom-magnific').bind('click', function (event) {
                var xzoom = $(this).data('xzoom');
                xzoom.closezoom();
                var gallery = xzoom.gallery().cgallery;
                var i, images = new Array();
                for (i in gallery) {
                    images[i] = {
                        src: gallery[i]
                    };
                }
                $.magnificPopup.open({
                    items: images,
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
                event.preventDefault();
            });
        }
    });
})(jQuery);
//   counter
$(document).ready(function () {

    // ------------ Counter BEGIN ------------
    $(".counter__increment, .counter__decrement").click(function (e) {
        var $this = $(this);
        var $counter__input = $(this).parent().find(".counter__input");
        var $currentVal = parseInt($(this).parent().find(".counter__input").val());

        //Increment
        if ($currentVal != NaN && $this.hasClass('counter__increment')) {
            $counter__input.val($currentVal + 1);
        }
        //Decrement
        else if ($currentVal != NaN && $this.hasClass('counter__decrement')) {
            if ($currentVal >= 1) {
                $counter__input.val($currentVal - 1);
            }
        }
    });
    // ------------ Counter END ------------

});