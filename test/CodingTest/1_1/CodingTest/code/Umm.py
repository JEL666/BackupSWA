"""
문제 설명
Umm… 문자열 2
문제
01/10 16:10부로 문제 출력 형식이 변경되고 제한이 늘어났습니다.

Umm 문자열이란 알파벳 대문자 U 뒤에 알파벳 소문자 m 이 2개 이상 연속하는 문자열이다. 예를 들어 다음과 같은 문자열이 Umm 문자열이다.

Umm
Ummm
Ummmm
그러나 다음과 같은 문자열은 Umm 문자열이 아니다.

U
Um
mm
UmmmU
UmmUmm
첫 번째 문자열은 U 뒤에 m 이 없기 때문에 Umm 문자열이 아니다.

두 번째 문자열을 U 뒤에 m 이 2개 이상 연속하지 않았기 때문에 Umm 문자열이 아니다.

세 번째 문자열은 U 가 없기 때문에 Umm 문자열이 아니다.

네 번째 문자열은 U 뒤에 m 이 두 번 이상 연속했지만, 알파벳 대문자 U 가 이어서 등장했기 때문에 Umm 문자열이 아니다.

다섯 번째 문자열은 Umm 과 Umm 각각은 Umm 문자열이 맞지만, 이를 이어 붙인 UmmUmm 은 Umm 문자열이 아니다.

성빈이는 임의의 문자열에서 연속한 일부분을 떼어서 관찰하는게 취미다. 예를 들어 "swacademy" 라는 문자열이 주어졌을 때 성빈이는 2번째 문자 'w' 부터 5 번째 문자 'a' 까지 연속한 일부분을 떼어서 "waca" 라는 문자열을 관찰할 수 있다.

성빈이는 어느 날 알파벳 대문자 U 와 알파벳 소문자 m 만으로 이루어진 문자열 S 를 발견했다. 그런데 문자열 S 가 너무 길었고, 성빈이는 연속한 부분을 떼어서 관찰하는 행동을 아주 많이 하고 싶다.

이 문자열에서 A 번째 문자부터 B 번째 문자까지 연속한 부분을 떼어서 관찰했을 때, 그 문자열이 Umm 문자열인지 알아보자.

입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다.

각 테스트 케이스의 첫째 줄에 문자열 S 의 길이 N (1 ≤ N ≤ 200 000) 과 성빈이의 관찰 횟수 M (1 ≤ M ≤ 200 000) 이 주어진다.

둘째 줄에 알파벳 대문자 U 와 알파벳 소문자 m 으로만 이루어진 문자열 S 가 주어진다.

셋째 줄부터 M 개의 줄에 정수 A, B (1 ≤ A ≤ B ≤ N) 가 주어진다.

모든 테스트 케이스의 N 이나 M의 합은 200 000 을 넘지 않는다.

출력
각 테스트 케이스에서 문자열 S 의 A 번째 문자부터 B 번째 문자까지 연속한 부분을 떼어서 관찰했을 때, 그 문자열이 Umm 문자열인 경우의 수를 모두 합해서 출력한다.

예제 입력 1
6
4 1
UmmU
1 3
3 1
mmU
1 3
7 1
UmmmUmm
1 4
1 1
U
1 1
5 1
mmUmm
3 5
6 1
UmmUmm
1 6
예제 출력 1
1
0
1
0
1
0
예제 입력 2
2
10 5
UmmUmmmUmm
1 3
1 4
8 10
3 4
4 7
7 3
mmUmmmU
3 5
1 3
3 6
예제 출력 2
3
2
"""
testcase = int(input().strip())
for i in range(testcase):
    num_Umm = 0
    str_length, num_check = map(int, input().strip().split(' '))
    string = input().strip()
    for j in range(num_check):
        start, end = map(int, input().strip().split(' '))
        #print(string[start,end])
        if string[start-1] == 'U' and string[start:end] == 'm'*(end-start) and end-start >= 2:
            num_Umm += 1
    print(num_Umm)