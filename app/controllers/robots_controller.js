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
        .then((robots) => {
            console.log(robots);
            // res.send(robots);
            res.render('../views/robots/index.ejs', { robots: robots });
        })
        .catch((err) => {
            console.log('There was an error querying robots', JSON.stringify(err))
            return res.send(err)
        });
});

/* CREATE */

router.post('/robots', function(req, res, next) {
    console.log("CAPTURING FORM DATA:", req.body)
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

        res.render('robots/new', {
            page_title: 'Add a new Robot',
            form_action: create_robot_path,
            robot: {name: robot_name, description: robot_description} // pass-back attempted values to the form in case one was not blank
        });
    } else {
        return models.Robot.findAll()
            var robot = models.Robot.findOne({name: robot_name})
            // .where({name: robot_name}) // look-up robot by unique name
            .then((robot) => {
                if (robot.length > 0) {
                    var bot = bots[0];
                    console.log(bot)
                    req.flash('danger', 'Found an Existing Robot named '+robot_name );
                    res.render('robots/new', {
                        page_title: 'Add a new Robot',
                        form_action: create_robot_path,
                        robot: {name: robot_name, description: robot_description} // pass-back attempted values to the form in case one was not blank
                    });
                } else {
                    return models.Robot.findAll()
                        .then((robots) => {
                            console.log(robots);
                            // res.send(robots);
                            res.insert([{'name': robot_name, 'description': robot_description}], 'id')
                        })
                        .then(function(bot_id){
                            console.log(bot_id)
                            req.flash('info', 'Created a New Robot named '+robot_name );
                            res.redirect('/robots')
                        });
                }
            });
    }
});
    //     // Create a Note
    //     const new_robot = new Robot({
    //         name: robot_name,
    //         description: robot_description
    //     });

    //     // Save Note in the database
    //     new_robot.save()
    //     .then(data => {
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the Note."
    //         });
    //     });
    // }

/* NEW */
// this must come above the SHOW action else express will think the word 'new' is the :id

router.get('/robots/new', function(req, res, next) {
    console.log("NEW ROBOT")
    res.render('robots/new', {
        page_title: 'Add a new Robot',
        form_action: create_robot_path
    });
});

/* SHOW */

router.get('/robots/:id', function(req, res, next) {
    var robot_id = req.params.id;
    // knex("robots")
    //     .where({id: robot_id})
    //     .then(function(bots){
    //         if (bots.length > 0) {
    //             var bot = bots[0];
    //             console.log("SHOW ROBOT:", bot);
    //             res.render('robots/show', {
    //                 page_title: 'Robot #'+bot.id,
    //                 robot: bot
    //             });
    //         } else {
    //             console.log("COULDN'T SHOW ROBOT #"+robot_id);
    //             req.flash('danger', "Couldn't find Robot #"+robot_id);
    //             res.redirect('/robots');
    //         }
    //     });
});

/* EDIT */

router.get('/robots/:id/edit', function(req, res, next) {
    var robot_id = req.params.id;
    // knex("robots")
    //     .where({id: robot_id})
    //     .then(function(bots){
    //         if (bots.length > 0) {
    //             var bot = bots[0];
    //             console.log("EDIT ROBOT:", bot);
    //             res.render('robots/edit', {
    //                 page_title: 'Edit Robot #'+bot.id,
    //                 robot: bot,
    //                 form_action: updateRobotPath(bot.id)
    //             });
    //         } else {
    //             console.log("COULDN'T FIND ROBOT #"+robot_id);
    //             req.flash('danger', "Couldn't find Robot #"+robot_id);
    //             res.redirect('/robots');
    //         }
    //     });
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
        // knex('robots')
        //     .where({id: robot_id})
        //     .update({name: robot_name, description: robot_description})
        //     .then(function(number_of_affected_rows){
        //         console.log("UPDATED", number_of_affected_rows, "ROBOT")
        //         req.flash('success', 'Updated Robot #'+robot_id );
        //         res.redirect('/robots')
        //     });
    }

});

/* DESTROY */

router.post('/robots/:id/destroy', function(req, res, next) {
    var robot_id = req.params.id
    // knex("robots")
    //     .where({id: robot_id})
    //     .del()
    //     .then(function(number_of_affected_rows){
    //         console.log("DELETED", number_of_affected_rows, "ROBOT")
    //         req.flash('success', 'Deleted Robot #'+robot_id );
    //         res.redirect('/robots')
    //     });
});

module.exports = router;
