var beeClass = '.bee';
        
        var rowOffset = 80, columnOffset = 48;
        var oddRowTopInit = 29, oddRowLeftInit = 29;
        var evenRowTopInit = 69, evenRowLeftInit = 5;

        var numOfRows, numOfColumns;

        $(function () {
            initialize();
        });

        $(window).resize(function () {
            defineGrid();
        });

        function initialize() {
            defineGrid();
            createBees();

            $.each($(beeClass), function (index, value) {
                $(value).blink();
            });
        }

        function defineGrid() {
            numOfRows = parseInt($(window).height() / (rowOffset / 2));
            numOfColumns = parseInt($(window).width() / columnOffset);
        }

        function createBees() {
            $('#beeContainer').empty();

            var beeNumber = $('#beeNumber').val();

            if (beeNumber > 50) {
                beeNumber = 50;
                $('#beeNumber').val(50);
            }
            else if (beeNumber < 0) {
                beeNumber = 0;
                $('#beeNumber').val(0);
            }

            for (var i = 0; i < beeNumber ; i++) {
                var newElem = $('<div>').addClass('bee').append(
                    $('<div>').addClass('head').append(
                        $('<div>').addClass('right-eye').append(
                            $('<div>').addClass('no-border right-eye-pupil')
                        ).append(
                            $('<div>').addClass('no-border body eyelid-top')
                        ).append(
                            $('<div>').addClass('no-border body eyelid-bottom')
                        )
                    ).append(
                        $('<div>').addClass('left-eye').append(
                            $('<div>').addClass('no-border left-eye-pupil')
                        ).append(
                            $('<div>').addClass('no-border body eyelid-top')
                        ).append(
                            $('<div>').addClass('no-border body eyelid-bottom')
                        )
                    )
                );

                $('#beeContainer').append(newElem);
            }
        }

        function beeNumChange() {
            initialize();
        }

        $.fn.blink = function() {
            this.css('top', oddRowTopInit + 'px');
            this.css('left', oddRowLeftInit + 'px');

            this.blinkAway();
        }

        $.fn.blinkAway = function() {
            var jqElem = this;

            jqElem.fadeOut('slow', function () {
                var left, top;

                var beePeriod = $('#beePeriod').val() * 1000;

                if (beePeriod > 50000) {
                    beePeriod = 50000;
                    $('#beePeriod').val(50);
                }
                else if (beePeriod < 1000) {
                    beePeriod = 1000;
                    $('#beePeriod').val(1);
                }

                var randRow = Math.floor((Math.random() * numOfRows) + 1);
                var randCol = Math.floor((Math.random() * numOfColumns) - 1);
                randCol = randCol <= 0 ? 1 : randCol;

                var newColumnOffset = randCol * columnOffset;

                //console.log(randRow + ', ' + randCol);

                if (randRow % 2 == 0) {
                    //even rows
                    top = evenRowTopInit + (((randRow - 2) / 2) * rowOffset);
                    left = evenRowLeftInit + newColumnOffset;
                }
                else {
                    //odd rows
                    top = oddRowTopInit + (((randRow - 1) / 2) * rowOffset);
                    left = oddRowLeftInit + newColumnOffset;
                }

                jqElem.css('top', top + 'px');
                jqElem.css('left', left + 'px');

                jqElem.fadeIn('slow', function () {
                    setTimeout(function () {
                        jqElem.blinkAway();
                    }, beePeriod);
                });
            });
        }