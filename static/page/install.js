var PAGE_INSTALL = {
  props: {
    width: LAY.take("../", "width"),
    html: LAY.markdown(README),
    textPadding:{
      top:LAY.take("/", "data.margin").half(),
      bottom:LAY.take("/", "data.margin").half(),
      left:LAY.take("/", "data.margin"),
      right:LAY.take("/", "data.margin")
    },
    textWrap: "normal",
    overflow: "auto"
  }
};
