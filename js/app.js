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

        $target.removeClass('active').find('img').remove();

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            const url = e.target.result;
            $target.addClass('active');
            $target.append(`<img src="${url}" alt="" />`);
        };

        reader.readAsDataURL(file);
    });

    $('.js-clear-file-input').on('click', function () {
        const target = $(this).data('target');
        const $target = $(target);

        if (!$target.length) return false;

        $target.val('').trigger('change');
    });
});

// countdown timer
// .js-countdown(data-countdown="2021-1-24 12:45:04")
$(function () {
    $(".js-countdown").each(function () {
        let countdown = $(this).data("countdown");

        if (!countdown) return;

        let endTime = new Date(countdown).getTime();
        let interval;

        const buildClock = () => {
            let thisTime = new Date().getTime();
            let duration = endTime - thisTime;

            if (duration < 0 && interval) {
                clearInterval(interval);
                return;
            }

            let seconds = Math.floor(duration / 1000 % 60);
            let minutes = Math.floor(duration / (1000 * 60) % 60);
            let hours = Math.floor(duration / (1000 * 60 * 60) % 24);
            let days = Math.floor(duration / (1000 * 60 * 60 * 24));
            let ampm = hours >= 12 ? "pm" : "am";

            // hours = hours * 12;

            seconds = ("0" + seconds).slice(-2);
            minutes = ("0" + minutes).slice(-2);
            hours = ("0" + hours).slice(-2);

            $(this).html(getCountDownTemplate({
                seconds,
                minutes,
                hours,
                days,
                ampm
            }));
        };

        buildClock();

        interval = setInterval(buildClock, 1000);
    });

    function getCountDownTemplate(timer = {}) {
        return `
<div class="countdown__item">
    <strong>${timer.days}</strong>
    <span">ngày</span>
</div>
<div class="countdown__item">
    <strong>${timer.hours}</strong>
    <span">giờ</span>
</div>
<div class="countdown__item">
    <strong>${timer.minutes}</strong>
    <span">phút</span>
</div>
<div class="countdown__item">
    <strong>${timer.seconds}</strong>
    <span">giây</span>
</div>
      `;
    }
});

$(function () {
    $('.js-open-modal-gift').on('click', function () {
        $('.md-gift').modal('show');
    });
});

$(function () {
    $('.js-input-cccd').on('change', function () {
        if (this.checked) {
            showCCCDField();
        } else {
            hideCCCDField();
        }
    });

    $('.js-input-shk, .js-input-passport').on('change', function () {
        if (!this.checked) {
            showCCCDField();
        } else {
            const text = $(this).hasClass('js-input-shk') ? 'Tải sổ hộ khẩu' : 'Tải hộ chiếu';
            const shk = $(this).hasClass('js-input-shk');
            hideCCCDField(text, shk);
        }
    });
});

function showCCCDField() {
    $('.js-show-back-photo').removeClass('hide-field');
    $('.js-back-upload-btn').removeClass('d-none');
    $('.js-front-upload-btn').find('span').text('Tải mặt trước');
    $('.js-show-label').removeClass('d-none');
    $('.js-label-number').text('Số CCCD:');
    $('.js-label-place').text('Nơi cấp CCCD');
    $('.js-label-date').text('Ngày cấp CCCD');
}

function hideCCCDField(btnText, shk) {
    if (shk) {
        $('.js-show-label').addClass('d-none');
        $('.js-label-number').text('Số hộ khẩu:');
    } else {
        $('.js-show-label').removeClass('d-none');
        $('.js-label-number').text('Số hộ chiếu:');
    }

    $('.js-show-back-photo').addClass('hide-field');
    $('.js-back-upload-btn').addClass('d-none');
    $('.js-front-upload-btn').find('span').text(btnText);
    $('.js-label-place').text('Nơi cấp hộ chiếu');
    $('.js-label-date').text('Ngày cấp hộ chiếu');
}

$(function () {
    $('.box').on('click', function () {
        $(this).toggleClass('active');
    });
});