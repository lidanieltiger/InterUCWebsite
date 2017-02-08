$(document).ready(function() {
    $('#form').bootstrapValidator({
        //submitButtons: '#postForm',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },        
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Your name is required and cannot be empty'
                    },
                }
            },
            phonenumber: {
                validators: {
                    notEmpty: {
                        message: 'Phone number is required and cannot be empty'
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            school: {
                validators: {
                    notEmpty: {
                        message: 'The school name is required and cannot be empty'
                    },
                }
            },
            hosting: {
                validators: {
                    notEmpty: {
                        message: 'This cannot be empty'
                    }
                }
            }, 

        }
    })

    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        var url = 'https://script.google.com/macros/s/AKfycbzz0D4p57U7ho08GXa8H5RBHT-j_GYiEWoDEslGCk1A088htOM/exec';
        var redirectUrl = 'success-page.html';
        // show the loading 
        $('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
        var jqxhr = $.post(url, $form.serialize(), function(data) {
            console.log("Success! Data: " + data.statusText);
            $(location).attr('href',redirectUrl);
        })
            .fail(function(data) {
                console.warn("Error! Data: " + data.statusText);
                // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                    //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                    $(location).attr('href',redirectUrl);                
                }
            });
    });
});

(function($, undefined) {

    "use strict";

    // When ready.
    $(function() {
        
        var $form = $( "#form" );
        var $input = $("#number");

        $input.on( "keyup", function( event ) {
            
            
            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }
            
            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }
            
            var $this = $(this);
            var input = $this.val();
                    input = input.replace(/[\W\s\._\-]+/g, '');
                
                var split = 4;
                var chunk = [];

                for (var i = 0, len = input.length; i < len; i += split) {
                    split = ( i >= 6 ) ? 4 : 3;
                    chunk.push( input.substr( i, split ) );
                }

                $this.val(function() {
                    return chunk.join("-").toUpperCase();
                });
        
        } );
        
        /**
         * ==================================
         * When Form Submitted
         * ==================================
         */
        $form.on( "submit", function( event ) {
            
            var $this = $( this );
            var arr = $this.serializeArray();
        
            for (var i = 0; i < arr.length; i++) {
                    arr[i].value = arr[i].value.replace(/[($)\s\._\-]+/g, ''); // Sanitize the values.
            };
            
            console.log( arr );
            
            event.preventDefault();
        });
        
    });
})(jQuery);