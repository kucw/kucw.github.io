function initAlgoliaSearchBtn() {
  const onPopupOpen = () => {
    document.body.style.overflow = 'hidden';
    document.querySelector('#algolia-search-pop-overlay').classList.add('algolia-search-active');
    document.querySelector('.search-input').focus();
  };

  const onPopupClose = () => {
    document.body.style.overflow = '';
    document.querySelector('#algolia-search-pop-overlay').classList.remove('algolia-search-active');
  };

  // Handle and trigger popup window
  document.querySelector('#algolia-search-btn').addEventListener('click', onPopupOpen);

  // Handle and trigger popup close
  document.querySelector('#algolia-search-pop-overlay').addEventListener('click', event => {
    if (event.target === document.querySelector('#algolia-search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('#algolia-popup-btn-close').addEventListener('click', onPopupClose);
  window.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
}

// Algolia Search Setting
function initAlgoliaSearchPopupForm() {

  const search = instantsearch({
    indexName: 'kucw.io',
    searchClient: algoliasearch('LB9VJATMTL', '8e4a5c5f034be6597df6847ea913cd0b'),
    searchFunction: helper => {
      if (helper.state.query === '') {
        document.querySelector('#algolia-results').style.visibility = 'hidden';
      } else {
        document.querySelector('#algolia-results').style.visibility = 'visible';
        helper.search();
      }
    }
  });

  search.addWidgets([

    instantsearch.widgets.searchBox({
      container: '#algolia-search-input-container',
      placeholder: '搜尋文章',
      // Hide default icons of algolia search
      showReset: false,
      showSubmit: false,
      cssClasses: {
        input: 'search-input'
      },
      showLoadingIndicator: false,
    }),

    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: (data) => {
          let link = data.url;
          let keywords = data._highlightResult.title.matchedWords.join(",");
          return `<a href="${link}" class="algolia-hit-item-link js-algolia-search-result" data-search-keyword="${keywords}">${data._highlightResult.title.value}</a>`;
        },
        empty: data => {
          return `<div class="algolia-hits-empty">找不到相關文章</div>`;
        },
        cssClasses: {
          item: 'algolia-hit-item'
        }
      },
    }),

    instantsearch.widgets.configure({
      hitsPerPage: 7,
    }),

    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo: false,
      showFirst: true,
      showLast: true,
      templates: {
        first: '<span aria-hidden="true">&laquo;&laquo;</span>',
        last: '<span aria-hidden="true">&raquo;&raquo;</span>',
        previous: '<span aria-hidden="true">&laquo;</span>',
        next: '<span aria-hidden="true">&raquo;</span>'
      },
      cssClasses: {
        root: 'pagination',
        item: 'page-item',
        link: 'page-link',
        selectedItem: 'active',
        disabledItem: 'disabled'
      }
    }),
  ]);

  search.start();

}
