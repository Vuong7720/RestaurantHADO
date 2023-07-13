document.querySelector('.btn_search_admin').addEventListener('click', function (e) {
    e.preventDefault();
    var searchInput = document.getElementById('searchInput').value;
    localStorage.setItem('searchKeyword', searchInput);
    // Gửi biểu mẫu tìm kiếm
    document.querySelector('form').submit();
});

// Khi tải lại trang, lấy từ khóa tìm kiếm từ localStorage và đặt lại vào ô tìm kiếm
window.addEventListener('DOMContentLoaded', function () {
    var searchKeyword = localStorage.getItem('searchKeyword');
    if (searchKeyword) {
        document.getElementById('searchInput').value = searchKeyword;
    }
    // Xóa từ khóa tìm kiếm từ localStorage
    localStorage.removeItem('searchKeyword');
});