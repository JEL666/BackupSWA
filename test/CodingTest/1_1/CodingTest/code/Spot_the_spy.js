/*
문제 설명
스파이를 찾아라!
문제
준식이는 수열 A[1], A[2], ..., A[N] (N ≥ 3) 을 가지고 있다. 이 수열에서 단 한 개의 수를 제외하고 나머지 수는 모두 같다. 그 수는 수열에서 몇 번째에 위치할까?

입력
첫째 줄에 테스트 케이스의 개수 T 가 주어진다.

각 테스트 케이스의 첫째 줄에 수열의 길이 N (3 ≤ N ≤ 100)이 주어진다.

둘째 줄에 A[1], A[2], ..., A[N]이 주어진다. 수열의 i번째 원소는 정수 A[i] (1 ≤ A[i] ≤ 100)이다.

주어지는 수열에서 단 한 개의 수를 제외하고 나머지 수는 모두 같다.

출력
각 테스트 케이스마다 문제의 정답이 수열에서 몇 번째에 위치하는지 출력한다.

예제 입력 1
6
4
11 13 11 11
5
1 4 4 4 4
10
3 3 3 3 10 3 3 3 3 3
3
20 20 10
3
5 6 6
3
7 7 6
예제 출력 1
2
1
5
3
1
3
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let cnt = 0
rl.on('line', function (line) {
    if(cnt % 2 == 0 && cnt != 0){
        input.push(line.split(" "))
    }
    
    cnt++
}).on('close', function () {
      input
        .map(val => val.findIndex((val, idx, arr) => val !== (arr[0] != arr[1] ? arr[2] : arr[0])) + 1)
        .forEach(val => console.log(val))
});