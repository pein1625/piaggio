// menu toggle
$(function () {
    $(".menu-toggle").on("click", function () {
        var $toggle = $(this);

        $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

        $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

        $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

        $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

        $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
    });

    $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
        if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

        e.preventDefault();
    });
});

// navbar mobile toggle
$(function () {
    var $body = $("html, body");
    var $navbar = $(".js-navbar");
    var $navbarToggle = $(".js-navbar-toggle");

    $navbarToggle.on("click", function () {
        $navbarToggle.toggleClass("active");
        $navbar.toggleClass("is-show");
        $body.toggleClass("overflow-hidden");
    });
});

$(function () {
    var $moveTop = $(".btn-movetop");
    var $window = $(window);
    var $body = $("html");

    if (!$moveTop.length) return;

    $window.on("scroll", function () {
        if ($window.scrollTop() > 150) {
            $moveTop.addClass("show");

            return;
        }

        $moveTop.removeClass("show");
    });

    $moveTop.on("click", function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
});

$(function () {
    $elements = $('.js-select2');

    if (!$elements.length) return;

    $elements.each(function () {
        const data = {};
        const $el = $(this);

        if ($el.data('placeholder')) {
            data.placeholder = $el.data('placeholder');
        }

        $el.select2(data);
    });
});

$(function () {
    $('.js-toggle-show-password').on('click', function () {
        const $parent = $(this).closest('.input-group');
        const $input = $parent.find('input');

        $parent.toggleClass('active');

        if ($parent.hasClass('active')) {
            $input.attr('type', 'text');
        } else {
            $input.attr('type', 'password');
        }
    });
});

$(function () {
    $('.js-datepicker').datepicker();
});

$(function () {
    const $form = $('.js-register-form');
    const $modal = $('.md-confirm');

    if (!$form.length || !$modal.length) return;

    const $previewIdFront = $('.js-preview-id-front');
    const $previewIdBack = $('.js-preview-id-back');
    const $previewBill = $('.js-preview-bill');

    const $mdPreviewIdFront = $('.js-modal-preview-id-front');
    const $mdPreviewIdBack = $('.js-modal-preview-id-back');
    const $mdPreviewBill = $('.js-modal-preview-bill');

    $('.js-open-confirm-modal').on('click', function (e) {
        e.preventDefault();

        $form.serializeArray().forEach(({ name, value }) => {
            const $field = $modal.find(`.md-confirm__field[data-name="${name}"]`);

            if (!$field.length) return;

            $field.find('strong').text(value);
        });

        $mdPreviewIdFront.empty().append($previewIdFront.children().clone());
        $mdPreviewIdBack.empty().append($previewIdBack.children().clone());
        $mdPreviewBill.empty().append($previewBill.children().clone());

        $modal.modal('show');
    });

    $('.js-modal-confirm-submit').on('click', function () {
        $form.submit();
    });
});

$(function () {
    $('.js-file-input').on('change', function (event) {
        const target = $(this).data('preview');
        const $target = $(target);

        if (!$target.length) return;

        $target.empty();

        const file = event.target.files[0];

        console.log('file', file);

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            const url = e.target.result;
            $target.append(`<img src="${url}" alt="" />`);
        };

        reader.readAsDataURL(file);
    });
});