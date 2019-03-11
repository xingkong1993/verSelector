function get_options() {
    $("select").each(function () {
        $(this).empty();
        var html = "<option value=''>请选择</option>";
        $.each(city, function (i, v) {
            $.each(v, function (k, items) {
                html += "<option value='" + k + "'>" + items.name + "</option>";
            })
        });
        $(this).html(html);
        if ($(this).data("selector")) {
            $(this).next(".verSelector").find(".verSelector-option").html(html)
        }

    });
}

$(function () {
    get_options();
})