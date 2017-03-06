(function ($) {
    
    $('.video-player').videoPlayer();
    
     $("div.lazyload").lazyload();
    
      $(window).resize(function(){
        if ($('.responsive-navigation').is(':visible')) { 
            var currentWidth = $('.responsive-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.responsive-navigation').css('width', newWidth + 'px');
            }
        }
    });
    
    $('.forceLoginModal').loginModal({
        onLoad: function () {
            $("#loginForm").validateLoginForm();
            $("#signupForm").validateSignupForm();
        }
    });
    
    /*
     * Follow Blog on article page
     */ 
    $('.followArticleBtn').followBlog({
        onSuccess: function (data, obj) {
           ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " blog successfully."});                 
        },
        beforeSend: function (obj) {
            $(obj).html('please wait...');
        }
    });
    
  
    $('.shareIcons').SocialShare({
        onLoad: function (obj) {
            var title = obj.parents('div.article').find('.card__news-category').text();
            var url = obj.parents('div.article').find('a').attr('href');
            var content = obj.parents('div.article').find('.card__news-description').text();
            $('.rrssb-buttons').rrssb({
                title: title,
                url: url,
                description: content
            });
            setTimeout(function () {
                rrssbInit();
            }, 10);
        }
    });
    
    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });   
    
    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required email",
            message: "required",
        },
        // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: {
                required: "Email cannot be blank",
                email: "Please enter a valid email address"
            },
            message: "Message cannot be blank."
        }
    });
    
     /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/
    
    $('.uploadFileBtn').uploadFile({
           onSuccess: function(data, obj){
                var resultJsonStr = JSON.stringify(data);
                
                var imgClass = $(obj).data('imgcls');
                $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
                
                var fieldId = $(obj).data('id');
                $('#' + fieldId).val(resultJsonStr);
                
                $().General_ShowNotification({message: 'Image added successfully' });
            },
           onError: function(obj, errorMessage) {
                $().General_ShowErrorMessage({message: errorMessage});
            }
    });
    
    
    /**
     * Update Social Post From Listing
     */
    $('.editSocialPost').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        var url = elem.data('url');
        var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
        popup.focus();

        var intervalId = setInterval(function () {
            if (popup.closed) {
                clearInterval(intervalId);
                var socialId = elem.parents('a').data('id');
                if($('#updateSocial'+socialId).data('update') == '1') {
                    $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                }  
            }
        }, 50);

        return;
    });
    
    $('.search_icon').on('click', function (e) {        
        $(this).closest('input');
        var searchTerm = $('.search_block').find('input').val();
        if(!searchTerm.trim()){
            return false;
        }
    });
    
}(jQuery));


    


