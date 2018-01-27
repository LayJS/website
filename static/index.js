

LAY.formation("splitHorizontal", {width: 0,centerGap: 0, gap:0}, function (f , filteredLevel, filteredLevelS, fargs) {
	var isFirstHalf = f <= filteredLevelS.length/2;
	if (isFirstHalf) {
		return [LAY.take(filteredLevelS[f - 2].path(), "right").add(
					fargs.gap), undefined];
	} else {
		if (f === filteredLevelS.length) {
			return [LAY.take(fargs.width).minus(LAY.take("", "width")), undefined]
		} else {
			return [
				LAY.take(filteredLevelS[f].path(), "left").minus(
					LAY.take("", "width").plus(fargs.gap)), undefined];
		}
	}
});
LAY.run({
	data: {
		darkTheme: LAY.rgb(40,40,40),
		lightTheme: LAY.rgb(220,220,220),
		grayTheme: LAY.rgb(120,120,120),
		colorTheme: LAY.color("yellow"),
		mobileWidth: 720,
		isMobileMenuInvoked: false,
		bigFontSize: LAY.take(function (isMobile) {
				return isMobile ? 15 : 22;
			}).fn(LAY.take("", "data.isMobile")),
		isMobile: LAY.take("", "width").lt(
			LAY.take("", "data.mobileWidth")),
		headingFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
		margin: LAY.take("", "width").percent(3),
		page: ""
	},
  props: {
		textFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    textWeight:"300",
		textLineHeight: 1.2,
		textSize: 17,
		cursor: "default",
		textColor: LAY.take("/", "data.darkTheme")
  },
	$extfonts: ["FontAwesome"],
	css:
		LAY.take("pre {box-sizing:border-box;white-space:pre-wrap;word-wrap:break-word;width:100%; background:#{darkTheme};color:white;padding:10px}" +
		" a { text-decoration:underline; color:inherit; } a:visited { opacity:0.8; }" +
		" h1,h2,h3,h4,h5,h6 { font-family: #{headingFont} }").format(
			{
				lightTheme: LAY.take("", "data.lightTheme"),
				darkTheme: LAY.take("", "data.darkTheme"),
				colorTheme: LAY.take("", "data.colorTheme"),
				darkenedColorTheme: LAY.take("", "data.colorTheme").colorDarken(0.2),
				headingFont: LAY.take("", "data.headingFont")
			}
		),
	states: {
		"mobile": {
			onlyif: LAY.take("/", "data.isMobile"),
			props: {
				textSize: 15
			}
		}
	},
  "Header": {
  	props: {
			height: LAY.take("/", "data.margin").multiply(2.4),
  		width: LAY.take('/', 'width'),
			backgroundImage: LAY.take("repeating-linear-gradient(310deg, %s, %s 64px, \
		    		%s 64px, %s 128px)").format(
						LAY.take("/", "data.darkTheme"),
						LAY.take("/", "data.darkTheme"),
						LAY.take("/", "data.darkTheme").colorDarken(0.1),
						LAY.take("/", "data.darkTheme").colorDarken(0.1)
					),
			zIndex: 3,
  	},
		states: {
			"mobile": {
				onlyif: LAY.take("/", "data.isMobile"),
				props: {
					height: 50
				}
			}
		},
		"Logo": {
			props: {
				link: "/",
				cursor: "pointer",
				centerY: 0,
				centerX: 0,
				left: LAY.take("/", "data.margin").multiply(1),
				height: LAY.take("../", "height").percent(72),
				image: "/static/logo.png",
				zIndex: 5
			},
			states: {
				"mobile": {
					onlyif: LAY.take("/", "data.isMobile"),
					props: {
						left: LAY.take("/", "data.margin")
					}
				}
			}
		},
		"NavArea": {
			props: {
				left: LAY.take("/","data.margin"),
				centerY: 0,
				width: LAY.take("../", "width").minus(LAY.take("", "left").double()),
			},
			states: {
				"mobile": {
					onlyif: LAY.take("/","data.isMobile"),
					props: {
						display: LAY.take("/", "data.isMobileMenuInvoked"),
						left: 0,
						top: LAY.take("../", "height"),
						backgroundColor: LAY.take("/", "data.darkTheme")
					}
				}
			},
			"Nav": {
				many: {
					rows: [
						{page: "API", link:"/api",
							icon: "&#xf15c;"},
						{page: "EXAMPLES", link: "/examples",
							icon: "&#xf108;"},
						{page: "INSTALL", link: "/install",
							icon: "&#xf019;"
						},
						{page: "SOURCE", link: "https://github.com/LayJS/LayJS",
							icon: "&#xf09b"},
					],
					formation: "splitHorizontal",
					fargs: {
						//horizontal: {gap:LAY.take("../", "width").divide(10)}
						splitHorizontal: {
							width: LAY.take("../", "width"),
							gap: LAY.take("/", "data.margin")
						}
					},
					states: {
						"mobile": {
							onlyif: LAY.take("/", "data.isMobile"),
							formation: "vertical"
						}
					}
				},
				props: {
					cursor: "pointer",
					backgroundColor: LAY.color("white").setAlpha(0.08),
					width: LAY.take("/", "width").divide(5.5),
					height: LAY.take("", "$naturalHeight").plus(
						LAY.take("/", "data.margin").half().half()),
					link: LAY.take("", "row.link"),
					textColor: LAY.take("/", "data.lightTheme"),
					textFamily: LAY.take("/", "data.headingFont"),
					textWeight: "bold",
					textSize: LAY.take("", "width").divide(10)
				},
				transition: {
					backgroundColor: {
						type: "ease",
						duration: 200
					}
				},
				states: {
					"mobile": {
						onlyif: LAY.take("/","data.isMobile"),
						props: {
							width: LAY.take("../", "width"),
							textSize: LAY.take("/", "textSize"),
							backgroundColor: LAY.transparent()
						}
					},
					"hover": {
						onlyif: LAY.take("", "$hovering").and(LAY.take("", "$clicking").not()),
						props: {
							backgroundColor: LAY.take(
								"", "root.backgroundColor").colorTransparentize(2)
						}
					},
					"clicking": {
						onlyif: LAY.take("", "$clicking"),
						props: {
							backgroundColor: LAY.take(
								"", "root.backgroundColor").colorTransparentize(6)
						}
					},
					"selected": {
						onlyif: LAY.take("/", "$pathname").concat("/").startsWith(
							LAY.take("", "row.link")
						),
						install: function () {
							this.level("/").data("page", this.attr("row.page"));
						},
						props: {
							backgroundColor: LAY.take("/", "data.lightTheme"),
							textColor: LAY.take("/", "data.darkTheme")
						}
					}
				},
				"Icon": {
					props: {
						centerY: 0,
						left: LAY.take("/", "data.margin").half(),
						textFamily: "FontAwesome",
						html: LAY.take("~/", "row.icon")
					},
					states: {
						'rightHalf': {
							onlyif: LAY.take("~/", "$i").gt(LAY.take("~/many", "rows").length().half()).or(
								LAY.take("/", "data.isMobile")),
							props: {
								right: LAY.take("/", "data.margin").half(),
								//left: LAY.take("../Text", "right").plus(LAY.take("/", "data.margin"))
							}
						}
					}
				},
				"Text": {
					props: {
						centerY: 0,
						left: LAY.take("../Icon","right").plus(
							LAY.take("/", "data.margin").half()),
						text: LAY.take("~/", "row.page")
					},
					states: {
						"rightHalf": {
							onlyif: LAY.take("../Icon", "rightHalf.onlyif"),
							props: {
								right: LAY.take("../", "width").minus(LAY.take("../Icon", "left")).plus(
									LAY.take("/", "data.margin").half()
								)
							}
						}
					}
				}
			}

		},
		"MobileTitle": {
			props: {
				text: LAY.take("/", "data.page"),
				textSize: LAY.take("/", "data.bigFontSize"),
				textColor: LAY.take("/", "data.lightTheme"),
				textFamily: LAY.take("/", "data.headingFont"),
				centerX: 0,
				centerY: 0,
				display: LAY.take("/", "data.isMobile")
			}
		},
		"MobileMenuInvoke": {
			props: {
				display: LAY.take("/", "data.isMobile"),
				cursor: "pointer",
				right: LAY.take("/", "data.margin"),
				centerY: 0,
				width: 30
			},
			when: {
				click: function () {
					LAY.level("/").data("isMobileMenuInvoked",
						!LAY.level("/").attr("data.isMobileMenuInvoked")
					);
				}
			},
			"Bar": {
				many: {
					rows: new Array(3),
					fargs: {vertical:{gap:LAY.take("../", "width").divide(3)}}
				},
				props: {
					height: 1,
					width: LAY.take("../", "width"),
					backgroundColor: LAY.take("/", "data.lightTheme")
				},
				transition: {
					all: {
						type: "spring"
					}
				},
				states: {
					"first": {
						onlyif: LAY.take("/", "data.isMobileMenuInvoked").and(
							LAY.take("","$i").eq(1)
						),
						props: {
							originX: 0,
							rotateZ: 45,
						}
					},
					"second": {
						onlyif: LAY.take("/", "data.isMobileMenuInvoked").and(
							LAY.take("","$i").eq(2)
						),
						props: {
							opacity: 0
						}
					},
					"third": {
						onlyif: LAY.take("/", "data.isMobileMenuInvoked").and(
							LAY.take("","$i").eq(3)
						),
						props: {
							originX: 0,
							rotateZ: -45,
						}
					}
				}
			}
		}
  },
  "Content": {
  	props: {
			width: LAY.take("/", "width"),
  		top: LAY.take('../Header', 'bottom'),
  		height: LAY.take('/', 'height').minus(
				LAY.take('../Header', 'bottom')
			),
			overflowY: "auto",
			backgroundColor: LAY.take("/", "data.lightTheme")
  	},
		"Home": {
			$inherit: PAGE_HOME,
			exist: LAY.take("/", "data.page").eq("")
		},
		"API": {
			$inherit: PAGE_API,
			exist: LAY.take("/", "data.page").eq("API")
		},
		"Examples": {
			$inherit: PAGE_EXAMPLES,
			exist: LAY.take("/", "data.page").eq("EXAMPLES")
		},
		"Install": {
			$inherit: PAGE_INSTALL,
			exist: LAY.take("/", "data.page").eq("INSTALL")
		}
	}

});
