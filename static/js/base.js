function check_login() {
    $.ajax({
        type: "GET",
        url: '/api/v1/check_login',
        headers: {
            "Authorization": "Token " + localStorage.webtoken
        },
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (response) {
            localStorage.login_first = response['login_first']
            localStorage.login_last = response['login_last']
            localStorage.logintype = response['type']
            document.getElementById('a_username').innerHTML = response['login_first'] + ' ' + response['login_last']
            document.getElementById('quit').style.display = ''
            document.getElementById('back_main').style.display = ''
            document.getElementById('timetab').style.display = ''
            if (response['type'] === 'Doctor') {
                document.getElementById('create_note').style.display = ''
            } else {
                document.getElementById('create_note').style.display = 'none'
            }
        },
        error: function (response) {
            localStorage.webtoken = null
            localStorage.login_first = null
            localStorage.login_last = null
            localStorage.logintype = null
            document.getElementById('quit').style.display = 'none'
            document.getElementById('back_main').style.display = 'none'
            document.getElementById('create_note').style.display = 'none'
            document.getElementById('timetab').style.display = 'none'
            document.location.href = '/login'
        },
    });
}

function logout() {
    $.ajax({
        type: "POST",
        url: '/auth/token/logout/',
        headers: {
            "Authorization": "Token " + localStorage.webtoken
        },
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (response) {
            localStorage.webtoken = null
            localStorage.login = null
            document.getElementById('quit').style.display = 'none'
            document.location.href = '/'
        },
        error: function (response) {
            localStorage.login = response['login']
            document.getElementById('quit').style.display = ''
        },
    });
}

function _showTimetable(response) {
    console.log(response)
    var c = [];
    c.push("<table class='table'><tbody>")
    c.push("<tr><th>Доктор</th><th>Понедельник</th><th>Вторник</th><th>Среда</th><th>Четверг</th><th>Пятница</th><th>Суббота</th><th>Воскресенье</th></tr>")
    $.each(response, function (i, item) {
        c.push("<tr><td>" + item.doctor.first_name + " " + item.doctor.last_name + "</td><td>" + item.monday + "</td><td>" + item.thursday + "</td><td>" + item.wednesday + "</td><td>" + item.tuesday + "</td><td>" + item.friday + "</td><td>" + item.saturday + "</td><td>" + item.sunday + "</td></tr>");
    });
    c.push("<tbody><table>")
    $('#myTable tbody').html(c.join(""));
}

function show_timetable() {
    console.log('fgfg')
    $.ajax({
        type: "GET",
        url: '/api/v1/show_timetable',
        headers: {
            "Authorization": "Token " + localStorage.webtoken
        },
        data: {
            csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        success: function (response) {
            _showTimetable(response);
        },
    });
}


