


LAY.run({
	data: {
		darkTheme: LAY.rgb(30,30,30),
		lightTheme: LAY.rgb(175,205,180),
		grayTheme: LAY.rgb(120,120,120),
		lightGrayTheme: LAY.rgb(238,238,238),
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
		cursor: "default"
  },
	$extfonts: ["FontAwesome"],
	css:
		LAY.take("pre {box-sizing:border-box;white-space:pre-wrap;word-wrap:break-word;width:100%; background:#{darkTheme};color:white;padding:10px}" +
		" a { color: #{lightTheme}; } a:visited { color: #{darkenedLightTheme}; }" +
		" h1,h2,h3,h4,h5,h6 { font-family: #{headingFont} }").format(
			{
				lightTheme: LAY.take("", "data.lightTheme"),
				darkTheme: LAY.take("", "data.darkTheme"),
				darkenedLightTheme: LAY.take("", "data.lightTheme").colorDarken(0.2),
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
			//backgroundColor: LAY.take("/", "data.darkTheme"),
			backgroundImage: LAY.take("repeating-linear-gradient(310deg, %s, %s 64px, \
		    		%s 64px, %s 128px)").format(
						LAY.take("/", "data.darkTheme"),
						LAY.take("/", "data.darkTheme"),
						LAY.take("/", "data.darkTheme").colorDarken(0.04),
						LAY.take("/", "data.darkTheme").colorDarken(0.04)
					),
		borderBottom: {style: "solid", width:1, color: LAY.take("/", "data.lightTheme")},

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
				left: LAY.take("/", "data.margin").multiply(1),
				height: LAY.take("../", "height").percent(72),
				image: "/static/logo.png"
			}
		},
		"NavArea": {
			props: {
				left: LAY.take("../Logo", "right").plus(
					LAY.take("/","data.margin").multiply(1)),
				centerY: 0,
				width: LAY.take("../", "width").minus(LAY.take("", "left"))
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
						{page: "SOURCE", link: "https://github.com/LayJS/LayJS",
							icon: "&#xf09b"},
					],
					formation: "horizontal",
					fargs: {
						horizontal: {gap:LAY.take("/", "data.margin")}
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
					width: LAY.take("../", "width").divide(3).minus(
						LAY.take("/", "data.margin")
					),
					height: LAY.take("", "$naturalHeight").plus(
						LAY.take("/", "data.margin").half().half()),
					link: LAY.take("", "row.link"),
					textColor: LAY.take("/", "data.lightTheme"),
					textFamily: LAY.take("/", "data.headingFont"),
					textWeight: "bold",
					textSize: 24
				},
				transition: {
					backgroundColor: {
						type: "ease",
						duration: 400
					}
				},
				states: {
					"mobile": {
						onlyif: LAY.take("/","data.isMobile"),
						props: {
							width: LAY.take("../", "width")
						}
					},
					"hover": {
						onlyif: LAY.take("", "$hovering"),
						props: {
							backgroundColor: LAY.take(
								"", "root.backgroundColor").colorTransparentize(2)
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
						left: LAY.take("/", "data.margin"),
						centerY: 0,
						textFamily: "FontAwesome",
						html: LAY.take("~/", "row.icon")
					}
				},
				"Text": {
					props: {
						left: LAY.take("../Icon","right").plus(
							LAY.take("/", "data.margin")),
						centerY: 0,
						text: LAY.take("~/", "row.page")
					},
					states: {
						"mobile": {
							onlyif: LAY.take("/","data.isMobile"),
							props: {
								right: LAY.take("/", "data.margin")
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
			overflowY: "auto"
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
		}
	}

});
