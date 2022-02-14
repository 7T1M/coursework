export function get() {
  var test = {
    chart: {
      id: "chartID",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      defaultLocale: "ru",
      locales: [
        {
          name: "ru",
          options: {
            months: [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь",
            ],
            shortMonths: [
              "Янв.",
              "Фев.",
              "Мар.",
              "Апр.",
              "Май",
              "Июн.",
              "Июл.",
              "Авг.",
              "Сен.",
              "Окт.",
              "Ноя.",
              "Дек",
            ],
            days: [
              "Воскресенье",
              "Понедельник",
              "Вторник",
              "Среда",
              "Четверг",
              "Пятница",
              "Суббота",
            ],
            shortDays: ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."],
            toolbar: {
              download: "Скачать SVG",
              selection: "Выбор",
              selectionZoom: "Выбор зума",
              zoomIn: "Приблизить",
              zoomOut: "Отдалить",
              pan: "Panning",
              reset: "Сброс",
            },
          },
        },
      ],
    },
  };
  test.legend = {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "bottom",
    horizontalAlign: "center",
    floating: false,
    fontSize: "14px",
    fontFamily: "Helvetica, Arial",
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: undefined,
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: "#fff",
      fillColors: undefined,
      radius: 12,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  };

  test.colors = ["#26CD58", "#FDDD36", "#E2534A", "transparent"];

  test.xaxis = {
    type: "datetime",
  };

  test.yaxis = {
    labels: {
      formatter: function (val) {
        if (val) {
          return val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        }
      },
    },
  };

  return test;
}
