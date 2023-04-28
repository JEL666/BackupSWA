"""
문제 설명
개미 탈출 2
문제
1차원 세상이 조금 더 복잡해졌다. 준식이는 길이가 N 인 1차원 세상의 어딘가에 위치해 있고, 1차원 세상의 어딘가에 위치한 탈출구로 이동하려고 한다. 준식이는 1차원 세상에서 현재 위치한 칸에서 왼쪽 칸이나 오른쪽 칸으로 움직일 수 있다. 준식이가 가는 길에 벽이 있을 수도 있다. 준식이는 화가 많이 났기 때문에 주먹으로 최대 M 개의 벽을 부수고 지나갈 수 있다.

7 1
.O#..@.
준식이가 위치한 1차원 세상을 표현한 지도가 주어질 때 준식이는 1차원 세상을 탈출할 수 있을지 구해보자.

입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다.

각 테스트 케이스의 첫째 줄에 1차원 세상의 길이 N (2 ≤ N ≤ 8) 와 준식이가 벽을 부술 수 있는 최대 횟수 M (0 ≤ M ≤ N - 2) 가 주어진다.

둘째 줄에 1차원 세상을 표현한 길이 N 짜리 문자열 S 가 주어진다.

문자열에서 @ 는 단 한 번 등장하며, 준식이를 의미한다.

문자열에서 알파벳 대문자 O 는 단 한 번 등장하며, 준식이가 이동하려는 탈출구를 의미한다.

나머지 위치의 문자는 . 이거나 # 이다. . 은 빈 칸을 의미한다. 준식이는 빈 칸으로 자유롭게 이동할 수 있다. # 은 벽을 의미한다. 준식이는 벽이 있는 칸으로 이동할 수 없지만, 최대 M 개의 벽은 부술 수 있다.

출력
각 테스트 케이스마다 준식이가 1차원 세상을 탈출할 수 있다면 HAHA! 를 출력한다. 그렇지 못하다면 HELP! 를 출력한다. 모두 대문자로 출력해야 하는 것에 유의한다.

예제 입력 1
3
7 1
...@#O.
5 2
#@#.O
4 0
O##@
예제 출력 1
HAHA!
HAHA!
HELP!
"""

testcase_size = int(input())
for i in range(testcase_size):
    n, m = map(int, input().strip().split(' '))
    world = list(input())
    index_a = 0
    while not (world[index_a] == '@' or world[index_a] == 'O'):
        index_a += 1
    index_b = index_a+1
    wall_count = 0
    answer = "HAHA!"
    other = '@' if world[index_a] == 'O' else 'O'
    while world[index_b] != other:
        if world[index_b] == '#':
            wall_count += 1
            if wall_count > m:
                answer = "HELP!"
                break
        
        index_b += 1
    print(answer)