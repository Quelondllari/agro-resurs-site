const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};

class Site {
    /**
     * * Проверка элемента или селектора на пустоту
     * @param {string | Object} el
     */
    static empty(el) {
        if (typeof el == "string") {
            el = document.querySelector(el);
        }
        if (!el || typeof el === "undefined") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Функция инициализации слайдера с библиотеки SplideJS.
     * @param {(Object|String)} selector - JS Объект или селектор на слайдер.
     * @param {Object} options - Опции для инициализируемого слайдера.
     * @param {Object} media - JS объект для инициализации слайдера по media.
     * @param {Number} media.min_media - Аналог \@media(min-width).
     * @param {Number} media.max_media - Аналог \@media(max-width).
     * @param {Object} media.options - Медиа опции для инициализации слайдера по media.
     * @param {Object}sync_obj - JS Объект готового слайдера для синхронизации с инициализируемым.
     * @return {(Object|null)} Возвращение готового объекта слайдера для запуска.
     */
    static initSplideSliders(selector, options, media, sync_obj) {
        let el = selector;
        if (typeof selector !== "object") {
            el = document.querySelector(selector);
        }
        if (el && typeof el !== "undefined") {
            if (media && typeof media === "object") {
                if (
                    window.innerWidth > media.min_media ||
                    window.innerWidth < media.max_media
                ) {
                    if (window.innerWidth > media.min_media)
                        media.options = options;
                    let splide_el = new Splide(el, media.options);
                    if (sync_obj) splide_el.sync(sync_obj);
                    return splide_el;
                } else {
                    let splide_el = new Splide(el, options);
                    if (sync_obj) splide_el.sync(sync_obj);
                    return splide_el;
                }
            } else {
                let splide_el = new Splide(el, options);
                if (sync_obj) splide_el.sync(sync_obj);
                return splide_el;
            }
        } else {
            return null;
        }
    }

    /**
     * Функция инициализации gLightBox
     */
    static initGlightbox() {
        let glightbox = GLightbox({
            touchNavigation: true,
            loop: false,
            autoplayVideos: true,
        });
    }

    /**
     * Функция открытия/закрытия табов
     */
    static initToggleTabs(selector) {
        let buttons = document.querySelectorAll(selector);
        // console.log(typeof buttons);
        if (!this.empty(buttons)) {
            buttons.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    btn.classList.toggle("--is_active");
                    let tabBody = document.querySelector(
                        btn.getAttribute("data-target-block")
                    );
                    if (!this.empty(tabBody)) {
                        if (tabBody.style.maxHeight) {
                            tabBody.style.maxHeight = null;
                            tabBody.classList.remove("--is_open");
                            btn.querySelector("p").textContent =
                                "Читать полностью";
                        } else {
                            tabBody.classList.add("--is_open");
                            tabBody.style.maxHeight = `${tabBody.scrollHeight}px`;
                            btn.querySelector("p").textContent = "Скрыть";
                        }
                    }
                });
            });
        }
    }

    static initLazyLoadImages() {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0 || entry.isIntersecting) {
                    const image = entry.target;
                    observer.unobserve(image);

                    if (image.hasAttribute("src")) {
                        // Image has been loaded already
                        return;
                    }

                    // Image has not been loaded so load it
                    const sourceUrl = image.getAttribute("data-src");
                    image.setAttribute("src", sourceUrl);

                    image.onload = () => {
                        // Do stuff
                    };

                    // Removing the observer
                    observer.unobserve(image);
                }
            });
        });

        document.querySelectorAll(".lazyload").forEach((el) => {
            observer.observe(el);
        });
    }

    static initTooltips() {
        let tooltipElement;

        document.addEventListener("mouseover", function (e) {
            let target = e.target;

            if (!target.hasAttribute("data-tooltip-text"))
                target = target.closest("*[data-tooltip-text]");

            if (target) {
                let tooltipText = target.getAttribute("data-tooltip-text");

                tooltipElement = document.createElement("div");
                tooltipElement.className = "tooltip";
                tooltipElement.innerHTML = tooltipText;
                document.body.append(tooltipElement);

                let coordinates = target.getBoundingClientRect();
                let targetOffsetWidth = target.offsetWidth;
                let left = 0;
                if (targetOffsetWidth == undefined) {
                    targetOffsetWidth = 0;
                    left = coordinates.left;
                } else {
                    left =
                        coordinates.left +
                        (targetOffsetWidth - tooltipElement.offsetWidth) / 2;
                }

                if (left < 0) left = 0;

                let top = coordinates.top - tooltipElement.offsetHeight - 5;

                if (top < 0) top = coordinates.top + target.offsetHeight + 5;

                tooltipElement.style.left = `${left}px`;
                tooltipElement.style.top = `${top}px`;
            }
        });

        ["mouseout", "scroll"].forEach((event) => {
            document.addEventListener(event, function (e) {
                if (tooltipElement) {
                    tooltipElement.remove();
                    tooltipElement = null;
                }
            });
        });
    }

    static initImageFigureWrapper(selector) {
        let elements = document.querySelectorAll(selector);
        if (!this.empty(elements)) {
            elements.forEach((element) => {
                if (this.empty(element.closest("figure"))) {
                    let figure = document.createElement("figure");
                    let altText = element.getAttribute("alt");
                    let image = element.cloneNode();
                    let glightbox = document.createElement("a");
                    glightbox.className = "glightbox";
                    glightbox.href = image.src;

                    glightbox.appendChild(image);

                    figure.appendChild(glightbox);
                    // figure.appendChild(image)
                    if (altText) {
                        let figcaption = document.createElement("figcaption");
                        figcaption.textContent = altText;
                        figure.appendChild(figcaption);
                    }
                    element.insertAdjacentElement("afterend", figure);
                    element.remove();
                }
            });
        }
    }

    static debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait || 200);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    static initCorrectVh() {
        let vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener(
            "resize",
            Site.debounce(() => {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }, 400)
        );
    }

    static initHeaderMove() {
        // Function for check and transform header
        const slicky = function (header, main, padding) {
            let currentScrollPos = window.pageYOffset;
            if (window.scrollY > 70) {
                main.style.paddingTop = padding + "px";
                header.classList.add("--is_fixed");
            }
            else {
                main.style.paddingTop = `0px`;
                header.classList.remove("--is_fixed");
            }
            // if (window.location.pathname != "/" && window.scrollY < 90) {
            // header.classList.add("--is_fixed");
            // }
            prevScrollPos = currentScrollPos;
        };

        // Main Element
        let header = document.querySelector(".header");

        // Set height variable
        // header.style.cssText = `--headerHeight: ${header.scrollHeight}px`;

        // Check header
        if (this.empty(header)) return;

        // Set header height on Main tag for padding in other pages
        let mainTag = document.querySelector(".main");
        // if (window.location.pathname != "/")
        // mainTag.style.setProperty("--hHeight", `${header.offsetHeight}px`);

        let padding = 0;
        setTimeout(() => { padding = header.offsetHeight }, 200);

        window.addEventListener("resize", function () {
            padding = header.offsetHeight;
        })

        // Set prev position
        let prevScrollPos = window.pageYOffset;

        // Active first time function
        slicky(header, mainTag, padding);

        //Events
        window.addEventListener("scroll", function () {
            // padding = header.offsetHeight
            slicky(header, mainTag, padding);
        });
    }

    static initMoveTop() {
        let buttons = document.querySelectorAll("*[data-scroll-top]")
        if (!this.empty(buttons))
            buttons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })
                })
            })
    }

    static initMobileMenu() {
        let buttons = document.querySelectorAll("*[data-mm-toggle]")
        if (!this.empty(buttons)) {
            buttons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault()
                    let mmToggle = button.dataset.mmToggle
                    let mobileMenu = document.querySelector(".mobile-menu")

                    if (mmToggle) {
                        switch (mmToggle) {
                            case "close":
                                mobileMenu.classList.remove("--is_show")
                                mobileMenu.classList.add("--is_fade")
                                document.documentElement.classList.remove("--mm_opened")
                                break;
                            case "open":
                                mobileMenu.classList.add("--is_show")
                                mobileMenu.classList.remove("--is_fade")
                                document.documentElement.classList.add("--mm_opened")
                                break;
                        }
                    }
                })
            })

            document.body.addEventListener('click', event => {
                let el = event ? event.target : window.event.srcElement;
                if (el.classList.contains('mobile-menu') && el.classList.contains('--is_show')) {
                    el.classList.remove('--is_show')
                    el.classList.add('--is_fade')
                    document.documentElement.classList.remove('--mm_opened')
                }
            });
        }
    }

    static initHeaderCatalog() {
        let button = document.querySelector(".header__catalog-btn")
        if (this.empty(button)) return
        let parentElement = button.parentElement

        button.addEventListener("click", (e) => {
            e.preventDefault();

            if (parentElement.classList.contains("--is_active")) {
                parentElement.classList.remove("--is_active")
            } else {
                parentElement.classList.add("--is_active")
            }
        })

        window.addEventListener("click", (e) => {
            if (e.target.closest(`.${parentElement.className.split(" ")}`) !== parentElement && parentElement.classList.contains("--is_active")) {
                parentElement.classList.remove("--is_active")
            }
        })
    }

    static initModals(selector) {
        let btns = document.querySelectorAll(selector);
        if (btns && typeof btns !== false) {
            btns.forEach(btn => {
                btn.addEventListener('click', event => {
                    event.preventDefault();
                    let mdl_target = btn.getAttribute('data-modal');
                    if (mdl_target != null) {
                        let subject = btn.getAttribute('data-modal_subject');
                        mdl_target = document.querySelector(mdl_target);
                        if (subject) {
                            let mdl_sub = mdl_target.querySelector('input[name="cms_field[Тип заявки]"]');
                            if (mdl_sub) {
                                mdl_sub.value = subject;
                            }
                        }

                        let title = btn.getAttribute('data-modal__title');
                        if (title) {
                            let mdl_title = mdl_target.querySelector('.modal__title');
                            if (mdl_title) mdl_title.textContent = title;
                        }

                        mdl_target.classList.add('--is_show');
                        mdl_target.classList.remove('--is_fade');
                        document.documentElement.classList.add('--modal_showed')
                    }
                });
            });
        }
        let mdl_close = document.querySelectorAll('*[data-modal-close]');
        if (mdl_close && typeof mdl_close !== false) {
            mdl_close.forEach(mlc => {
                mlc.addEventListener('click', e => {
                    e.preventDefault();
                    let _mdl = mlc.closest('.modal');

                    let _mdls = document.querySelectorAll('.modal.--is_show')

                    if (_mdls.length < 2)
                        document.documentElement.classList.remove('--modal_showed')

                    _mdl.classList.remove('--is_show');
                    _mdl.classList.add('--is_fade');

                });
            });
        }
        document.body.addEventListener('click', event => {
            let el = event ? event.target : window.event.srcElement;
            if (el.classList.contains('modal') && el.classList.contains('--is_show')) {
                el.classList.remove('--is_show')
                el.classList.add('--is_fade')

                let swd_mdls = document.querySelectorAll('.modal.--is_show');
                // swd_mdls[swd_mdls.length - 1].classList.remove('--is__show')
                // swd_mdls[swd_mdls.length - 1].classList.add('--is__fade')
                if (swd_mdls.length < 2)
                    document.documentElement.classList.remove('--modal_showed')
            }
        });
    }

    static initFormCounter(){
        let buttons = document.querySelectorAll('*[data-form-counter="plus"],*[data-form-counter="minus"]')
        if (this.empty(buttons)) return

        buttons.forEach((button) => {
            let input = button.parentElement.querySelector('input[data-form-counter="field"')
            // input.value = 0

            button.addEventListener("click", (e) => {
                if (Site.empty(input)) return;
                
                let action = button.dataset.formCounter
                input.value = (isNaN(+input.value * 1)) ? 0: input.value;
                switch(action){
                    case "minus":
                        input.value = ((+input.value - 1) < 0) ? 1 : (+input.value - 1)
                    break;
                    case "plus":
                        input.value = +input.value + 1
                    break;
                }
                
                if ("createEvent" in document) {
                    let inputEvent = document.createEvent("HTMLEvents")
                    inputEvent.initEvent("input", false, true)
                    input.dispatchEvent(inputEvent)
                } else {
                    input.fireEvent("input")
                }
            })
        })
    }
}

ready(() => {
    Site.initCorrectVh()
    Site.initHeaderCatalog();
    // Site.initGlightbox();
    Site.initHeaderMove();
    // Включение функционала раскрытия/скрытия текста
    Site.initToggleTabs(".text__toggle");
    // Site.initMoveTop();
    Site.initMobileMenu();
    Site.initModals('*[data-modal]');
    // Site.initFormCounter();
    // Site.initTooltips()

    /*
        [Отложенная яндекс карта]
    */
    var section_contacts = document.querySelector(".default__map");
    if (section_contacts == null) {
        section_contacts = document.querySelector(".contacts_page");
    }
    var ymapInit = function () {
        if (typeof ymaps === "undefined") {
            return;
        }

        ymaps.ready(function () {
            var ymap = document.querySelector("#ya_map");
            var coordinates = ymap.getAttribute("data-coordinates");
            var address = ymap.getAttribute("data-address");
            var center = ymap.getAttribute("data-center");

            if (window.innerWidth < 768) center = coordinates;
            if (!center) center = coordinates;
            var myMap = new ymaps.Map(
                ymap,
                {
                    center: center.split(","),
                    zoom: 17,
                    controls: ["zoomControl"],
                },
                {
                    searchControlProvider: "yandex#search",
                }
            ),
                myGeoObject = new ymaps.GeoObject(
                    {
                        geometry: {
                            type: "Point",
                            coordinates: coordinates.split(","),
                        },
                        properties: {
                            hintContent: address,
                            balloonContent: address,
                        },
                    },
                    {
                        // preset: 'islands#brownPocketIcon'
                        iconLayout: "default#image",
                        iconImageHref: "/img/icons/save_marker.png",
                        iconImageSize: [40, 55],
                        iconImageOffset: [-15, -60],
                    }
                );

            myMap.behaviors.disable("scroll");
            myMap.geoObjects.add(myGeoObject);
        });
    };

    var ymapLoad = function () {
        var script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        var body = document.querySelector("body");
        body.appendChild(script);
        script.addEventListener("load", ymapInit);
    };

    var checkYmapInit = function () {
        var section_contacts_top = section_contacts.getBoundingClientRect().top;
        var scroll_top = window.pageYOffset;
        var section_contacts_offset_top = scroll_top + section_contacts_top;
        // console.log(section_contacts_top); console.log(scroll_top); console.log(section_contacts_offset_top);
        if (scroll_top + window.innerHeight > section_contacts_offset_top) {
            ymapLoad();
            window.removeEventListener("scroll", checkYmapInit);
        }
    };

    if (section_contacts != null) {
        window.addEventListener("scroll", checkYmapInit);
        checkYmapInit();
    }
});
