var PAGE_API = {
  $page: true,
  data: {
    content: "",
    emptyPage: LAY.take("/", "$pathname").eq("/api")
  },
  props: {
    width: LAY.take("../", "width"),
    height: LAY.take("../", "height")
  },
  "ApiTree": {
    props: {
      width: 300,
      height: LAY.take("../", "height"),
      backgroundColor: LAY.take("/", "data.lightGrayTheme"),
      overflowY: "auto",
      borderRight: {style:"solid", width:1,
        color:LAY.take("/", "data.lightGrayTheme")}
    },
    states: {
      "mobile": {
        onlyif: LAY.take("/", "data.isMobile"),
        props: {
          height: LAY.take("", "$naturalHeight"),
          width: LAY.take("../", "width"),
          borderBottom: {style:"solid", width:1,
            color:LAY.take("/", "data.lightGrayTheme")},
          borderRightWidth: 0,
          overflowY: "visible"
        }
      }
    },
    "_Tree": {
      "Node": {
        many: {
          rows: LAY.take("../", "data.rows"),
        },
        props: {
          cursor: "pointer",
          userSelect: "none",
          width: LAY.take("../", "width"),
          backgroundColor: LAY.color("white")
        },
        data: {
          isOpen: LAY.take("@", "data.emptyPage"),
          isLink: LAY.take("", "row.sub").length().eq(0)
        },
        "Title": {
          exist: LAY.take("~/", "data.isLink").not(),
          props: {
            text: LAY.take("~/", "row.title"),
            textPadding: 10,
            width: LAY.take("~/", "width"),
            borderBottom: {style:"solid", width:1,
              color:LAY.take("/", "data.lightGrayTheme")}
          },
          when: {
            click: function () {
              this.level("~/").data("isOpen",
                !this.level("~/").attr("data.isOpen") )
            }
          }
        },
        "Link": {
          exist: LAY.take("~/", "data.isLink"),
          props: {
            width: LAY.take("../", "width"),
            text: LAY.take("~/", "row.title"),
            textColor: LAY.take("/", "data.purpleTheme"),
            textPadding: 3,
            link: LAY.take("~/../", "data.filePath").concat("/").concat(
              LAY.take("~/", "row.sysname")
            )
          },
          states: {
            "hovering": {
              onlyif: LAY.take("", "$hovering"),
              props: {
                backgroundColor: LAY.take("/", "data.orangeTheme")
              }
            },
            "current": {
              onlyif: LAY.take("/", "$pathname").eq(LAY.take("", "link")),
              props: {
                backgroundColor: LAY.take("/", "data.orangeTheme"),
                textColor: LAY.take("/", "data.purpleTheme"),
                text: LAY.take("> ").concat(LAY.take("","root.text")),
              },
              install: function () {
                this.level("@").data("content",
                  this.level("~/").attr("row.content"));
                var parentLevel = this.level("../");
                while ( !parentLevel.path().endsWith("API") ) {
                  parentLevel = parentLevel.parent();
                  if ( parentLevel.path().match(/Node:[\d+]$/)) {
                    parentLevel.data("isOpen", true);
                  }
                }
              }
            }
          }
        },
        "SubTree": {
          exist: LAY.take("~/", "data.isLink").not(),
          $inherit: "@ApiTree/_Tree",
          data: {
            rows: LAY.take("~/", "row.sub"),
            filePath: LAY.take("~/../", "data.filePath").concat("/").concat(
              LAY.take("~/", "row.sysname"))
          },
          props: {
            display: LAY.take("~/", "data.isOpen"),
            top: LAY.take("../Title", "bottom"),
            width: LAY.take("../", "width"),
            textIndent: LAY.take("../", "left").plus(16)
          }
        }
      }
    },
    "Tree": {
      $inherit: "../_Tree",
      data: {
        rows: API,
        filePath: "/api"
      },
      props: {
        width: LAY.take("../", "width")
      }
    }
  },
  "View": {
    props: {
      width: LAY.take("../", "width").minus(LAY.take("../ApiTree", "width")),
      height: LAY.take("../", "height"),
      left: LAY.take("../ApiTree", "right"),
      overflowY: "auto",
      html: LAY.take("@", "data.content"),
      textPadding: LAY.take("/", "data.margin"),
      textPaddingTop: 0,
      textWrap: "normal"
    },
    states: {
      "mobile": {
        onlyif: LAY.take("/", "data.isMobile"),
        props: {
          top: LAY.take("../ApiTree", "bottom"),
          left: 0,
          width: LAY.take("../", "width"),
          height: LAY.take("", "$naturalHeight")
        }
      },
      "empty": {
        onlyif: LAY.take("@", "data.emptyPage" ),
        props: {
          textPaddingTop: LAY.take("/", "data.margin"),
          html: "Welcome to the API, use the navigation on the left to read the API."
        }
      },
      "unfilled": {
        onlyif: LAY.take("", "empty.onlyif").not().and(
          LAY.take("@", "data.content").eq("")
        ),
        props: {
          textPaddingTop: LAY.take("/", "data.margin"),
          html: "This documentation for this subsection is in the process of being written, other subsections would be available for viewing."
        }
      }
    }
  }
};
