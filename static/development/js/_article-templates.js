/**
 * Handlebar Article templates for listing
 */

var systemCardTemplate = '<div  class="{{containerClass}} ">'+
            '<a itemscope itemtype="http://schema.org/NewsArticle" itemprop="url" href="{{url}}" class="card blocked_element swap card--technology {{cardClass}} {{hasArticleMediaClass}} {{promotedClass}} {{blogClass}}" data-id="{{articleId}}" data-position="{{position}}" data-social="0" data-article-image="{{{imageUrl}}}" data-article-text="{{title}}" id="Article{{articleId}}">'+
                    '<meta itemscope itemprop="mainEntityOfPage"  itemType="https://schema.org/WebPage" itemid="{{url}}"/>'+
                    '{{#if hasMedia}}  '+
                    '<div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">'+
                        '<meta itemprop="url" content="{{featuredMedia.media.url}}"/>'+
                        '<meta itemprop="width" content="{{featuredMedia.media.width}}"/>'+
                        '<meta itemprop="height" content="{{featuredMedia.media.height}}"/>'+
                    '</div>'+
                    '{{/if}}'+
                    '{{#if publisher.url}}  '+
                    '<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">'+
                        '<meta itemprop="name" content="{{publisher.name}}"/>'+
                        '<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">'+
                            '<meta itemprop="url" content="{{publisher.url}}"/>'+
                            '<meta itemprop="width" content="{{publisher.width}}"/>'+
                            '<meta itemprop="height" content="{{publisher.height}}"/>'+
                        '</div>'+
                    '</div>'+
                    '{{/if}}'+
                    '<meta itemprop="datePublished" content="{{metaPublishDate}}"/>'+
                    '<meta itemprop="dateModified" content="{{metaUpdateDate}}"/>'+
                '<div class="card__image lazyload" data-original="{{imageUrl}}" style="background-image:url({{templatePath}}/static/images/placeholder/placeholder.svg);">'+
		'<div class="card-icon"></div>'+
                '</div>'+
		'<div class="card__content">'+
                    '<div class="content-section">'+
			'<span class="card__category">{{label}}</span>'+
			'<h1 itemprop="headline" class="card__heading">{{{title}}}</h1>'+
			'<p itemprop="description" class="card__text">{{{excerpt}}}</p>'+
			'<div class="card__caption">'+
				'<div class="card__icon-social card__social-share">'+
					'<div class="tooltip">'+
                                            '<div onClick="window.open(\'http://www.facebook.com/sharer/sharer.php?u={{#encode}}{{url}}&title={{title}}{{/encode}}\', \'_blank\', \'toolbar=yes,scrollbars=yes,resizable=yes,width=360,height=400\');" class="tooltip__link tooltip__link--facebook"></div>'+
                                            '<div onClick="window.open(\'http://twitter.com/intent/tweet?status={{#encode}}{{title}}{{url}}{{/encode}}\', \'_blank\', \'toolbar=yes,scrollbars=yes,resizable=yes,width=360,height=400\');" class="tooltip__link tooltip__link--twitter"></div>'+
                                            '<div onClick="window.open(\'https://plus.google.com/share?url={{#encode}}{{url}}{{/encode}}\', \'_blank\', \'toolbar=yes,scrollbars=yes,resizable=yes,width=360,height=400\');" class="tooltip__link tooltip__link--google-plus"></div>'+
                                        '</div>'+
				'</div>'+
                                '{{#if userImageUrl }}'+
                                    '<div class="card__avatar" style="background-image:url({{userImageUrl}});"></div>'+
				'{{/if}}'+
                                '<div class="card__author" itemprop="author" itemscope itemtype="https://schema.org/Person">By <span itemprop="name">{{createdBy.displayName}}</span></div>'+
				'<div class="card__date">{{publishDate}}</div>'+
			'</div>'+
                     '</div>'+
		'</div>'+
		'{{#if userHasBlogAccess}}'+
			'<div class="btn_overlay articleMenu">'+
				'<button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0">'+
					'<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
				'</button>'+
				'<button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button">'+
					'<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
				'</button>'+
				'<button data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn  {{#if isPinned}} selected {{/if}}" type="button" data-status="{{isPinned}}">'+
					'<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
				'</button>'+
			'</div>'+
			"{{/if}}"+
		'</a>'+
	'</div>';
                                                
var socialCardTemplate =  
        '<div class="{{containerClass}}">' +
        '<a href="{{ social.url }}" id="Social{{socialId}}" target="_blank" class="card blocked_element swap card__{{social.source}} card_social {{hasSocialMediaClass}}  {{cardClass}} caption_bottom {{videoClass}}" data-id="{{socialId}}" data-position="{{position}}" data-social="1" data-article-image="{{social.media.path}}" data-article-text="{{{social.content}}}">'+
        '{{#if social.hasMedia}}'+
            '<div class="card__image lazyload"  data-original="{{social.media.path}}" style="background-image:url({{templatePath}}/static/images/placeholder/placeholder.svg)">'+
                '<div class="card-icon video-player" data-source="{{social.source}}" data-url="{{social.media.videoUrl}}" data-poster="{{social.media.path}}"></div>'+    
            '</div>' +
        '{{/if}}'+
        '<div class="card__content">'+
            '<div class="content-section">'+
                '<span class="card__category">{{social.source}}</span>'+
                '<p class="card__text" id="updateSocial{{socialId}}" data-update="0">{{{social.content}}}</p>'+
                '<div class="card__caption">'+
                '{{#if social.user.media.path }}'+
                    '<div class="card__avatar" style="background-image:url({{social.user.media.path}})"></div>'+
                '{{/if}}'+  
                '<div class="card__author">{{social.user.name}}</div>'+
                '<div class="card__date">{{social.publishDate}}</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
            '{{#if userHasBlogAccess}}'+
                '<div class="btn_overlay socialMenu">'+
                    '<button title="Hide" data-guid="{{social.guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="1">'+
                        '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                    '</button>'+
                    '<button title="Edit" class="btnhide social-tooltip editSocialPost" type="button" data-url="/admin/social-funnel/update-social?guid={{social.blog.guid}}&socialguid={{social.guid}}">'+
                    '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                    '</button>'+
                    '<button data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn  {{#if isPinned}} selected {{/if}}" type="button" data-status="{{isPinned}}">'+
                        '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                    '</button>'+
                '</div>'+
            '{{/if}}'+   
        '</a>' +
    '</div>';