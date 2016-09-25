var PAGE_HOME = {
  $page: true,
  props: {
    width: LAY.take("../", "width")
  },
  $load: function () {
    var self = this;
    setTimeout(function () {
      self.data("loaded", true);
    }, 100);
  },
  data: {
    loaded: false
  },
  "Description": {
    props: {
      width: LAY.take("/", "width"),
      backgroundColor: LAY.take("/", "data.darkTheme"),
      textColor: LAY.take("/", "data.lightTheme"),
      textSize: LAY.take("/", "data.bigFontSize"),
      textWrap: "normal",
      text: '"A UI framework that lets you declare your application with a single object"',
      textAlign: "center",
      textLetterSpacing: 2,
      textPadding: {
        top:LAY.take("/", "data.margin").divide(2),
        bottom: LAY.take("/", "data.margin").divide(2),
        left: LAY.take("/", "data.margin"),
        right: LAY.take("/", "data.margin")
      },
      scaleX: LAY.take(1).plus(
        LAY.take("@../", "$scrolledY").divide(1000).min(1.5))
    },
    transition: {shiftY:{type:"ease", duration:1200}},
    states: {
      "unloaded": {
        onlyif: LAY.take("@", "data.loaded").not(),
        props: {
          shiftY: LAY.take("", "height").negative()
        }
      },
      "mobile": {
        onlyif: LAY.take("/", "data.isMobile"),
        props: {
          textPadding: LAY.take("/", "data.margin")
        }
      }
    }
  },
  "Features": {
    props:{
      top: LAY.take("../Description", "bottom"),
      height: LAY.take("", "$naturalHeight").plus(
        LAY.take("/", "data.margin")
      ),
      width: LAY.take('/', 'width')
    },
    "FeaturesInner": {
      props: {
        centerY: 0,
        width: LAY.take("../", "width"),
      },
      "Message": {
        many: {
          formation: LAY.take(function (isMobile) {
            return isMobile ? "vertical": "horizontal";
          }).fn(LAY.take("/", "data.isMobile")),
          fargs: {
            vertical: {gap: LAY.take("/", "data.margin").double()}
          },
          rows: [
            {
              title:'Hardware Accelerated',
              icon: "1b3",
              subtext: "The CSS3 transform primitives position each element. " +
              "(Legacy Browsers automatically fallback to top/left positioning)"
            },
            {
              title:'Constraint Based',
              icon: "248",
              subtext: "Turing-complete constraints allow you to create " +
              "interfaces declaratively and also display your data in true MVC form."
            },
            {
              title: 'Truly Flexible',
              icon: "0a6",
              subtext: "Use the 'spring' animation, or " +
              "position elements in a 'circular' formation, " +
              "or write your own custom animations and formations."
            }
          ]
        },
        props: {
          width: LAY.take("../", "width").divide(LAY.take("many", "rows").length()),
          textAlign: "center",
        },
        states: {
          "mobile": {
            onlyif: LAY.take("/", "data.isMobile"),
            props: {
              width: LAY.take("../", "width")
            }
          }
        },
        "TitleAndIcon": {
          props: {
            centerX: 0
          },
          states: {
            "mobile": {
              onlyif: LAY.take("/", "data.isMobile"),
              props: {
                left: LAY.take("/", "data.margin")
              }
            }
          },
          "Icon": {
            props: {
              centerX: 0,
              textFamily: "FontAwesome",
              html: LAY.take("&#xf%s;").format(
                LAY.take("~/", "row.icon")),
              textSize: LAY.take("/", "data.margin").double(),
              textLineHeight: 1,
              textColor: LAY.take("/", "data.darkTheme")
            },
            transition: {
              "scaleX": {
                type: "spring",
                tension: 10000,
                friction: 50
              },
              "scaleY": {
                type: "spring",
                tension: 10000,
                friction: 50
              }
            },
            states: {
              "unloaded": {
                onlyif: LAY.take("@", "data.loaded").not(),
                props: {
                  scaleX: .7,
                  scaleY: .7
                },
              },
              "mobile": {
                onlyif: LAY.take("/", "data.isMobile"),
                props: {
                  width: LAY.take("", "$naturalWidth"),
                  left: 0
                }
              }
            }
          },
          "Title": {
            props: {
              top: LAY.take("../Icon", "bottom").plus(
                LAY.take("/", "data.margin").divide(2)
              ),
              text: LAY.take("~/", "row.title"),
              textAlign: "center",
              //textWeight:"lighter",
              textSize: 24
            },
            states: {
              "mobile": {
                onlyif: LAY.take("/", "data.isMobile"),
                props: {
                  top: 0,
                  centerY: 0,
                  left: LAY.take("../Icon", "right").plus(10)
                }
              }
            }
          }
        },
        "Subtext": {
          props: {
            top: LAY.take("../TitleAndIcon", "bottom" ).plus(
              LAY.take("/", "data.margin").divide(4)
            ),
            width: LAY.take("../", "width"),
            text: LAY.take("../", "row.subtext"),
            textWrap: "normal",
            textPadding: {
              left:LAY.take("/", "data.margin"),
              right: LAY.take("/", "data.margin")
            },
            textWeight:"lighter"
          },
          transition: {
            "opacity": {
              type: "ease",
              //duration: 1000
              duration: LAY.take("~", "$i").multiply(1080)
            }
          },
          states: {
            "unloaded": {
              onlyif: LAY.take("@", "data.loaded").not(),
              props: {
                opacity: 0.1
                //shiftY: 20
              },
            },
            "mobile": {
              onlyif: LAY.take("/", "data.isMobile"),
              props: {
                textAlign: "left",
              }
            }
          }
        }
      }
    }
  }
};
