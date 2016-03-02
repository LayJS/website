


LAY.run({
	data: {
		purpleTheme: LAY.rgb(108, 67, 188),
		orangeTheme: LAY.rgb(248, 138, 124),
		grayTheme: LAY.rgb(120,120,120),
		lightGrayTheme: LAY.rgb(210,210,210),
		mobileWidth: 720,
		bigFontSize: LAY.take(function (isMobile) {
				return isMobile ? 15 : 22;
			}).fn(LAY.take("", "data.isMobile")),
		isMobile: LAY.take("", "width").lt(
			LAY.take("", "data.mobileWidth")),
		headingFont: "impact",
		margin: LAY.take("", "width").percent(3),
		page: ""
	},
  props: {
		textFamily: "arial",
    textWeight:"300",
		textLineHeight: 1.2,
		textSize: 17,
		cursor: "default",
		overflowY: "hidden"
  },
  "Header": {
  	props: {
			height: LAY.take("/", "data.margin").multiply(2.4),
  		width: LAY.take('/', 'width'),
			//backgroundColor: LAY.take("/", "data.purpleTheme")
			backgroundImage: LAY.take("repeating-linear-gradient(310deg, %s, %s 50px, \
    		%s 50px, %s 100px)").format(
				LAY.take("/", "data.purpleTheme"),
				LAY.take("/", "data.purpleTheme"),
				LAY.take("/", "data.purpleTheme").colorDarken(0.04),
				LAY.take("/", "data.purpleTheme").colorDarken(0.04)
			)
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
				cursor: "pointer",
				link: "/",
				centerY: 0,
				left: LAY.take("/", "data.margin").multiply(1),
				filters: [
					//{type: "dropShadow", x:1, y:1,
					 	//blur: 20, color: LAY.rgba(0,0,0,0.5)}
						//{type: "saturate", value:0.6}
				]
			},
			"Image": {
				props: {
					image: "/static/logo6.png",
					height: LAY.take("../../", "height").percent(72)
				}
			}
		},
		"NavArea": {
			props: {
				left: LAY.take("../Logo", "right").plus(
					LAY.take("/","data.margin").multiply(1)),
				centerY: 0,
				width: LAY.take("../", "width").minus(LAY.take("", "left")),
				display: LAY.take("/", "data.isMobile").not()
			},
			"Nav": {
				many: {
					rows: [
						{page: "GETTING STARTED", link: "/getting-started",
							icon: "&#xf0e5;"},
						{page: "API", link:"/api",
							icon: "&#xf0e5;"},
						{page: "SOURCE", link: "https://github.com/LayJS/LayJS",
							icon: "&#xf0e5;"},

					],
					formation: "horizontal",
					fargs: {
						horizontal: {gap:LAY.take("/", "data.margin")}
					}
				},
				props: {
					cursor: "pointer",
					backgroundColor: LAY.rgba(255,255,255,0.08),
					width: LAY.take("../", "width").divide(3).minus(
						LAY.take("/", "data.margin")
					),
					link: LAY.take("", "row.link"),
					textColor: LAY.take("/", "data.orangeTheme"),
					text: LAY.take("", "row.page"),
					textFamily: "impact",
					textSize: 25,
					textAlign: "center",
					//textIndent: LAY.take("/", "data.margin").divide(2),
					textPadding: {top: LAY.take("/", "data.margin").divide(3),
						bottom: LAY.take("/", "data.margin").divide(3) }
				},
				transition: {
					backgroundColor: {
						type: "ease",
						duration: 400
					}
				},
				states: {
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
							backgroundColor: LAY.take("/", "data.orangeTheme"),
							textColor: LAY.take("/", "data.purpleTheme")
						}
					}
				}
			}
		},
		"MobileHeader": {
			props: {
				text: LAY.take("/", "data.page"),
				textSize: LAY.take("/", "data.bigFontSize"),
				textColor: LAY.take("/", "data.orangeTheme"),
				textFamily: LAY.take("/", "data.headingFont"),
				centerX: 0,
				centerY: 0,
				display: LAY.take("/", "data.isMobile")
			}
		}
  },
  "Content": {
  	props: {
			width: LAY.take("/", "width"),
  		top: LAY.take('../Header', 'bottom'),
  		height: LAY.take('/', 'height').minus(
				LAY.take('../Header', 'height').plus(LAY.take('../Footer', 'height'))
			),
			overflowY: "auto"
  	},
		"Home": {
			exist: LAY.take("/", "data.page").eq(""),
			props: {
				width: LAY.take("../", "width")
			},
	  	"Description": {
	  		props: {
	  			width: LAY.take("/", "width"),
					backgroundColor: LAY.color('black'),
					textColor: LAY.rgba(255,255,255,0.8),
	  			textSize: LAY.take("/", "data.bigFontSize"),
	  			textWrap: "normal",
	  			text: "LAY.js is a constraint-based page layout engine written in Javascript, as a substitute to CSS positioning, " +
	  				"and HTML markup. The central premise of which is to provide a system to declare an entire application using a single object.",
	  			textPadding: {
						top: LAY.take("/", "data.margin").divide(2),
						bottom: LAY.take("/", "data.margin").divide(2),
						left: LAY.take("/", "data.margin"),
						right: LAY.take("/", "data.margin")
					}
	  		},
				states: {
					"mobile": {
						onlyif: LAY.take("/", "data.isMobile"),
						props: {
							textPadding: LAY.take("/", "data.margin")
						}
					}
				}
	  	},
	  	"Hero": {
	  		props:{
	  			top: LAY.take("../Description", "bottom").plus(
						LAY.take("/", "data.margin").divide(2)
					),
	  			width: LAY.take('/', 'width'),
	  			centerX: 0
	  		},
	  		"Message": {
	  			many: {
	  				formation: LAY.take(function (isMobile) {
							return isMobile ? "vertical": "horizontal";
	  				}).fn(LAY.take("/", "data.isMobile")),
						fargs: {
							//horizontal: {gap: LAY.take("/", "data.margin")},
							vertical: {gap: LAY.take("/", "data.margin").multiply(2)}
						},
	  				rows: [
	  					{
	  						title:'Hardware Accelerated',
								icon: "1b3",
	  						subtext: "LAY uses the CSS transform primitive to position each element. " +
	  						"Furthermore, LAY offers non-hardware accelerated CSS 'left'/'top' as an alternative." +
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
					"Icon": {
						$type: "html",

						props: {
							width: LAY.take("../", "width"),
							textPadding: 10,
							textFamily: "FontAwesome",
							text: LAY.take("&#xf%s;").format(
								LAY.take("~/", "row.icon")),
							textAlign: "center",
							textSize: LAY.take("/", "data.margin").multiply(2),
							textLineHeight: 1
						}
					},
	  			"Title": {
	  				props: {
	  					centerX: 0,
							top: LAY.take("../Icon", "bottom").plus(
								LAY.take("/", "data.margin").divide(4)
							),
	  					text: LAY.take("../", "row.title"),
	  					textWeight: "bold",
							textSize: LAY.take("/", "data.bigFontSize")
	  				}
	  			},
	  			"Subtext": {
	  				props: {
	  					width: LAY.take("../", "width"),
	  					top: LAY.take("../Title", "bottom" ).plus(
								LAY.take("/", "data.margin").divide(4)
							),
	  					text: LAY.take("../", "row.subtext"),
	  					textColor: LAY.take("/", "data.grayTheme"),
	  					textWrap: "normal",
							textPadding: {
								left:LAY.take("/", "data.margin"),
								right: LAY.take("/", "data.margin")
							}
	  				},
						states: {
							"mobile": {
								onlyif: LAY.take("/", "data.isMobile"),
								props: {
									textAlign: "left",
								}
							}
						}
	  			},
					"BorderBottom": {
						props: {
							top: LAY.take("../Subtext", "bottom").plus(
								LAY.take("/", "data.margin").multiply(4)
							),
							visible: LAY.take("/", "data.isMobile"),
							height: 1,
							width: LAY.take("../", "width"),
							backgroundColor: LAY.take("/", "data.grayTheme"),

						}
					}
	  		}
			}
  	},
		"API": {
			exist: LAY.take("/", "data.page").eq("API"),
			data: {
				content: ""
			},
			//$view: true,
			props: {
				width: LAY.take("../", "width"),
				height: LAY.take("../", "height")
			},
			"Side": {
				props: {
					width: 300,
					height: LAY.take("../", "height"),
					backgroundColor: LAY.take("/", "data.lightGrayTheme"),
					overflowY: "auto"
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
							isOpen: false,
							isLink: LAY.take("", "row.sub").length().eq(0)
						},
						"Title": {
							exist: LAY.take("~/", "data.isLink").not(),
							props: {
								text: LAY.take("~/", "row.title"),
								textPadding: 10,
								textWeight: "bold",
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
							//$inherit: "../Title",
							exist: LAY.take("~/", "data.isLink"),
							props: {
								width: LAY.take("../", "width"),
								textWeight: "bold",
								text: LAY.take("~/", "row.title"),
								textColor: LAY.take("/", "data.purpleTheme"),
								textPadding: 3,
								link: LAY.take("~/../", "data.filePath").concat("/").concat(
									LAY.take("~/", "row.sysname")
								)
							},
							states: {
								"current": {
									onlyif: LAY.take("/", "$pathname").eq(LAY.take("", "link")),
									props: {
										backgroundColor: LAY.take("/", "data.orangeTheme"),
										textColor: LAY.take("/", "data.purpleTheme")
									},
									install: function () {
										LAY.level("/Content/API").data("content",
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
							$inherit: "/Content/API/Side/_Tree",
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
						width: LAY.take("../", "width").minus(1),
						borderRight: {style:"solid", width:1,
							color:LAY.take("/", "data.lightGrayTheme")}
					}
				}
			},
			"View": {
				$type: "html",
				props: {
					width: LAY.take("../", "width").minus(LAY.take("../Side", "width")),
					height: LAY.take("../", "height"),
					left: LAY.take("../Side", "right"),
					overflowY: "auto",
					text: LAY.take("../", "data.content"),
					textPadding: 20,
					textWrap: "normal"
				}
			}
		}
	},
  "Footer": {
		$type: 'html',
  	props: {
  		top: LAY.take("../Content", "bottom"),
  		width: LAY.take("/", "width"),
  		height: 40,
			text: "Copyright &copy; 2016 Raj Nathani",
			textAlign: "center",
			textColor: LAY.rgba(255,255,255,0.72),
			textLineHeight: LAY.take("", 'height').divide(LAY.take('', 'textSize')),
  		backgroundImage: LAY.take("/Header", "backgroundImage")
  	}
  }
});
