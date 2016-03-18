
var sendContactMail = function(e){
    e.preventDefault();
    
    console.log("summit sendContactMail");
    
    //deshabilita summit y cambia el mensaje
    $('#submit').prop('disabled', true);
    $('#form-message').html("Espere un momento por favor...");
    
    //configura los datos a pasar a la aplicación de servidor
    var data = { 
      name: document.getElementById('name').value, 
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      answer: document.getElementById('human').value
    }    
    
     console.log("data: " + data.name + "," + data.email + "," + data.message + "," + data.answer);
    
    if ( data.name.trim() == "") {
        $('#form-message').html("Debe introducir su nombre :)");
        $('#submit').prop('disabled', false);
        return;
    }
    if ( data.email.trim() == "") {
        $('#form-message').html("Debe introducir un correo :)");
        $('#submit').prop('disabled', false);
        return;
    }
    if ( data.answer.trim() == "") {
        $('#form-message').html("Debe introducir la respuesta :)");
        $('#submit').prop('disabled', false);
        return;
    }
    if (data.answer != "5") {
        $('#form-message').html("3 + 2 = " + data.answer + "?... Por favor verifique su respuesta y vuelva a intentarlo");
        $('#submit').prop('disabled', false);
        return;
    }    
    
    // Run our Parse Cloud Code and 
    // pass our 'data' object to it
    Parse.Cloud.run("sendEmail", data, {
      success: function(object) {
        cleanContactForm();
        $('#form-message').html("Sr(a) " + data.name + ' su mensaje ha sido guardado. Muchas gracias por contactarnos!').addClass('success').fadeIn('fast');
        $('#submit').prop('disabled', false);  
      },
      error: function(object, error) {
        console.log(object);
        if (error != undefined) {
            console.log("error: " + error);
            $('#form-message').html(error).addClass('error').fadeIn('fast');
        } else {
            $('#form-message').html('Uh oh, lo sentimos, ha ocurrido un error al momento de guardar su mensaje. Por favor, reportar la falla a soporte@acorde.com.ve').addClass('error').fadeIn('fast');
        }
        $('#submit').prop('disabled', false);
      }
    });    
};

var cleanContactForm = function() {
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
    $('#human').val('');
    $('#form-message').html("");
};

var showCaption = function() {
    if ($('.carousel-caption > p').css('display') == 'none') {
        $('.carousel-caption > p').css('display','block');              
        $('.show-caption').removeClass('fa fa-plus');
        $('.show-caption').addClass('fa fa-minus'); 
    } else {
        $('.carousel-caption > p').css('display','none');
        $('.show-caption').removeClass('fa fa-minus');
        $('.show-caption').addClass('fa fa-plus');
    }
}

/** Función que hace scroll hacia un elemento con un id en particular */
function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

/** Función que hace expand de la seccion leer más. LC */
function expandReadMore(id, more){
    var spanish = $("#lenguage").attr('src').indexOf("english")!=-1;
    if ($("."+id+" > p").css('display') == 'none') {
         $("."+id+ " > p").css('display','block');
         $("."+more).addClass('customers-mail');
        if(spanish){
         $("."+more).text("Leer menos...");   
        }else{
         $("."+more).text("Read less...");    
        }
    }else{
         $("."+id+ " > p").css('display','none');  
         $("."+more).addClass('customers-mail');
            if(spanish){
             $("."+more).text("Leer más...");   
            }else{
             $("."+more).text("Read more...");    
            }
         
    }
    
}

// cambia la imagen del leguaje.. LC 
function cambiarImagLenguage(){
    var lenguage =  $("#lenguage").attr('src');
    lenguage = lenguage.indexOf("english");
    if(lenguage != -1){
        $("#lenguage").attr('src','images/lenguage/spanish.png');
    }else{
        $("#lenguage").attr('src','images/lenguage/english.png');
    }
    
}

 /** Funcion que permite rotar un elemento */
 var rotate = function(elem,value, origin) {
      elem.css('transform',value);
      elem.css('-ms-transform',value); /* IE 9 */
      elem.css('-webkit-transform', value); /* Chrome, Safari, Opera */       
      elem.css('-ms-transform-origin',origin) ; /* IE 9 */
      elem.css('-webkit-transform-origin',origin); /* Chrome, Safari, Opera */
      elem.css('transform-origin',origin);
 }
  
 /** Funcion que se ejecuta cuando cambia el tamaño del body */
 var resizeAcordeMosaic = function() {
     $("#home").css('height', window.innerHeight);
     $("#enterprise").css('height', window.innerHeight);
     //se adiciona tamaño variable a las secciones customers y team - LC
     $("#customers").css('height', window.innerHeight);
     $("#team").css('height', window.innerHeight);
     $("#contact").css('height', window.innerHeight - $(".footer").outerHeight(true));
     //
     navbarHeight = $(".navbar-default.navbar-fixed-top").innerHeight();
     $("#home").css('padding-top', navbarHeight);
     $("#enterprise").css('padding-top', navbarHeight);  
      //se adiciona padding a las secciones customers y team - LC
     $("#customers").css('padding-top', navbarHeight);  
     $("#team").css('padding-top', navbarHeight);  
     $("#bg-contact-us").css('padding-top', navbarHeight);
     console.info('resizeAcordeMosaic');
     paintSvgOut();
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
        //console.info('People imageHover');
        this.select('text').attr({'class': "mosaic-text-people-active"});
        //this.select('image').attr({'class': "mosaic-image-people-active"});
    }
    function imageOut() {
        //console.info('People imageOut');
        this.select('text').attr({'class': "mosaic-text-people"});
        //this.select('image').attr({'class': "mosaic-image-people"});
    }
     
    //crea el objeto people correspondiente
     people = {group: group, element: element, active: false};
    //determina el estado del objeto     
    if (element.areas.indexOf(globalState.selectArea.area.name) > -1) {
       activePeople(people);
    } else { 
        inactivePeople(people);
    }     
     
    //suma a la lista que guarda el estado global del mosaic
    if (globalState.peoples == undefined)
        globalState.peoples = [];     
    globalState.peoples.push(people);
    
 }
 
 
  var paintAreaCELL = function(s, element, x, y, width, height) {
    Snap.load(element.image, loadAreaImage); 
      
    function loadAreaImage (loadedFragment) {
        var svg = loadedFragment.select("svg");
        svg.attr({'height': height, 'width': width, 'x': x, 'y':y });
        s.append(loadedFragment);
        rect = s.rect(x, y, width, height, 0, 0).attr({'class': "mosaic-rect-area"});
        if (svg.select("#hover") != undefined)
            svg.select("#hover").attr({pointerEvents: "none" });
        if (svg.select("#icono") != undefined)
            svg.select("#icono").attr({pointerEvents: "none" });
        group = s.g(rect, svg);
        group.hover(areaHover, areaOut);
        group.click(areaClick);        
        //determina el estado del objeto     
        if (globalState.selectArea.area.name == element.name) {
            globalState.selectArea.group = group;
            activeArea(globalState.selectArea);            
        }
    }
     
    function areaHover() {
        areaGroupHover(this);
    }
      
      function areaGroupHover(group) {
        rect = group[1].select("#rectHover");
        console.info(group[1].attr("viewBox").height);
        if (rect != undefined)
            rect.attr({'y': group[1].attr("viewBox").height/2, 'class': "mosaic-rect-area-hover"});
        text = group[1].select("#textHover");
        if (text != undefined)
            text.attr({'class': "mosaic-text-area-active"});
    }      
      
    function areaOut() {
        areaGroupOut(this);
    }
      
    function areaGroupOut(group) {
       //verifica si es el area seleccionada
       if (globalState.selectArea.area.name == element.name)
           return;
       rect = group[1].select("#rectHover");
        if (rect != undefined)
            rect.attr({'y': group[1].attr("viewBox").height + 10,'class': "mosaic-rect-area-out"});
        text = group[1].select("#textHover");
        if (text != undefined)
            text.attr({'class': "mosaic-text-area"});                 
    }
      
    function activeArea(area) {
        area.group[0].attr({'class': "mosaic-rect-area-active"});
        globalState.activeAreaMark[0].attr({'opacity': 1, 'x': area.group[0].attr("x"), 'y': area.group[0].attr("y")});
        areaGroupHover(area.group);
        //ejecuta la animation del area
        if (area.area.animation != undefined) {
            area.group[1].selectAll(area.area.animation.target).forEach( function(elem,i) {                
                classname = elem.attr("class") + " active";
                elem.attr({'class': classname});
                //elem.animate({'class':"mosaic-text-area"}, 1000, mina.ease);
            });
        }
    }
      
    function inactiveArea(area) {
        area.group[0].attr({'class': "mosaic-rect-area"});
        areaGroupOut(area.group);
        //ejecuta la animation del area
        if (area.area.animation != undefined) {
            area.group[1].selectAll(area.area.animation.target).forEach( function(elem,i) {
                classname = elem.attr("class").replace(" active","");
                elem.attr({'class': classname});
                //elem.animate({'class':"mosaic-text-area"}, 1000, mina.ease);
            });
        }
                
    }

    function areaClick() {
        console.info('Area areaClick');
        //realiza el cambio de estado
        inactiveArea(globalState.selectArea);
        globalState.selectArea.group = this;
        globalState.selectArea.area = element;
        activeArea(globalState.selectArea);
        //recorre los elementos y actualiza su estado
        //console.info(globalState.peoples.length);
        for (i = 0; (i < globalState.peoples.length); i++) {
            //console.info(globalState.peoples[i]);
            people = globalState.peoples[i];
            if (people.element.areas.indexOf(globalState.selectArea.area.name) > -1) {
                activePeople(people);
            } else {
                inactivePeople(people);
            }
        }
    }
 }

var activePeople = function (people) {
    people.active = true;
    people.group[1].attr({ text: 'ESTOY ACTIVO'});
    //console.info("Soy: " + people.element.name + " y estoy ACTIVO");
}

var inactivePeople = function (people) {
    people.active = false;
    people.group[1].attr({ text: 'ESTOY INACTIVO'});
    //console.info("Soy: " + people.element.name + " y estoy INACTIVO");
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

/** Función que pinta el control SvgOut */ 
  var paintSvgOut = function () {
    console.info("paintSvgOut");
      
    s = Snap("#svgout"); 
    s.clear();
          
    activeAreaGroup = s.g(s.rect(0,0,30,30).attr({'fill': "#000000", 'opacity': 0, 'id': "activeAreaRect", class:"mosaic-area-group-active"}));
      
    if (globalState == undefined) {
         console.info("inicializa globalState");
         globalState = {peoples: undefined, selectArea: {group: undefined, area: defaultArea}};
    }
      
    globalState.activeAreaMark = activeAreaGroup;

    //calcula el padding y numero de columnas a usar
    var paddingborder, numcolumns;
    if ($("#svgout").width() < 500) {
      numcolumns = 3;
      paddingborder = 0;
    } else if ($("#svgout").width() < 900) {
      numcolumns = 5;
      paddingborder = 1;      
    } else if ($("#svgout").width() < 1200) {
      numcolumns = 7;
      paddingborder = 1;            
    } else {
      numcolumns = 9;
      paddingborder = 1;
    }
    ybase = 0;
    xbase = 0;
    margin = 20;
    var widthSurface = $("#svgout").width();
    var widthCell, numrows;
    widthCell = Math.floor((widthSurface-paddingborder*(numcolumns + 1))/numcolumns);
    visibleHeight = window.innerHeight - margin;
    heightsurface = ((widthCell+paddingborder)*Math.ceil(elements.length/numcolumns));
    if (heightsurface < visibleHeight) {
      heightsurface = visibleHeight;
    }
    widthsurface =  (widthCell+paddingborder)*numcolumns;
    //centra horizontalmente
    xbase = (($("#svgout").width() - widthsurface))/2;
    if (xbase < 0) xbase = 0;

    numrows = Math.floor(heightsurface/(widthCell+paddingborder));
    heightsurface = (widthCell+paddingborder)*numrows; 
    //asigna al padre el tamaño del surface
    if (heightsurface < visibleHeight) {
      $("#acorde-mosaic").css('height',visibleHeight);
    } else {
      $("#acorde-mosaic").css('height',heightsurface);
      //recalcular dimesiones al aparecer el scroll
      if ($("#svgout").width() < widthSurface) {
        widthCell = Math.floor(($("#svgout").width()-paddingborder*(numcolumns + 1))/numcolumns);
        widthsurface =  (widthCell+paddingborder)*numcolumns;
        xbase = (($("#svgout").width() - widthsurface))/2;
        if (xbase < 0) xbase = 0;
        heightsurface = (widthCell+paddingborder)*numrows;         
      }
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
    if (diff >= 17) {
      patron = patron12.slice(0);
      diff -= 17;
    } else if (diff >= 13) {
      patron = patron9.slice(0);
      diff -= 13;
    } else if (diff >= 7) {
      patron = patron5.slice(0);
      diff -= 7;
    } else
      patron = undefined;

    //actualiza el tamaño del area activa
    activeAreaGroup[0].attr({ 'width': widthCell, 'height': widthCell });
      
    elemindex = 0;
    specialindex = 0;
    for (index = 0; (index < totalcells); index++) {
        //verifica si la celda no esta ocupada      
        if (matrix[row][column] == 0) {
            x = column*widthCell + (paddingborder*(column));
            y = row*widthCell + (paddingborder*(row));
            dimcell = [1,1];
            if (patron != undefined && row < patron.length && (column == initpatroncol+patron[row][2])) {
                dimcell = patron[row];
                patron[row] = [1,1];
                element = specialElements[row];
            } else {
                while(elements[elemindex] != undefined && elements[elemindex].type == 'DEFAULT' && diff <= 0) {
                    elemindex++;
                }
                if (elements[elemindex] != undefined && elements[elemindex].type == 'DEFAULT') {
                    console.log(elements[elemindex].text);
                    diff--;
                }
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

            if (element == undefined) element = defaultCell;
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
  }

  
/** Inicio de declaración de valores de configuración del control SvgOut */  
//guarda el estado global del control
var globalState;
//declara los patrones de posicionamiento de los especial elements
var patron12, patron9, patron5;
//declara el area de conocimiento seleccionada por defecto
var defaultArea;
//declara el valor de la celda por defecto, usada para completar la matriz
var defaultCell;
/* declara los elementos que componen el mosaico*/
var elements;
//declara el número de elementos de tipo PEOPLE presentes en el arreglo elements
var numElementsValids;
//declara la matriz de elementos especiales (tipo banner)
var specialElements;
//declara el grupo snap que guarda los elementos del area seleccionada
var activeAreaGroup;        
/** Fin de declaración de valores de configuración del control SvgOut */


//Una vez esta listo el documento se inicializan todos los componentes de la página
$(document).ready(function(){
    
    //inicializa los campos del carrousel para cada div team, LC
   
    //first div slide ************************************************//
    var slide1 = $('.slide1');
    var container1 = $('#slides1 ul');
    var elm = container1.find(':first-child').prop("tagName");
    var item_width = container1.width();
    slide1.width(item_width); //set the slides to the correct pixel width
    container1.parent().width(item_width);
    container1.width(slide1.length * item_width); //set the slides container to the correct total width
    container1.find(elm + ':first').before(container1.find(elm + ':last'));
    resetSlides(container1,item_width);
  
    //if user clicked on next button
    
     $('#next1').on('click', function() {
        //slide the item
        if (container1.is(':animated')) {
            return false;
        }
        container1.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container1.find(elm + ':last').after(container1.find(elm + ':first'));
                resetSlides(container1,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev1').on('click', function() {
        //slide the item
        if (container1.is(':animated')) {
            return false;
        }
       container1.stop().animate({
                'left': 0
            }, 700, function () {
                container1.find(elm + ':first').before(container1.find(elm + ':last'));
                resetSlides(container1,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    // end first div slide ************************************************//
    
    //second div slide ************************************************//
    var slide2 = $('.slide2');
    var container2 = $('#slides2 ul');
    var elm = container2.find(':first-child').prop("tagName");
    var item_width = container2.width();
    slide2.width(item_width); //set the slides to the correct pixel width
    container2.parent().width(item_width);
    container2.width(slide2.length * item_width); //set the slides container to the correct total width
    container2.find(elm + ':first').before(container2.find(elm + ':last'));
    resetSlides(container2,item_width);
  
    //if user clicked on next button
     $('#next2').on('click', function() {
        //slide the item
        if (container2.is(':animated')) {
            return false;
        }
        container2.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container2.find(elm + ':last').after(container2.find(elm + ':first'));
                resetSlides(container2,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev2').on('click', function() {
        //slide the item
        if (container2.is(':animated')) {
            return false;
        }
       container2.stop().animate({
                'left': 0
            }, 700, function () {
                container2.find(elm + ':first').before(container2.find(elm + ':last'));
                resetSlides(container2,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end second div slide ************************************************//
    //third div slide ************************************************//
    var slide3 = $('.slide3');
    var container3 = $('#slides3 ul');
    var elm = container3.find(':first-child').prop("tagName");
    var item_width = container3.width();
    slide3.width(item_width); //set the slides to the correct pixel width
    container3.parent().width(item_width);
    container3.width(slide3.length * item_width); //set the slides container to the correct total width
    container3.find(elm + ':first').before(container3.find(elm + ':last'));
    resetSlides(container3,item_width);
  
    //if user clicked on next button
     $('#next3').on('click', function() {
        //slide the item
        if (container3.is(':animated')) {
            return false;
        }
        container3.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container3.find(elm + ':last').after(container3.find(elm + ':first'));
                resetSlides(container3,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev3').on('click', function() {
        //slide the item
        if (container3.is(':animated')) {
            return false;
        }
       container3.stop().animate({
                'left': 0
            }, 700, function () {
                container3.find(elm + ':first').before(container3.find(elm + ':last'));
                resetSlides(container3,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end third div slide ************************************************//
    
      //fourth div slide ************************************************//
    var slide4 = $('.slide4');
    var container4 = $('#slides4 ul');
    var elm = container4.find(':first-child').prop("tagName");
    var item_width = container4.width();
    slide4.width(item_width); //set the slides to the correct pixel width
    container4.parent().width(item_width);
    container4.width(slide4.length * item_width); //set the slides container to the correct total width
    container4.find(elm + ':first').before(container4.find(elm + ':last'));
    resetSlides(container4,item_width);
  
    //if user clicked on next button
     $('#next4').on('click', function() {
        //slide the item
        if (container4.is(':animated')) {
            return false;
        }
        container4.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container4.find(elm + ':last').after(container4.find(elm + ':first'));
                resetSlides(container4,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev4').on('click', function() {
        //slide the item
        if (container4.is(':animated')) {
            return false;
        }
       container4.stop().animate({
                'left': 0
            }, 700, function () {
                container4.find(elm + ':first').before(container4.find(elm + ':last'));
                resetSlides(container4,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end fourth div slide ************************************************//
    
    //fifth div slide ************************************************//
    var slide5 = $('.slide5');
    var container5 = $('#slides5 ul');
    var elm = container5.find(':first-child').prop("tagName");
    var item_width = container5.width();
    slide5.width(item_width); //set the slides to the correct pixel width
    container5.parent().width(item_width);
    container5.width(slide5.length * item_width); //set the slides container to the correct total width
    container5.find(elm + ':first').before(container5.find(elm + ':last'));
    resetSlides(container5,item_width);
  
    //if user clicked on next button
     $('#next5').on('click', function() {
        //slide the item
        if (container5.is(':animated')) {
            return false;
        }
        container5.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container5.find(elm + ':last').after(container5.find(elm + ':first'));
                resetSlides(container5,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev5').on('click', function() {
        //slide the item
        if (container5.is(':animated')) {
            return false;
        }
       container5.stop().animate({
                'left': 0
            }, 700, function () {
                container5.find(elm + ':first').before(container5.find(elm + ':last'));
                resetSlides(container5,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end fifth div slide ************************************************//
  
   //sixth div slide ************************************************//
    var slide6 = $('.slide6');
    var container6 = $('#slides6 ul');
    var elm = container6.find(':first-child').prop("tagName");
    var item_width = container6.width();
    slide6.width(item_width); //set the slides to the correct pixel width
    container6.parent().width(item_width);
    container6.width(slide5.length * item_width); //set the slides container to the correct total width
    container6.find(elm + ':first').before(container6.find(elm + ':last'));
    resetSlides(container6,item_width);
  
    //if user clicked on next button
     $('#next6').on('click', function() {
        //slide the item
        if (container6.is(':animated')) {
            return false;
        }
        container6.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container6.find(elm + ':last').after(container6.find(elm + ':first'));
                resetSlides(container6,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev6').on('click', function() {
        //slide the item
        if (container6.is(':animated')) {
            return false;
        }
       container6.stop().animate({
                'left': 0
            }, 700, function () {
                container6.find(elm + ':first').before(container6.find(elm + ':last'));
                resetSlides(container6,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end sixth div slide ************************************************//
    
    //seventh div slide ************************************************//
    var slide7 = $('.slide7');
    var container7 = $('#slides7 ul');
    var elm = container7.find(':first-child').prop("tagName");
    var item_width = container7.width();
    slide7.width(item_width); //set the slides to the correct pixel width
    container7.parent().width(item_width);
    container7.width(slide7.length * item_width); //set the slides container to the correct total width
    container7.find(elm + ':first').before(container7.find(elm + ':last'));
    resetSlides(container7,item_width);
  
    //if user clicked on next button
     $('#next7').on('click', function() {
        //slide the item
        if (container7.is(':animated')) {
            return false;
        }
        container7.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container7.find(elm + ':last').after(container7.find(elm + ':first'));
                resetSlides(container7,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev7').on('click', function() {
        //slide the item
        if (container7.is(':animated')) {
            return false;
        }
       container7.stop().animate({
                'left': 0
            }, 700, function () {
                container7.find(elm + ':first').before(container7.find(elm + ':last'));
                resetSlides(container7,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end seventh div slide ************************************************//
    
    //eighth div slide ************************************************//
    var slide8 = $('.slide8');
    var container8 = $('#slides8 ul');
    var elm = container8.find(':first-child').prop("tagName");
    var item_width = container8.width();
    slide8.width(item_width); //set the slides to the correct pixel width
    container8.parent().width(item_width);
    container8.width(slide8.length * item_width); //set the slides container to the correct total width
    container8.find(elm + ':first').before(container8.find(elm + ':last'));
    resetSlides(container8,item_width);
  
    //if user clicked on next button
     $('#next8').on('click', function() {
        //slide the item
        if (container8.is(':animated')) {
            return false;
        }
        container8.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container8.find(elm + ':last').after(container8.find(elm + ':first'));
                resetSlides(container8,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev8').on('click', function() {
        //slide the item
        if (container8.is(':animated')) {
            return false;
        }
       container8.stop().animate({
                'left': 0
            }, 700, function () {
                container8.find(elm + ':first').before(container8.find(elm + ':last'));
                resetSlides(container8,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end seventh div slide ************************************************//
    
    //ninth div slide ************************************************//
    var slide9 = $('.slide9');
    var container9 = $('#slides9 ul');
    var elm = container9.find(':first-child').prop("tagName");
    var item_width = container9.width();
    slide9.width(item_width); //set the slides to the correct pixel width
    container9.parent().width(item_width);
    container9.width(slide9.length * item_width); //set the slides container to the correct total width
    container9.find(elm + ':first').before(container9.find(elm + ':last'));
    resetSlides(container9,item_width);
  
    //if user clicked on next button
     $('#next9').on('click', function() {
        //slide the item
        if (container9.is(':animated')) {
            return false;
        }
        container9.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container9.find(elm + ':last').after(container9.find(elm + ':first'));
                resetSlides(container9,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev9').on('click', function() {
        //slide the item
        if (container9.is(':animated')) {
            return false;
        }
       container9.stop().animate({
                'left': 0
            }, 700, function () {
                container9.find(elm + ':first').before(container9.find(elm + ':last'));
                resetSlides(container9,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end seventh div slide ************************************************//
    
    //tenth div slide ************************************************//
    var slide10 = $('.slide10');
    var container10 = $('#slides10 ul');
    var elm = container10.find(':first-child').prop("tagName");
    var item_width = container10.width();
    slide10.width(item_width); //set the slides to the correct pixel width
    container10.parent().width(item_width);
    container10.width(slide10.length * item_width); //set the slides container to the correct total width
    container10.find(elm + ':first').before(container10.find(elm + ':last'));
    resetSlides(container10,item_width);
  
    //if user clicked on next button
     $('#next10').on('click', function() {
        //slide the item
        if (container10.is(':animated')) {
            return false;
        }
        container10.stop().animate({
                'left': item_width * -2
            }, 700, function () {
                container10.find(elm + ':last').after(container10.find(elm + ':first'));
                resetSlides(container10,item_width);
            });
        //cancel the link behavior            
        return false;
        
    });
    
     //if user clicked on next button
    $('#prev10').on('click', function() {
        //slide the item
        if (container10.is(':animated')) {
            return false;
        }
       container10.stop().animate({
                'left': 0
            }, 700, function () {
                container10.find(elm + ':first').before(container10.find(elm + ':last'));
                resetSlides(container10,item_width);
            });
        //cancel the link behavior            
        return false;
    });
    // end seventh div slide ************************************************//
    
    function resetSlides(container, item_width) {
        //and adjust the container so current is in the frame
		//alert("resetSlides"+ item_width);
        container.css({
            'left': -1 * item_width
        });
    }
    
    
    //manejo adecuado de la consola
    if (console == undefined) {
        console = { info: function() {}, log: function() {} };
    }    
    console.info('acorde.js ready init');
    
    //PAUSA EL CAROUSEL - QUITAR EN PRODUCCION    
    $('.carousel').carousel('pause');
    
    //Configura el action del form
    // Initialize Parse with your Parse application & javascript keys
    Parse.initialize("BHWlVUatQvb4hSdbToG0vzYb80RgQ8zQe6bDgVya", "KDktdtwVC5jJdzVPOT35HwPQTpahiJZRe3q6Bizv");
    $('#form-contact').submit(sendContactMail);
    
    //suma funcionalidad del menu
    $('#toggle').on('click', function (event) {     
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

    });
    
    //suma funcionalidad de navegacion
    $('#home-next').on('click', function() {
        goToByScroll("enterprise");
    });
    $('#enterprise-next').on('click', function() {
        //goToByScroll("people");
        goToByScroll("customers");
    });
    // se agrega navegacion para secciones customers y team - LC
     $('#customers-next').on('click', function() {
        //goToByScroll("people");
        goToByScroll("team");
    });
    $('#team-next').on('click', function() {
        //goToByScroll("people");
        goToByScroll("contact");
    });
    $('#people-next').on('click', function() {
        goToByScroll("contact");
    });
    //Manejo de mostrar/ocultar la informacion del carousel    
    $('.carousel-caption').on('click', showCaption);
    if ($('.carousel-caption > p').css('display') == 'block') {
        $('.show-caption').removeClass('fa fa-plus');
        $('.show-caption').addClass('fa fa-minus'); 
    }
    //
    
    //Manejo de mostrar/ocultar la informacion "LEER MAS" en la descripcion customers -  LC    
   $('.more-wau').on('click', function() {
     expandReadMore("complete-wau","more-wau");
	});
     $('.more-uniball').on('click', function() {
     expandReadMore("complete-uniball","more-uniball");
	});
     $('.more-tecna').on('click', function() {
     expandReadMore("complete-tecna","more-tecna");
	});
     $('.more-avantica').on('click', function() {
     expandReadMore("complete-avantica","more-avantica");
	});
    //
    $('a.menu-item').each( function (i, elem) {
        $( this ).on('click', function () {
            $("#toggle").click();
        });
    });
    
    //inicializa los patrones de posicionamiento de los especial elements
    patron12 = [[1,3,0], [2,2,0], [1,2,3], [2,2,3], [2,2,1]];
    patron9 = [[1,3,0], [2,2,0], [1,2,3], [2,2,3]];
    patron5 = [[1,3,0], [2,2,0]];
    //inicializa el area de conocimiento seleccionada por defecto
    defaultArea = {name: "Java", image:"images/people/java.svg",
                        animation:{target:"path"}, type:"AREA"};
    //inicializa el valor de la celda por defecto, usada para completar la matriz
    defaultCell = {text: "Texto Default Cell", image:"images/special/special01.svg", type:"DEFAULT"}

    /* Dibuja los graficos del HOME con SNAP SVG */
    elements = [  {text: "Texto Ejemplo 1", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Carlos Moh 1", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {name: "Carlos Moh 2", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {text: "Texto Ejemplo 2", image:"images/special/special01.svg", type:"DEFAULT"},
                    defaultArea,
                    {name: "Carlos Moh 3", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {name: "Gestión", image:"images/people/leadership.svg", 
                     animation:{target:"path"}, type:"AREA"},
                    {name: "Carlos Moh 4", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {text: "Texto Ejemplo 3", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Android", image:"images/people/android.svg", type:"AREA"},
                    {name: "IOS", image:"images/people/apple.svg", 
                     animation:{target:"path"}, type:"AREA"},                  
                    {name: "Carlos Moh 5", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {name: "Carlos Moh 6", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"},
                    {text: "Texto Ejemplo 4", image:"images/special/special01.svg", type:"DEFAULT"},
                    {text: "Texto Ejemplo 5", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Carlos Moh 7", image:"images/people/moh.png", type:"PEOPLE", areas:"Java, Gestión"}, 
                    {name: "WEB", image:"images/people/web-design.svg", 
                     animation:{target:"path"}, type:"AREA"},
                    {name: "Carlos Moh 8", image:"images/people/moh.png", type:"PEOPLE", areas:"IOS, Gestión"},                    
                    {name: "Carlos Moh 9", image:"images/people/moh.png", type:"PEOPLE", areas:"WEB, Gestión"},
                    {name: "C++", image:"images/people/c++.svg", 
                     animation:{target:"path"}, type:"AREA"},
                    {text: "Texto Ejemplo 6", image:"images/special/special01.svg", type:"DEFAULT"},
                    {name: "Luis Castañeda", image:"images/people/moh.png", type:"PEOPLE", areas:"C++, Gestión"}
                ];
    //inicializa el número de elementos de tipo PEOPLE presentes en el arreglo elements
    numElementsValids = 16;
    //inicializa la matriz de elementos especiales (tipo banner)
    specialElements = [
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                      {name: "Carlos Moh", image:"images/special/special01.svg", type:"EXTERNALSVG"},
                ];    
    //inicializa el tamaño de los elementos
    resizeAcordeMosaic();
    console.info('acorde.js ready fin');
});
  
 

