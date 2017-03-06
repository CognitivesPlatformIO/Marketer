(function ($) {
    
    /**
     * Follow Unfollow blog on profile page
     */
    $('.FollowUnfollowBlog').followBlog({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }  
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    
    /**
     * Follow Profile User on Profile Page
     */
    $('.FollowProfileUser').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " user successfully."});   
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
  
    /**
     * Follow Unfollow Writer on profile page
     */
    $('.FollowUnfollowWriter').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    /**
     * Follow Unfollow User On Profile page
     */
    $('.FollowUnfollowUser').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }
        },
        onError: function (obj, errorMessage) {
            $().General_ShowErrorMessage({message: errorMessage});
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    

}(jQuery));


    


