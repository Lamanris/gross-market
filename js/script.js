var myMap;
ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        searchControlProvider: 'yandex#search',
        zoom: 12,
        controls:[]
    }),{

    },
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

    myMap.controls.add(zoomControl,{
        position: {
            bottom: '24px',
            right: '24px'
        }
    });


    ButtonLayout = ymaps.templateLayoutFactory.createClass([
        '<div title="{{ data.title }}" class="map-btn">',
        '<span class="map-btn__text">{{ data.content }}</span>',
        '</div>'
    ].join(''))

        button = new ymaps.control.Button({
            data: {
                content: "юрлица",
                title: "юрлица"
            },
            options: {
                layout: ButtonLayout
            }
        });

    myMap.controls.add(button, {
        position: {
            left: '24px',
            bottom: '126px'
        }
    });

    button2 = new ymaps.control.Button({
        data: {
            content: "физлица",
            title: "физлица"
        },
        options: {
            layout: ButtonLayout
        }
    });

    myMap.controls.add(button2,
        {
            position: {
                bottom: '75px',
                left: '24px'
            }});

    button.events.add('click', function () {
        alert('Вы нажали на кнопку!');
    });
    button2.events.add('click', function () {
        alert('Вы нажали на кнопку!');
    });

    fullscreenControl = new ymaps.control.FullscreenControl({
        options: {
            layout: ButtonLayout
        }
    });
    myMap.controls.add('fullscreenControl', {
        position: {
            bottom: '24px',
            left: '24px'
        }
    });



}