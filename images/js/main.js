$(document).ready(function(){

    let catalogSlider = $(".catalog__slider");

    catalogSlider.slick({
        infinite: true, // если элементы заканчиваются - они повторяются заново
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false, // чтобы затемнялись отзывы
        arrows: true,
    });

    let reviewsSlider = $(".reviews__slider");

    reviewsSlider.slick({
        infinite: true, // если элементы заканчиваются - они повторяются заново
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false, // чтобы затемнялись отзывы
        arrows: true,
        dots: true,
    });



});