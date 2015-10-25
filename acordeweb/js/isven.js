console.info('isven.js init');

//suma funcionalidad del menu
 $('#toggle').on('click', function () {     
     event.stopPropagation();
     if ($('.text-menu').css('opacity') == '0') { //Menu desplegado
        $('.text-menu').css('opacity','1');
        $('.text-close').css('opacity','0');
        rotate($('#toggle-line1'),'rotate(0deg)','0% 0%');
        $('#toggle-line2').css('opacity','1');
        rotate($('#toggle-line3'),'rotate(0deg)','0% 0%');
        $('.mobile-menu').removeClass("show");
    } else { //Menu oculto
        $('.text-menu').css('opacity','0');
        $('.text-close').css('opacity','1');
        rotate($('#toggle-line1'),'rotate(34deg)','0% 0%');
        $('#toggle-line2').css('opacity','0');
        rotate($('#toggle-line3'),'rotate(-34deg)','0% 0%');
        $('.mobile-menu').addClass("show");
    }
     
  })
 
 /** Funcion que permite rotar un elemento */
 var rotate = function(elem,value, origin) {
      elem.css('transform',value);
      elem.css('-ms-transform',value); /* IE 9 */
      elem.css('-webkit-transform', value); /* Chrome, Safari, Opera */       
      elem.css('-ms-transform-origin',origin) ; /* IE 9 */
      elem.css('-webkit-transform-origin',origin); /* Chrome, Safari, Opera */
      elem.css('transform-origin',origin);
 }

 var paintPeople = function(s, element, x, y, width, height) {
    rect = s.rect(x, y, width, height, 0, 0).attr({'class': "mosaic-rect-people"});
    f = s.filter(Snap.filter.grayscale(1));
    //image = s.image(element.image,x,y,width,height).attr({'class': "mosaic-image-people", 'filter':f });
    text = s.text(x, y + Math.floor(height/2),element.name).attr({'class': "mosaic-text-people"});
    //group = s.g(rect,image,text);
     group = s.g(rect,text);
    group.hover(imageHover, imageOut);
     
    function imageHover() {
        this.select('text').attr({'class': "mosaic-text-people-active"});
        //this.select('image').attr({'class': "mosaic-image-people-active"});
    }
    function imageOut() {
        this.select('text').attr({'class': "mosaic-text-people"});
        //this.select('image').attr({'class': "mosaic-image-people"});
    }
 }
 
 
  var paintAreaCELL = function(s, element, x, y, width, height) {
    rect = s.rect(x, y, width, height, 0, 0).attr({'class': "mosaic-rect-people"});
    f = s.filter(Snap.filter.grayscale(1));
    image = s.image(element.image,x,y,width,height).attr({'class': "mosaic-image-people", 'filter':f });
    text = s.text(x, y + Math.floor(height/2),element.name).attr({'class': "mosaic-text-people"});
    group = s.g(rect,image,text);
    group.hover(imageHover, imageOut);
     
    function imageHover() {
        this.select('text').attr({'class': "mosaic-text-people-active"});
        this.select('image').attr({'class': "mosaic-image-people-active"});
    }
    function imageOut() {
        this.select('text').attr({'class': "mosaic-text-people"});
        this.select('image').attr({'class': "mosaic-image-people"});
    }
 }
 
 var paintExternalSVG = function(s, element, x, y, width, height) {
     rect = s.rect(x, y, width, height, 0, 0).attr({'fill': "blue"});
     text = s.text(x, y + Math.floor(height/2),"paintExternalSVG");
    /*Snap.load(element.image, function ( loadedFragment ) {
                                                var g = loadedFragment.select("g");
                                                var rect = loadedFragment.select("rect");  
                                                //g.hove();r( hoverover, hoverout );
                                                //console.info(rect.node.getAttribute('height')); 
                                                g.transform( 't'+x+','+y+'s'+(height/rect.node.getAttribute('height')));
                                                s.append(g);
                                        } );     */ 
 }
 
 var paintSpecialCELL = function(s, element, x, y, width, height) {
     rect = s.rect(x, y, width, height, 0, 0).attr({'fill': "red"});
     text = s.text(x, y + Math.floor(height/2),"paintSpecialCELL");
 }
 
  var paintNullCELL = function(s, element, x, y, width, height) {
     rect = s.rect(x, y, width, height, 0, 0).attr({'fill': "green"});
     text = s.text(x, y + Math.floor(height/2),element == undefined ? "paintNullCELL" : element.text);
 }
 
 /** Funcion que pinta un elemento del mosaico */
 var paintcell = function (s, element, dimcell, x, y, width, height) {
     if (element != undefined) {
        if (element.type == 'PEOPLE') {
            paintPeople(s, element, x, y, width, height);
        } else if (element.type == 'EXTERNALSVG') {
            paintExternalSVG(s, element, x, y, width, height);    
        } else if (element.type == 'SPECIALCELL') {
            paintSpecialCELL(s, element, dimcell, x, y, width, height);   
        } else if (element.type == 'AREA') {
            paintAreaCELL(s, element, x, y, width, height);   
        } else {
            paintNullCELL(s, element, x, y, width, height);   
        }
     } else {
         paintNullCELL(s, element, x, y, width, height);
     } 
 }

 var patron12 = [[1,3,0], [2,2,0], [1,2,3], [2,2,3], [2,2,1]];
 var patron9 = [[1,3,0], [2,2,0], [1,2,3], [2,2,3]];
 var patron5 = [[1,3,0], [2,2,0]];


 /* Dibuja los graficos del HOME con SNAP SVG */
  var elements = [  {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Java", image:"images/people/java.png", type:"AREA"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {name: "Gestión", image:"images/people/leadership.png", type:"AREA"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Android", image:"images/people/androidicon.png", type:"AREA"},
                    {name: "IOS", image:"images/people/ios.png", type:"AREA"},                  
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"}, 
                    {name: "WEB", image:"images/people/web_de_icon.png", type:"AREA"},
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},                    
                    {name: "Carlos Moh", image:"images/people/moh.png", type:"PEOPLE"},
                    {name: "C++", image:"images/people/dev-c.png", type:"AREA"},
                    {text: "Texto Ejemplo", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Luis Castañeda", image:"images/people/moh.png", type:"PEOPLE"}
                ];

  var numElementsValids = 16;

  var specialElements = [
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                ];
 
  var s = Snap("#svgout"); 
  //s.attr({ viewBox: "0 0 600 600" });

  //calcula el padding y numero de columnas a usar
  var paddingborder, numcolumns;
  if ($("#svgout").width() < 500) {
      numcolumns = 3;
      paddingborder = 4;
  } else if ($("#svgout").width() < 900) {
      numcolumns = 5;
      paddingborder = 10;      
  } else if ($("#svgout").width() < 1200) {
      numcolumns = 7;
      paddingborder = 10;            
  } else {
      numcolumns = 9;
      paddingborder = 10;
  }
  ybase = 0;
  xbase = 0;
  var widthSurface = $("#svgout").width();
  var widthCell, numrows;
  widthCell = Math.floor((widthSurface-paddingborder*(numcolumns + 2))/numcolumns);
  visibleHeight = window.innerHeight - 120;
  heightsurface = ((widthCell+paddingborder)*Math.ceil(elements.length/numcolumns));
  if (heightsurface < visibleHeight) {
      heightsurface = visibleHeight;
  }
  widthsurface =  (widthCell+paddingborder)*numcolumns;
  //centra horizontalmente
  xbase = (($("#svgout").width() - widthsurface))/2;
  console.info($("#svgout").width());
  console.info(xbase);
  if (xbase < 0) xbase = 0;

  numrows = Math.floor(heightsurface/(widthCell+paddingborder));
  heightsurface = (widthCell+paddingborder)*numrows; 
  //asigna al padre el tamaño del surface
  if (heightsurface < visibleHeight) {
      $("#acorde-mosaic").css('height',visibleHeight-10);
  } else {
      $("#acorde-mosaic").css('height',heightsurface);
  }
  //centra verticalmente
  ybase = ($("#svgout").height() - heightsurface)/2;
  if (ybase <= 5) ybase = 5;

  row = 0;
  column = 0;
  //inicializa la matriz de celdas
  matrix = new Array(numrows);
  for (r = 0; (r < numrows); r++) {
      matrix[r] = new Array(numcolumns);
      for (c = 0; (c < numcolumns); c++)
          matrix[r][c]=0;
  }

  //calcula el patron a usar
  var patron;
  var initpatroncol;
  totalcells = numrows*numcolumns;
  initpatroncol = Math.ceil(numcolumns/2)-2;
  if (initpatroncol <0) initpatroncol = 0;
  diff = totalcells - numElementsValids;
  if (diff >= 12) {
      patron = patron12;
      diff -= 12;
  } else if (diff >= 9) {
      patron = patron9;
      diff -= 9;
  } else if (diff >= 5) {
      patron = patron5;
      diff -= 5;
  } else
      patron = undefined;

  elemindex = 0;
  specialindex = 0;
  for (index = 0; (index < totalcells); index++) {
  //for (index = 0; (index < 5); index++) {
    
    //verifica si la celda no esta ocupada      
    if (matrix[row][column] == 0) {
        x = column*widthCell + (paddingborder*(column));
        y = row*widthCell + (paddingborder*(row));
        dimcell = [1,1];
        if (patron != undefined && row < patron.length) {
            if (column == initpatroncol+patron[row][2]) {
                dimcell = patron[row];
                patron[row] = [1,1];
                element = specialElements[row];
            } else {
                while(elements[elemindex] != undefined && elements[elemindex].type == 'DEFAULT' && diff <= 0)
                    elemindex++;
                if (elements[elemindex] != undefined && elements[elemindex].type == 'DEFAULT')
                    diff--;
                element = elements[elemindex++];
            }
        } else {
            element = elements[elemindex++];            
        }
        //verifica las dimensiones
        if (row+dimcell[0] > numrows) dimcell[0] = 1;
        if (column+dimcell[1] > numcolumns) dimcell[1] = 1;
        
        //calcula el ancho y alto
        paddingx = 0, paddingy = 0;
        if (dimcell[1] > 1) {
            paddingx = paddingborder * (dimcell[1]-1);
        }
        if (dimcell[0] > 1) {
            paddingy = paddingborder * (dimcell[0]-1);
        }
        widthrect = widthCell*dimcell[1] + paddingx;
        heightrect = widthCell*dimcell[0] + paddingy;                
        
        
        paintcell(s, element, dimcell, x + xbase, y + ybase, widthrect, heightrect);
        //marca las celdas ocupadas
        for (dimrow = 0; (dimrow < dimcell[0]); dimrow++)
            for (dimcol = 0; (dimcol < dimcell[1]); dimcol++)            
                matrix[row + dimrow][column+ dimcol] = 1;
    }
    if (++column >= numcolumns) {
        column = 0;
        row++;
    }
  }


console.info('isven.js fin');
