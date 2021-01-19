let showMoreBtn = document.getElementById('showMoreBtn');
let hideBtn = document.getElementById('hideBtn');
let instaBlock__gallery = document.querySelector('.instaBlock__gallery')
let instaBlock__gallery_bottomWrap = document.querySelector('.instaBlock__gallery-bottom-wrap')

showMoreBtn.addEventListener('click', function () {
    showMoreBtn.classList.add('active')
    instaBlock__gallery.classList.add('active')
    hideBtn.classList.add('active')
    instaBlock__gallery_bottomWrap.classList.add('active')
})
hideBtn.addEventListener('click', function () {
    showMoreBtn.classList.remove('active')
    instaBlock__gallery.classList.remove('active')
    hideBtn.classList.remove('active')
    instaBlock__gallery_bottomWrap.classList.remove('active')
})

let myMap;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map('map', {
        center: [55.754365, 37.623808], // Москва
        searchControlProvider: 'yandex#search',
        zoom: 12,
        controls: []
    }), {},
        // Создадим пользовательский макет ползунка масштаба.
        ZoomLayout = ymaps.templateLayoutFactory.createClass(
            "<div class='map-zoom-buttons'>" +
            "<div class='map-zoom-buttons-wrapper'>" +
            "<div id='zoom-in' class='map-zoom-btn map-zoom-btn-plus'></div>" +
            "<span class='map-zoom-line'></span>" +
            "<div id='zoom-out' class='map-zoom-btn map-zoom-btn-minus'></div>" +
            "</div>" +
            "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                },

                zoomOut: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                }
            }),

        zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    myMap.controls.add(zoomControl, {
        position: {
            bottom: '24px',
            right: '24px'
        }
    });

    ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<div title="{{ data.title }}" class="map-btn map-btn-{{data.type}} {{data.isActive}}">',
        '<span class="map-btn__text">{{ data.content }}</span>',
        '</div>'
    ].join(''))

    juristicButton = new ymaps.control.Button({
        data: {
            content: "юрлица",
            title: "юрлица",
            type: "juristic"
        },
        options: {
            layout: ButtonLayout
        }
    });

    myMap.controls.add(juristicButton, {
        position: {
            left: '0',
            bottom: '126px'
        }
    });

    physicButton = new ymaps.control.Button({
        data: {
            content: "физлица",
            title: "физлица",
            type: "physic"
        },
        options: {
            layout: ButtonLayout
        }
    });

    myMap.controls.add(physicButton,
        {
            position: {
                left: '0',
                bottom: '75px'
            }
        });

    allButton = new ymaps.control.Button({
        data: {
            content: "показать всё",
            title: "показать всё",
            type: "all",
            isActive: "active"
        },
        options: {
            layout: ButtonLayout
        }
    });

    myMap.controls.add(allButton,
        {
            position: {
                left: '0',
                bottom: '24px'
            }
        });

    juristicButton.events.add('press', function () {
        removeMarks()
        document.querySelectorAll('.map-btn').forEach((el) => el.classList.remove('active'))
        document.querySelector('.map-btn-juristic').classList.add('active')
        putPlacemark(juristicCoords, 'юрлица', 'Юридическое лицо');
    });

    physicButton.events.add('press', function () {
        removeMarks()
        document.querySelectorAll('.map-btn').forEach((el) => el.classList.remove('active'))
        document.querySelector('.map-btn-physic').classList.add('active')
        putPlacemark(physicCoords, 'физлица', 'Физическое лицо');
    });

    allButton.events.add('press', function () {
        removeMarks()
        document.querySelectorAll('.map-btn').forEach((el) => el.classList.remove('active'))
        document.querySelector('.map-btn-all').classList.add('active')
        putPlacemark(juristicCoords, 'юрлица', 'Юридическое лицо');
        putPlacemark(physicCoords, 'физлица', 'Физическое лицо');
    });




    // var fullscreenControl = new ymaps.control.Button({
    //     data: {
    //         iconType: 'expand', title: "Развернуть/свернуть карту",
    //         content: "показать всё"
    //     },
    //     options: {
    //         selectOnClick: false,
    //         float: "right",
    //         layout: ButtonLayout1
    //     }
    // });
    // fullscreenControl.events.add("press" ,function (){
    //     if (!fullscreenControl.isSelected())
    //         myMap.container.enterFullscreen();
    //     else
    //         myMap.container.exitFullscreen();
    // });
    // myMap.container.events.add("fullscreenenter" ,function() {
    //     fullscreenControl.data.set({iconType:"collapse"});
    //     fullscreenControl.select();
    //     console.log('fullscreenenter');
    // });
    // myMap.container.events.add("fullscreenexit" ,function() {
    //     fullscreenControl.data.set({iconType:"expand"});
    //     fullscreenControl.deselect();
    //     console.log('fullscreenexit');
    // });
    // myMap.controls.add(fullscreenControl, {
    //     position: {
    //         bottom: '24px',
    //         left: '24px'
    //     }
    // });
    // // Создаём макет содержимого.
    // MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    //     '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    // )

    function removeMarks() {
        myMap.geoObjects
            .removeAll()
    }

    function putPlacemark(coords, type, content) {
        coords.map((el, ind) => {
            myPlacemark = new ymaps.Placemark(el, {
                hintContent: type,
                balloonContent: content
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/mapMark.png',
                // Размеры метки.
                iconImageSize: [44, 44],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [0, 0]
            })
            myMap.geoObjects
                .add(myPlacemark)
        })
    }

    let juristicCoords = [[55.757932, 37.615805], [55.753309, 37.577504], [55.765048, 37.550795], [55.739460, 37.656561], [55.732913, 37.701081]]
    let physicCoords = [[55.761982, 37.644150], [55.765958, 37.653827], [55.778138, 37.591923], [55.769260, 37.693850], [55.783972, 37.527293]]


    putPlacemark(juristicCoords, 'юрлица', 'Юридическое лицо');
        putPlacemark(physicCoords, 'физлица', 'Физическое лицо');

    var FOCUS_ZOOM = 16;

    myMap.geoObjects.events.add('click', function(e) {
        var targetObject = e.get('target');

        if (targetObject.geometry.getType() === 'Point') {
            myMap.setCenter(targetObject.geometry.getCoordinates(), FOCUS_ZOOM, {
                checkZoomRange: true
            });
        }
    });
    }