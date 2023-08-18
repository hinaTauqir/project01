#!/usr/bin/env node
import promptSync from "prompt-sync";
const prompt = promptSync();
//let prompt = require('prompt-sync')();
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let score = 0;
let grade = false;
function wait() {
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
}
async function welcome() {
    console.log(`Hello eveyone`);
    let title = chalkAnimation.neon(`                 "GUESSING GAME"\n`);
    await wait();
    title.stop();
    let subTitle = chalkAnimation.rainbow("      Welcome in NUMBER guessing game");
    await wait();
    subTitle.stop();
    console.log(`\n  ${chalk.red("NOTE")}: You have 3 oportunities for number guessing`);
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let askQuestion = (rand) => {
    for (let i = 0; i < 3; i++) {
        let value = parseInt(prompt(`enter the number from 1 to 20      `));
        if (value == rand) {
            console.log((chalk.green(`        RIGHT ANSWER       \n yours guess is correct`)));
            grade = true;
            break;
        }
        else {
            console.log(`${chalk.red("WRONG ANSWER")}\n`);
            if (i <= 1) {
                console.log(` ${chalk.yellow("yours guess is wrong, plz try again")}`);
            }
            ;
        }
    }
    if (grade == true) {
        return 10;
    }
    else {
        return 0;
    }
};
function again() {
    let againV = prompt((chalk.blue(`do you want to play again press "y" or "n"     `)));
    if (againV.toLowerCase() == "y" || againV.toLowerCase() == "yes") {
        grade = false;
        steps();
    }
    else if (againV.toLowerCase() == "n" || againV.toLowerCase() == "no") {
        console.log(chalk.blueBright(`Thanku for playing  \n        your score is :    ${score}`));
        console.log(chalk.green(`       THANK YOU \n         GOOD BYE`));
    }
    else {
        console.log(` ${chalk.red(`invalid : plz enter the correct word`)}`);
        again();
    }
}
function scoreCal(val) {
    score = score + val;
}
async function steps() {
    await welcome();
    let randN = randomNumber(1, 20);
    //console.log(randN);
    let score1 = await askQuestion(randN); //try{ error handling
    //  }catch(err){ console.log(err)}
    await scoreCal(score1);
    await again();
}
steps();
