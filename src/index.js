// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Eno for an oblique strategy"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
/**
 * Oblique Strategies for Programmers
 * https://github.com/RobBlackwell/oblique-strategies-for-programmers
 * used with permission from Rob Blackwell
 */
var OBLIQUE_STRATEGIES = require('./ObliqueStrategies');

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * EnoSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var EnoSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
EnoSkill.prototype = Object.create(AlexaSkill.prototype);
EnoSkill.prototype.constructor = EnoSkill;

EnoSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("EnoSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

EnoSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("EnoSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
EnoSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("EnoSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

EnoSkill.prototype.intentHandlers = {
    GetNewFactIntent: function (intent, session, response) {
        handleNewFactRequest(response);
    },

    HelpIntent: function (intent, session, response) {
        response.ask("You can ask Eno tell me an oblique strategy, or, you can say exit... What can I help you with?");
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * OBLIQUE_STRATEGIES.length);
    var fact = OBLIQUE_STRATEGIES[factIndex];

    // Create speech output
    var speechOutput =  fact;

    response.tellWithCard(speechOutput, "Eno", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the EnoSkill skill.
    var enoSkill = new EnoSkill();
    enoSkill.execute(event, context);
};

