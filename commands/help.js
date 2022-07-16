// Help Function will list all the ways by which you can run the commands of this project
function helpFn()  
{
    console.log(`List of all the commands:-
                              1) tree -> node FOproject.js tree <dirPath>
                              2) organize -> node FOproject.js organize <dirPath>
                              3) help -> node FOproject.js help`) ;
}


module.exports = {
    helpFnKey : helpFn
}