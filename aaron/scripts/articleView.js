'use strict';
/* global articles */

let articleView = {};

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENTED: Where is this function called? Why?
// This function is called in new.html at the bottom of the page in order to execute the appropriate functions.
articleView.initNewArticlePage = () => {
  // TODONE: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
  $('.tab-content').show();

  // TODONE: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function() {
    this.select();
  });

  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODONE: Add an event handler to update the preview and the export field if any inputs change.
  $('#new-article-form').on('change', articleView.create);
};

articleView.create = () => {
  // TODONE: Set up a variable to hold the new article data we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  $('#articles').empty();

  let newArticleData = {
    title: $('#title').val(),
    body: $('#body').val(),
    author: $('#author').val(),
    authorUrl: $('#authorUrl').val(),
    category: $('#category').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
    //published?
  };

  // TODONE: Instantiate an article based on what's in the form fields:
  let newArticle = new Article(newArticleData);

  // TODONE: Use our interface to the Handblebars template to put this new article into the DOM:
  $('#articles').append(newArticle.toHtml());

  // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
  $('pre code').each();

  // TODONE: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  let json = JSON.stringify(newArticle);
  $('#export-field').show();
  $('#article-json').val(json);
};

// COMMENTED: Where is this function called? Why?
// This function is called in index.html in order to be rendered to the proper html file since there is more than one now.
articleView.initIndexPage = () => {
  articles.forEach(article => $('#articles').append(article.toHtml()));
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
