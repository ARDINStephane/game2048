(function($) // début du pluggin
{
    $.fn.game2048 = function() //function game2048 du pluggin
    {
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_map()
        {
            var table = $('<table></table>');
            for (var y = 0; y < 4; y++)
            {
                var ligne = $('<tr></tr>');
                for (var x = 0; x < 4; x++)
                {
                    var cases = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0).addClass('color_' + 0);
                    ligne.append(cases);
                }
                table.append(ligne);
            }
            return table;
        }

        function restart_game()
        {
            console.log('restart game');
            for (var y = 0; y < 4; y++)
            {
                for (var x = 0; x < 4; x++)
                {
                 var cases = $('[x="'+ x +'"][y="'+y+'"]');
                 cases.attr('nbr', 0);
                 cases.text(0);
                 cases.removeClass().addClass('color_' +  0);

             }
         }
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
        $('.loose').remove();    
        gameOver = false;
        score = 0;
        $('.number').text(score); 
        }
    function header()
    {
        $(".Games").append('<div class="header"></div>)');
        $('.header').append('<div class="haut"></div>');
        $('.header').append('<div class="bas"></div>');
        $('.haut').append('<div class="titre">2048 GAME</div>');
        $('.haut').append('<div class="new_game"><p>New game</p></div>');
        $('.bas').append('<div class="score"></div>');
        //$('.bas').append('<div class="level">Level</div>');
        $('.score').append('<div class="text">score</div>');
        $('.score').append('<dir class="number"></dir>'); 
        score = 0;
        $('.number').text(score);    
    }
 

    /* génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'*/
    function generate_case(cases)
    {
        for (var i = 0; i < cases; i++)
        {
            console.log('generate ' + cases);
            var x = Math.floor((Math.random() * 4));
            var y = Math.floor((Math.random() * 4));
            var value =  2 * (Math.floor((Math.random() * 2) + 1));
            var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

            if (value === 4 && Math.random() > 0.5)
                value = 2;
            if (!elem[0])
            {
                generate_case(cases - i);

                return;

            }
            else 
            {
                elem.attr('nbr', value);
                elem.text(value);
                var nb = parseInt(elem.attr('nbr'));
                elem.removeClass().addClass('color_' +  nb);
            }
        }
    }


    function affche()
    {

    }

    function moveleft(test)
    {         
        var x = 0;
        var y = 0;          
            // console.log("left");
            var mvt = false;
            while(y < 4)
            {
             while (x < 4)
             {

                 var case1 = $('[x="'+ x +'"][y="'+y+'"]');
                 if (parseInt(case1.attr('nbr')) != 0)
                 {
                     var n = x + 1;
                        // console.log(x, n);
                        while(n < 4)
                        {
                         var caseX = $('[x="'+ n +'"][y="'+y+'"]');
                         if (parseInt(caseX.attr('nbr')) != 0 && (parseInt(case1.attr('nbr'))) == (parseInt(caseX.attr('nbr'))))
                         {
                            if (test == true)
                            {   
                                if(parseInt(case1.attr('nbr')) == 1024)
                                {
                                        $(".Games").prepend('<div class="loose"></div>');
                                        $(".loose").append('<h1 class="over">YOU WIN !</h1>');
                                        $('.loose').append('<div class="new_game" id="New_game">New game</div>');
                                }
                                case1.attr('nbr', parseInt(case1.attr('nbr'))*2);
                                caseX.attr('nbr',0);
                                case1.text( parseInt(case1.text())*2);
                                caseX.text(0);
                                score = score + parseInt(case1.attr('nbr'));
                                $('.number').text(score);
                                var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);

                            }
                            mvt = true;
                            break;
                        }
                        else if(parseInt(caseX.attr('nbr')) != 0)
                            break;
                        n++;
                    }

                }
                else if (parseInt(case1.attr('nbr')) == 0)
                {
                    var n = x + 1;
                    while(n < 4)
                    {
                        var caseX = $('[x="'+ n +'"][y="'+y+'"]');
                        if (parseInt(caseX.attr('nbr')) != 0)
                        {
                            if (test == true)
                            {
                             case1.attr('nbr', parseInt(caseX.attr('nbr')));
                             caseX.attr('nbr',0);
                             case1.text( parseInt(caseX.text()));
                             caseX.text(0);
                                var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);
                             x--;
                         }
                         mvt = true;
                         break;
                     }
                     n++;
                 }
             }
             x++;     
         }
         x = 0;
         y++;
     } 
     return mvt;
 }


 function moveup(test)
 {
    var x = 0;
    var y = 0;
    //console.log("up");

    var mvt = false;
    while(x < 4)
    {
        while (y < 4)
        {

            var case1 = $('[x="'+ x +'"][y="'+y+'"]');
            if (parseInt(case1.attr('nbr')) != 0)
            {
                var n = y + 1;
                while(n < 4)
                {
                    var caseX = $('[x="'+ x +'"][y="'+n+'"]');
                    if (parseInt(caseX.attr('nbr')) != 0 && (parseInt(case1.attr('nbr'))) == (parseInt(caseX.attr('nbr'))))
                    {
                        if (test == true)
                        {
                            if(parseInt(case1.attr('nbr')) == 1024)
                                  {
                                        $(".Games").prepend('<div class="loose"></div>');
                                        $(".loose").append('<h1 class="over">YOU WIN !</h1>');
                                        $('.loose').append('<div class="new_game" id="New_game">New game</div>');
                                }
                     
                            case1.attr('nbr', parseInt(case1.attr('nbr'))*2);
                            caseX.attr('nbr',0);
                            case1.text( parseInt(case1.text())*2);
                            caseX.text(0);
                           score = score + parseInt(case1.attr('nbr'));
                           $('.number').text(score);
                              var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);
                        }
                        mvt = true;
                        break;
                    }
                    else if(parseInt(caseX.attr('nbr')) != 0)
                        break;
                    n++;
                }

            }
            else if (parseInt(case1.attr('nbr')) == 0)
            {
                var n = y + 1;
                while(n < 4)
                {
                    var caseX = $('[x="'+ x +'"][y="'+n+'"]');
                    if (parseInt(caseX.attr('nbr')) != 0)
                    {
                        if (test == true)
                        {
                            case1.attr('nbr', parseInt(caseX.attr('nbr')));
                            caseX.attr('nbr',0);
                            case1.text( parseInt(caseX.text()));
                            caseX.text(0);
                            y--;
                                  var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);                          
                        }
                        mvt = true;

                        break;
                    }
                    n++;
                }
            }
            y++;     
        }
        y = 0;
        x++;
    }  
    return mvt;

}


function moveright(test)
{
 var x = 3;
 var y = 0;
 var mvt = false;
   //console.log("right");
   while(y < 4)
   {
    while (x > -1)
    {

        var case1 = $('[x="'+ x +'"][y="'+y+'"]');
        if (parseInt(case1.attr('nbr')) != 0)
        {
            var n = x - 1;
            while(n > -1)
            {
                var caseX = $('[x="'+ n +'"][y="'+y+'"]');
                if (parseInt(caseX.attr('nbr')) != 0 && (parseInt(case1.attr('nbr'))) == (parseInt(caseX.attr('nbr'))))
                {
                    if (test == true)
                    {
                        if(parseInt(case1.attr('nbr')) == 1024)
                                  {
                                        $(".Games").prepend('<div class="loose"></div>');
                                        $(".loose").append('<h1 class="over">YOU WIN !</h1>');
                                        $('.loose').append('<div class="new_game" id="New_game">New game</div>');
                                }
                     
                        case1.attr('nbr', parseInt(case1.attr('nbr'))*2);
                        caseX.attr('nbr',0);
                        case1.text( parseInt(case1.text())*2);
                        caseX.text(0);
                        score = score + parseInt(case1.attr('nbr'));
                        $('.number').text(score);  
                                 var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);                                             
                    }
                    mvt = true;
                    break;
                }
                else if(parseInt(caseX.attr('nbr')) != 0)
                    break;
                n--;
            }

        }
        else if (parseInt(case1.attr('nbr')) == 0)
        {
            var n = x - 1;
            while(n > -1)
            {
                var caseX = $('[x="'+ n +'"][y="'+y+'"]');
                if (parseInt(caseX.attr('nbr')) != 0)
                {
                    if (test == true)
                    {
                        case1.attr('nbr', parseInt(caseX.attr('nbr')));
                        caseX.attr('nbr',0);
                        case1.text( parseInt(caseX.text()));
                        caseX.text(0);
                                  var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0); 
                        x++;
                    }
                    mvt = true;
                    break;
                }
                n--;
            }
        }
        x--;     
    }
    x = 3;
    y++;
}  
return mvt;
}


function movedown(test)
{
    var y = 3;
    var x = 0;
    var mvt = false;
    //console.log("down");
    while(x < 4)
    {
        while (y > -1)
        {

            var case1 = $('[x="'+ x +'"][y="'+y+'"]');
            if (parseInt(case1.attr('nbr')) != 0)
            {
                var n = y - 1;
                while(n > -1)
                {
                    var caseX = $('[x="'+ x +'"][y="'+n+'"]');
                    if (parseInt(caseX.attr('nbr')) != 0 && (parseInt(case1.attr('nbr'))) == (parseInt(caseX.attr('nbr'))))
                    {
                        if (test == true)
                        { 
                            if(parseInt(case1.attr('nbr')) == 1024)
                          {
                                        $(".Games").prepend('<div class="loose"></div>');
                                        $(".loose").append('<h1 class="over">YOU WIN !</h1>');
                                        $('.loose').append('<div class="new_game" id="New_game">New game</div>');
                                }
                                             
                            case1.attr('nbr', parseInt(case1.attr('nbr'))*2);
                            caseX.attr('nbr',0);
                            case1.text( parseInt(case1.text())*2);
                            caseX.text(0);
                            score = score + parseInt(case1.attr('nbr'));
                            $('.number').text(score);     
                                var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0);                      
                        }
                        mvt = true;
                        break;
                    }
                    else if(parseInt(caseX.attr('nbr')) != 0)
                        break;
                    n--;
                }

            }
            else if (parseInt(case1.attr('nbr')) == 0)
            {
                var n = y - 1;
                while(n > -1)
                {
                    console.log("end down");
                    var caseX = $('[x="'+ x +'"][y="'+n+'"]');
                    if (parseInt(caseX.attr('nbr')) != 0)
                    {
                        if (test == true)
                        {
                            case1.attr('nbr', parseInt(caseX.attr('nbr')));
                            caseX.attr('nbr',0);
                            case1.text( parseInt(caseX.text()));
                            caseX.text(0);
                                  var nb = parseInt(case1.attr('nbr'));
                                case1.removeClass().addClass('color_' +  nb);
                                caseX.removeClass().addClass('color_' +  0); 
                            y++;
                        }
                        mvt = true;
                        break;
                    }
                    n--;
                }
            }
            y--;     
        }
        y = 3;
        x++;
    }
    return mvt;
}
function game_over()
{
    var game_over = true;
    var a =   moveleft(false);
    var b = moveright(false);
    var c = moveup(false);
    var d = movedown(false);
    if(a== false && b == false && c == false && d == false)
    {
        //$("table").append("<h1>GAME OVER !<h1>");
        return(false);
    }
    else return(true);
}

var gameOver = false;
var score = 0;
$('html').keydown(function(event) 
{
    if (gameOver == false)
    {
        if (game_over() == true) {
            var b ;
    // console.log(x);
    switch (event['key']) {

        case 'ArrowLeft':      
        b= moveleft(true);
        break;
        case 'ArrowUp':
        b=moveup(true);
        break;
        case 'ArrowRight':
        b=moveright(true);
        break;
        case 'ArrowDown':
        b=movedown(true);
        break;
        default:
        b = false;
        break;
    }    
    if (b==true)
    {
        generate_case(1); // génération aléatoire de deux cases pleines (2 ou 4)
    }
}
else {
    $(".Games").prepend('<div class="loose"></div>');
    $(".loose").append('<h1 class="over">GAME OVER !</h1>');
    $('.loose').append('<div class="new_game" id="New_game">New game</div>');
    gameOver=true;
    console.log("loose");
}
}
else {
    console.log("already lose");
}
});
$('div').on('click',('.new_game'),restart_game);

                       // ----------------------------------------------------LANCEMENT--------------------------------------------------------
        

        header();
        $(this).append(generate_map()); // génération du tableau vide
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)





        /*var elem = $('[x="'+ 3 +'"][y="'+0+'"]');
        elem.attr('nbr', 1024 );
        elem.text(1024);
        var elem1 = $('[x="'+ 2 +'"][y="'+0+'"]');
        elem1.attr('nbr', 1024 );
        elem1.text(1024);
        var elem2 = $('[x="'+ 1 +'"][y="'+0+'"]');
        elem2.attr('nbr', 8 );
        elem2.text(8);*/

    }

})(jQuery); // fin du pluggin