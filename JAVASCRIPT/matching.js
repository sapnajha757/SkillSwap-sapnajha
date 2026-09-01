// ======================================
// SKILLSWAP - MATCHING SYSTEM
// ======================================


// ======================================
// 1. CHECK TWO-WAY MATCH
// ======================================

function checkMatch(userA, userB) {

    // User A jo skills teach karta hai
    const aTeachesBNeeds =
        userA.teach.some(function (skill) {

            return userB.learn.includes(skill);

        });


    // User B jo skills teach karta hai
    const bTeachesANeeds =
        userB.teach.some(function (skill) {

            return userA.learn.includes(skill);

        });


    // Dono conditions true honi chahiye
    if (aTeachesBNeeds && bTeachesANeeds) {

        return true;

    }


    return false;
}



// ======================================
// 2. CALCULATE MATCH SCORE
// ======================================

function calculateMatchScore(userA, userB) {

    let score = 0;


    // A ki teaching skills
    // B ki learning skills se match

    userA.teach.forEach(function (skill) {

        if (userB.learn.includes(skill)) {

            score++;

        }

    });


    // B ki teaching skills
    // A ki learning skills se match

    userB.teach.forEach(function (skill) {

        if (userA.learn.includes(skill)) {

            score++;

        }

    });


    return score;
}



// ======================================
// 3. FIND MATCHES FOR A USER
// ======================================

function findMatches(currentUser, users) {

    const matches = [];


    users.forEach(function (user) {

        // Khud ko match mat karo
        if (user.id === currentUser.id) {

            return;

        }


        const score =
            calculateMatchScore(
                currentUser,
                user
            );


        // Agar at least 1 skill match hai
        if (score > 0) {

            matches.push({

                user: user,

                score: score

            });

        }

    });


    // Highest score first
    matches.sort(function (a, b) {

        return b.score - a.score;

    });


    return matches;
}



// ======================================
// 4. TEST DATA
// ======================================

const userA = {

    id: 1,

    name: "Vaishnavi",

    teach: [
        "HTML",
        "CSS",
        "JavaScript"
    ],

    learn: [
        "Python",
        "React"
    ]

};


const userB = {

    id: 2,

    name: "Rahul",

    teach: [
        "Python",
        "DSA"
    ],

    learn: [
        "JavaScript",
        "CSS"
    ]

};



// ======================================
// 5. TEST MATCH
// ======================================

const isMatch =
    checkMatch(userA, userB);


console.log(
    "Are they a two-way match?",
    isMatch
);



// ======================================
// 6. TEST SCORE
// ======================================

const matchScore =
    calculateMatchScore(
        userA,
        userB
    );


console.log(
    "Match Score:",
    matchScore
);