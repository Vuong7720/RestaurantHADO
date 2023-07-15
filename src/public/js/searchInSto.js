document.querySelector('.btn_search_admin').addEventListener('click', function (e) {
    e.preventDefault();
    var searchInput = document.getElementById('searchInput').value;
    localStorage.setItem('searchKeyword', searchInput);
    document.querySelector('form').submit();
});

window.addEventListener('DOMContentLoaded', function () {
    var searchKeyword = localStorage.getItem('searchKeyword');
    if (searchKeyword) {
        document.getElementById('searchInput').value = searchKeyword;
    }
    localStorage.removeItem('searchKeyword');
});