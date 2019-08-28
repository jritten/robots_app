var express = require('express');
var router = express.Router();

var create_robot_path = '/robots/';
var models  = require('../models');

function updateRobotPath(robot_id){
    return '/robots/'+robot_id+'/update';
};

/* INDEX */

router.get('/robots', function(req, res, next) {
    return models.Robot.findAll()
    // .then((robots) => {
    //     // console.log(robots);
    //     res.render('../views/robots/index.ejs', { robots: robots });
    // })
    .then(function(bots){
        // console.log("LIST", bots.length, "ROBOTS:", bots)
        res.render('robots/index', {
            page_title: 'Robots',
            robots: bots
        });
    })
    .catch((err) => {
        console.log('There was an error querying robots', JSON.stringify(err))
        return res.send(err)
    });
});

/* CREATE */

router.post('/robots', function(req, res, next) {
    // console.log("CAPTURING FORM DATA:", req.body)
    var robot_name = req.body.robotName;
    var robot_description = req.body.robotDescription;
    if (!robot_name || !robot_description) {
        // console.log("DETECTED BLANK (BUT NOT NULL) ATTRIBUTE VALUES")
        if (!robot_name) {
            req.flash('danger', "Robot name can't be blank. Please revise and re-submit.")
        }

        if (!robot_description) {
            req.flash('danger', "Robot description can't be blank. Please revise and re-submit.")
        }

        res.render('robots/new', {
            page_title: 'Add a new Robot',
            form_action: create_robot_path,
            robot: {name: robot_name, description: robot_description} // pass-back attempted values to the form in case one was not blank
        });
    } else {
        models.Robot.findOne({name: robot_name}) // look-up robot by unique name
        .then((robot) => {
            if (robot.length > 0) {
                var bot = bots[0];
                // console.log(bot)
                req.flash('danger', 'Found an Existing Robot named '+robot_name );
                res.render('robots/new', {
                    page_title: 'Add a new Robot',
                    form_action: create_robot_path,
                    robot: {name: robot_name, description: robot_description} // pass-back attempted values to the form in case one was not blank
                });
            } else {
                models.Robot.create({'name': robot_name, 'description': robot_description}, 'id')
                .then(function(bot_id){
                    // console.log(bot_id)
                    req.flash('info', 'Created a New Robot named '+robot_name );
                    res.redirect('/robots')
                });
            }
        });
    }
});

/* NEW */
// this must come above the SHOW action else express will think the word 'new' is the :id

router.get('/robots/new', function(req, res, next) {
    // console.log("NEW ROBOT")
    res.render('robots/new', {
        page_title: 'Add a new Robot',
        form_action: create_robot_path
    });
});

/* SHOW */

router.get('/robots/:id', function(req, res, next) {
    var robot_id = req.params.id
    // models.Robot.findOne({id: robot_id}) // look-up robot by unique id
    models.Robot.find({
        where: {id: robot_id} // look-up robot by unique id
        })
    .then(function(bots){
        if (bots.length > 0) {
            var bot = bots[0];
            console.log("SHOW ROBOT:", bot);
            res.render('robots/show', {
                page_title: 'Robot #'+bot.id,
                robot: bot
            });
        } else {
            console.log("COULDN'T SHOW ROBOT #"+robot_id);
            req.flash('danger', "Couldn't find Robot #"+robot_id);
            res.redirect('/robots');
        }
    });
});

/* EDIT */

router.get('/robots/:id/edit', function(req, res, next) {
    var robot_id = req.params.id;
    models.Robot.findOne({id: robot_id}) // look-up robot by unique id
    // models.Robot.findOne({
    //     where: {id: robot_id} // look-up robot by unique id
    //     })
    .then(function(bots){
        if (bots.length > 0) {
            var bot = bots[0];
            console.log("EDIT ROBOT:", bot);
            res.render('robots/edit', {
                page_title: 'Edit Robot #'+bot.id,
                robot: bot,
                form_action: updateRobotPath(bot.id)
            });
        } else {
            console.log("COULDN'T FIND ROBOT #"+robot_id);
            req.flash('danger', "Couldn't find Robot #"+robot_id);
            res.redirect('/robots');
        }
    });
});

/* UPDATE */

router.post('/robots/:id/update', function(req, res, next) {
    console.log("CATURED FORM DATA", req.body)
    var robot_id = req.params.id;
    var robot_name = req.body.robotName;
    var robot_description = req.body.robotDescription;

    if (!robot_name || !robot_description) {
        console.log("DETECTED BLANK (BUT NOT NULL) ATTRIBUTE VALUES")
        if (!robot_name) {
            req.flash('danger', "Robot name can't be blank. Please revise and re-submit.")
        }

        if (!robot_description) {
            req.flash('danger', "Robot description can't be blank. Please revise and re-submit.")
        }

        res.render('robots/edit', {
            page_title: 'Edit Robot #'+robot_id,
            form_action: updateRobotPath(robot_id),
            robot: {name: robot_name, description: robot_description} // pass-back attempted values to the form in case one was not blank
        });
    } else {
        models.Robot.find({
            where: {id: robot_id} // look-up robot by unique id
            })
            .updateAttributes({name: robot_name, description: robot_description})
            // models.Robot.update({name: robot_name, description: robot_description}, {where: {id: robot_id} })
            .then(function(number_of_affected_rows){
                console.log("UPDATED", number_of_affected_rows, "ROBOT")
                req.flash('success', 'Updated Robot #'+robot_id );
                res.redirect('/robots')
            });
    }

});

/* DESTROY */

router.post('/robots/:id/destroy', function(req, res, next) {
    var robot_id = req.params.id;
    // var robots = models.Robot.findAll();
    // var robots = models.Robot.findAll().filter(robot => {
    //     return robot.id != robot_id;
    // });
    models.Robot.destroy({
        where: {id: robot_id}
    })
    // console.log(robots);
    .then(function(number_of_affected_rows){
        console.log("DELETED", number_of_affected_rows, "ROBOT")
        req.flash('success', 'Deleted Robot #'+robot_id );
        res.redirect('/robots')
    });
});

module.exports = router;
