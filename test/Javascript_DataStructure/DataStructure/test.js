// var idiots = {
//     name: 'idiots',
//     genre: 'punk rock',
//     members: {
//         roto: {
//             memberName: 'roto',
//             play : function() {
//                 console.log(`band ${this.name} ${this.memberName} play start`)
//             }
//         }
//     }
// }
// idiots.members.roto.play()
// const solution = (participant, completion) =>
//     failerName(count(participant), count(completion));

// const failerName = (participant, completion) => go(
//     participant,
//     entries,
//     find(([name, count]) => (completion[name] || 0) < count),
//     head
// );


function RockBand(members){
    this.members = members;
    this.perform = function() {
        setTimeout(function() {
            this.members.forEach(function(member){
                members.perform();
            })
        }, 1000)
    }
}

var theOralCigarettes = new RockBand([
    {
        name: 'takuya',
        perform: function(){
            console.log('Sing: a e u i a e u i')
        }
    }
]);

theOralCigarettes.perform();