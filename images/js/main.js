$(document).ready(function(){

    let slider = $(".catalog__slider");

    slider.slick({
        infinite: true, // если элементы заканчиваются - они повторяются заново
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false, // чтобы затемнялись отзывы
    });
});