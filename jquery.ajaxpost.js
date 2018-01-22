/*!
 * jquery.easyajax.js v1.0 (http://jamiepine.github.io/jquery.easyajax.js/)
 * @copyright 2018 Jamie Pine
 */
$(document).on('click', '[ajax-enable]', function(e) {

    if ($(this)[0].tagName != 'FORM') {

        e.preventDefault();   console.log("l");

        var l = '#' + $(this).attr('id');;
        var f = false;

        prepareAjaxObject(l, f);
    }
});
$(document).on('submit', 'form', function(e) {

    if ($(this).is("[ajax-enable]")) {

        e.preventDefault();   console.log("f");

        var f = '#' + $(this).attr('id');
        var l = false;

        prepareAjaxObject(l, f);
    }
});
function prepareAjaxObject(l, f) {

    var ad = {}


    if (l !== false) {

      var id = l;

    }

    if (f !== false) {

      ad['formElements'] = [];

        $(f).find('input, select').each(function() {

            var eid = $(this).attr('id');
            var eva = $(this).val();

            var eO = {};

            eO['key'] = eid;
            eO['val'] = eva;

            ad.formElements.push(eO);

        });
      var id = f;
    }

    if ($(id).is("[ajax-action]")) {

        var aa = $(id).attr('ajax-action');

        ad['ajaxAction'] = aa;

    } else {    alert("Error: ajax-action required");
    }
    if ($(id).is("[ajax-success]")) {

        var aSa = $(id).attr('ajax-success');

        ad['ajaxSucsessAction'] = aSa;
    }
    if ($(id).is("[ajax-container]")) {

        var ac = $(id).attr('ajax-container');

        ad['ajaxContainer'] = ac;

    } else if ($(document).find('[ajax-container-default]')) {

        var ac = $('[ajax-container-default]').attr('id');

        if (ac === undefined) {
          alert('Default container needs an ID field!');
        }

        ad['ajaxContainer'] = ac;

    }
    if ($(id).is("[csrf-token]")) {

        var csrf = $(id).attr('csrf-token');

        ad['_token'] = csrf;

    } else if (document.querySelectorAll('meta[name="csrf-token"]').length > 0) {

        var csrf = $('meta[name="csrf-token"]').attr('content');

        ad['_token'] = csrf;
    }

    console.log(ad);

    ajaxSend(ad, id);
}

function ajaxSend(ad, id) {

    $.ajax({
        type: "POST",
        url: ad["ajaxAction"],
        data: ad,
        success: function(response) {
            if (response) {
                ajaxSuccess(response, ad, id);
            }
        },
        error: function(response) {
            console.log("ERROR");
        }
    });

}

function ajaxSuccess(response, ad, id) {

  if (ad['ajaxSucsessAction'] !== undefined) {

    var sa = ad["ajaxSucsessAction"];
    var view = ad['ajaxContainer']; 

      if (sa == "load" & ad['ajaxContainer'] !== undefined) {
        $(view).hide().fadeOut();
        $(view).empty().append(response);
        $(view).fadeIn();
        $(id).addClass("active");

        console.log("Loaded " + id + " into the " + view + " container successfully.");
      }

      if (sa == "custom") {
        ajaxCustomAction(id);
      }


  }


}













