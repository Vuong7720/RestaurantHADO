var checkboxAll = document.getElementById("checkbox-all");
var checkboxItems = document.querySelectorAll('input[name="collectionIds"]');
var btnSubmitCheckAll = document.querySelector(".btn-submitAllChecked")
checkboxAll.onchange = function() {
    var isCheckedAll = checkboxAll.checked;

    checkboxItems.forEach(function(checkbox) {
        checkbox.checked = isCheckedAll;
    });
    renderSubmitCheckAll()
};
checkboxItems.forEach(function(checkbox) {
    checkbox.onchange = function() {
        var isCheckedAll = checkboxItems.length ===  document.querySelectorAll('input[name="collectionIds"]:checked').length;

        checkboxAll.checked = isCheckedAll;
        renderSubmitCheckAll()
    }
})
function renderSubmitCheckAll (){
    var checkedCount = document.querySelectorAll('input[name="collectionIds"]:checked').length;
     
     if (checkedCount > 0) {
        btnSubmitCheckAll.classList.remove('disabled');
    } else {
        btnSubmitCheckAll.classList.add('disabled');
    }
 }
 
 console.log(btnSubmitCheckAll)