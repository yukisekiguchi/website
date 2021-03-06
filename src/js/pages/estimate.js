(function () {
  window.monacaPages = window.monacaPages || [];

  monacaPages["/service/estimate/index.html"] = function (loginData) {
    $('.form-error').hide();
    $('.form-error-detail').hide();


    $('#send_feedback').on('click', function () {

      // disable submit button
      $('#send_feedback').prop('disabled', true);

      // setup parameters to send
      var data = {};
      $('#content input[type=text],textarea').each(function (index, el) {
        data[$(el).attr('name')] = $(el).val();
      });

      // hide old errors
      $('.form-error').hide();

      // post estimate API
      $.ajax({
        type: 'POST',
        url: 'https://www.asial.co.jp/api/estimate.php',
        dataType: 'json',
        data: data,
        success: function (data) {

          // error!
          if (data.success != 1) {
            for (var name in data.errors) {
              if (name == 'comment') {
                // show textarea error
                $('#content textarea[name=' + name + ']').closest('table').find('p.form-error-detail').html(data.errors[name]).show();
              } else {
                // show input[text] error
                $('#content input[name=' + name + '] + p.form-error')
                  .html(data.errors[name])
                  .show();
              }
            }

            // enable submit button
            $('#send_feedback').prop('disabled', false);

            return;
          }

          // success!
          location.href = '/service/estimate/thankyou.html';
        },
        error: function () {
          alert('データ送信中にエラーが発生しました');
        }
      });
    });
  }
})();