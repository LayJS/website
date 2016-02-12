



LAY.run({
	data: {
		blueTheme: LAY.rgb(18, 157, 248),
		orangeTheme: LAY.rgb(252, 138, 138),
		grayTheme: LAY.rgb(150,150,150)
	},
  props: {
    backgroundColor: LAY.take("", "data.grayTheme"),
    textWeight:"300",
    overflowY: "auto"
  },
  "Header": {
  	props: {
			height: 100,
  		width: LAY.take('/', 'width'),
			//backgroundColor: LAY.take("/", "data.blueTheme")
			backgroundImage: LAY.take("repeating-linear-gradient(310deg, %s, %s 50px, \
    		%s 50px, %s 100px)").format(
				LAY.take("/", "data.blueTheme"),
				LAY.take("/", "data.blueTheme"),
				LAY.take("/", "data.blueTheme").colorDarken(0.05),
				LAY.take("/", "data.blueTheme").colorDarken(0.05)
			)
  	},

		"Logo": {
			props: {
				linkHref: "/",
				centerY: 0,
				left: 30
			},
			"Image": {
				$type: "image",
				props: {
					imageSrc: "/static/logo.png",
					width: 100
				}
			}
		},
		"NavArea": {
			props: {
				left: LAY.take("../Logo", "right").plus(30),
				centerY: 0
			},
			"Nav": {
				many: {
					rows: [
						{text: "API", link:"/api"},
						{text: "GETTING STARTED", link: "/getting-started"},
						{text: "SOURCE", link: "https://github.com/LayJS/LayJS"}
					],
					formation: "totheright",
					fargs: {
						totheright: {gap:30}
					},
					props: {

					}
				},
				props: {
					backgroundColor: LAY.rgba(255,255,255,0.12),
					width: LAY.take("/", "width").divide(4),
					linkHref: LAY.take("", "row.link"),
					textColor: LAY.take("/", "data.orangeTheme"),
					text: LAY.take("", "row.text"),
					textFamily: "impact",
					textSize: 25,
					textPadding: 10
				}
			}
		}
  },
  "Content": {
  	props: {
  		top: LAY.take('../Header', 'bottom'),
  		height: LAY.take('', '$naturalHeight').max(LAY.take('/', 'height').minus(
				LAY.take('../Header', 'height').plus(LAY.take('../Footer', 'height'))
			)),
  		backgroundColor: LAY.color('white')
  	},
  	"Description": {
  		props: {
  			width: LAY.take("/", "width"),
				backgroundColor: LAY.color('black'),
				textColor: LAY.rgba(255,255,255,0.8),
  			textSize: 22,
  			textWrap: "normal",
  			text: "LAY.js is a constraint-based page layout engine written in Javascript, as a substitute to CSS positioning, " +
  				"and HTML markup. The central premise of which is to provide a system to declare an entire application using a single object.",
  			textPadding: 20,

  		}
  	},
  	"Hero": {
  		props:{
  			top: LAY.take("../Description", "bottom").plus(30),
  			width: LAY.take('/', 'width').multiply(0.9),
  			centerX: 0
  		},
  		"Message": {
  			many: {
  				formation: "totheright",
  				rows: [
  					{
  						title:'Hardware Accelerated',
  						subtext: "LAY uses the CSS transform primitive to position each element. " +
  						"Furthermore, LAY offers non-hardware accelerated CSS 'left'/'top' as an alternative." +
  						"For legacy browsers withot support for hardware acceleration, " +
  						"LAY will gracefully degrade to using 'left'/'top' positioning."
  					},
  					{
  						title:'Constraint Based',
  						subtext: "LAY provides a system of creating constraints within elements " +
							"of the application. This ensures a more maintainable and scalable interface " +
							"as writing the application automatically follows a DRY (Do not Repeat Yourself) principle."
  					},
						{
							title: "Single Object Declaration",
							subtext: "LAY applications are specified by following a declarative paradisgm " +
							"as opposed to an imperative paradigm. Furthermore, the entire declaration of " +
							"the application is specified within a single nested object."
						}
  				]
  			},
  			props: {
  				width: LAY.take("../", "width").divide(3),
  				textAlign: "center",
  				textPadding: 10
  			},
  			"Title": {
  				props: {
  					centerX: 0,
  					text: LAY.take("../", "row.title"),
  					textWeight: "bold",
  					textSize: 20
  				}
  			},
  			"Subtext": {
  				props: {
  					width: LAY.take("../", "width"),
  					top: LAY.take("../Title", "bottom" ),
  					text: LAY.take("../", "row.subtext"),
  					textColor: LAY.take("/", "data.grayTheme"),
  					textWrap: "normal"
  				}
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
			textColor: LAY.rgba(255,255,255,0.8),
			textLineHeight: LAY.take("", 'height').divide(LAY.take('', 'textSize')),
  		backgroundImage: LAY.take("/Header", "backgroundImage")
  	}
  }
});
