"""
스탈린 정렬 2
문제
스탈린 정렬은 세상에서 가장 빠른 정렬 알고리즘입니다. 길이가 N인 수열 A[1], A[2], ... , A[N]이 주어졌을 때 이 수열을 스탈린 정렬하는 과정은 다음과 같습니다.

A[i-1] > A[i] (2 ≤ i ≤ |A|)를 만족하는 원소 A[i]를 수열 A에서 제거합니다. 이를 만족하는 원소가 여러 개 있다면 가장 앞서는 것을 제거합니다.
더 이상 제거할 수 있는 원소가 없을 때까지 1번 과정을 반복합니다.
주어진 수열 A를 스탈린 정렬해서 출력하세요.

입력
첫째 줄에 테스트 케이스의 개수 T (1 ≤ T ≤ 100)가 주어집니다.

각 테스트 케이스의 첫째 줄에 수열의 길이 N (1 ≤ N ≤ 200 000)이 주어집니다.

둘째 줄에 수열의 원소 A[1], A[2], ..., A[N]이 주어집니다. 수열의 i번째 원소는 정수 A[i] (1 ≤ A[i] ≤ 1 000 000 000)입니다.

모든 테스트 케이스의 N의 합은 200 000을 넘지 않습니다.

출력
각 테스트 케이스마다 주어진 수열을 스탈린 정렬한 결과를 출력합니다.

예제 입력 1
1
6
3 1 2 4 3 5
예제 출력 1
3 4 5
"""
testcase_size = int(input())
seq = []
for j in range(testcase_size):
    seq_size = int(input())
    if seq_size == 1:
        print(input())
    else:
        seq = list(map(int, input().split(" ")))
        i = len(seq)-1
        
        while i > 0:
            print("seq["+str(i-1)+"], seq["+str(i)+"]")
            if seq[i-1] > seq[i]:
                seq.pop(i)
                if i >= len(seq):
                  i -= 1
                elif len(seq) <= 1:
                  break
            else:
                i -= 1
        print(*seq)