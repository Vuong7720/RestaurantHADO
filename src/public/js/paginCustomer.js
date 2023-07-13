$('#pagi').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14],
    pageSize:1,
    afterPageOnClick: function(event, pageNumber){
        loadPage(pageNumber)
    }
})

function loadPage(page) {
    fetch('/admin/account?page=' + page)
      .then(rs => console.log(rs.sumPage))
      .catch(err => console.log(err));
  }