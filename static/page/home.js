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
      textColor: LAY.take("/", "data.lightGrayTheme"),
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
            vertical: {gap: LAY.take("/", "data.margin").multiply(2)}
          },
          rows: [
            {
              title:'Hardware Accelerated',
              icon: "1b3",
              subtext: "LAY uses the CSS transform primitive to position each element. " +
              "Furthermore, LAY offers non-hardware accelerated CSS 'left'/'top' as an alternative. " +
              "For legacy browsers without support for hardware acceleration, " +
              "LAY will gracefully degrade to using 'left'/'top' positioning."
            },
            {
              title:'Constraint Based',
              icon: "247",
              subtext: "LAY provides a system of creating constraints within elements " +
              "of the application. This ensures a more maintainable and scalable interface " +
              "as writing the application automatically follows a DRY (Do not Repeat Yourself) principle."
            },
            {
              title: "Single Object Declaration",
              icon: "0a6",
              subtext: "LAY applications are specified by following a declarative paradigm " +
              "as opposed to an imperative paradigm. Furthermore, the entire declaration of " +
              "the application is specified within a single nested object."
            }
          ]
        },
        props: {
          width: LAY.take("../", "width").divide(3),
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
              textSize: LAY.take("/", "data.margin").multiply(2),
              textLineHeight: 1
            },
            transition: {
              "scaleX": {
                type: "spring"
              },
              "scaleY": {
                type: "spring"
              }
            },
            states: {
              "unloaded": {
                onlyif: LAY.take("@", "data.loaded").not(),
                props: {
                  scaleX: 0.5,
                  scaleY: 0.5
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
              textColor: LAY.take("/", "data.lightTheme"),
              text: LAY.take("~/", "row.title"),
              textAlign: "center",
              //textWeight: "bold",
              //textVariant: "small-caps"
              //textTransform: "uppercase"
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
            //textColor: LAY.take("/", "data.grayTheme"),
            textWrap: "normal",
            textPadding: {
              left:LAY.take("/", "data.margin"),
              right: LAY.take("/", "data.margin")
            }
          },
          transition: {
            "shiftY": {
              type: "ease",
              duration: LAY.take("~", "$i").multiply(360)
            }
          },
          states: {
            "unloaded": {
              onlyif: LAY.take("@", "data.loaded").not(),
              props: {
                shiftY: 20
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
  },
  "GettingStarted": {
    props: {
      top: LAY.take("../Features", "bottom"),
      width: LAY.take("/", "width"),
      //backgroundColor: LAY.take("/", "data.lightGrayTheme"),
      borderTop: {style: "solid", width:1, color: LAY.take("/", "data.lightTheme")},
      filters: [
        {type:"blur", value:0}
      ],
      html: LAY.markdown(README),
      textPadding:{
        top:LAY.take("/", "data.margin").half(),
        bottom:LAY.take("/", "data.margin").half(),
        left:LAY.take("/", "data.margin"),
        right:LAY.take("/", "data.margin")
      },
      textWrap: "normal",
      overflow: "auto"
    },
    transition: {
      filters1Value: {
        type: "ease",
        duration: 600
      }
    },
    data: {
      loaded: false
    },
    states: {
      "unloaded": {
        onlyif: ((LAY.take("@../", "$scrolledY").plus(320)).lt(
          LAY.take("", "top")).and(
            LAY.take("", "data.loaded").not())
        ),
        props: {
          filters: [
            {type:"blur", value:6}
          ]
        },
        uninstall: function () {
          this.data("loaded", true);
        }
      }
    }
  }
};
