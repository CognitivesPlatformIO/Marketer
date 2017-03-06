var HomeController = (function ($) {
    return {
        listing: function () {
            HomeController.Listing.init();
        },
        blog: function() {
            HomeController.Blog.init();
        }
    };
}(jQuery));

HomeController.Listing = (function ($) {

    var bindPinUnpinArticle = function(){
        $('button.PinArticleBtn').Ajax_pinUnpinArticle({
            onSuccess: function(data, obj){
                var status = $(obj).data('status');
                (status == 1) 
                    ? $(obj).attr('title', 'Un-Pin Article') 
                    : $(obj).attr('title', 'Pin Article');
               (status == 1) 
                    ? $(obj).find('span').first().html('Un-Pin') 
                    : $(obj).find('span').first().html('Pin');
            }
        });
    };
    
    var bindDeleteHideArticle = function(){
        $('button.HideBlogArticle').Ajax_deleteArticle({
            onSuccess: function(data, obj){
                $(obj).closest('.card').remove();
                var postsCount = $('body').find('.card').length;
                if(postsCount <= 0) {
                    $('.NoArticlesMsg').removeClass('hide');
                }
            }
        });
    };
    
    var bindSocialUpdatePost = function () {
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
                    if ($('#updateSocial' + socialId).data('update') == '1') {
                        $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                    }
                }
            }, 50);

            return;
        });
    };
    
    var bindSocialShareButton = function () {
        $(".card__social-share").on("click", function (e) {
            e.preventDefault();
            var elem = $(this);
            if (elem.hasClass('selected')) {
                $(this).removeClass("selected");
            } else {
                $(".card__social-share").removeClass('selected');
                $(this).addClass("selected");
            }
        });
    };
    
    var attachEvents = function () {
        if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            initSwap();
        }
        
        function initSwap() {
            initDroppable();
            initDraggable();
            
            //Bind pin/unpin article event
            bindPinUnpinArticle();

            //Bind delete social article & hide system article
            bindDeleteHideArticle();
            
            bindSocialUpdatePost();
            
            bindSocialShareButton();
            
            //Following will called on page load and also on load more articles
            $(".articleMenu, .socialMenu").delay(2000).fadeIn(500);            
        }

        function initDraggable() {
            $('.swap').draggable({
                helper: 'clone',
                revert: true,
                zIndex: 100,
                scroll: true,
                scrollSensitivity: 100,
                cursorAt: { left: 150, top: 50 },
                appendTo:'body',
//                containment: false,
                start: function( event, ui ) {

                    ui.helper.attr('class', '');
                    var postImage = $(ui.helper).data('article-image');
                    var postText = $(ui.helper).data('article-text');
                    if(postImage !== "") {
                        $('div.SwappingHelper img.article-image').attr('src', postImage);
                    }
                    else {
                        $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
                    }
                    $('div.SwappingHelper p.article-text').html(postText);
                    $(ui.helper).html($('div.SwappingHelper').html());    
                }
            });
        }

        function initDroppable() {
            $('.swap').droppable({
                hoverClass: "ui-state-hover",
                drop: function(event, ui) {
                    var sourceObj = $(ui.draggable);
                    var $this = $(this);
                    //get positions
                    var sourcePosition = sourceObj.data('position');
                    var sourcePostId = parseInt($(sourceObj).data('id'));
                    var sourceIsSocial = parseInt($(sourceObj).data('social'));
                    var destinationPosition = $this.data('position');
                    var destinationPostId = parseInt($($this).data('id'));
                    var destinationIsSocial = parseInt($($this).data('social'));
                    
                    var sourceBannerClass = '';
                    if ($(sourceObj).hasClass('card__banner')) {
                        sourceBannerClass = 'card__banner';
                        $(sourceObj).removeClass('card__banner');
                    }

                    var destinationBannerClass = '';
                    if ($($this).hasClass('card__banner')) {
                        destinationBannerClass = 'card__banner';
                        $($this).removeClass('card__banner');
                    }
                    
                    var draggableClass = sourceObj.attr('class')
                      , droppableClass = $this.attr('class');
                    

                    sourceObj.attr('class', draggableClass);
                    $this.attr('class', droppableClass);
    
                    $(this).after(ui.draggable.clone().removeAttr('style'));
                    $(ui.draggable).after($(this).clone());
                    $(ui.helper).remove(); //destroy clone
                    $(ui.draggable).remove();
                    $(this).remove();
                    
                    //swap positions
                    if(sourceIsSocial == 1) {
                        $('#Social'+sourcePostId).addClass(destinationBannerClass);
                        $('#Social'+sourcePostId).data('position', destinationPosition);
                        $('#Social'+sourcePostId).find('.PinArticleBtn').data('position', destinationPosition);
                    }
                    else {
                        $('#Article'+sourcePostId).addClass(destinationBannerClass);
                        $('#Article'+sourcePostId).data('position', destinationPosition);
                        $('#Article'+sourcePostId).find('.PinArticleBtn').data('position', destinationPosition);
                    }

                    if(destinationIsSocial == 1) {
                        $('#Social'+destinationPostId).addClass(sourceBannerClass);
                        $('#Social'+destinationPostId).data('position', sourcePosition);
                        $('#Social'+destinationPostId).find('.PinArticleBtn').data('position', sourcePosition);
                    }
                    else {
                        $('#Article'+destinationPostId).addClass(sourceBannerClass);
                        $('#Article'+destinationPostId).data('position', sourcePosition);
                        $('#Article'+destinationPostId).find('.PinArticleBtn').data('position', sourcePosition);
                    }
                  
                    var csrfToken = $('meta[name="csrf-token"]').attr("content");
                    var postData = {
                        sourcePosition: sourcePosition,
                        sourceArticleId: sourcePostId,
                        sourceIsSocial: sourceIsSocial,
                        
                        destinationPosition: destinationPosition,
                        destinationArticleId: destinationPostId,
                        destinationIsSocial: destinationIsSocial,
                        
                        _csrf: csrfToken
                    };
                    
                    $.ajax({
                        url: _appJsConfig.baseHttpPath + '/home/swap-article',
                        type: 'post',
                        data: postData,
                        dataType: 'json',
                        success: function(data){
                            if(data.success) {
                                $.fn.General_ShowNotification({message: "Articles swapped successfully"});
                            }
                            
                            $(".card p, .card h1").dotdotdot();
                            
                            initSwap();
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            //$().General_ShowErrorMessage({message: jqXHR.responseText});
                        },
                        beforeSend: function(jqXHR, settings) { 
                        },
                        complete: function(jqXHR, textStatus) {
                        }
                    });

                }
            }); 
        }
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadBlogArticles({
                onSuccess: function(data, textStatus, jqXHR){
                    if (data.success == 1) {
                        $('.ajaxArticles').data('existing-nonpinned-count', data.existingNonPinnedCount);

                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }
                        for (var i in data.articles) {
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['cardClass'] = '';
                            data.articles[i]['pinTitle'] = (data.articles[i].isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
                            data.articles[i]['pinText'] = (data.articles[i].isPinned == 1) ? 'Un-Pin' : 'Pin';
                            data.articles[i]['promotedClass'] = (data.articles[i].isPromoted == 1)? 'card_ads' : '';
                            data.articles[i]['hasArticleMediaClass'] = (data.articles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['id'] !== null) {
                               data.articles[i]['blogClass']= 'card--blog_'+data.articles[i].blog['id'];
                            }    
                            
                            var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;

                            data.articles[i]['userImageUrl'] = '';
                            if (data.articles[i]['createdBy']['media']['id'] !== '') {
                                var userImageUrl = $.image({media: data.articles[i]['createdBy']['media'], mediaOptions: {width: 100, height: 100, crop: 'thumb', gravity: 'face', radius: 'max'}});
                                data.articles[i]['userImageUrl'] = userImageUrl;
                            }                           
                            
                            Handlebars.registerHelper('encode', function(options) {
                                return encodeURIComponent(options.fn(this));
                            });
                          
                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasSocialMediaClass'] = (data.articles[i].social.hasMedia == 1)? 'withImage__content' : 'without__image';
                                data.articles[i]['videoClass'] = '';
                                if(data.articles[i].social.media.type && data.articles[i].social.media.type == 'video') {
                                    data.articles[i]['videoClass'] = 'video_card';
                                }
                                articleTemplate = Handlebars.compile(socialCardTemplate); 
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        
                        $('.video-player').videoPlayer();
                        
                        $(".card p, .card h1").dotdotdot();
                        
                        bindSocialShareButton();
                        
                        $("div.lazyload").lazyload({
                            effect: "fadeIn"
                        });
                        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
                            initSwap();
                        }
                    }
                 
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html("Please wait...");
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html("<i class='fa fa-arrow-down'></i> Load more");
                }
            });
        });
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Blog = (function ($) {
    
    var attachEvents = function () {
       
        //attach follow blog
        $('a.followBlog').followBlog({
            'onSuccess': function(data, obj){
                
            },
            'beforeSend': function(obj){
                $(obj).html("Please wait...");
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            }
        });
        
        //attach follow user
        $('.followUser').followUser({
            'onSuccess': function(data, obj){
                
            },
            'beforeSend': function(obj){
                $(obj).html("Please wait...");
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            }
        });
        
    };
    
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));