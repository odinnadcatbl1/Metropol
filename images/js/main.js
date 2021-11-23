$(document).ready(function () {
    // SVG-IMG
    if ($(".js-svg-img").length) {
        $(".js-svg-img").each(function () {
            const $img = $(this);
            const imgID = $img.attr("id");
            const imgClass = $img.attr("class");
            const imgURL = $img.attr("src");

            console.log(imgURL);

            $.get(
                imgURL,
                function (data) {
                    let $svg = $(data).find("svg");

                    console.log($svg);

                    if (typeof imgID !== "undefined") {
                        $svg = $svg.attr("id", imgID);
                    }
                    if (typeof imgClass !== "undefined") {
                        $svg = $svg.attr("class", imgClass + " replaced-svg");
                    }
                    $svg = $svg.removeAttr("xmlns:a");
                    if (
                        !$svg.attr("viewBox") &&
                        $svg.attr("height") &&
                        $svg.attr("width")
                    ) {
                        $svg.attr(
                            "viewBox",
                            "0 0 " +
                                $svg.attr("height") +
                                " " +
                                $svg.attr("width")
                        );
                    }
                    $img.replaceWith($svg);
                    $svg.addClass("ready");
                },
                "xml"
            );
        });
    }

    // закрепленная шапка
    const header = $(".jsHeader"); // селектор jsHeader
    let scrollPos = $(window).scrollTop(); // позиция скролла от верха окна

    // чтобы следить за событием скролла, загрузки и изменения размеров окна страницы:
    $(window).on("scroll load resize", function () {
        headerHeight = header.innerHeight();
        scrollPos = $(this).scrollTop();

        if (scrollPos > headerHeight) {
            header.addClass("fixed"); // добавляем класс fixed
        } else {
            header.removeClass("fixed"); // добавляем класс fixed
        }
    });

    // слайдеры
    const catalogSlider = $(".js-catalog__slider");

    catalogSlider.slick({
        infinite: true, // если элементы заканчиваются - они повторяются заново
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false, // чтобы затемнялись отзывы
        arrows: true,
    });

    const reviewsSlider = $(".js-reviews__slider");

    reviewsSlider.slick({
        infinite: true, // если элементы заканчиваются - они повторяются заново
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false, // чтобы затемнялись отзывы
        arrows: true,
        dots: true,
    });

    // выравнивание по высоте
    $(".js-descr-height").matchHeight();

    // выпадающие блоки
    $(document).on("click", ".js-filter-btn", function () {
        const filterParent = $(this).parents(
            '.js-filter-parent[data-parent="' + $(this).data("btn") + '"]'
        );

        $(this).toggleClass("active");
        filterParent
            .find(
                '.js-filter-content[data-child="' + $(this).data("btn") + '"]'
            )
            .slideToggle(function () {
                $(this).toggleClass("active");
            });

        return false;
    });

    // Параллакс
    $.fn.exists = function (callback) {
        const args = [].slice.call(arguments, 1);
        if (this.length && callback) {
            callback.call(this, args);
        }
        return this;
    };
    $(".js-parallax").exists(function () {
        if ($(window).width() > 767) {
            let _parallax = $(this);
            function _parallax_run() {
                _parallax.each(function () {
                    this.style.backgroundPosition =
                        "50% " +
                        (($(this).offset().top -
                            (window.pageYOffset ||
                                document.documentElement.scrollTop)) /
                            2) *
                            1 +
                        "px";
                });
            }
            S;
            $(window).scroll(function () {
                _parallax_run();
            });

            _parallax_run();
        }
    });

    const rangeSlider = document.querySelector(".js-filter-price__slider");
    const input1 = document.querySelector("#price-input-1");
    const input2 = document.querySelector("#price-input-2");
    const inputs = [input1, input2];

    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            start: [0, 999999],
            connect: true,
            step: 1,
            range: {
                min: 0,
                max: 9999,
            },
        });
    }

    const setRangeSlider = (i, value) => {
        let arr = [null, null]; // положим пустые элементы, чтобы их потом менять
        arr[i] = value;
        rangeSlider.noUiSlider.set(arr);
    };

    //values - от первого ползунка до второго ползунка
    //handle - сам ползунок
    rangeSlider.noUiSlider.on("update", function (values, handle) {
        inputs[handle].value = Math.round(values[handle]);
    });

    inputs.forEach((el, index) => {
        $(el).on("change", (e) => {
            setRangeSlider(index, e.currentTarget.value);
        });
    });
});
